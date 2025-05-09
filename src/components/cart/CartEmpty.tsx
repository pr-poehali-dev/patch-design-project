
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

/**
 * Компонент для отображения пустой корзины
 */
const CartEmpty = () => {
  return (
    <div className="text-center py-16 bg-gray-50 rounded-lg">
      <Icon
        name="ShoppingBag"
        className="h-16 w-16 mx-auto text-gray-400 mb-4"
      />
      <h2 className="text-2xl font-medium text-gray-800 mb-2">
        Ваша корзина пуста
      </h2>
      <p className="text-gray-600 mb-6">
        Добавьте товары из каталога, чтобы сделать заказ
      </p>
      <Link to="/">
        <Button className="bg-russian-blue hover:bg-russian-blue/90">
          Перейти в каталог
        </Button>
      </Link>
    </div>
  );
};

export default CartEmpty;
