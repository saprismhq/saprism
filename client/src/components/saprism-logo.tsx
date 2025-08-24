import { cn } from "@/lib/utils";

interface SaprismLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function SaprismLogo({ className, size = "md" }: SaprismLogoProps) {
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-12 w-12"
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className={cn("relative flex items-center justify-center", sizeClasses[size])}>
        <svg
          viewBox="0 0 32 32"
          className="h-full w-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Prism crystal design */}
          <path
            d="M16 4 L26 14 L16 24 L6 14 Z"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            className="text-primary"
          />
          <path
            d="M16 4 L16 24"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-primary opacity-60"
          />
          <path
            d="M6 14 L26 14"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-primary opacity-60"
          />
          
          {/* Light refraction effect */}
          <path
            d="M16 14 L19 11 L22 14 L19 17 Z"
            fill="currentColor"
            className="text-accent opacity-70"
          />
          <path
            d="M16 14 L13 11 L10 14 L13 17 Z"
            fill="currentColor"
            className="text-accent opacity-50"
          />
          
          {/* Light beam effect */}
          <path
            d="M26 14 L28 12 M26 14 L28 16"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className="text-accent"
          />
        </svg>
      </div>
      <span className={cn(
        "font-bold tracking-tight",
        size === "sm" ? "text-lg" : size === "md" ? "text-xl" : "text-2xl"
      )}>
        <span className="text-primary">Sap</span>
        <span className="text-accent">rism</span>
      </span>
    </div>
  );
}