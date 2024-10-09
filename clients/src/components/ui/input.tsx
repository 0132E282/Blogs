import * as React from "react"

import { cn } from "@/lib/utils"
import { IconEye, IconEyeSlash } from "@/utilities/icons"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState<boolean>(false);
    return (
     <div className="relative">
        <input
          type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className, (type === 'password' && 'pr-10')
          )}
          ref={ref}
          {...props}
        />
        {type === 'password' && <span onClick={()=>setShowPassword(!showPassword)} className="absolute cursor-pointer top-1/2 right-2 -translate-y-1/2">
           {!showPassword ? <IconEye/> : <IconEyeSlash/>}  
          </span>}
     </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
