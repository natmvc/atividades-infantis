import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "soft";
  ariaLabel?: string;
};

const styles = {
  primary:
    "bg-candy text-white shadow-button hover:bg-[#ff2d72] focus-visible:outline-candy",
  secondary:
    "bg-ink text-white shadow-soft hover:bg-[#111827] focus-visible:outline-ink",
  soft:
    "bg-white text-ink ring-1 ring-sky-100 shadow-soft hover:bg-skywash focus-visible:outline-ocean"
};

export function Button({ href, children, variant = "primary", ariaLabel }: ButtonProps) {
  const isExternal = href.startsWith("http://") || href.startsWith("https://");

  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-extrabold transition ${styles[variant]} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4`}
    >
      {variant === "primary" ? <Sparkles aria-hidden size={18} /> : null}
      <span>{children}</span>
      <ArrowRight aria-hidden size={18} />
    </Link>
  );
}
