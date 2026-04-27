param(
  [Parameter(Mandatory = $true)]
  [string]$HostName,

  [Parameter(Mandatory = $true)]
  [string]$UserName,

  [Parameter(Mandatory = $true)]
  [string]$Password,

  [string]$RemotePath = "/",

  [string]$LocalPath = "out",

  [string[]]$DeleteRemotePaths = @(),

  [switch]$EnableSsl
)

$ErrorActionPreference = "Stop"

function Join-FtpPath {
  param([string]$Base, [string]$Child)

  $cleanBase = $Base.TrimEnd("/")
  $cleanChild = $Child.TrimStart("/")

  if ([string]::IsNullOrWhiteSpace($cleanBase)) {
    return "/$cleanChild"
  }

  if ([string]::IsNullOrWhiteSpace($cleanChild)) {
    return $cleanBase
  }

  return "$cleanBase/$cleanChild"
}

function New-FtpRequest {
  param(
    [string]$Uri,
    [string]$Method
  )

  $request = [System.Net.FtpWebRequest]::Create($Uri)
  $request.Method = $Method
  $request.Credentials = New-Object System.Net.NetworkCredential($UserName, $Password)
  $request.UseBinary = $true
  $request.UsePassive = $true
  $request.KeepAlive = $false
  $request.EnableSsl = [bool]$EnableSsl
  return $request
}

function Get-FtpEntries {
  param([string]$DirectoryPath)

  $uri = "ftp://$HostName$DirectoryPath"
  $request = New-FtpRequest -Uri $uri -Method ([System.Net.WebRequestMethods+Ftp]::ListDirectory)

  try {
    $response = $request.GetResponse()
    $reader = New-Object System.IO.StreamReader($response.GetResponseStream())
    $content = $reader.ReadToEnd()
    $reader.Close()
    $response.Close()

    return $content -split "`r?`n" | Where-Object { -not [string]::IsNullOrWhiteSpace($_) }
  } catch [System.Net.WebException] {
    if ($_.Exception.Response) {
      $_.Exception.Response.Close()
    }
    return @()
  }
}

function Remove-FtpPathRecursive {
  param([string]$RemoteTargetPath)

  $normalizedPath = if ($RemoteTargetPath.StartsWith("/")) { $RemoteTargetPath } else { "/$RemoteTargetPath" }
  $entries = Get-FtpEntries -DirectoryPath $normalizedPath

  if ($entries.Count -gt 0) {
    foreach ($entry in $entries) {
      $childPath = Join-FtpPath -Base $normalizedPath -Child $entry
      Remove-FtpPathRecursive -RemoteTargetPath $childPath
    }

    $dirRequest = New-FtpRequest -Uri ("ftp://$HostName$normalizedPath") -Method ([System.Net.WebRequestMethods+Ftp]::RemoveDirectory)
    try {
      $dirResponse = $dirRequest.GetResponse()
      $dirResponse.Close()
      return
    } catch [System.Net.WebException] {
      if ($_.Exception.Response) {
        $_.Exception.Response.Close()
      }
    }
  }

  $fileRequest = New-FtpRequest -Uri ("ftp://$HostName$normalizedPath") -Method ([System.Net.WebRequestMethods+Ftp]::DeleteFile)
  try {
    $fileResponse = $fileRequest.GetResponse()
    $fileResponse.Close()
  } catch [System.Net.WebException] {
    if ($_.Exception.Response) {
      $_.Exception.Response.Close()
    }

    $dirRequest = New-FtpRequest -Uri ("ftp://$HostName$normalizedPath") -Method ([System.Net.WebRequestMethods+Ftp]::RemoveDirectory)
    try {
      $dirResponse = $dirRequest.GetResponse()
      $dirResponse.Close()
    } catch [System.Net.WebException] {
      if ($_.Exception.Response) {
        $_.Exception.Response.Close()
      }
    }
  }
}

function Ensure-FtpDirectory {
  param([string]$DirectoryPath)

  $parts = $DirectoryPath.Trim("/") -split "/" | Where-Object { $_ }
  $current = ""

  foreach ($part in $parts) {
    $current = Join-FtpPath -Base $current -Child $part
    $uri = "ftp://$HostName$current"
    $request = New-FtpRequest -Uri $uri -Method ([System.Net.WebRequestMethods+Ftp]::MakeDirectory)

    try {
      $response = $request.GetResponse()
      $response.Close()
    } catch [System.Net.WebException] {
      if ($_.Exception.Response) {
        $_.Exception.Response.Close()
      }
    }
  }
}

function Upload-File {
  param(
    [string]$LocalFile,
    [string]$RemoteFile
  )

  $remoteDirectory = Split-Path -Path $RemoteFile -Parent
  $remoteDirectory = $remoteDirectory -replace "\\", "/"
  Ensure-FtpDirectory -DirectoryPath $remoteDirectory

  $uri = "ftp://$HostName$RemoteFile"
  $request = New-FtpRequest -Uri $uri -Method ([System.Net.WebRequestMethods+Ftp]::UploadFile)
  $bytes = [System.IO.File]::ReadAllBytes($LocalFile)
  $request.ContentLength = $bytes.Length

  $stream = $request.GetRequestStream()
  $stream.Write($bytes, 0, $bytes.Length)
  $stream.Close()

  $response = $request.GetResponse()
  $response.Close()
}

$resolvedLocalPath = Resolve-Path -LiteralPath $LocalPath
$root = $resolvedLocalPath.Path.TrimEnd("\")
$baseRemote = if ($RemotePath.StartsWith("/")) { $RemotePath } else { "/$RemotePath" }

foreach ($remoteToDelete in $DeleteRemotePaths) {
  $targetPath = Join-FtpPath -Base $baseRemote -Child $remoteToDelete
  Write-Host "Deleting remote path $targetPath"
  Remove-FtpPathRecursive -RemoteTargetPath $targetPath
}

if (-not (Test-Path -LiteralPath (Join-Path $root "index.html"))) {
  throw "index.html non trovato in '$root'. Esegui prima: npm run build:static"
}

$files = Get-ChildItem -LiteralPath $root -Recurse -File

foreach ($file in $files) {
  $relative = $file.FullName.Substring($root.Length).TrimStart("\") -replace "\\", "/"
  $remoteFile = Join-FtpPath -Base $baseRemote -Child $relative
  Write-Host "Uploading $relative -> $remoteFile"
  Upload-File -LocalFile $file.FullName -RemoteFile $remoteFile
}

Write-Host "Deploy FTP completato. File caricati: $($files.Count)"
