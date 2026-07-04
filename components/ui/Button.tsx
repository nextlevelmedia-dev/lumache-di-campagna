import Link from "next/link";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
};

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold tracking-wide transition-all duration-300 ease-[cubic-bezier(.22,1,.36,1)]";

  const styles =
    variant === "primary"
      ? `
        bg-[var(--green)]
        bg-[length:200%_100%]
        bg-left
        text-white
        shadow-sm

        hover:bg-[linear-gradient(110deg,var(--green),#065f46,var(--green))]
        hover:bg-right
        hover:shadow-[0_8px_24px_rgba(6,95,70,0.25)]

        active:shadow-sm
      `
      : `
        border
        border-[var(--border)]
        bg-white
        text-[var(--foreground)]

        hover:bg-[#f5f5f4]
        hover:border-[#d6d3d1]
        hover:shadow-[0_6px_18px_rgba(0,0,0,0.06)]

        active:bg-[#eeeeec]
        active:shadow-none
      `;

  return (
    <Link
      href={href}
      className={`${base} ${styles} ${className}`}
    >
      {children}
    </Link>
  );
}