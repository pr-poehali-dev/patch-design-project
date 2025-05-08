
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface HeaderProps {
  cartItemsCount: number;
}

const Header = ({ cartItemsCount }: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <a href="/" className="flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">ЭМБРОТЕКА</span>
            </a>
            <nav className="ml-10 hidden md:flex space-x-6">
              <a href="#" className="text-gray-700 hover:text-purple-600 font-medium">Каталог</a>
              <a href="#" className="text-gray-700 hover:text-purple-600 font-medium">Форматы файлов</a>
              <a href="#" className="text-gray-700 hover:text-purple-600 font-medium">Как заказать</a>
              <a href="#" className="text-gray-700 hover:text-purple-600 font-medium">Контакты</a>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2">
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-purple-50" aria-label="Поиск">
                <Icon name="Search" className="h-5 w-5 text-gray-700" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-purple-50" aria-label="Избранное">
                <Icon name="Heart" className="h-5 w-5 text-gray-700" />
              </Button>
              <Button variant="ghost" size="icon" className="relative rounded-full hover:bg-purple-50" aria-label="Корзина">
                <Icon name="ShoppingBag" className="h-5 w-5 text-gray-700" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </Button>
            </div>

            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden rounded-full hover:bg-purple-50">
                  <Icon name="Menu" className="h-5 w-5 text-gray-700" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[250px] p-0">
                <div className="flex flex-col h-full">
                  <div className="p-4 border-b">
                    <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">ЭМБРОТЕКА</span>
                  </div>
                  <nav className="flex flex-col p-4 space-y-4">
                    <a href="#" className="text-gray-700 hover:text-purple-600 font-medium">Каталог</a>
                    <a href="#" className="text-gray-700 hover:text-purple-600 font-medium">Форматы файлов</a>
                    <a href="#" className="text-gray-700 hover:text-purple-600 font-medium">Как заказать</a>
                    <a href="#" className="text-gray-700 hover:text-purple-600 font-medium">Контакты</a>
                  </nav>
                  <div className="mt-auto p-4 border-t flex space-x-4">
                    <Button variant="ghost" size="icon" className="rounded-full hover:bg-purple-50" aria-label="Поиск">
                      <Icon name="Search" className="h-5 w-5 text-gray-700" />
                    </Button>
                    <Button variant="ghost" size="icon" className="rounded-full hover:bg-purple-50" aria-label="Избранное">
                      <Icon name="Heart" className="h-5 w-5 text-gray-700" />
                    </Button>
                    <Button variant="ghost" size="icon" className="relative rounded-full hover:bg-purple-50" aria-label="Корзина">
                      <Icon name="ShoppingBag" className="h-5 w-5 text-gray-700" />
                      {cartItemsCount > 0 && (
                        <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                          {cartItemsCount}
                        </span>
                      )}
                    </Button>
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
