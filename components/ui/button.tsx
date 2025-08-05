import { cn } from "@/lib/utils"
import * as React from "react"

export function Button({
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-xl bg-blue-600 text-white text-sm font-medium px-4 py-2 hover:bg-blue-700 transition-all",
        className
      )}
      {...props}
    />
  )
}
