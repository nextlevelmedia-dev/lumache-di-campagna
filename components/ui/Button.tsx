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
    "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold tracking-wide transition duration-300";

  const styles =
    variant === "primary"
      ? "bg-[var(--green)] text-white hover:bg-[var(--green-soft)]"
      : "border border-[var(--border)] bg-white text-[var(--foreground)] hover:border-[var(--green)]";

  return (
    <Link href={href} className={`${base} ${styles} ${className}`}>
      {children}
    </Link>
  );
}