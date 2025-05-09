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

              {/* Форма доставки */}
              {activeStep === "delivery" && (
                <div className="p-6">
                  <div className="mb-6">
                    <h3 className="font-medium mb-4 text-gray-800">
                      Способ доставки
                    </h3>
                    <RadioGroup
                      defaultValue="digital"
                      value={deliveryForm.deliveryMethod}
                      onValueChange={(value) =>
                        setDeliveryForm((prev) => ({
                          ...prev,
                          deliveryMethod: value,
                        }))
                      }
                      className="space-y-3"
                    >
                      <div className="flex items-center space-x-3 rounded-md border p-4">
                        <RadioGroupItem value="digital" id="digital" />
                        <Label
                          htmlFor="digital"
                          className="flex-grow cursor-pointer"
                        >
                          <div className="font-medium">Цифровая доставка</div>
                          <div className="text-sm text-gray-500">
                            Получите файлы сразу после оплаты по электронной
                            почте
                          </div>
                        </Label>
                        <div className="text-purple-600 font-medium">
                          Бесплатно
                        </div>
                      </div>

                      <div className="flex items-center space-x-3 rounded-md border p-4">
                        <RadioGroupItem value="physical" id="physical" />
                        <Label
                          htmlFor="physical"
                          className="flex-grow cursor-pointer"
                        >
                          <div className="font-medium">Физическая доставка</div>
                          <div className="text-sm text-gray-500">
                            Получите карту памяти с файлами по почте
                          </div>
                        </Label>
                        <div className="text-purple-600 font-medium">
                          + 299 ₽
                        </div>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="mb-6">
                    <h3 className="font-medium mb-4 text-gray-800">
                      Контактная информация
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName" className="block mb-2">
                          Имя *
                        </Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          value={deliveryForm.firstName}
                          onChange={handleDeliveryChange}
                          placeholder="Иван"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName" className="block mb-2">
                          Фамилия *
                        </Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          value={deliveryForm.lastName}
                          onChange={handleDeliveryChange}
                          placeholder="Иванов"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email" className="block mb-2">
                          Email *
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={deliveryForm.email}
                          onChange={handleDeliveryChange}
                          placeholder="example@mail.ru"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone" className="block mb-2">
                          Телефон
                        </Label>
                        <Input
                          id="phone"
                          name="phone"
                          value={deliveryForm.phone}
                          onChange={handleDeliveryChange}
                          placeholder="+7 (___) ___-__-__"
                        />
                      </div>
                    </div>
                  </div>

                  {deliveryForm.deliveryMethod === "physical" && (
                    <div className="mb-6">
                      <h3 className="font-medium mb-4 text-gray-800">
                        Адрес доставки
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                          <Label htmlFor="country" className="block mb-2">
                            Страна *
                          </Label>
                          <Input
                            id="country"
                            name="country"
                            value={deliveryForm.country}
                            onChange={handleDeliveryChange}
                            placeholder="Страна"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="city" className="block mb-2">
                            Город *
                          </Label>
                          <Input
                            id="city"
                            name="city"
                            value={deliveryForm.city}
                            onChange={handleDeliveryChange}
                            placeholder="Город"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="postalCode" className="block mb-2">
                            Почтовый индекс *
                          </Label>
                          <Input
                            id="postalCode"
                            name="postalCode"
                            value={deliveryForm.postalCode}
                            onChange={handleDeliveryChange}
                            placeholder="Индекс"
                            required
                          />
                        </div>
                        <div className="md:col-span-2">
                          <Label htmlFor="address" className="block mb-2">
                            Адрес *
                          </Label>
                          <Input
                            id="address"
                            name="address"
                            value={deliveryForm.address}
                            onChange={handleDeliveryChange}
                            placeholder="Улица, дом, квартира"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="mb-6">
                    <Label htmlFor="comment" className="block mb-2">
                      Комментарий к заказу
                    </Label>
                    <Textarea
                      id="comment"
                      name="comment"
                      value={deliveryForm.comment}
                      onChange={handleDeliveryChange}
                      placeholder="Дополнительная информация по заказу"
                      className="min-h-[100px]"
                    />
                  </div>

                  <Button
                    className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700"
                    onClick={proceedToPayment}
                  >
                    Перейти к оплате
                  </Button>
                </div>
              )}

              {/* Форма оплаты */}
              {activeStep === "payment" && (
                <div className="p-6">
                  <div className="mb-6">
                    <h3 className="font-medium mb-4 text-gray-800">
                      Способ оплаты
                    </h3>
                    <RadioGroup
                      defaultValue="card"
                      value={paymentForm.paymentMethod}
                      onValueChange={(value) =>
                        setPaymentForm((prev) => ({
                          ...prev,
                          paymentMethod: value,
                        }))
                      }
                      className="space-y-3"
                    >
                      <div className="flex items-center space-x-3 rounded-md border p-4">
                        <RadioGroupItem value="card" id="card" />
                        <Label
                          htmlFor="card"
                          className="flex items-center flex-grow cursor-pointer"
                        >
                          <div className="font-medium">Банковская карта</div>
                          <div className="flex ml-auto space-x-2">
                            <img
                              src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/MasterCard_Logo.svg/200px-MasterCard_Logo.svg.png"
                              alt="MasterCard"
                              className="h-6"
                            />
                            <img
                              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/200px-Visa_Inc._logo.svg.png"
                              alt="Visa"
                              className="h-6"
                            />
                            <img
                              src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Mir-logo.svg/200px-Mir-logo.svg.png"
                              alt="Mir"
                              className="h-6"
                            />
                          </div>
                        </Label>
                      </div>

                      <div className="flex items-center space-x-3 rounded-md border p-4">
                        <RadioGroupItem value="sbp" id="sbp" />
                        <Label
                          htmlFor="sbp"
                          className="flex items-center flex-grow cursor-pointer"
                        >
                          <div className="font-medium">
                            Система быстрых платежей
                          </div>
                          <img
                            src="https://sbp.nspk.ru/media/logo/sbp-shorter-white.png"
                            alt="СБП"
                            className="h-6 ml-auto"
                          />
                        </Label>
                      </div>

                      <div className="flex items-center space-x-3 rounded-md border p-4">
                        <RadioGroupItem value="yoomoney" id="yoomoney" />
                        <Label
                          htmlFor="yoomoney"
                          className="flex items-center flex-grow cursor-pointer"
                        >
                          <div className="font-medium">ЮMoney</div>
                          <img
                            src="https://yoomoney.ru/i/html-letters/header__logo_theme_black.png"
                            alt="ЮMoney"
                            className="h-6 ml-auto"
                          />
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {paymentForm.paymentMethod === "card" && (
                    <div className="mb-6 border rounded-md p-4 bg-gray-50">
                      <h3 className="font-medium mb-4 text-gray-800">
                        Данные карты
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="cardNumber" className="block mb-2">
                            Номер карты *
                          </Label>
                          <Input
                            id="cardNumber"
                            name="cardNumber"
                            value={paymentForm.cardNumber}
                            onChange={handlePaymentChange}
                            placeholder="0000 0000 0000 0000"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="cardHolder" className="block mb-2">
                            Держатель карты *
                          </Label>
                          <Input
                            id="cardHolder"
                            name="cardHolder"
                            value={paymentForm.cardHolder}
                            onChange={handlePaymentChange}
                            placeholder="IVAN IVANOV"
                            required
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="expiryDate" className="block mb-2">
                              Срок действия *
                            </Label>
                            <Input
                              id="expiryDate"
                              name="expiryDate"
                              value={paymentForm.expiryDate}
                              onChange={handlePaymentChange}
                              placeholder="MM/YY"
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="cvv" className="block mb-2">
                              CVV *
                            </Label>
                            <Input
                              id="cvv"
                              name="cvv"
                              type="password"
                              value={paymentForm.cvv}
                              onChange={handlePaymentChange}
                              placeholder="***"
                              maxLength={3}
                              required
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentForm.paymentMethod === "sbp" && (
                    <div className="mb-6 border rounded-md p-4 text-center bg-gray-50">
                      <p className="mb-4 text-gray-600">
                        При нажатии на кнопку "Оплатить" вы будете
                        перенаправлены на страницу оплаты через СБП
                      </p>
                      <div className="mx-auto w-40 h-40 bg-white p-4 rounded-md flex items-center justify-center mb-4">
                        <img
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVDhAQBXKYNOPvLKCh2JnKycsNf2_FFnkJQqNyYXzyQA&s"
                          alt="QR-код СБП"
                          className="w-full h-full"
                        />
                      </div>
                      <p className="text-sm text-gray-500">
                        Это демонстрация. QR-код не функционирует.
                      </p>
                    </div>
                  )}

                  {paymentForm.paymentMethod === "yoomoney" && (
                    <div className="mb-6 border rounded-md p-4 text-center bg-gray-50">
                      <p className="mb-4 text-gray-600">
                        При нажатии на кнопку "Оплатить" вы будете
                        перенаправлены на сайт ЮMoney для завершения оплаты
                      </p>
                    </div>
                  )}

                  <div className="flex items-center mb-6">
                    <Checkbox
                      id="agreeToTerms"
                      checked={paymentForm.agreeToTerms}
                      onCheckedChange={(checked) =>
                        setPaymentForm((prev) => ({
                          ...prev,
                          agreeToTerms: checked as boolean,
                        }))
                      }
                    />
                    <Label
                      htmlFor="agreeToTerms"
                      className="ml-2 text-sm text-gray-600"
                    >
                      Я согласен с{" "}
                      <a href="#" className="text-purple-600 hover:underline">
                        условиями обработки персональных данных
                      </a>{" "}
                      и{" "}
                      <a href="#" className="text-purple-600 hover:underline">
                        пользовательским соглашением
                      </a>
                    </Label>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      variant="outline"
                      className="border-purple-600 text-purple-600 hover:bg-purple-50"
                      onClick={() => setActiveStep("delivery")}
                    >
                      Назад
                    </Button>
                    <Button
                      className="bg-purple-600 hover:bg-purple-700"
                      onClick={placeOrder}
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <>
                          <span className="animate-spin mr-2">◯</span>
                          Обработка...
                        </>
                      ) : (
                        <>Оплатить {orderSummary.total} ₽</>
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Сводка заказа */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                <h2 className="font-medium text-gray-800">Сводка заказа</h2>
              </div>

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
        </div>
      </main>

      <Footer categories={CATEGORIES} />
    </div>
  );
};

export default Checkout;
