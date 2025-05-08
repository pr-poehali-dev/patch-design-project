
import React from "react";
import { Button } from "@/components/ui/button";

const InfoSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-10">
          <div className="md:w-1/2">
            <img 
              src="https://images.unsplash.com/photo-1614595913791-dea11d4519a7?w=800&auto=format&fit=crop&q=80" 
              alt="Вышивальный процесс" 
              className="rounded-lg shadow-lg w-full object-cover h-[400px]"
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Дизайны для вышивальных машин любых марок</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                Мы предлагаем готовые дизайны для машинной вышивки в широком ассортименте. Все дизайны созданы профессиональными дизайнерами с многолетним опытом работы.
              </p>
              <p>
                Наши дизайны подойдут для любой вышивальной машины: Brother, Janome, Bernina, Singer, Pfaff, Husqvarna Viking и других.
              </p>
              <p>
                После оплаты вы мгновенно получаете доступ к скачиванию файлов в нужных вам форматах.
              </p>
              <div className="pt-4">
                <Button className="bg-purple-600 hover:bg-purple-700">
                  Смотреть все дизайны
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfoSection;
