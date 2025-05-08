
import { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardFooter 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const CATEGORIES = [
  "Все", "Природа", "Животные", "Символы", "Геометрия", "Персонажи"
];

const PRODUCTS = [
  {
    id: 1,
    title: "Горный пейзаж",
    price: 390,
    category: "Природа",
    image: "https://images.unsplash.com/photo-1566766292903-5a3236f847fc?q=80&w=300&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Сова",
    price: 450,
    category: "Животные",
    image: "https://images.unsplash.com/photo-1543549790-8b5f4a028cfb?q=80&w=300&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Космический треугольник",
    price: 350,
    category: "Геометрия",
    image: "https://images.unsplash.com/photo-1559650656-5d1d361ad10e?q=80&w=300&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "Роза ветров",
    price: 420,
    category: "Символы",
    image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=300&auto=format&fit=crop"
  },
  {
    id: 5,
    title: "Единорог",
    price: 510,
    category: "Персонажи",
    image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=300&auto=format&fit=crop"
  },
  {
    id: 6,
    title: "Лесной пейзаж",
    price: 380,
    category: "Природа",
    image: "https://images.unsplash.com/photo-1614813651377-83bdfc00d48a?q=80&w=300&auto=format&fit=crop"
  },
];

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState("Все");
  const [cartItems, setCartItems] = useState<number[]>([]);

  const filteredProducts = selectedCategory === "Все" 
    ? PRODUCTS 
    : PRODUCTS.filter(product => product.category === selectedCategory);

  const addToCart = (productId: number) => {
    setCartItems([...cartItems, productId]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-purple-600">НашивкиПро</h1>
            <nav className="ml-10 hidden md:flex space-x-6">
              <a href="#" className="text-gray-700 hover:text-purple-600">Каталог</a>
              <a href="#" className="text-gray-700 hover:text-purple-600">О нас</a>
              <a href="#" className="text-gray-700 hover:text-purple-600">Как заказать</a>
              <a href="#" className="text-gray-700 hover:text-purple-600">Контакты</a>
            </nav>
          </div>
          <div className="flex items-center">
            <Button variant="ghost" size="icon" className="relative">
              <Icon name="ShoppingCart" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-700 to-indigo-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Уникальные дизайны нашивок</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Создайте свой неповторимый стиль с нашими качественными дизайнами для вышивки
          </p>
          <Button className="bg-white text-purple-700 hover:bg-gray-100">
            Смотреть каталог
          </Button>
        </div>
      </section>

      {/* Category Filter */}
      <section className="container mx-auto px-4 py-8">
        <div className="mb-8 flex flex-wrap gap-2">
          {CATEGORIES.map(category => (
            <Button 
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className={selectedCategory === category ? "bg-purple-600" : ""}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="relative pb-[100%]">
                <img 
                  src={product.image} 
                  alt={product.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="font-medium text-lg">{product.title}</h3>
                <div className="text-sm text-gray-500 mb-2">{product.category}</div>
                <div className="text-purple-600 font-bold">{product.price} ₽</div>
              </CardContent>
              <CardFooter className="p-4 pt-0 flex justify-between">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-1/2"
                >
                  Подробнее
                </Button>
                <Button 
                  size="sm" 
                  className="w-1/2 ml-2 bg-purple-600"
                  onClick={() => addToCart(product.id)}
                >
                  В корзину
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Почему выбирают нас</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-purple-100 w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center">
                <Icon name="Sparkles" className="text-purple-600 w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Уникальные дизайны</h3>
              <p className="text-gray-600">Авторские работы, которые сделают вашу одежду неповторимой</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-purple-100 w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center">
                <Icon name="Star" className="text-purple-600 w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Высокое качество</h3>
              <p className="text-gray-600">Профессиональные дизайны для любого оборудования</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-purple-100 w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center">
                <Icon name="Truck" className="text-purple-600 w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Быстрая доставка</h3>
              <p className="text-gray-600">Мгновенное получение файлов после оплаты</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
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
                {CATEGORIES.filter(cat => cat !== "Все").map(category => (
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
    </div>
  );
};

export default Index;
