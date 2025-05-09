
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface UserActionsProps {
  isLoggedIn: boolean;
  userName: string;
  cartItemsCount: number;
}

/**
 * Компонент с действиями пользователя (поиск, профиль, избранное, корзина)
 */
const UserActions = ({ isLoggedIn, userName, cartItemsCount }: UserActionsProps) => {
  return (
    <div className="hidden md:flex items-center space-x-2">
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full hover:bg-blue-50"
        aria-label="Поиск"
      >
        <Icon name="Search" className="h-5 w-5 text-gray-700" />
      </Button>

      {isLoggedIn ? (
        <Link to="/account">
          <Button
            variant="ghost"
            className="rounded-full hover:bg-blue-50 flex items-center gap-2"
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
            className="rounded-full hover:bg-blue-50 flex items-center gap-2"
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
        className="rounded-full hover:bg-blue-50"
        aria-label="Избранное"
      >
        <Icon name="Heart" className="h-5 w-5 text-gray-700" />
      </Button>

      <Link to="/cart">
        <Button
          variant="ghost"
          size="icon"
          className="relative rounded-full hover:bg-blue-50"
          aria-label="Корзина"
        >
          <Icon name="ShoppingBag" className="h-5 w-5 text-gray-700" />
          {cartItemsCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-russian-blue text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {cartItemsCount}
            </span>
          )}
        </Button>
      </Link>
    </div>
  );
};

export default UserActions;
