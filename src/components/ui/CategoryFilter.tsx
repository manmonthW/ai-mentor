import { Tag } from "lucide-react";

interface CategoryFilterProps {
  categories: { name: string; icon?: string }[];
  selected: string;
  onSelect: (name: string) => void;
}

export default function CategoryFilter({ categories, selected, onSelect }: CategoryFilterProps) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto py-3">
      <Tag className="w-4 h-4 text-gray-400 flex-shrink-0" />
      {categories.map((cat) => (
        <button
          key={cat.name}
          onClick={() => onSelect(cat.name)}
          className={`flex items-center px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
            selected === cat.name
              ? "bg-indigo-600 text-white"
              : "bg-white text-gray-600 hover:bg-gray-200"
          }`}
        >
          {cat.icon && <span className="mr-2">{cat.icon}</span>}
          {cat.name}
        </button>
      ))}
    </div>
  );
}
