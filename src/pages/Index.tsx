
import { useState } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import CategoryFilter from '@/components/CategoryFilter';
import ProductGrid from '@/components/ProductGrid';
import FeatureSection from '@/components/FeatureSection';
import Footer from '@/components/Footer';
import { CATEGORIES, PRODUCTS } from '@/data/products';

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
      <Header cartItemsCount={cartItems.length} />
      <HeroSection />
      
      <section className="container mx-auto px-4 py-8">
        <CategoryFilter 
          categories={CATEGORIES} 
          selectedCategory={selectedCategory} 
          onSelectCategory={setSelectedCategory} 
        />
        <ProductGrid 
          products={filteredProducts} 
          onAddToCart={addToCart} 
        />
      </section>
      
      <FeatureSection />
      <Footer categories={CATEGORIES} />
    </div>
  );
};

export default Index;
