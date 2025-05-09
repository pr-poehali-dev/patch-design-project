
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import MyDesigns from '@/components/account/MyDesigns';
import OrderHistory, { Order } from '@/components/account/OrderHistory';
import { PurchasedDesign } from '@/utils/demoData';

interface ProfileTabsProps {
  designs: PurchasedDesign[];
  orders: Order[];
  onDownloadDesign: (design: PurchasedDesign) => void;
  onReorder: (order: Order) => void;
  formatDate: (dateString: string) => string;
}

/**
 * Компонент с вкладками личного кабинета (дизайны и заказы)
 */
const ProfileTabs = ({ designs, orders, onDownloadDesign, onReorder, formatDate }: ProfileTabsProps) => {
  return (
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
            <MyDesigns 
              designs={designs || []}
              onDownload={onDownloadDesign}
              formatDate={formatDate}
            />
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
            <OrderHistory 
              orders={orders || []}
              onReorder={onReorder}
              formatDate={formatDate}
            />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default ProfileTabs;
