
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface HeaderProps {
  cartItemsCount: number;
}

const Header = ({ cartItemsCount }: HeaderProps) => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-purple-600">НашивкиПро</h1>
          <nav className="ml-10 hidden md:flex space-x-6">
            <a href="#" className="text-gray-700 hover:text-purple-600">Каталог</a>
            <a href="#" className="text-gray-700 hover:text-purple-600">О нас</a>
            <a href="#" className="text-gray-700 hover:text-purple-600">Как заказать</a>
            <a href="#" className="text-gray-700 hover:text-purple-600">Контакты</a>
          </nav>
        </div>
        <div className="flex items-center">
          <Button variant="ghost" size="icon" className="relative">
            <Icon name="ShoppingCart" />
            {cartItemsCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartItemsCount}
              </span>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
