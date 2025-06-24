import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "outline" | "ghost";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-gradient-to-r from-purple-500 to-blue-400 text-white shadow-[0_0_12px_rgba(99,102,241,0.6)] hover:brightness-110",
  secondary: "bg-white text-blackhover:bg-gray-200",
  outline: "border border-gray-300 text-gray-800 bg-white hover:bg-gray-50",
  ghost: "text-gray-600 hover:bg-gray-100",
};

const Button = ({
  children,
  type = "button",
  variant = "primary",
  className,
  ...rest
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={cn(
        "w-full flex items-center justify-center gap-2 py-3 rounded-full text-base font-semibold transition",
        variantClasses[variant],
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
