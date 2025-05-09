import React from "react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Product } from "@/types/product";

interface ProductCharacteristicsProps {
  product: Product;
}

/**
 * Компонент для отображения характеристик продукта
 */
const ProductCharacteristics = ({ product }: ProductCharacteristicsProps) => {
  const formatsList = product.characteristics?.formats
    ?.join(", ")
    .toUpperCase();

  return (
    <div className="bg-gray-50 rounded-md p-2 mb-3 text-xs space-y-1">
      <div className="flex justify-between">
        <span className="text-gray-600">Размер дизайна:</span>
        <span className="font-medium">{product.characteristics?.size} мм</span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-600">Количество стежков:</span>
        <span className="font-medium">
          {product.characteristics?.stitchCount?.toLocaleString()}
        </span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-600">Форматы файлов:</span>
        <span className="font-medium uppercase">{formatsList}</span>
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <button className="text-russian-blue hover:underline text-xs w-full text-center mt-1">
            Все характеристики
          </button>
        </DialogTrigger>
      </Dialog>
    </div>
  );
};

export default ProductCharacteristics;
