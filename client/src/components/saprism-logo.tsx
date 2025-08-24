import { cn } from "@/lib/utils";
import logoImage from "../assets/saprism-logo.png";

interface SaprismLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function SaprismLogo({ className, size = "md" }: SaprismLogoProps) {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10", 
    lg: "h-16 w-16"
  };

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <img
        src={logoImage}
        alt="Saprism Logo"
        className={cn("object-contain flex-shrink-0", sizeClasses[size])}
      />
      <span className={cn(
        "font-bold tracking-tight bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 bg-clip-text text-transparent leading-none",
        size === "sm" ? "text-lg" : size === "md" ? "text-xl" : "text-2xl"
      )}>
        Saprism
      </span>
    </div>
  );
}