
import React from "react";

/**
 * Компонент для отображения состояния загрузки корзины
 */
const CartLoading = () => {
  return (
    <div className="text-center py-16">
      <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600 mb-4"></div>
      <p>Загрузка корзины...</p>
    </div>
  );
};

export default CartLoading;
