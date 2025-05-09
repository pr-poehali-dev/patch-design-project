
import React from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { DialogTrigger } from "@/components/ui/dialog";

interface ProductImageProps {
  imageUrl: string;
  title: string;
  onToggleFavorite: (e: React.MouseEvent) => void;
  isFavorite: boolean;
}

/**
 * Компонент для отображения изображения продукта с наложением действий
 */
const ProductImage = ({ imageUrl, title, onToggleFavorite, isFavorite }: ProductImageProps) => {
  return (
    <div className="relative overflow-hidden">
      {/* Image container with fixed aspect ratio */}
      <div className="relative pt-[100%]">
        <img
          src={imageUrl}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Overlay with actions */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div className="flex gap-2">
            <DialogTrigger asChild>
              <Button
                size="icon"
                variant="secondary"
                className="rounded-full bg-white hover:bg-white/90 text-gray-800"
                onClick={(e) => e.stopPropagation()}
              >
                <Icon name="Eye" size={18} />
              </Button>
            </DialogTrigger>
            
            <Button
              size="icon"
              variant="secondary"
              className="rounded-full bg-white hover:bg-white/90 text-gray-800"
              onClick={onToggleFavorite}
            >
              <Icon 
                name="Heart" 
                size={18} 
                className={isFavorite ? "fill-red-500 text-red-500" : ""}
              />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductImage;
