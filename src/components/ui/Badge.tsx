import { cn } from "@/lib/utils";

type BadgeProps = {
  children: React.ReactNode;
  variant?: "dark" | "light" | "accent";
  className?: string;
};

export function Badge({ children, variant = "light", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-3 py-1 text-xs font-bold uppercase tracking-normal",
        variant === "dark" && "bg-ink text-white",
        variant === "light" && "bg-white/90 text-ink ring-1 ring-black/10",
        variant === "accent" && "bg-neon text-ink",
        className,
      )}
    >
      {children}
    </span>
  );
}
