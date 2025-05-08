
import { Product } from "@/types/product";

export const CATEGORIES = [
  "Все", "Природа", "Животные", "Символы", "Геометрия", "Персонажи"
];

export const PRODUCTS: Product[] = [
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
