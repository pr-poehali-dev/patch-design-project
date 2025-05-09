import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Product } from "@/types/product";
import Icon from "@/components/ui/icon";
import { Link } from "react-router-dom";

interface ProductCardProps {
  product: Product;
  onAddToCart: (productId: number) => void;
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  return (
    <Card className="group overflow-hidden hover:shadow-md transition-shadow duration-300 border-gray-200">
      <div className="relative overflow-hidden">
        {/* Image container with fixed aspect ratio */}
        <div className="relative pt-[100%]">
          <img
            src={product.image}
            alt={product.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {/* Overlay with actions */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
            <div className="flex gap-2">
              <Button
                size="icon"
                variant="secondary"
                className="rounded-full bg-white hover:bg-white/90 text-gray-800"
                onClick={(e) => {
                  e.stopPropagation();
                  // Handle quick view
                }}
              >
                <Icon name="Eye" size={18} />
              </Button>
              <Button
                size="icon"
                variant="secondary"
                className="rounded-full bg-white hover:bg-white/90 text-gray-800"
                onClick={(e) => {
                  e.stopPropagation();
                  // Handle wishlist
                }}
              >
                <Icon name="Heart" size={18} />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <CardContent className="p-4">
        <div>
          <p className="text-sm text-gray-500 mb-1">{product.category}</p>
          <h3 className="font-medium text-lg text-gray-800 line-clamp-1">
            {product.title}
          </h3>
          <div className="mt-2 mb-3 flex items-center justify-between">
            <span className="text-purple-600 font-bold">{product.price} ₽</span>
            <div className="flex items-center text-sm text-gray-500">
              <Icon name="Download" size={14} className="mr-1" />
              <span>DST, PES, JEF</span>
            </div>
          </div>
          <Button
            className="w-full bg-purple-600 hover:bg-purple-700 mt-2"
            onClick={() => onAddToCart(product.id)}
          >
            В корзину
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
