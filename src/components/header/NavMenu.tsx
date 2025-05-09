
import React from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface NavMenuProps {
  categories: string[];
}

/**
 * Компонент навигационного меню хедера
 */
const NavMenu = ({ categories }: NavMenuProps) => {
  return (
    <nav className="ml-10 hidden md:flex space-x-6">
      <Popover>
        <PopoverTrigger asChild>
          <button className="text-gray-700 hover:text-russian-blue font-medium flex items-center">
            Каталог
            <ChevronDown className="ml-1 h-4 w-4" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-64 p-0 max-h-[400px] overflow-y-auto">
          <div className="py-2">
            {categories.filter((cat) => cat !== "Все").map(
              (category) => (
                <Link
                  key={category}
                  to="/"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-russian-blue"
                >
                  {category}
                </Link>
              ),
            )}
          </div>
        </PopoverContent>
      </Popover>
      <a
        href="#"
        className="text-gray-700 hover:text-russian-blue font-medium"
      >
        Форматы файлов
      </a>
      <a
        href="#"
        className="text-gray-700 hover:text-russian-blue font-medium"
      >
        Как заказать
      </a>
      <a
        href="#"
        className="text-gray-700 hover:text-russian-blue font-medium"
      >
        Контакты
      </a>
    </nav>
  );
};

export default NavMenu;
