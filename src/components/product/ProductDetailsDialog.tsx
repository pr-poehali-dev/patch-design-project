import React from "react";
import { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Icon from "@/components/ui/icon";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ProductDetailsDialogProps {
  product: Product;
  onAddToCart: () => void;
}

/**
 * Компонент модального окна с подробностями о продукте
 */
const ProductDetailsDialog = ({
  product,
  onAddToCart,
}: ProductDetailsDialogProps) => {
  return (
    <DialogContent className="sm:max-w-[600px]">
      <DialogHeader>
        <DialogTitle>{product.title}</DialogTitle>
      </DialogHeader>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div>
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-auto rounded-md object-cover"
          />
        </div>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium text-xl mb-2">{product.title}</h3>
            <Badge variant="outline" className="mb-2">
              {product.category}
            </Badge>
            <p className="text-2xl font-bold text-russian-blue">
              {product.price} ₽
            </p>
          </div>

          {product.description && (
            <div>
              <p className="text-sm text-gray-600">{product.description}</p>
            </div>
          )}

          <Separator />

          <div className="space-y-2">
            <h4 className="font-medium">Характеристики дизайна:</h4>
            <ul className="space-y-1 text-sm">
              <li className="flex justify-between">
                <span className="text-gray-600">Размер:</span>
                <span className="font-medium">
                  {product.characteristics?.size} мм
                </span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-600">Количество стежков:</span>
                <span className="font-medium">
                  {product.characteristics?.stitchCount?.toLocaleString()}
                </span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-600">Количество цветов:</span>
                <span className="font-medium">
                  {product.characteristics?.colors}
                </span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-600">Сложность:</span>
                <span className="font-medium">
                  {product.characteristics?.difficulty}
                </span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-600">Форматы файлов:</span>
                <span className="font-medium uppercase">
                  {product.characteristics?.formats?.join(", ")}
                </span>
              </li>
            </ul>
          </div>

          <div className="text-xs p-3 bg-gray-50 rounded-md">
            <p className="font-medium flex items-center mb-1">
              <Icon name="Shield" className="h-3.5 w-3.5 mr-1 text-gray-500" />
              Лицензия автора
            </p>
            <p className="text-gray-600 leading-tight">
              Продавец предоставляет неисключительное право использования и
              продажи готовых вышивок, созданных с использованием данного
              дизайна. Распространение дизайна в цифровой форме запрещено.
            </p>
          </div>

          <Button
            className="w-full bg-russian-blue hover:bg-russian-blue/90 mt-4"
            onClick={onAddToCart}
          >
            Добавить в корзину
          </Button>
        </div>
      </div>
    </DialogContent>
  );
};

export default ProductDetailsDialog;
