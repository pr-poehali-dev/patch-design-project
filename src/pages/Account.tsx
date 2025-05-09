
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CATEGORIES } from '@/data/products';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/components/ui/use-toast';
import Icon from '@/components/ui/icon';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/types/product';
import { PRODUCTS } from '@/data/products';

// Расширяем тип Product для купленных дизайнов
interface PurchasedDesign extends Product {
  purchaseDate: string;
  downloadLink: string;
}

// Тип для заказа
interface Order {
  id: string;
  date: string;
  status: 'completed' | 'processing' | 'cancelled';
  items: {
    id: number;
    title: string;
    price: number;
    quantity: number;
  }[];
  total: number;
}

// Тип пользователя
interface User {
  id: number;
  name: string;
  email: string;
  isLoggedIn: boolean;
  designs?: PurchasedDesign[];
  orders?: Order[];
}

const Account = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Получаем данные текущего пользователя
  useEffect(() => {
    const loadUserData = () => {
      try {
        // Проверяем, авторизован ли пользователь
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
          // Если пользователь не найден в полном списке, выходим
          localStorage.removeItem('currentUser');
          navigate('/auth');
          return;
        }
        
        setCurrentUser({
          ...userData,
          designs: fullUserData.designs || [],
          orders: fullUserData.orders || []
        });
        
        // Если у пользователя нет заказов или дизайнов, создаем демонстрационные данные
        if (!fullUserData.orders || fullUserData.orders.length === 0) {
          createDemoOrders(fullUserData.id);
        }
        
        if (!fullUserData.designs || fullUserData.designs.length === 0) {
          createDemoDesigns(fullUserData.id);
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
  
  // Создание демонстрационных заказов для тестирования
  const createDemoOrders = (userId: number) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex((u: any) => u.id === userId);
    
    if (userIndex === -1) return;
    
    // Создаем 2 демонстрационных заказа
    const demoOrders: Order[] = [
      {
        id: 'ORD-' + Math.floor(100000 + Math.random() * 900000),
        date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 дней назад
        status: 'completed',
        items: [
          {
            id: 1,
            title: 'Тигр винтажный',
            price: 299,
            quantity: 1
          },
          {
            id: 5,
            title: 'Самолёт контурный',
            price: 349,
            quantity: 1
          }
        ],
        total: 648
      },
      {
        id: 'ORD-' + Math.floor(100000 + Math.random() * 900000),
        date: new Date().toISOString(), // Сегодня
        status: 'processing',
        items: [
          {
            id: 2,
            title: 'Роза классическая',
            price: 249,
            quantity: 1
          }
        ],
        total: 249
      }
    ];
    
    // Обновляем данные пользователя
    users[userIndex].orders = demoOrders;
    localStorage.setItem('users', JSON.stringify(users));
    
    // Обновляем состояние
    setCurrentUser(prev => {
      if (!prev) return null;
      return {
        ...prev,
        orders: demoOrders
      };
    });
  };
  
  // Создание демонстрационных купленных дизайнов
  const createDemoDesigns = (userId: number) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex((u: any) => u.id === userId);
    
    if (userIndex === -1) return;
    
    // Используем существующие продукты и добавляем к ним информацию о покупке
    const demoDesigns: PurchasedDesign[] = [
      {
        ...PRODUCTS[0],
        purchaseDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        downloadLink: '/downloads/tiger_vintage.zip'
      },
      {
        ...PRODUCTS[4],
        purchaseDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        downloadLink: '/downloads/airplane_contour.zip'
      },
      {
        ...PRODUCTS[1],
        purchaseDate: new Date().toISOString(),
        downloadLink: '/downloads/rose_classic.zip'
      }
    ];
    
    // Обновляем данные пользователя
    users[userIndex].designs = demoDesigns;
    localStorage.setItem('users', JSON.stringify(users));
    
    // Обновляем состояние
    setCurrentUser(prev => {
      if (!prev) return null;
      return {
        ...prev,
        designs: demoDesigns
      };
    });
  };
  
  // Выход из аккаунта
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
    
    // В реальном приложении здесь был бы код для скачивания файла
    // Например: window.location.href = design.downloadLink;
  };
  
  // Обработка повторного заказа
  const handleReorder = (order: Order) => {
    // Добавляем все товары из заказа в корзину
    try {
      const storedCart = localStorage.getItem('cart') || '[]';
      let cart = JSON.parse(storedCart);
      
      // Добавляем товары из заказа
      for (const item of order.items) {
        // Проверяем, есть ли товар уже в корзине
        const existingItemIndex = cart.findIndex((i: any) => i.id === item.id);
        
        if (existingItemIndex !== -1) {
          // Увеличиваем количество
          cart[existingItemIndex].quantity += item.quantity;
        } else {
          // Добавляем новый товар
          cart.push({
            id: item.id,
            quantity: item.quantity
          });
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

  // Если данные загружаются, показываем индикатор загрузки
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
            <Icon name="LogOut" className="mr-2 h-4 w-4" />
            Выйти
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Информация о пользователе */}
          <Card className="h-fit">
            <CardContent className="p-6">
              <div className="flex flex-col items-center">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src={null as any} alt={currentUser?.name} />
                  <AvatarFallback className="text-xl bg-purple-100 text-purple-700">
                    {currentUser?.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-semibold">{currentUser?.name}</h2>
                <p className="text-gray-500">{currentUser?.email}</p>
                
                <Separator className="my-4" />
                
                <nav className="w-full space-y-2">
                  <Button variant="ghost" className="w-full justify-start">
                    <Icon name="User" className="mr-2 h-4 w-4" />
                    Профиль
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <Icon name="ShoppingBag" className="mr-2 h-4 w-4" />
                    Заказы
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <Icon name="Download" className="mr-2 h-4 w-4" />
                    Мои дизайны
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <Icon name="Heart" className="mr-2 h-4 w-4" />
                    Избранное
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <Icon name="Settings" className="mr-2 h-4 w-4" />
                    Настройки
                  </Button>
                </nav>
              </div>
            </CardContent>
          </Card>
          
          {/* Основное содержимое */}
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
                    {currentUser?.designs && currentUser.designs.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {currentUser.designs.map((design) => (
                          <Card key={design.id} className="overflow-hidden">
                            <div className="aspect-square">
                              <img
                                src={design.image}
                                alt={design.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <CardContent className="p-4">
                              <h3 className="font-medium text-lg mb-1">{design.title}</h3>
                              <div className="flex justify-between items-center text-sm text-gray-500 mb-3">
                                <span>{design.category}</span>
                                <span>{formatDate(design.purchaseDate)}</span>
                              </div>
                              <Button 
                                className="w-full bg-purple-600 hover:bg-purple-700"
                                onClick={() => handleDownloadDesign(design)}
                              >
                                <Icon name="Download" className="mr-2 h-4 w-4" />
                                Скачать
                              </Button>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Icon name="Package" className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                        <h3 className="text-lg font-medium text-gray-800 mb-2">У вас пока нет купленных дизайнов</h3>
                        <p className="text-gray-600 mb-6">
                          Перейдите в каталог, чтобы выбрать и купить дизайны для вышивки
                        </p>
                        <Link to="/">
                          <Button className="bg-purple-600 hover:bg-purple-700">
                            Перейти в каталог
                          </Button>
                        </Link>
                      </div>
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
                    {currentUser?.orders && currentUser.orders.length > 0 ? (
                      <div className="space-y-6">
                        {currentUser.orders.map((order) => (
                          <Card key={order.id} className="overflow-hidden">
                            <CardHeader className="pb-2">
                              <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-2">
                                <div>
                                  <span className="text-sm text-gray-500">Заказ №</span>
                                  <span className="font-medium ml-2">{order.id}</span>
                                </div>
                                <div className="flex items-center mt-2 sm:mt-0">
                                  <span className="text-sm text-gray-500 mr-2">Статус:</span>
                                  <Badge 
                                    className={
                                      order.status === 'completed' 
                                        ? 'bg-green-100 text-green-800 hover:bg-green-100' 
                                        : order.status === 'processing'
                                          ? 'bg-blue-100 text-blue-800 hover:bg-blue-100'
                                          : 'bg-red-100 text-red-800 hover:bg-red-100'
                                    }
                                  >
                                    {order.status === 'completed' 
                                      ? 'Выполнен' 
                                      : order.status === 'processing'
                                        ? 'В обработке'
                                        : 'Отменен'
                                    }
                                  </Badge>
                                </div>
                              </div>
                              <div className="text-sm text-gray-500">
                                Дата заказа: {formatDate(order.date)}
                              </div>
                            </CardHeader>
                            
                            <CardContent className="pt-0">
                              <div className="space-y-2 mb-4">
                                {order.items.map((item) => (
                                  <div key={item.id} className="flex justify-between py-2 border-b border-gray-100">
                                    <span>{item.title} × {item.quantity}</span>
                                    <span className="font-medium">{item.price} ₽</span>
                                  </div>
                                ))}
                                <div className="flex justify-between pt-2 font-bold">
                                  <span>Итого:</span>
                                  <span>{order.total} ₽</span>
                                </div>
                              </div>
                              
                              <div className="flex flex-col sm:flex-row gap-2 pt-2">
                                {order.status === 'completed' && (
                                  <Button 
                                    variant="outline" 
                                    className="border-gray-300"
                                    onClick={() => window.open('#', '_blank')}
                                  >
                                    <Icon name="FileText" className="mr-2 h-4 w-4" />
                                    Счет
                                  </Button>
                                )}
                                <Button 
                                  variant="outline" 
                                  className="border-purple-600 text-purple-600 hover:bg-purple-50"
                                  onClick={() => handleReorder(order)}
                                >
                                  <Icon name="RefreshCw" className="mr-2 h-4 w-4" />
                                  Повторить заказ
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Icon name="ShoppingCart" className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                        <h3 className="text-lg font-medium text-gray-800 mb-2">У вас пока нет заказов</h3>
                        <p className="text-gray-600 mb-6">
                          После оформления заказа вы сможете отслеживать его статус здесь
                        </p>
                        <Link to="/">
                          <Button className="bg-purple-600 hover:bg-purple-700">
                            Перейти в каталог
                          </Button>
                        </Link>
                      </div>
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
