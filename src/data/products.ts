import { Product } from "@/types/product";

export const CATEGORIES = [
  "Все",
  "Предметы",
  "Профессии, искусство, хобби",
  "Растения",
  "Религия",
  "Транспорт",
  "Животные",
  "Геральдика",
  "Надписи",
];

export const PRODUCTS: Product[] = [
  {
    id: 1,
    title: "Тигр винтажный",
    price: 299,
    category: "Животные",
    image:
      "https://images.unsplash.com/photo-1535338454770-8be927b5a00a?w=600&auto=format&fit=crop&q=80",
    description:
      "Винтажный дизайн с изображением тигра в классическом стиле, идеально подходит для украшения одежды, сумок или декоративных изделий. Дизайн имеет детальную проработку и отличную цветопередачу.",
    characteristics: {
      size: "164x285",
      stitchCount: 31801,
      formats: ["dst", "emb", "pes", "vp3"],
      colors: 8,
      difficulty: "Средний",
    },
  },
  {
    id: 2,
    title: "Роза классическая",
    price: 249,
    category: "Цветы",
    image:
      "https://images.unsplash.com/photo-1579704964555-ee0c27311665?w=600&auto=format&fit=crop&q=80",
    description:
      "Элегантный дизайн классической розы с проработанными лепестками и листьями. Прекрасно подойдет для вышивки на скатертях, полотенцах, одежде и других текстильных изделиях.",
    characteristics: {
      size: "125x125",
      stitchCount: 25486,
      formats: ["dst", "emb", "pes", "vp3", "jef"],
      colors: 6,
      difficulty: "Легкий",
    },
  },
  {
    id: 3,
    title: "Герб Российской Федерации",
    price: 399,
    category: "Геральдика",
    image:
      "https://images.unsplash.com/photo-1579154260010-a958e5cb596b?w=600&auto=format&fit=crop&q=80",
    description:
      "Официальный герб РФ в высоком качестве исполнения. Детализированный дизайн с точной цветопередачей для профессиональной вышивки на форме, флагах и официальных атрибутах.",
    characteristics: {
      size: "180x220",
      stitchCount: 42650,
      formats: ["dst", "emb", "pes", "vp3", "exp"],
      colors: 12,
      difficulty: "Сложный",
    },
  },
  {
    id: 4,
    title: "Best Friends Forever",
    price: 199,
    category: "Надписи",
    image:
      "https://images.unsplash.com/photo-1594439425474-7b34372981a0?w=600&auto=format&fit=crop&q=80",
    description:
      "Стильная надпись 'Best Friends Forever' (Лучшие друзья навсегда), идеально подходит для парных футболок, подушек или других подарков для друзей.",
    characteristics: {
      size: "100x180",
      stitchCount: 18432,
      formats: ["dst", "emb", "pes", "vp3", "hus"],
      colors: 3,
      difficulty: "Легкий",
    },
  },
  {
    id: 5,
    title: "Самолёт контурный",
    price: 349,
    category: "Авиация",
    image:
      "https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=600&auto=format&fit=crop&q=80",
    description:
      "Контурный дизайн самолета в современном стиле. Минималистичное изображение подчеркнет любовь к авиации и будет отлично смотреться на кепках, футболках и рюкзаках.",
    characteristics: {
      size: "150x240",
      stitchCount: 28965,
      formats: ["dst", "emb", "pes", "vp3", "jef"],
      colors: 5,
      difficulty: "Средний",
    },
  },
  {
    id: 6,
    title: "Орёл в полёте",
    price: 299,
    category: "Животные",
    image:
      "https://images.unsplash.com/photo-1614027164847-1b28cfe1df60?w=600&auto=format&fit=crop&q=80",
    characteristics: {
      size: "190x250",
      stitchCount: 38745,
      formats: ["dst", "emb", "pes", "vp3", "jef"],
      colors: 9,
      difficulty: "Сложный",
    },
  },
  {
    id: 7,
    title: "Роза ветров",
    price: 219,
    category: "Символы",
    image:
      "https://images.unsplash.com/photo-1572375992501-4b0892d50c69?w=600&auto=format&fit=crop&q=80",
    characteristics: {
      size: "120x120",
      stitchCount: 19850,
      formats: ["dst", "emb", "pes", "vp3", "hus"],
      colors: 4,
      difficulty: "Средний",
    },
  },
  {
    id: 8,
    title: "Единорог радужный",
    price: 249,
    category: "Для детей",
    image:
      "https://images.unsplash.com/photo-1596854372407-baba7fef6e51?w=600&auto=format&fit=crop&q=80",
    characteristics: {
      size: "130x160",
      stitchCount: 28760,
      formats: ["dst", "emb", "pes", "vp3", "jef"],
      colors: 12,
      difficulty: "Средний",
    },
  },
  {
    id: 9,
    title: "Лев геральдический",
    price: 379,
    category: "Геральдика",
    image:
      "https://images.unsplash.com/photo-1531170908166-d9d58be61376?w=600&auto=format&fit=crop&q=80",
    characteristics: {
      size: "175x225",
      stitchCount: 36542,
      formats: ["dst", "emb", "pes", "vp3", "exp"],
      colors: 7,
      difficulty: "Сложный",
    },
  },
  {
    id: 10,
    title: "Лилия королевская",
    price: 289,
    category: "Цветы",
    image:
      "https://images.unsplash.com/photo-1567590997610-1a1292a2f9ff?w=600&auto=format&fit=crop&q=80",
    characteristics: {
      size: "140x140",
      stitchCount: 24750,
      formats: ["dst", "emb", "pes", "vp3", "jef"],
      colors: 5,
      difficulty: "Средний",
    },
  },
  {
    id: 11,
    title: "Born to Ride",
    price: 249,
    category: "Надписи",
    image:
      "https://images.unsplash.com/photo-1558727927-82bdd22d0de4?w=600&auto=format&fit=crop&q=80",
    characteristics: {
      size: "120x200",
      stitchCount: 22450,
      formats: ["dst", "emb", "pes", "vp3", "hus"],
      colors: 2,
      difficulty: "Легкий",
    },
  },
  {
    id: 12,
    title: "Вертолёт военный",
    price: 349,
    category: "Авиация",
    image:
      "https://images.unsplash.com/photo-1584496617530-33b27d99bb29?w=600&auto=format&fit=crop&q=80",
    characteristics: {
      size: "170x185",
      stitchCount: 33985,
      formats: ["dst", "emb", "pes", "vp3", "jef"],
      colors: 6,
      difficulty: "Сложный",
    },
  },
];
