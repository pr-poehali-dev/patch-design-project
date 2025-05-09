
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { SheetContent } from "@/components/ui/sheet";

interface MobileMenuProps {
  categories: string[];
  isLoggedIn: boolean;
  cartItemsCount: number;
  userName: string;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
}

/**
 * Компонент мобильного меню хедера
 */
const MobileMenu = ({
  categories,
  isLoggedIn,
  cartItemsCount,
  userName,
  setIsMobileMenuOpen,
}: MobileMenuProps) => {
  return (
    <SheetContent side="right" className="w-[300px] p-0">
      <div className="flex flex-col h-full">
        <div className="p-4 border-b">
          <span className="text-xl font-bold bg-gradient-to-r from-russian-blue to-russian-red bg-clip-text text-transparent">
            ЭМБРОТЕКА
          </span>
        </div>
        <nav className="flex flex-col p-4 space-y-1">
          <div className="pb-2 mb-2 border-b">
            <p className="text-sm font-medium text-gray-500 mb-2">
              Категории
            </p>
            {categories.filter((cat) => cat !== "Все").map(
              (category) => (
                <a
                  key={category}
                  href="#"
                  className="block py-2 text-gray-700 hover:text-russian-blue font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {category}
                </a>
              ),
            )}
          </div>

          <a
            href="#"
            className="text-gray-700 hover:text-russian-blue font-medium py-2"
          >
            Форматы файлов
          </a>
          <a
            href="#"
            className="text-gray-700 hover:text-russian-blue font-medium py-2"
          >
            Как заказать
          </a>
          <a
            href="#"
            className="text-gray-700 hover:text-russian-blue font-medium py-2"
          >
            Контакты
          </a>

          {isLoggedIn ? (
            <Link
              to="/account"
              className="text-gray-700 hover:text-russian-blue font-medium flex items-center gap-2 py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Icon name="User" className="h-5 w-5" />
              Личный кабинет
            </Link>
          ) : (
            <Link
              to="/auth"
              className="text-gray-700 hover:text-russian-blue font-medium flex items-center gap-2 py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Icon name="LogIn" className="h-5 w-5" />
              Войти
            </Link>
          )}
        </nav>
        <div className="mt-auto p-4 border-t flex justify-around">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full hover:bg-blue-50"
            aria-label="Поиск"
          >
            <Icon name="Search" className="h-5 w-5 text-gray-700" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full hover:bg-blue-50"
            aria-label="Избранное"
          >
            <Icon name="Heart" className="h-5 w-5 text-gray-700" />
          </Button>
          <Link to="/cart" onClick={() => setIsMobileMenuOpen(false)}>
            <Button
              variant="ghost"
              size="icon"
              className="relative rounded-full hover:bg-blue-50"
              aria-label="Корзина"
            >
              <Icon
                name="ShoppingBag"
                className="h-5 w-5 text-gray-700"
              />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-russian-blue text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Button>
          </Link>
        </div>
      </div>
    </SheetContent>
  );
};

export default MobileMenu;
