
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { createDemoOrders, createDemoDesigns, PurchasedDesign } from '@/utils/demoData';
import { Order } from '@/components/account/OrderHistory';

export interface User {
  id: number;
  name: string;
  email: string;
  isLoggedIn: boolean;
  designs?: PurchasedDesign[];
  orders?: Order[];
}

/**
 * Хук для получения и управления данными пользователя
 */
export const useUserData = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Загрузка данных пользователя
  useEffect(() => {
    const loadUserData = () => {
      try {
        // Проверяем авторизацию
        const userDataStr = localStorage.getItem('currentUser');
        if (!userDataStr) {
          navigate('/auth');
          return;
        }
        
        const userData = JSON.parse(userDataStr);
        
        // Получаем полные данные пользователя (с заказами и дизайнами)
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const fullUserData = users.find((u: any) => u.id === userData.id);
        
        if (!fullUserData) {
          // Если пользователь не найден, выходим
          localStorage.removeItem('currentUser');
          navigate('/auth');
          return;
        }
        
        // Установка данных пользователя
        setCurrentUser({
          ...userData,
          designs: fullUserData.designs || [],
          orders: fullUserData.orders || []
        });
        
        // Создаем демонстрационные данные, если их нет
        if (!fullUserData.orders || fullUserData.orders.length === 0) {
          const demoOrders = createDemoOrders(fullUserData.id);
          setCurrentUser(prev => prev ? {...prev, orders: demoOrders} : null);
        }
        
        if (!fullUserData.designs || fullUserData.designs.length === 0) {
          const demoDesigns = createDemoDesigns(fullUserData.id);
          setCurrentUser(prev => prev ? {...prev, designs: demoDesigns} : null);
        }
      } catch (error) {
        console.error('Ошибка при загрузке данных пользователя:', error);
        navigate('/auth');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadUserData();
  }, [navigate]);

  // Обработчик выхода из аккаунта
  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    toast({
      title: "Выход выполнен",
      description: "Вы успешно вышли из аккаунта",
    });
    navigate('/');
  };

  return {
    currentUser,
    isLoading,
    handleLogout
  };
};
