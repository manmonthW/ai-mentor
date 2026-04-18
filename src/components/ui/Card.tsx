import Link from "next/link";
import { clsx } from "clsx";

interface CardProps {
  children: React.ReactNode;
  href?: string;
  external?: boolean;
  className?: string;
  onClick?: () => void;
}

export default function Card({ children, href, external, className, onClick }: CardProps) {
  const base = "bg-white rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 hover:border-indigo-200";

  if (href && external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={clsx(base, className)}>
        {children}
      </a>
    );
  }

  if (href) {
    return (
      <Link href={href} className={clsx(base, className)}>
        {children}
      </Link>
    );
  }

  return (
    <div className={clsx(base, className)} onClick={onClick}>
      {children}
    </div>
  );
}
