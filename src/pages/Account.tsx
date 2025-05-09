
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CATEGORIES } from '@/data/products';
import { Card } from '@/components/ui/card';

// Импортируем переиспользуемые компоненты
import ProfileSidebar from '@/components/account/ProfileSidebar';
import ProfileHeader from '@/components/account/ProfileHeader';
import ProfileTabs from '@/components/account/ProfileTabs';
import LoadingState from '@/components/account/LoadingState';

// Импортируем хуки
import { useUserData } from '@/hooks/useUserData';
import { useAccountActions } from '@/hooks/useAccountActions';

/**
 * Страница личного кабинета пользователя
 */
const Account = () => {
  // Получаем данные пользователя и состояние загрузки
  const { currentUser, isLoading, handleLogout } = useUserData();
  
  // Получаем обработчики действий
  const { handleDownloadDesign, handleReorder, formatDate } = useAccountActions();

  // Индикатор загрузки
  if (isLoading) {
    return <LoadingState categories={CATEGORIES} />;
  }

  // Если пользователь не авторизован, не должны попасть сюда
  // Но на всякий случай проверяем
  if (!currentUser) {
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header cartItemsCount={0} />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        {/* Заголовок страницы */}
        <ProfileHeader 
          userName={currentUser.name} 
          onLogout={handleLogout} 
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Боковая панель профиля */}
          <Card className="h-fit">
            <ProfileSidebar
              userName={currentUser.name}
              userEmail={currentUser.email}
            />
          </Card>
          
          {/* Основной контент с вкладками */}
          <div className="lg:col-span-3">
            <ProfileTabs 
              designs={currentUser.designs || []}
              orders={currentUser.orders || []}
              onDownloadDesign={handleDownloadDesign}
              onReorder={handleReorder}
              formatDate={formatDate}
            />
          </div>
        </div>
      </main>
      
      <Footer categories={CATEGORIES} />
    </div>
  );
};

export default Account;
