import { Loader2 } from "lucide-react";

export function Button({
  children,
  variant = "primary",
  isLoading = false,
  className = "",
  ...props
}) {
  const baseStyles =
    "flex items-center justify-center font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-70 disabled:cursor-not-allowed w-full";

  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
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
