
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CATEGORIES } from "@/data/products";

// Импортируем компоненты
import OrderSuccessHeader from "@/components/order/OrderSuccessHeader";
import OrderDetails from "@/components/order/OrderDetails";
import EmailConfirmation from "@/components/order/EmailConfirmation";
import OrderSuccessActions from "@/components/order/OrderSuccessActions";

// Импортируем хук для логики страницы
import { useOrderSuccess } from "@/hooks/useOrderSuccess";

/**
 * Страница успешного оформления заказа
 */
const OrderSuccess = () => {
  // Получаем данные из хука
  const { orderNumber, userEmail, orderDate } = useOrderSuccess();

  return (
    <div className="flex flex-col min-h-screen">
      <Header cartItemsCount={0} />

      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Заголовок страницы */}
          <OrderSuccessHeader />

          {/* Информация о заказе */}
          <OrderDetails orderNumber={orderNumber} orderDate={orderDate} />

          {/* Информация об email-подтверждении */}
          <EmailConfirmation email={userEmail} />

          {/* Кнопки действий */}
          <OrderSuccessActions />
        </div>
      </main>

      <Footer categories={CATEGORIES} />
    </div>
  );
};

export default OrderSuccess;
