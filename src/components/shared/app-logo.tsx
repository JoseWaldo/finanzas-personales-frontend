import { cn } from "@/lib/utils";

interface AppLogoProps {
  className?: string;
  iconClassName?: string;
  showText?: boolean;
}

export function AppLogo({ className, iconClassName, showText = true }: AppLogoProps) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <div
        className={cn(
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary",
          iconClassName,
        )}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 32 32"
          fill="none"
        >
          <path
            d="M10 16.5L14.5 21L22 11"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-primary-foreground"
          />
        </svg>
      </div>
      {showText && (
        <span className="text-lg font-bold tracking-tight">Balanz</span>
      )}
    </div>
  );
}
