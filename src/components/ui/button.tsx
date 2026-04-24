import * as React from "react";
import { cn } from "../../lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost";
}

const buttonVariants = (variant: string = "default") => {
  const base = "inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
  
  const variants = {
    default: "bg-[#5a6b4a] text-white hover:bg-[#4a6630] focus-visible:ring-[#5a6b4a]",
    outline: "border-2 border-[#e8ebe5] bg-white hover:bg-[#f5f0e8] hover:border-[#5a6b4a]",
    ghost: "hover:bg-[#f5f0e8] hover:text-[#2a4538]",
  };
  
  return `${base} ${variants[variant as keyof typeof variants] || variants.default}`;
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants(variant), "px-4 py-2", className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
