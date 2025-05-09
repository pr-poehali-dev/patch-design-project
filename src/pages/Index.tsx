import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import CategoryFilter from "@/components/CategoryFilter";
import ProductGrid from "@/components/ProductGrid";
import FeatureSection from "@/components/FeatureSection";
import InfoSection from "@/components/InfoSection";
import Footer from "@/components/Footer";
import { CATEGORIES, PRODUCTS } from "@/data/products";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/components/ui/use-toast";
import Icon from "@/components/ui/icon";

const Index = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("Все");
  const [cartItems, setCartItems] = useState<number[]>([]);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const { toast } = useToast();

  // Загрузка корзины из localStorage
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        const parsedCart = JSON.parse(storedCart);
        setCartItems(parsedCart.map((item: any) => item.id));
      }
    } catch (error) {
      console.error("Ошибка при загрузке корзины:", error);
    }
  }, []);

  // Filter products based on selected category
  const filteredProducts =
    selectedCategory === "Все"
      ? PRODUCTS
      : PRODUCTS.filter((product) => product.category === selectedCategory);

  // Add product to cart
  const addToCart = (productId: number) => {
    // Обновляем UI
    setCartItems((prev) => [...prev, productId]);

    // Обновляем localStorage
    try {
      const storedCart = localStorage.getItem("cart");
      let cart = storedCart ? JSON.parse(storedCart) : [];

      // Проверяем, есть ли товар уже в корзине
      const existingItem = cart.find((item: any) => item.id === productId);

      if (existingItem) {
        // Увеличиваем количество
        cart = cart.map((item: any) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      } else {
        // Добавляем новый товар
        cart.push({ id: productId, quantity: 1 });
      }

      localStorage.setItem("cart", JSON.stringify(cart));
    } catch (error) {
      console.error("Ошибка при обновлении корзины:", error);
    }

    // Find the product to show in toast
    const product = PRODUCTS.find((p) => p.id === productId);

    // Show toast notification
    toast({
      title: "Товар добавлен в корзину",
      description: product ? product.title : "Дизайн добавлен в корзину",
      duration: 3000,
    });
  };

  // Переход к корзине
  const goToCart = () => {
    navigate("/cart");
  };

  // Show special offer alert on initial load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAlertVisible(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Close alert
  const closeAlert = () => {
    setIsAlertVisible(false);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header cartItemsCount={cartItems.length} />

      {/* Hero section */}
      <HeroSection />

      {/* Special offer alert */}
      {isAlertVisible && (
        <div className="container mx-auto px-4 my-6">
          <Alert className="bg-purple-50 border-purple-200">
            <Icon name="Gift" className="h-4 w-4 text-purple-600" />
            <div className="flex justify-between w-full items-start">
              <div>
                <AlertTitle className="text-purple-800">
                  Специальное предложение для новых клиентов!
                </AlertTitle>
                <AlertDescription className="text-purple-700">
                  Скидка 15% на первую покупку. Используйте промокод NEW15 при
                  оформлении заказа.
                </AlertDescription>
              </div>
              <button
                onClick={closeAlert}
                className="text-purple-600 hover:text-purple-800"
              >
                <Icon name="X" className="h-4 w-4" />
              </button>
            </div>
          </Alert>
        </div>
      )}

      {/* Main products section */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
          Каталог дизайнов для вышивки
        </h2>

        {/* Category filter */}
        <CategoryFilter
          categories={CATEGORIES}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        {/* Products grid */}
        <ProductGrid products={filteredProducts} onAddToCart={addToCart} />
      </section>

      {/* Features section */}
      <FeatureSection />

      {/* Info section */}
      <InfoSection />

      {/* Footer */}
      <Footer categories={CATEGORIES} />
    </div>
  );
};

export default Index;
