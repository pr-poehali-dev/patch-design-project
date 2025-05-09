
import React from "react";
import Icon from "@/components/ui/icon";

interface EmailConfirmationProps {
  email: string;
}

/**
 * Компонент с информацией о подтверждении заказа по email
 */
const EmailConfirmation = ({ email }: EmailConfirmationProps) => {
  return (
    <div className="bg-blue-50 rounded-lg p-6 mb-8">
      <h2 className="text-lg font-bold mb-2 text-blue-800">
        Что дальше?
      </h2>
      <p className="text-blue-700 mb-4">
        Мы отправили подтверждение заказа и ссылки для скачивания на ваш
        email.
      </p>
      <div className="flex items-center justify-center gap-2 text-sm">
        <Icon name="Mail" className="w-4 h-4 text-blue-600" />
        <span className="text-blue-700">
          {email || "example@mail.ru"}
        </span>
      </div>
    </div>
  );
};

export default EmailConfirmation;
