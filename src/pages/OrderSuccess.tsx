import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CATEGORIES } from "@/data/products";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { Separator } from "@/components/ui/separator";

const OrderSuccess = () => {
  const navigate = useNavigate();

  // Генерация случайного номера заказа
  const orderNumber = React.useMemo(() => {
    return `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
  }, []);

  // Получаем данные о пользователе
  const [userEmail, setUserEmail] = React.useState("");

  useEffect(() => {
    // Проверяем, авторизован ли пользователь
    try {
      const userDataStr = localStorage.getItem("currentUser");
      if (userDataStr) {
        const userData = JSON.parse(userDataStr);
        setUserEmail(userData.email);
      }
    } catch (error) {
      console.error("Ошибка при получении данных пользователя:", error);
    }

    // Добавляем заказ в историю (для авторизованных пользователей)
    try {
      const userDataStr = localStorage.getItem("currentUser");
      if (userDataStr) {
        const userData = JSON.parse(userDataStr);
        if (userData.isLoggedIn) {
          const storedCartStr = localStorage.getItem("cart");
          if (storedCartStr) {
            const storedCart = JSON.parse(storedCartStr);

            // Получаем список пользователей
            const users = JSON.parse(localStorage.getItem("users") || "[]");
            const userIndex = users.findIndex((u: any) => u.id === userData.id);

            if (userIndex !== -1) {
              // Создаем новый заказ
              const newOrder = {
                id: orderNumber,
                date: new Date().toISOString(),
                status: "completed",
                items: storedCart.map((item: any) => ({
                  id: item.id,
                  title: `Дизайн #${item.id}`,
                  price: Math.floor(Math.random() * 200) + 200, // Имитация цены
                  quantity: item.quantity,
                })),
                total: storedCart.reduce(
                  (sum: number, item: any) =>
                    sum +
                    (Math.floor(Math.random() * 200) + 200) * item.quantity,
                  0,
                ),
              };

              // Добавляем заказ в историю
              if (!users[userIndex].orders) {
                users[userIndex].orders = [];
              }
              users[userIndex].orders.unshift(newOrder);

              // Добавляем купленные дизайны
              if (!users[userIndex].designs) {
                users[userIndex].designs = [];
              }

              storedCart.forEach((item: any) => {
                const design = {
                  id: item.id,
                  title: `Дизайн #${item.id}`,
                  price: Math.floor(Math.random() * 200) + 200,
                  category: "Дизайн вышивки",
                  image: `https://source.unsplash.com/random/300x300?textile&sig=${item.id}`,
                  purchaseDate: new Date().toISOString(),
                  downloadLink: `/downloads/design_${item.id}.zip`,
                };

                // Проверяем, не куплен ли уже такой дизайн
                const designExists = users[userIndex].designs.some(
                  (d: any) => d.id === design.id,
                );
                if (!designExists) {
                  users[userIndex].designs.push(design);
                }
              });

              // Сохраняем обновленные данные
              localStorage.setItem("users", JSON.stringify(users));
            }
          }
        }
      }
    } catch (error) {
      console.error("Ошибка при сохранении заказа в историю:", error);
    }

    // Очищаем корзину после успешного заказа
    localStorage.removeItem("cart");

    // Имитация отправки данных в аналитику
    console.log("Order completed:", orderNumber);

    // В реальном приложении здесь был бы код для аналитики
    // и отправки email с подтверждением заказа
  }, [orderNumber]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header cartItemsCount={0} />

      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto text-center">
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
                <span>{new Date().toLocaleDateString()}</span>
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
                {userEmail || "example@mail.ru"}
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/account">
              <Button
                variant="outline"
                className="border-purple-600 text-purple-600 hover:bg-purple-50"
              >
                Мои заказы
              </Button>
            </Link>
            <Link to="/">
              <Button className="bg-purple-600 hover:bg-purple-700">
                Вернуться в каталог
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer categories={CATEGORIES} />
    </div>
  );
};

export default OrderSuccess;
