
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CATEGORIES } from '@/data/products';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

// Импортируем переиспользуемые компоненты
import ProfileSidebar from '@/components/account/ProfileSidebar';
import MyDesigns from '@/components/account/MyDesigns';
import OrderHistory, { Order } from '@/components/account/OrderHistory';

// Импортируем функции для демо-данных
import { createDemoOrders, createDemoDesigns, PurchasedDesign } from '@/utils/demoData';

// Тип пользователя
interface User {
  id: number;
  name: string;
  email: string;
  isLoggedIn: boolean;
  designs?: PurchasedDesign[];
  orders?: Order[];
}

/**
 * Страница личного кабинета пользователя
 */
const Account = () => {
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
  
  // Имитация скачивания дизайна
  const handleDownloadDesign = (design: PurchasedDesign) => {
    toast({
      title: "Загрузка дизайна",
      description: `Файл "${design.title}" начал загружаться`,
    });
    
    // В реальном приложении: window.location.href = design.downloadLink;
  };
  
  // Обработка повторного заказа
  const handleReorder = (order: Order) => {
    try {
      const storedCart = localStorage.getItem('cart') || '[]';
      let cart = JSON.parse(storedCart);
      
      // Добавляем товары из заказа
      for (const item of order.items) {
        const existingItemIndex = cart.findIndex((i: any) => i.id === item.id);
        
        if (existingItemIndex !== -1) {
          cart[existingItemIndex].quantity += item.quantity;
        } else {
          cart.push({ id: item.id, quantity: item.quantity });
        }
      }
      
      localStorage.setItem('cart', JSON.stringify(cart));
      
      toast({
        title: "Товары добавлены в корзину",
        description: "Вы можете оформить новый заказ",
      });
      
      navigate('/cart');
    } catch (error) {
      console.error('Ошибка при добавлении товаров в корзину:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось добавить товары в корзину",
        variant: "destructive"
      });
    }
  };
  
  // Форматирование даты
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  // Индикатор загрузки
  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header cartItemsCount={0} />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600 mb-4"></div>
            <p>Загрузка данных аккаунта...</p>
          </div>
        </div>
        <Footer categories={CATEGORIES} />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header cartItemsCount={0} />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Личный кабинет</h1>
          <Button 
            variant="outline" 
            className="border-red-600 text-red-600 hover:bg-red-50"
            onClick={handleLogout}
          >
            <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iY3VycmVudENvbG9yIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgY2xhc3M9Imx1Y2lkZSBsdWNpZGUtbG9nLW91dCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pZFlNaWQgbWVldCIgZGF0YS1mb3JtYXR0ZWQ9InRydWUiPjxwYXRoIGQ9Ik05IDIxSDVhMiAyIDAgMCAxLTItMlY1YTIgMiAwIDAgMSAyLTJoNCI+PC9wYXRoPjxwb2x5bGluZSBwb2ludHM9IjE2IDE3IDIxIDEyIDE2IDciPjwvcG9seWxpbmU+PGxpbmUgeDE9IjIxIiB5MT0iMTIiIHgyPSI5IiB5Mj0iMTIiPjwvbGluZT48L3N2Zz4=" className="mr-2 h-4 w-4" />
            Выйти
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Боковая панель профиля */}
          <Card className="h-fit">
            <CardContent className="p-0">
              {currentUser && (
                <ProfileSidebar
                  userName={currentUser.name}
                  userEmail={currentUser.email}
                />
              )}
            </CardContent>
          </Card>
          
          {/* Основной контент */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="designs">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="designs">Мои дизайны</TabsTrigger>
                <TabsTrigger value="orders">История заказов</TabsTrigger>
              </TabsList>
              
              {/* Вкладка с дизайнами */}
              <TabsContent value="designs">
                <Card>
                  <CardHeader>
                    <CardTitle>Купленные дизайны</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {currentUser && (
                      <MyDesigns 
                        designs={currentUser.designs || []}
                        onDownload={handleDownloadDesign}
                        formatDate={formatDate}
                      />
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Вкладка с заказами */}
              <TabsContent value="orders">
                <Card>
                  <CardHeader>
                    <CardTitle>История заказов</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {currentUser && (
                      <OrderHistory 
                        orders={currentUser.orders || []}
                        onReorder={handleReorder}
                        formatDate={formatDate}
                      />
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <Footer categories={CATEGORIES} />
    </div>
  );
};

export default Account;
