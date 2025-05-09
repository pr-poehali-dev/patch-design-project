import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CATEGORIES } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import Icon from "@/components/ui/icon";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useToast } from "@/components/ui/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Имитация данных для отображения сводки заказа
const getSummaryFromLocalStorage = () => {
  try {
    const storedCartString = localStorage.getItem("cart");
    if (!storedCartString) return { items: [], subtotal: 0, total: 0 };

    const storedCart = JSON.parse(storedCartString);
    // Здесь в реальном приложении мы бы загружали полные данные товаров с сервера
    // Для демонстрации используем фиксированные значения
    const subtotal = 648;
    const discount = 97;

    return {
      items: storedCart,
      subtotal,
      discount,
      total: subtotal - discount,
    };
  } catch (error) {
    console.error("Ошибка при загрузке данных корзины:", error);
    return { items: [], subtotal: 0, total: 0 };
  }
};

const Checkout = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeStep, setActiveStep] = useState<"delivery" | "payment">(
    "delivery",
  );
  const [isProcessing, setIsProcessing] = useState(false);
  const orderSummary = getSummaryFromLocalStorage();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");

  // Проверяем статус авторизации при загрузке
  useEffect(() => {
    try {
      const currentUserStr = localStorage.getItem("currentUser");
      if (currentUserStr) {
        const currentUser = JSON.parse(currentUserStr);
        if (currentUser.isLoggedIn) {
          setIsLoggedIn(true);
          setUserEmail(currentUser.email);
          setUserName(currentUser.name);

          // Предзаполняем форму данными пользователя
          setDeliveryForm((prev) => ({
            ...prev,
            firstName: currentUser.name.split(" ")[0] || "",
            lastName: currentUser.name.split(" ")[1] || "",
            email: currentUser.email,
          }));
        }
      }
    } catch (error) {
      console.error("Ошибка при проверке статуса авторизации:", error);
    }
  }, []);

  // Форма доставки
  const [deliveryForm, setDeliveryForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "Россия",
    city: "",
    address: "",
    postalCode: "",
    deliveryMethod: "digital",
    comment: "",
  });

  // Форма оплаты
  const [paymentForm, setPaymentForm] = useState({
    paymentMethod: "card",
    cardNumber: "",
    cardHolder: "",
    expiryDate: "",
    cvv: "",
    agreeToTerms: false,
  });

  // Обработчики изменения полей формы
  const handleDeliveryChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setDeliveryForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentForm((prev) => ({ ...prev, [name]: value }));
  };

  // Переход к оплате
  const proceedToPayment = () => {
    // Простая валидация формы доставки
    if (
      deliveryForm.email &&
      deliveryForm.firstName &&
      (deliveryForm.deliveryMethod === "digital" ||
        (deliveryForm.address && deliveryForm.city))
    ) {
      setActiveStep("payment");
    } else {
      toast({
        title: "Ошибка валидации",
        description: "Пожалуйста, заполните все обязательные поля",
        variant: "destructive",
      });
    }
  };

  // Отправка заказа
  const placeOrder = () => {
    // Проверяем согласие с условиями
    if (!paymentForm.agreeToTerms) {
      toast({
        title: "Необходимо согласие",
        description: "Пожалуйста, примите условия пользовательского соглашения",
        variant: "destructive",
      });
      return;
    }

    // Простая валидация для карты (если выбрана оплата картой)
    if (paymentForm.paymentMethod === "card") {
      if (
        !paymentForm.cardNumber ||
        !paymentForm.cardHolder ||
        !paymentForm.expiryDate ||
        !paymentForm.cvv
      ) {
        toast({
          title: "Ошибка валидации",
          description: "Пожалуйста, заполните все данные карты",
          variant: "destructive",
        });
        return;
      }
    }

    // Имитация отправки заказа
    setIsProcessing(true);

    // В реальном приложении здесь был бы API запрос на сервер для создания заказа
    setTimeout(() => {
      // В данном случае информацию о заказе мы сохраняем при переходе на страницу успешного заказа
      navigate("/order-success");
    }, 2000);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header cartItemsCount={0} />

      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">
          Оформление заказа
        </h1>

        {!isLoggedIn && (
          <Alert className="mb-6 bg-purple-50 border-purple-200">
            <Icon name="User" className="h-4 w-4 text-purple-600" />
            <div className="flex justify-between w-full items-start">
              <AlertDescription className="text-purple-800">
                У вас уже есть аккаунт?{" "}
                <Link
                  to="/auth"
                  className="text-russian-blue font-medium underline"
                >
                  Войдите
                </Link>
                , чтобы ускорить оформление заказа и получить доступ к истории
                заказов и файлам в личном кабинете.
              </AlertDescription>
            </div>
          </Alert>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Основная форма */}
          <div className="lg:col-span-2">
            {/* Шаги оформления */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-8">
              <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                <div className="flex items-center">
                  <div
                    className={`flex items-center justify-center w-8 h-8 rounded-full ${activeStep === "delivery" ? "bg-purple-600 text-white" : "bg-gray-200"} mr-2`}
                  >
                    1
                  </div>
                  <h2 className="font-medium text-gray-800">Доставка</h2>

                  <div className="mx-4 flex-grow border-t border-gray-300"></div>

                  <div
                    className={`flex items-center justify-center w-8 h-8 rounded-full ${activeStep === "payment" ? "bg-purple-600 text-white" : "bg-gray-200"} mr-2`}
                  >
                    2
                  </div>
                  <h2 className="font-medium text-gray-800">Оплата</h2>
                </div>
              </div>

              {/* Сводка заказа */}
              <div className="p-6">
                <Accordion type="single" collapsible className="mb-4">
                  <AccordionItem value="items">
                    <AccordionTrigger className="text-sm">
                      Товары в заказе ({orderSummary.items.length})
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li className="flex justify-between">
                          <span>Тигр винтажный</span>
                          <span>299 ₽</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Самолёт контурный</span>
                          <span>349 ₽</span>
                        </li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Подытог</span>
                    <span>{orderSummary.subtotal} ₽</span>
                  </div>

                  <div className="flex justify-between text-sm text-green-600">
                    <span>Скидка (промокод NEW15)</span>
                    <span>-{orderSummary.discount} ₽</span>
                  </div>

                  {deliveryForm.deliveryMethod === "physical" && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Доставка</span>
                      <span>299 ₽</span>
                    </div>
                  )}

                  <Separator />

                  <div className="flex justify-between font-bold">
                    <span>Итого</span>
                    <span>
                      {orderSummary.total +
                        (deliveryForm.deliveryMethod === "physical"
                          ? 299
                          : 0)}{" "}
                      ₽
                    </span>
                  </div>
                </div>

                <div className="rounded-md bg-green-50 p-3 text-sm text-green-800 mb-4">
                  <div className="flex">
                    <Icon
                      name="ShieldCheck"
                      className="h-5 w-5 text-green-500 mr-2 flex-shrink-0"
                    />
                    <p>Безопасная оплата через защищенное соединение</p>
                  </div>
                </div>

                <p className="text-xs text-gray-500">
                  После оплаты вы сразу получите доступ к вашим дизайнам через
                  электронную почту и личный кабинет
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">{/* Основная форма */}</div>
        </div>
      </main>

      <Footer categories={CATEGORIES} />
    </div>
  );
};

export default Checkout;
