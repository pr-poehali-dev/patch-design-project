
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Separator } from '@/components/ui/separator';

interface ProfileSidebarProps {
  userName: string;
  userEmail: string;
}

/**
 * Боковая панель профиля пользователя в личном кабинете
 */
const ProfileSidebar = ({ userName, userEmail }: ProfileSidebarProps) => {
  return (
    <div className="p-6">
      <div className="flex flex-col items-center">
        <Avatar className="h-24 w-24 mb-4">
          <AvatarImage src={null as any} alt={userName} />
          <AvatarFallback className="text-xl bg-purple-100 text-purple-700">
            {userName.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <h2 className="text-xl font-semibold">{userName}</h2>
        <p className="text-gray-500">{userEmail}</p>
        
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
    </div>
  );
};

export default ProfileSidebar;
