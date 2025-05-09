
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Product } from "@/types/product";
import Icon from "@/components/ui/icon";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ProductCardProps {
  product: Product;
  onAddToCart: (productId: number) => void;
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  
  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };
  
  const formatsList = product.characteristics?.formats?.join(", ").toUpperCase();

  return (
    <Card className="group overflow-hidden hover:shadow-md transition-shadow duration-300 border-gray-200 flex flex-col">
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
              <Dialog>
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
                        <p className="text-2xl font-bold text-purple-600">{product.price} ₽</p>
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-2">
                        <h4 className="font-medium">Характеристики дизайна:</h4>
                        <ul className="space-y-1 text-sm">
                          <li className="flex justify-between">
                            <span className="text-gray-600">Размер:</span>
                            <span className="font-medium">{product.characteristics?.size} мм</span>
                          </li>
                          <li className="flex justify-between">
                            <span className="text-gray-600">Количество стежков:</span>
                            <span className="font-medium">{product.characteristics?.stitchCount?.toLocaleString()}</span>
                          </li>
                          <li className="flex justify-between">
                            <span className="text-gray-600">Количество цветов:</span>
                            <span className="font-medium">{product.characteristics?.colors}</span>
                          </li>
                          <li className="flex justify-between">
                            <span className="text-gray-600">Сложность:</span>
                            <span className="font-medium">{product.characteristics?.difficulty}</span>
                          </li>
                          <li className="flex justify-between">
                            <span className="text-gray-600">Форматы файлов:</span>
                            <span className="font-medium uppercase">{product.characteristics?.formats?.join(", ")}</span>
                          </li>
                        </ul>
                      </div>
                      
                      <Button 
                        className="w-full bg-purple-600 hover:bg-purple-700 mt-4"
                        onClick={() => onAddToCart(product.id)}
                      >
                        Добавить в корзину
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              
              <Button
                size="icon"
                variant="secondary"
                className="rounded-full bg-white hover:bg-white/90 text-gray-800"
                onClick={toggleFavorite}
              >
                <Icon 
                  name={isFavorite ? "Heart" : "Heart"} 
                  size={18} 
                  className={isFavorite ? "fill-red-500 text-red-500" : ""}
                />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <CardContent className="p-4 flex-grow flex flex-col">
        <div className="flex-grow">
          <div className="flex justify-between items-start mb-1">
            <h3 className="font-medium text-lg text-gray-800 line-clamp-1">
              {product.title}
            </h3>
            <Button
              size="icon"
              variant="ghost"
              className="h-7 w-7 text-gray-400 hover:text-purple-600 -mr-2 -mt-1"
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
          
          {/* Характеристики дизайна */}
          <div className="bg-gray-50 rounded-md p-2 mb-3 text-xs space-y-1">
            <div className="flex justify-between">
              <span className="text-gray-600">Размер дизайна:</span>
              <span className="font-medium">{product.characteristics?.size} мм</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Количество стежков:</span>
              <span className="font-medium">{product.characteristics?.stitchCount?.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Форматы файлов:</span>
              <span className="font-medium uppercase">{formatsList}</span>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <button className="text-purple-600 hover:underline text-xs w-full text-center mt-1">
                  Все характеристики
                </button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Характеристики дизайна "{product.title}"</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="bg-gray-50 p-3 rounded-md">
                      <h4 className="font-medium mb-2">Размер дизайна</h4>
                      <p className="text-xl font-bold">{product.characteristics?.size} мм</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-md">
                      <h4 className="font-medium mb-2">Количество стежков</h4>
                      <p className="text-xl font-bold">{product.characteristics?.stitchCount?.toLocaleString()}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-md">
                      <h4 className="font-medium mb-2">Количество цветов</h4>
                      <p className="text-xl font-bold">{product.characteristics?.colors}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-md">
                      <h4 className="font-medium mb-2">Сложность</h4>
                      <p className="text-xl font-bold">{product.characteristics?.difficulty}</p>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-3 rounded-md">
                    <h4 className="font-medium mb-2">Доступные форматы файлов</h4>
                    <div className="flex flex-wrap gap-2">
                      {product.characteristics?.formats?.map(format => (
                        <Badge key={format} variant="outline" className="text-sm uppercase">
                          {format}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                      Подходит для большинства моделей вышивальных машин: Brother, Janome, Husqvarna и других
                    </p>
                  </div>
                  
                  <div className="mt-4">
                    <Button
                      className="w-full bg-purple-600 hover:bg-purple-700"
                      onClick={() => onAddToCart(product.id)}
                    >
                      Добавить в корзину за {product.price} ₽
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        
        <div className="mt-auto">
          <div className="flex justify-between items-center">
            <span className="text-purple-600 font-bold text-lg">{product.price} ₽</span>
            <Button
              variant="outline"
              size="sm"
              className="rounded-full border-purple-600 text-purple-600 hover:bg-purple-50"
              onClick={toggleFavorite}
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
            className="w-full bg-purple-600 hover:bg-purple-700 mt-2"
            onClick={() => onAddToCart(product.id)}
          >
            Купить
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
