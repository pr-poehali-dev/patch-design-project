
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PRODUCTS } from '@/data/products';

export interface CartItem {
  product: (typeof PRODUCTS)[0];
  quantity: number;
}

/**
 * Хук для управления состоянием корзины
 */
export const useCart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const validPromoCodes = ["NEW15", "WELCOME10"]; // Действительные промокоды
  const promoDiscount = 15; // Скидка 15%

  // Получение товаров из localStorage
  useEffect(() => {
    const loadCart = () => {
      try {
        const storedCart = localStorage.getItem("cart");
        if (storedCart) {
          const parsedCart = JSON.parse(storedCart);

          // Преобразование ID товаров в полные объекты товаров
          const cartWithProducts = parsedCart.map(
            (item: { id: number; quantity: number }) => ({
              product: PRODUCTS.find((p) => p.id === item.id) || PRODUCTS[0],
              quantity: item.quantity,
            }),
          );

          setCartItems(cartWithProducts);
        }
      } catch (error) {
        console.error("Ошибка при загрузке корзины:", error);
      } finally {
        setIsLoading(false);
      }
    };

    // Имитация загрузки данных
    setTimeout(loadCart, 500);

    // Если в localStorage нет данных, добавим тестовые товары для демонстрации
    if (!localStorage.getItem("cart")) {
      // Добавляем 2 случайных товара для демонстрации
      const demoItems = [
        { id: 1, quantity: 1 },
        { id: 5, quantity: 1 },
      ];
      localStorage.setItem("cart", JSON.stringify(demoItems));
    }
  }, []);

  // Обновление количества товаров
  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) return;

    const updatedCart = cartItems.map((item) =>
      item.product.id === productId ? { ...item, quantity: newQuantity } : item,
    );

    setCartItems(updatedCart);

    // Обновление localStorage
    const simplifiedCart = updatedCart.map((item) => ({
      id: item.product.id,
      quantity: item.quantity,
    }));
    localStorage.setItem("cart", JSON.stringify(simplifiedCart));
  };

  // Удаление товара из корзины
  const removeItem = (productId: number) => {
    const updatedCart = cartItems.filter(
      (item) => item.product.id !== productId,
    );
    setCartItems(updatedCart);

    // Обновление localStorage
    const simplifiedCart = updatedCart.map((item) => ({
      id: item.product.id,
      quantity: item.quantity,
    }));
    localStorage.setItem("cart", JSON.stringify(simplifiedCart));
  };

  // Применение промокода
  const applyPromoCode = () => {
    if (validPromoCodes.includes(promoCode.trim())) {
      setPromoApplied(true);
      setPromoError("");
    } else {
      setPromoError("Неверный промокод");
      setPromoApplied(false);
    }
  };

  // Расчет суммы
  const subtotal = cartItems.reduce((sum, item) => {
    return sum + item.product.price * item.quantity;
  }, 0);

  const discount = promoApplied
    ? Math.round(subtotal * (promoDiscount / 100))
    : 0;
  const total = subtotal - discount;

  // Переход к оформлению заказа
  const proceedToCheckout = () => {
    navigate("/checkout");
  };

  return {
    cartItems,
    isLoading,
    promoCode,
    setPromoCode,
    promoApplied,
    promoError,
    subtotal,
    discount,
    total,
    updateQuantity,
    removeItem,
    applyPromoCode,
    proceedToCheckout
  };
};
