import { cn } from "@/lib/utils";

interface SalespringLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function SalespringLogo({ className, size = "md" }: SalespringLogoProps) {
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
          {/* Spring coil design */}
          <path
            d="M8 16c0-4.4 3.6-8 8-8s8 3.6 8 8c0 2.2-0.9 4.2-2.3 5.7"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            className="text-primary"
          />
          <path
            d="M12 16c0-2.2 1.8-4 4-4s4 1.8 4 4c0 1.1-0.4 2.1-1.2 2.8"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            className="text-primary"
          />
          <path
            d="M14 16c0-1.1 0.9-2 2-2s2 0.9 2 2c0 0.6-0.2 1.1-0.6 1.4"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            className="text-primary"
          />
          
          {/* Growth arrow */}
          <path
            d="M16 20l3 3m0 0l-3 3m3-3H8"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-accent"
          />
          
          {/* Leaf accent */}
          <path
            d="M20 8c2 0 4 1.5 4 3.5s-2 3.5-4 3.5c-1 0-1.8-0.5-2.5-1.2"
            fill="currentColor"
            className="text-accent opacity-70"
          />
        </svg>
      </div>
      <span className={cn(
        "font-bold tracking-tight",
        size === "sm" ? "text-lg" : size === "md" ? "text-xl" : "text-2xl"
      )}>
        <span className="text-primary">Sale</span>
        <span className="text-accent">spring</span>
      </span>
    </div>
  );
}