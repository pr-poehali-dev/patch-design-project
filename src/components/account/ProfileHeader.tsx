
import React from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface ProfileHeaderProps {
  userName: string;
  onLogout: () => void;
}

/**
 * Компонент заголовка страницы личного кабинета
 */
const ProfileHeader = ({ userName, onLogout }: ProfileHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-3xl font-bold text-gray-800">Личный кабинет</h1>
      <Button 
        variant="outline" 
        className="border-red-600 text-red-600 hover:bg-red-50"
        onClick={onLogout}
      >
        <Icon name="LogOut" className="mr-2 h-4 w-4" />
        Выйти
      </Button>
    </div>
  );
};

export default ProfileHeader;
