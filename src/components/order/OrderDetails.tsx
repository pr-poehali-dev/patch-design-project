
import React from "react";
import { Separator } from "@/components/ui/separator";
import Icon from "@/components/ui/icon";

interface OrderDetailsProps {
  orderNumber: string;
  orderDate: string;
}

/**
 * Компонент с деталями заказа
 */
const OrderDetails = ({ orderNumber, orderDate }: OrderDetailsProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-left mb-8">
      <h2 className="text-xl font-bold mb-4 text-gray-800">
        Информация о заказе
      </h2>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Номер заказа:</span>
          <span className="font-medium">{orderNumber}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-600">Дата заказа:</span>
          <span>{orderDate}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-600">Статус оплаты:</span>
          <span className="text-green-600 font-medium flex items-center">
            <Icon name="CheckCircle" className="w-4 h-4 mr-1" />
            Оплачено
          </span>
        </div>

        <Separator />

        <div className="flex justify-between items-center">
          <span className="text-gray-600">Товары:</span>
          <span>2 дизайна</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-600">Сумма:</span>
          <span className="font-bold">551 ₽</span>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
