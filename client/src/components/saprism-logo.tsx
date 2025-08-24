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
          <defs>
            <linearGradient id="sapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4FC3F7" />
              <stop offset="50%" stopColor="#29B6F6" />
              <stop offset="100%" stopColor="#0288D1" />
            </linearGradient>
            <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4FC3F7" opacity="0.8" />
              <stop offset="100%" stopColor="#0288D1" opacity="0.6" />
            </linearGradient>
          </defs>
          
          {/* Main oval container */}
          <ellipse
            cx="16"
            cy="16"
            rx="12"
            ry="14"
            fill="url(#sapGradient)"
            className="drop-shadow-sm"
          />
          
          {/* Flowing curves creating S pattern */}
          <path
            d="M10 8 Q16 12 22 8 Q16 16 10 20 Q16 20 22 24"
            stroke="#1A237E"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.7"
          />
          
          <path
            d="M8 10 Q14 14 20 10 Q14 18 8 22"
            stroke="#1A237E"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.5"
          />
          
          {/* Sparkle/diamond accent */}
          <path
            d="M24 6 L25.5 7.5 L24 9 L22.5 7.5 Z"
            fill="#4FC3F7"
            className="animate-pulse"
          />
          <path
            d="M24 7.5 L24.7 7.5 M24 7.5 L23.3 7.5 M24 7.5 L24 6.8 M24 7.5 L24 8.2"
            stroke="#4FC3F7"
            strokeWidth="0.8"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <span className={cn(
        "font-bold tracking-tight bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 bg-clip-text text-transparent",
        size === "sm" ? "text-lg" : size === "md" ? "text-xl" : "text-2xl"
      )}>
        Saprism
      </span>
    </div>
  );
}