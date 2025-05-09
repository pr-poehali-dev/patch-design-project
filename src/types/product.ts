export interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
  characteristics?: {
    size?: string;
    stitchCount?: number;
    formats?: string[];
    colors?: number;
    difficulty?: "Легкий" | "Средний" | "Сложный";
    additionalInfo?: string;
  };
}
