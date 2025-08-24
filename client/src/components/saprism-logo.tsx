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
            <linearGradient id="ovalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7DD3FC" />
              <stop offset="50%" stopColor="#0EA5E9" />
              <stop offset="100%" stopColor="#0284C7" />
            </linearGradient>
          </defs>
          
          {/* Main oval shape */}
          <ellipse
            cx="16"
            cy="16"
            rx="10"
            ry="13"
            fill="url(#ovalGradient)"
          />
          
          {/* S-shaped flowing lines */}
          <path
            d="M11 8 Q16 11 21 8 Q18 12 16 16 Q14 20 11 24"
            stroke="#1E293B"
            strokeWidth="2.8"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          <path
            d="M9 10 Q14 13 19 10 Q16 14 14 18 Q12 22 9 26"
            stroke="#1E293B"
            strokeWidth="2.2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* Four-pointed star/sparkle */}
          <g transform="translate(23, 7)">
            <path
              d="M0 -3 L1 -1 L3 0 L1 1 L0 3 L-1 1 L-3 0 L-1 -1 Z"
              fill="#67E8F9"
            />
          </g>
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