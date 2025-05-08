
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-r from-purple-700 to-indigo-800 text-white py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-4">Уникальные дизайны нашивок</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Создайте свой неповторимый стиль с нашими качественными дизайнами для вышивки
        </p>
        <Button className="bg-white text-purple-700 hover:bg-gray-100">
          Смотреть каталог
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;
