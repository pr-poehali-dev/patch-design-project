import React from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface ProductActionsProps {
  price: number;
  isFavorite: boolean;
  onToggleFavorite: (e: React.MouseEvent) => void;
  onAddToCart: () => void;
}

/**
 * Компонент кнопок действий продукта (купить, добавить в избранное)
 */
const ProductActions = ({
  price,
  isFavorite,
  onToggleFavorite,
  onAddToCart,
}: ProductActionsProps) => {
  return (
    <div className="mt-auto">
      <div className="flex justify-between items-center">
        <span className="text-russian-blue font-bold text-lg">{price} ₽</span>
        <Button
          variant="outline"
          size="sm"
          className="rounded-full border-russian-blue text-russian-blue hover:bg-russian-blue/10"
          onClick={onToggleFavorite}
        >
          <Icon
            name="Heart"
            size={16}
            className={`mr-1 ${isFavorite ? "fill-red-500 text-red-500" : ""}`}
          />
          {isFavorite ? "В избранном" : "В избранное"}
        </Button>
      </div>
      <Button
        className="w-full bg-russian-blue hover:bg-russian-blue/90 mt-2"
        onClick={onAddToCart}
      >
        Купить
      </Button>
    </div>
  );
};

export default ProductActions;
