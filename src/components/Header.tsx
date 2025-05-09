import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link } from "react-router-dom";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CATEGORIES } from "@/data/products";
import { ChevronDown } from "lucide-react";

interface HeaderProps {
  cartItemsCount: number;
}

const Header = ({ cartItemsCount }: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  // Проверяем статус авторизации при загрузке
  useEffect(() => {
    try {
      const currentUserStr = localStorage.getItem("currentUser");
      if (currentUserStr) {
        const currentUser = JSON.parse(currentUserStr);
        if (currentUser.isLoggedIn) {
          setIsLoggedIn(true);
          setUserName(currentUser.name);
        }
      }
    } catch (error) {
      console.error("Ошибка при проверке статуса авторизации:", error);
    }
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                ЭМБРОТЕКА
              </span>
            </Link>
            <nav className="ml-10 hidden md:flex space-x-6">
              <Popover>
                <PopoverTrigger asChild>
                  <button className="text-gray-700 hover:text-purple-600 font-medium flex items-center">
                    Каталог
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-64 p-0 max-h-[400px] overflow-y-auto">
                  <div className="py-2">
                    {CATEGORIES.filter((cat) => cat !== "Все").map(
                      (category) => (
                        <Link
                          key={category}
                          to="/"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600"
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
                className="text-gray-700 hover:text-purple-600 font-medium"
              >
                Форматы файлов
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-purple-600 font-medium"
              >
                Как заказать
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-purple-600 font-medium"
              >
                Контакты
              </a>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-purple-50"
                aria-label="Поиск"
              >
                <Icon name="Search" className="h-5 w-5 text-gray-700" />
              </Button>

              {isLoggedIn ? (
                <Link to="/account">
                  <Button
                    variant="ghost"
                    className="rounded-full hover:bg-purple-50 flex items-center gap-2"
                    aria-label="Личный кабинет"
                  >
                    <Icon name="User" className="h-5 w-5 text-gray-700" />
                    <span className="hidden lg:inline-block text-gray-700">
                      {userName}
                    </span>
                  </Button>
                </Link>
              ) : (
                <Link to="/auth">
                  <Button
                    variant="ghost"
                    className="rounded-full hover:bg-purple-50 flex items-center gap-2"
                    aria-label="Войти"
                  >
                    <Icon name="LogIn" className="h-5 w-5 text-gray-700" />
                    <span className="hidden lg:inline-block text-gray-700">
                      Войти
                    </span>
                  </Button>
                </Link>
              )}

              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-purple-50"
                aria-label="Избранное"
              >
                <Icon name="Heart" className="h-5 w-5 text-gray-700" />
              </Button>

              <Link to="/cart">
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative rounded-full hover:bg-purple-50"
                  aria-label="Корзина"
                >
                  <Icon name="ShoppingBag" className="h-5 w-5 text-gray-700" />
                  {cartItemsCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartItemsCount}
                    </span>
                  )}
                </Button>
              </Link>
            </div>

            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden rounded-full hover:bg-purple-50"
                >
                  <Icon name="Menu" className="h-5 w-5 text-gray-700" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] p-0">
                <div className="flex flex-col h-full">
                  <div className="p-4 border-b">
                    <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                      ЭМБРОТЕКА
                    </span>
                  </div>
                  <nav className="flex flex-col p-4 space-y-1">
                    <div className="pb-2 mb-2 border-b">
                      <p className="text-sm font-medium text-gray-500 mb-2">
                        Категории
                      </p>
                      {CATEGORIES.filter((cat) => cat !== "Все").map(
                        (category) => (
                          <a
                            key={category}
                            href="#"
                            className="block py-2 text-gray-700 hover:text-purple-600 font-medium"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {category}
                          </a>
                        ),
                      )}
                    </div>

                    <a
                      href="#"
                      className="text-gray-700 hover:text-purple-600 font-medium py-2"
                    >
                      Форматы файлов
                    </a>
                    <a
                      href="#"
                      className="text-gray-700 hover:text-purple-600 font-medium py-2"
                    >
                      Как заказать
                    </a>
                    <a
                      href="#"
                      className="text-gray-700 hover:text-purple-600 font-medium py-2"
                    >
                      Контакты
                    </a>

                    {isLoggedIn ? (
                      <Link
                        to="/account"
                        className="text-gray-700 hover:text-purple-600 font-medium flex items-center gap-2 py-2"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Icon name="User" className="h-5 w-5" />
                        Личный кабинет
                      </Link>
                    ) : (
                      <Link
                        to="/auth"
                        className="text-gray-700 hover:text-purple-600 font-medium flex items-center gap-2 py-2"
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
                      className="rounded-full hover:bg-purple-50"
                      aria-label="Поиск"
                    >
                      <Icon name="Search" className="h-5 w-5 text-gray-700" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full hover:bg-purple-50"
                      aria-label="Избранное"
                    >
                      <Icon name="Heart" className="h-5 w-5 text-gray-700" />
                    </Button>
                    <Link to="/cart" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="relative rounded-full hover:bg-purple-50"
                        aria-label="Корзина"
                      >
                        <Icon
                          name="ShoppingBag"
                          className="h-5 w-5 text-gray-700"
                        />
                        {cartItemsCount > 0 && (
                          <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                            {cartItemsCount}
                          </span>
                        )}
                      </Button>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
