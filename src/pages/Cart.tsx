import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CATEGORIES } from "@/data/products";

// Импортируем компоненты
import CartEmpty from "@/components/cart/CartEmpty";
import CartLoading from "@/components/cart/CartLoading";
import CartItemsList from "@/components/cart/CartItemsList";
import CartSummary from "@/components/cart/CartSummary";

// Импортируем хук для логики корзины
import { useCart } from "@/hooks/useCart";

/**
 * Страница корзины с товарами
 */
const Cart = () => {
  const {
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
    proceedToCheckout,
  } = useCart();

  return (
    <div className="flex flex-col min-h-screen">
      <Header
        cartItemsCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
      />

      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Корзина</h1>

        {isLoading ? (
          <CartLoading />
        ) : cartItems.length === 0 ? (
          <CartEmpty />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Список товаров */}
            <div className="lg:col-span-2">
              <CartItemsList
                cartItems={cartItems}
                updateQuantity={updateQuantity}
                removeItem={removeItem}
              />
            </div>

            {/* Сводка заказа */}
            <div className="lg:col-span-1">
              <CartSummary
                subtotal={subtotal}
                discount={discount}
                total={total}
                promoCode={promoCode}
                promoError={promoError}
                promoApplied={promoApplied}
                setPromoCode={setPromoCode}
                applyPromoCode={applyPromoCode}
                proceedToCheckout={proceedToCheckout}
              />
            </div>
          </div>
        )}
      </main>

      <Footer categories={CATEGORIES} />
    </div>
  );
};

export default Cart;
