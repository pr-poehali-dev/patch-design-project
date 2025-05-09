
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Icon from "@/components/ui/icon";

interface CartSummaryProps {
  subtotal: number;
  discount: number;
  total: number;
  promoCode: string;
  promoError: string;
  promoApplied: boolean;
  setPromoCode: (value: string) => void;
  applyPromoCode: () => void;
  proceedToCheckout: () => void;
}

/**
 * Компонент сводки заказа в корзине
 */
const CartSummary = ({
  subtotal,
  discount,
  total,
  promoCode,
  promoError,
  promoApplied,
  setPromoCode,
  applyPromoCode,
  proceedToCheckout,
}: CartSummaryProps) => {
  return (
    <div>
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
                <span>Скидка (15%)</span>
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
  );
};

export default CartSummary;
