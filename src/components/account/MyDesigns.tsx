import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

// Тип для дизайна с дополнительными полями
interface PurchasedDesign {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
  purchaseDate: string;
  downloadLink: string;
  characteristics?: {
    size?: string;
    stitchCount?: number;
    formats?: string[];
    colors?: number;
    difficulty?: "Легкий" | "Средний" | "Сложный";
    additionalInfo?: string;
  };
}

interface MyDesignsProps {
  designs: PurchasedDesign[];
  onDownload: (design: PurchasedDesign) => void;
  formatDate: (dateString: string) => string;
}

/**
 * Компонент для отображения купленных дизайнов пользователя
 */
const MyDesigns = ({ designs, onDownload, formatDate }: MyDesignsProps) => {
  if (!designs || designs.length === 0) {
    return (
      <div className="text-center py-8">
        <Icon name="Package" className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-800 mb-2">
          У вас пока нет купленных дизайнов
        </h3>
        <p className="text-gray-600 mb-6">
          Перейдите в каталог, чтобы выбрать и купить дизайны для вышивки
        </p>
        <Link to="/">
          <Button className="bg-purple-600 hover:bg-purple-700">
            Перейти в каталог
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {designs.map((design) => (
        <Card key={design.id} className="overflow-hidden">
          <div className="aspect-square">
            <img
              src={design.image}
              alt={design.title}
              className="w-full h-full object-cover"
            />
          </div>
          <CardContent className="p-4">
            <h3 className="font-medium text-lg mb-1">{design.title}</h3>
            <div className="flex justify-between items-center text-sm text-gray-500 mb-3">
              <span>{design.category}</span>
              <span>{formatDate(design.purchaseDate)}</span>
            </div>
            <Button
              className="w-full bg-russian-blue hover:bg-russian-blue/90"
              onClick={() => onDownload(design)}
            >
              <Icon name="Download" className="mr-2 h-4 w-4" />
              Скачать
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default MyDesigns;
