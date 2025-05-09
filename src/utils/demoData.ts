
import { Order } from '@/components/account/OrderHistory';
import { PRODUCTS } from '@/data/products';

// Тип для купленного дизайна
export interface PurchasedDesign {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
  purchaseDate: string;
  downloadLink: string;
  characteristics?: {
    size?: string;
    stitchCount?: number;
    formats?: string[];
    colors?: number;
    difficulty?: "Легкий" | "Средний" | "Сложный";
    additionalInfo?: string;
  };
}

/**
 * Создает демонстрационные заказы для пользователя
 */
export const createDemoOrders = (userId: number): Order[] => {
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
  saveUserOrders(userId, demoOrders);
  
  return demoOrders;
};

/**
 * Создает демонстрационные купленные дизайны для пользователя
 */
export const createDemoDesigns = (userId: number): PurchasedDesign[] => {
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
  saveUserDesigns(userId, demoDesigns);
  
  return demoDesigns;
};

/**
 * Сохраняет заказы пользователя в localStorage
 */
const saveUserOrders = (userId: number, orders: Order[]): void => {
  try {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex((u: any) => u.id === userId);
    
    if (userIndex !== -1) {
      users[userIndex].orders = orders;
      localStorage.setItem('users', JSON.stringify(users));
    }
  } catch (error) {
    console.error('Ошибка при сохранении заказов:', error);
  }
};

/**
 * Сохраняет дизайны пользователя в localStorage
 */
const saveUserDesigns = (userId: number, designs: PurchasedDesign[]): void => {
  try {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex((u: any) => u.id === userId);
    
    if (userIndex !== -1) {
      users[userIndex].designs = designs;
      localStorage.setItem('users', JSON.stringify(users));
    }
  } catch (error) {
    console.error('Ошибка при сохранении дизайнов:', error);
  }
};
