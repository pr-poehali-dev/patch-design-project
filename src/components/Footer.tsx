
import React from "react";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface FooterProps {
  categories: string[];
}

const Footer = ({ categories }: FooterProps) => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-8">
          <div className="md:col-span-4">
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">ЭМБРОТЕКА</h3>
            <p className="text-gray-400 mb-4">
              Профессиональные дизайны для вышивальных машин всех марок. Мгновенная загрузка после оплаты.
            </p>
            <div className="flex items-center space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Icon name="Instagram" size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Icon name="Facebook" size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Icon name="Youtube" size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Icon name="MessageCircle" size={20} />
              </a>
            </div>
          </div>
          
          <div className="md:col-span-2">
            <h4 className="text-lg font-semibold mb-4">Информация</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">О компании</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Доставка</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Политика конфиденциальности</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Публичная оферта</a></li>
            </ul>
          </div>
          
          <div className="md:col-span-2">
            <h4 className="text-lg font-semibold mb-4">Категории</h4>
            <ul className="space-y-2 text-gray-400">
              {categories.filter(cat => cat !== "Все").slice(0, 5).map(category => (
                <li key={category}>
                  <a href="#" className="hover:text-white transition-colors">{category}</a>
                </li>
              ))}
              <li><a href="#" className="hover:text-white transition-colors">Все категории</a></li>
            </ul>
          </div>
          
          <div className="md:col-span-4">
            <h4 className="text-lg font-semibold mb-4">Рассылка новостей</h4>
            <p className="text-gray-400 mb-4">
              Подпишитесь, чтобы получать уведомления о новых дизайнах и специальных предложениях
            </p>
            <div className="flex">
              <Input 
                placeholder="Ваш email" 
                className="rounded-r-none bg-gray-800 border-gray-700 text-white focus-visible:ring-purple-500" 
              />
              <Button className="rounded-l-none bg-purple-600 hover:bg-purple-700">
                Подписаться
              </Button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © 2025 Эмбротека. Все права защищены.
          </p>
          <div className="flex items-center space-x-4">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/MasterCard_Logo.svg/200px-MasterCard_Logo.svg.png" alt="MasterCard" className="h-8" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/200px-Visa_Inc._logo.svg.png" alt="Visa" className="h-8" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Mir-logo.svg/200px-Mir-logo.svg.png" alt="Mir" className="h-8" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
