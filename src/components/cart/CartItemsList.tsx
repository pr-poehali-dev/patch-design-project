
import React from "react";
import Icon from "@/components/ui/icon";

interface CartItemType {
  product: {
    id: number;
    title: string;
    image: string;
    price: number;
    category: string;
  };
  quantity: number;
}

interface CartItemsListProps {
  cartItems: CartItemType[];
  updateQuantity: (productId: number, newQuantity: number) => void;
  removeItem: (productId: number) => void;
}

/**
 * Компонент для отображения списка товаров в корзине
 */
const CartItemsList = ({ cartItems, updateQuantity, removeItem }: CartItemsListProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
        <h2 className="font-medium text-gray-800">Товары в корзине</h2>
      </div>

      <div>
        {cartItems.map((item) => (
          <div
            key={item.product.id}
            className="p-6 border-b border-gray-200"
          >
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Изображение товара */}
              <div className="w-full sm:w-20 h-20 flex-shrink-0">
                <img
                  src={item.product.image}
                  alt={item.product.title}
                  className="w-full h-full object-cover rounded-md"
                />
              </div>

              {/* Информация о товаре */}
              <div className="flex-grow">
                <div className="flex flex-col sm:flex-row justify-between mb-2">
                  <h3 className="font-medium text-gray-800">
                    {item.product.title}
                  </h3>
                  <span className="font-medium text-purple-600">
                    {item.product.price} ₽
                  </span>
                </div>

                <p className="text-sm text-gray-500 mb-4">
                  Категория: {item.product.category}
                </p>

                <div className="flex justify-between items-center">
                  <div className="flex items-center border border-gray-300 rounded-md">
                    <button
                      className="px-3 py-1 border-r border-gray-300 hover:bg-gray-100"
                      onClick={() =>
                        updateQuantity(
                          item.product.id,
                          item.quantity - 1
                        )
                      }
                    >
                      -
                    </button>
                    <span className="px-4 py-1">{item.quantity}</span>
                    <button
                      className="px-3 py-1 border-l border-gray-300 hover:bg-gray-100"
                      onClick={() =>
                        updateQuantity(
                          item.product.id,
                          item.quantity + 1
                        )
                      }
                    >
                      +
                    </button>
                  </div>
                  <button
                    className="text-gray-500 hover:text-red-500"
                    onClick={() => removeItem(item.product.id)}
                  >
                    <Icon name="Trash2" size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartItemsList;
