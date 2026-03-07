import { Loader2 } from "lucide-react";

export function Button({
  children,
  variant = "primary",
  isLoading = false,
  className = "",
  ...props
}) {
  const baseStyles =
    "flex items-center justify-center font-semibold py-3 px-6 rounded-lg transition-all duration-1000 ease-out disabled:opacity-70 disabled:cursor-not-allowed w-full";

  const variants = {
    primary:
      "bg-brand hover:brightness-95 text-white hover:shadow-[0_0_18px_rgba(196,58,255,0.72)]",
    secondary: "bg-slate-200 hover:bg-slate-300 text-slate-800",
    danger: "bg-red-600 hover:bg-red-700 text-white",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading && <Loader2 className="w-5 h-5 mr-2 animate-spin" />}
      {children}
    </button>
  );
}
