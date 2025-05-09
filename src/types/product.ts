export interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
  description?: string; // Добавляем поле для описания товара
  characteristics?: {
    size?: string;
    stitchCount?: number;
    formats?: string[];
    colors?: number;
    difficulty?: "Легкий" | "Средний" | "Сложный";
    additionalInfo?: string;
  };
}
