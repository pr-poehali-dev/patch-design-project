import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { PRODUCTS, CATEGORIES } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Icon from "@/components/ui/icon";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface CartItem {
  product: (typeof PRODUCTS)[0];
  quantity: number;
}

const Cart = () => {
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

  return (
    <div className="flex flex-col min-h-screen">
      <Header
        cartItemsCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
      />

      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Корзина</h1>

        {isLoading ? (
          <div className="text-center py-16">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600 mb-4"></div>
            <p>Загрузка корзины...</p>
          </div>
        ) : cartItems.length === 0 ? (
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
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Список товаров */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                  <h2 className="font-medium text-gray-800">
                    Товары в корзине
                  </h2>
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
                                    item.quantity - 1,
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
                                    item.quantity + 1,
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
            </div>

            {/* Сводка заказа */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                  <h2 className="font-medium text-gray-800">Сводка заказа</h2>
                </div>

                <div className="p-6">
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Подытог</span>
                      <span>{subtotal} ₽</span>
                    </div>

                    {promoApplied && (
                      <div className="flex justify-between text-green-600">
                        <span>Скидка ({promoDiscount}%)</span>
                        <span>-{discount} ₽</span>
                      </div>
                    )}

                    <Separator />

                    <div className="flex justify-between font-bold">
                      <span>Итого</span>
                      <span>{total} ₽</span>
                    </div>
                  </div>

                  {/* Промокод */}
                  <div className="mb-6">
                    <h3 className="font-medium mb-2 text-gray-800">Промокод</h3>
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Введите промокод"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className="flex-grow"
                      />
                      <Button
                        variant="outline"
                        className="border-purple-600 text-purple-600 hover:bg-purple-50"
                        onClick={applyPromoCode}
                      >
                        Применить
                      </Button>
                    </div>
                    {promoError && (
                      <p className="text-red-500 text-sm mt-1">{promoError}</p>
                    )}
                    {promoApplied && (
                      <p className="text-green-600 text-sm mt-1">
                        Промокод успешно применен!
                      </p>
                    )}
                  </div>

                  <Button
                    className="w-full bg-russian-blue hover:bg-russian-blue/90"
                    onClick={proceedToCheckout}
                  >
                    Оформить заказ
                  </Button>

                  <div className="mt-4 text-center">
                    <Link
                      to="/"
                      className="text-purple-600 hover:text-purple-800 text-sm"
                    >
                      Продолжить покупки
                    </Link>
                  </div>
                </div>
              </div>

              <Alert className="mt-6 bg-purple-50 border-purple-200">
                <Icon name="Info" className="h-4 w-4 text-purple-600" />
                <AlertDescription className="text-purple-800">
                  Для демонстрации можно использовать промокод{" "}
                  <strong>NEW15</strong>
                </AlertDescription>
              </Alert>
            </div>
          </div>
        )}
      </main>

      <Footer categories={CATEGORIES} />
    </div>
  );
};

export default Cart;
