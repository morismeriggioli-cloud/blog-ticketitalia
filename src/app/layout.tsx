import type { Metadata } from "next";
import "./globals.css";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

export const metadata: Metadata = {
  metadataBase: new URL("https://blog.ticketitalia.com"),
  title: {
    default: "Ticket Italia Blog | Eventi, concerti e spettacoli live",
    template: "%s | Ticket Italia Blog",
  },
  description:
    "Guide, ispirazioni e novita per vivere concerti, festival, teatro, sport e nightlife con Ticket Italia.",
  keywords: ["Ticket Italia", "blog eventi", "concerti", "festival", "teatro"],
  authors: [{ name: "Ticket Italia" }],
  icons: {
    icon: [{ url: "/logo%20ticket%20italia%20(3).png", type: "image/png" }],
    shortcut: ["/logo%20ticket%20italia%20(3).png"],
    apple: [{ url: "/logo%20ticket%20italia%20(3).png", type: "image/png" }],
  },
  openGraph: {
    title: "Ticket Italia Blog",
    description:
      "Il magazine digitale per scoprire gli eventi live piu attesi in Italia.",
    url: "https://blog.ticketitalia.com",
    siteName: "Ticket Italia Blog",
    locale: "it_IT",
    type: "website",
    images: [
      {
        url: "/logo%20ticket%20italia%20(3).png",
        alt: "Ticket Italia Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ticket Italia Blog",
    description:
      "Concerti, festival, teatro, sport e nightlife: scopri cosa vivere dal vivo.",
    images: ["/logo%20ticket%20italia%20(3).png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
