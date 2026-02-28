import { forwardRef } from "react";

export const Input = forwardRef(
  ({ label, error, className = "", ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-1">
        {label && <label className="text-slate-700 font-medium">{label}</label>}
        <input
          ref={ref}
          className={`border p-3 rounded-lg outline-none transition-colors 
          ${error ? "border-red-500 focus:border-red-500 bg-red-50" : "border-slate-300 focus:border-blue-500"} 
          ${className}`}
          {...props}
        />
        {error && <span className="text-red-500 text-sm">{error}</span>}
      </div>
    );
  },
);

Input.displayName = "Input";
