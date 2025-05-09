import React from "react";
import { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ProductDetailFullProps {
  product: Product;
  onAddToCart: () => void;
}

/**
 * Компонент подробного просмотра характеристик продукта
 */
const ProductDetailFull = ({
  product,
  onAddToCart,
}: ProductDetailFullProps) => {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Характеристики дизайна "{product.title}"</DialogTitle>
      </DialogHeader>
      <div className="space-y-4 mt-4">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="bg-gray-50 p-3 rounded-md">
            <h4 className="font-medium mb-2">Размер дизайна</h4>
            <p className="text-xl font-bold">
              {product.characteristics?.size} мм
            </p>
          </div>
          <div className="bg-gray-50 p-3 rounded-md">
            <h4 className="font-medium mb-2">Количество стежков</h4>
            <p className="text-xl font-bold">
              {product.characteristics?.stitchCount?.toLocaleString()}
            </p>
          </div>
          <div className="bg-gray-50 p-3 rounded-md">
            <h4 className="font-medium mb-2">Количество цветов</h4>
            <p className="text-xl font-bold">
              {product.characteristics?.colors}
            </p>
          </div>
          <div className="bg-gray-50 p-3 rounded-md">
            <h4 className="font-medium mb-2">Сложность</h4>
            <p className="text-xl font-bold">
              {product.characteristics?.difficulty}
            </p>
          </div>
        </div>

        <div className="bg-gray-50 p-3 rounded-md">
          <h4 className="font-medium mb-2">Доступные форматы файлов</h4>
          <div className="flex flex-wrap gap-2">
            {product.characteristics?.formats?.map((format) => (
              <Badge
                key={format}
                variant="outline"
                className="text-sm uppercase"
              >
                {format}
              </Badge>
            ))}
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Подходит для большинства моделей вышивальных машин: Brother, Janome,
            Husqvarna и других
          </p>
        </div>

        <div className="mt-4">
          <Button
            className="w-full bg-russian-blue hover:bg-russian-blue/90"
            onClick={onAddToCart}
          >
            Добавить в корзину за {product.price} ₽
          </Button>
        </div>
      </div>
    </DialogContent>
  );
};

export default ProductDetailFull;
