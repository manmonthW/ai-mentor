import Link from "next/link";
import { ChevronRight, type LucideIcon } from "lucide-react";

interface SectionHeaderProps {
  title: string;
  icon?: LucideIcon;
  iconColor?: string;
  badge?: string;
  badgeColor?: string;
  href?: string;
  linkText?: string;
}

export default function SectionHeader({ title, icon: Icon, iconColor = "text-indigo-600", badge, badgeColor = "bg-indigo-100 text-indigo-700", href, linkText = "查看更多" }: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center">
        {Icon && <Icon className={`w-6 h-6 ${iconColor} mr-2`} />}
        <h2 className="text-2xl font-bold">{title}</h2>
        {badge && (
          <span className={`ml-2 text-xs ${badgeColor} px-2 py-0.5 rounded-full`}>{badge}</span>
        )}
      </div>
      {href && (
        <Link href={href} className="text-indigo-600 hover:text-indigo-700 flex items-center font-medium">
          {linkText} <ChevronRight className="w-4 h-4" />
        </Link>
      )}
    </div>
  );
}
