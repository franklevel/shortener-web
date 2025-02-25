import * as React from "react"
import { classNames } from "@/lib/utils"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", error, ...props }, ref) => {
    return (
      <input
        className={classNames(
          "w-full",
          "h-10",
          "px-4",
          "text-base",
          "text-white",
          "bg-[#3D3D3D]",
          "rounded-md",
          "border-0",
          "placeholder:text-gray-500",
          "focus:outline-none",
          "focus:ring-1",
          "focus:ring-gray-400",
          "disabled:opacity-50",
          "disabled:cursor-not-allowed",
          "transition-colors",
          error && "ring-1 ring-red-500 focus:ring-red-500",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)

Input.displayName = "Input"

export { Input }
