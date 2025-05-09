import React from "react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-russian-blue/10 to-russian-red/10" />
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1582455453135-b85081ac158e?w=1200&auto=format&fit=crop&q=80')] bg-center bg-cover opacity-10" />

      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-russian-blue to-russian-red bg-clip-text text-transparent">
            Дизайны для вышивальных машин
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-8">
            Профессиональные дизайны нашивок и аппликаций для любых вышивальных
            машин. Более 1000 качественных дизайнов в различных форматах.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button className="bg-russian-blue hover:bg-russian-blue/90 text-white px-8 py-6 text-lg h-auto">
              Смотреть каталог
            </Button>
            <Button
              variant="outline"
              className="border-russian-red text-russian-red hover:bg-russian-red/10 px-8 py-6 text-lg h-auto"
            >
              Как заказать
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
};

export default HeroSection;
