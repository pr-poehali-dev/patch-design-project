
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface LoadingStateProps {
  categories: string[];
}

/**
 * Компонент для отображения состояния загрузки данных аккаунта
 */
const LoadingState = ({ categories }: LoadingStateProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header cartItemsCount={0} />
      <div className="flex-grow flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-russian-blue mb-4"></div>
          <p>Загрузка данных аккаунта...</p>
        </div>
      </div>
      <Footer categories={categories} />
    </div>
  );
};

export default LoadingState;
