
import Icon from "@/components/ui/icon";

interface FooterProps {
  categories: string[];
}

const Footer = ({ categories }: FooterProps) => {
  return (
    <footer className="bg-gray-800 text-white py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">НашивкиПро</h3>
            <p className="text-gray-300">Авторские дизайны для вышивки</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Навигация</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-white">Каталог</a></li>
              <li><a href="#" className="hover:text-white">О нас</a></li>
              <li><a href="#" className="hover:text-white">Как заказать</a></li>
              <li><a href="#" className="hover:text-white">Контакты</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Категории</h4>
            <ul className="space-y-2 text-gray-300">
              {categories.filter(cat => cat !== "Все").map(category => (
                <li key={category}>
                  <a href="#" className="hover:text-white">{category}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Контакты</h4>
            <div className="space-y-2 text-gray-300">
              <p className="flex items-center gap-2">
                <Icon name="Mail" size={16} />
                info@nashivkipro.ru
              </p>
              <p className="flex items-center gap-2">
                <Icon name="Phone" size={16} />
                +7 (800) 123-45-67
              </p>
              <div className="flex gap-4 mt-4">
                <a href="#" className="hover:text-white">
                  <Icon name="Instagram" size={20} />
                </a>
                <a href="#" className="hover:text-white">
                  <Icon name="Facebook" size={20} />
                </a>
                <a href="#" className="hover:text-white">
                  <Icon name="Twitter" size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>© 2025 НашивкиПро. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
