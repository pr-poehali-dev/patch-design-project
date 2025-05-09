
import React from "react";
import Icon from "@/components/ui/icon";

/**
 * Заголовок страницы успешного оформления заказа
 */
const OrderSuccessHeader = () => {
  return (
    <div className="text-center">
      <div className="flex justify-center mb-6">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
          <Icon name="CheckCheck" className="w-10 h-10 text-green-600" />
        </div>
      </div>

      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        Заказ успешно оформлен!
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        Спасибо за покупку. Ваш заказ был успешно оформлен и оплачен.
      </p>
    </div>
  );
};

export default OrderSuccessHeader;
