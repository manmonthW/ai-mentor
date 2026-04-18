interface HeroSectionProps {
  title: string;
  description: string;
  gradient?: string;
}

export default function HeroSection({ title, description, gradient = "from-indigo-600 via-purple-600 to-pink-500" }: HeroSectionProps) {
  return (
    <div className={`bg-gradient-to-br ${gradient} text-white`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-bold mb-2">{title}</h1>
        <p className="text-white/80">{description}</p>
      </div>
    </div>
  );
}
