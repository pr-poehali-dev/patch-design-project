
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

// Тип для заказа
export interface Order {
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

interface OrderHistoryProps {
  orders: Order[];
  onReorder: (order: Order) => void;
  formatDate: (dateString: string) => string;
}

/**
 * Отображает историю заказов пользователя
 */
const OrderHistory = ({ orders, onReorder, formatDate }: OrderHistoryProps) => {
  if (!orders || orders.length === 0) {
    return (
      <div className="text-center py-8">
        <Icon name="ShoppingCart" className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-800 mb-2">
          У вас пока нет заказов
        </h3>
        <p className="text-gray-600 mb-6">
          После оформления заказа вы сможете отслеживать его статус здесь
        </p>
        <Link to="/">
          <Button className="bg-purple-600 hover:bg-purple-700">
            Перейти в каталог
          </Button>
        </Link>
      </div>
    );
  }
  
  // Определяем цвет и текст для разных статусов заказа
  const getStatusInfo = (status: Order['status']) => {
    switch (status) {
      case 'completed':
        return {
          className: 'bg-green-100 text-green-800 hover:bg-green-100',
          label: 'Выполнен'
        };
      case 'processing':
        return {
          className: 'bg-blue-100 text-blue-800 hover:bg-blue-100',
          label: 'В обработке'
        };
      case 'cancelled':
        return {
          className: 'bg-red-100 text-red-800 hover:bg-red-100',
          label: 'Отменен'
        };
      default:
        return {
          className: 'bg-gray-100 text-gray-800 hover:bg-gray-100',
          label: 'Неизвестно'
        };
    }
  };
  
  return (
    <div className="space-y-6">
      {orders.map((order) => {
        const statusInfo = getStatusInfo(order.status);
        
        return (
          <Card key={order.id} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-2">
                <div>
                  <span className="text-sm text-gray-500">Заказ №</span>
                  <span className="font-medium ml-2">{order.id}</span>
                </div>
                <div className="flex items-center mt-2 sm:mt-0">
                  <span className="text-sm text-gray-500 mr-2">Статус:</span>
                  <Badge className={statusInfo.className}>
                    {statusInfo.label}
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
                  onClick={() => onReorder(order)}
                >
                  <Icon name="RefreshCw" className="mr-2 h-4 w-4" />
                  Повторить заказ
                </Button>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default OrderHistory;
