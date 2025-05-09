
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { PurchasedDesign } from '@/utils/demoData';
import { Order } from '@/components/account/OrderHistory';

/**
 * Хук с действиями для страницы аккаунта (скачивание дизайнов, повторение заказов)
 */
export const useAccountActions = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

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

  return {
    handleDownloadDesign,
    handleReorder,
    formatDate
  };
};
