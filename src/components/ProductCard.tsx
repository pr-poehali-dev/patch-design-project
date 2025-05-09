import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Product } from "@/types/product";
import Icon from "@/components/ui/icon";
import { Dialog } from "@/components/ui/dialog";

// Импортируем разделенные компоненты
import ProductImage from "@/components/product/ProductImage";
import ProductCharacteristics from "@/components/product/ProductCharacteristics";
import ProductActions from "@/components/product/ProductActions";
import ProductDetailsDialog from "@/components/product/ProductDetailsDialog";
import ProductDetailFull from "@/components/product/ProductDetailFull";
import ProductDescription from "@/components/product/ProductDescription"; // Добавляем импорт нового компонента
import ProductLicense from "@/components/product/ProductLicense"; // Импортируем новый компонент лицензии

interface ProductCardProps {
  product: Product;
  onAddToCart: (productId: number) => void;
}

/**
 * Карточка продукта дизайна для вышивки
 */
const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);

  /**
   * Обработчик переключения состояния избранного
   */
  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  /**
   * Обработчик добавления в корзину
   */
  const handleAddToCart = () => {
    onAddToCart(product.id);
  };

  return (
    <Dialog>
      <Card className="group overflow-hidden hover:shadow-md transition-shadow duration-300 border-gray-200 flex flex-col">
        {/* Изображение продукта */}
        <ProductImage
          imageUrl={product.image}
          title={product.title}
          onToggleFavorite={toggleFavorite}
          isFavorite={isFavorite}
        />

        <CardContent className="p-4 flex-grow flex flex-col">
          <div className="flex-grow">
            <div className="flex justify-between items-start mb-1">
              <h3 className="font-medium text-lg text-gray-800 line-clamp-1">
                {product.title}
              </h3>
              <Button
                size="icon"
                variant="ghost"
                className="h-7 w-7 text-gray-400 hover:text-russian-blue -mr-2 -mt-1"
                onClick={toggleFavorite}
              >
                <Icon
                  name="Heart"
                  size={18}
                  className={isFavorite ? "fill-red-500 text-red-500" : ""}
                />
              </Button>
            </div>

            <p className="text-sm text-gray-500 mb-3">{product.category}</p>

            {/* Добавляем компонент с описанием */}
            {product.description && (
              <ProductDescription description={product.description} />
            )}

            {/* Блок с характеристиками продукта */}
            <ProductCharacteristics product={product} />

            {/* Лицензия автора - добавляем наш новый компонент */}
            <ProductLicense />
          </div>

          {/* Блок действий с продуктом */}
          <ProductActions
            price={product.price}
            isFavorite={isFavorite}
            onToggleFavorite={toggleFavorite}
            onAddToCart={handleAddToCart}
          />
        </CardContent>

        {/* Диалоговое окно с подробной информацией о продукте */}
        <ProductDetailsDialog product={product} onAddToCart={handleAddToCart} />

        {/* Диалоговое окно с полными характеристиками */}
        <ProductDetailFull product={product} onAddToCart={handleAddToCart} />
      </Card>
    </Dialog>
  );
};

export default ProductCard;
