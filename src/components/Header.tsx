
import React, { useState, useEffect } from "react";
import { Sheet } from "@/components/ui/sheet";
import { CATEGORIES } from "@/data/products";

// Импортируем подкомпоненты
import Logo from "@/components/header/Logo";
import NavMenu from "@/components/header/NavMenu";
import UserActions from "@/components/header/UserActions";
import MobileMenuToggle from "@/components/header/MobileMenuToggle";
import MobileMenu from "@/components/header/MobileMenu";

interface HeaderProps {
  cartItemsCount: number;
}

/**
 * Компонент хедера сайта, состоящий из логотипа, навигации и пользовательских действий
 */
const Header = ({ cartItemsCount }: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  // Получаем информацию о пользователе при загрузке компонента
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
            {/* Логотип */}
            <Logo />
            
            {/* Навигационное меню */}
            <NavMenu categories={CATEGORIES} />
          </div>

          <div className="flex items-center space-x-4">
            {/* Пользовательские действия (поиск, профиль, избранное, корзина) */}
            <UserActions 
              isLoggedIn={isLoggedIn} 
              userName={userName} 
              cartItemsCount={cartItemsCount} 
            />

            {/* Мобильное меню */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              {/* Кнопка открытия мобильного меню */}
              <MobileMenuToggle />
              
              {/* Содержимое мобильного меню */}
              <MobileMenu 
                categories={CATEGORIES}
                isLoggedIn={isLoggedIn}
                cartItemsCount={cartItemsCount}
                userName={userName}
                setIsMobileMenuOpen={setIsMobileMenuOpen}
              />
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
