
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

/**
 * Компонент с действиями на странице успешного заказа
 */
const OrderSuccessActions = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-center gap-4">
      <Link to="/account">
        <Button
          variant="outline"
          className="border-russian-blue text-russian-blue hover:bg-blue-50"
        >
          Мои заказы
        </Button>
      </Link>
      <Link to="/">
        <Button className="bg-russian-blue hover:bg-russian-blue/90">
          Вернуться в каталог
        </Button>
      </Link>
    </div>
  );
};

export default OrderSuccessActions;
