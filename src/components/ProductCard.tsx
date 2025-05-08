
import { 
  Card, 
  CardContent, 
  CardFooter 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
  onAddToCart: (productId: number) => void;
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative pb-[100%]">
        <img 
          src={product.image} 
          alt={product.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      <CardContent className="p-4">
        <h3 className="font-medium text-lg">{product.title}</h3>
        <div className="text-sm text-gray-500 mb-2">{product.category}</div>
        <div className="text-purple-600 font-bold">{product.price} ₽</div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between">
        <Button 
          variant="outline" 
          size="sm" 
          className="w-1/2"
        >
          Подробнее
        </Button>
        <Button 
          size="sm" 
          className="w-1/2 ml-2 bg-purple-600"
          onClick={() => onAddToCart(product.id)}
        >
          В корзину
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
