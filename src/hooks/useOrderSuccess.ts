
import { useState, useEffect } from "react";

interface UseOrderSuccessResult {
  orderNumber: string;
  userEmail: string;
  orderDate: string;
}

/**
 * Хук для обработки логики страницы успешного заказа
 */
export const useOrderSuccess = (): UseOrderSuccessResult => {
  // Генерация случайного номера заказа
  const orderNumber = React.useMemo(() => {
    return `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
  }, []);

  // Получаем данные о пользователе
  const [userEmail, setUserEmail] = useState("");
  const orderDate = new Date().toLocaleDateString();

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

  return {
    orderNumber,
    userEmail,
    orderDate
  };
};
