import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface CategoryMenuProps {
  categories: string[];
  onSelectCategory?: (category: string) => void;
  className?: string;
}

const CategoryMenu = ({
  categories,
  onSelectCategory,
  className = "",
}: CategoryMenuProps) => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  // Имитация подкатегорий (для примера)
  const subCategories = {
    Предметы: ["Одежда", "Мебель", "Аксессуары", "Кухонные принадлежности"],
    "Профессии, искусство, хобби": [
      "Рукоделие",
      "Спорт",
      "Музыка",
      "Рисование",
    ],
    Растения: ["Цветы", "Деревья", "Кустарники", "Травы"],
    Религия: ["Христианство", "Ислам", "Буддизм", "Другие"],
    Транспорт: ["Авиация", "Автомобили", "Морской", "Железнодорожный"],
    "Астрология и Космос": [
      "Знаки зодиака",
      "Планеты",
      "Созвездия",
      "Космические объекты",
    ],
    "Военные шевроны и нашивки": [
      "Армия",
      "Флот",
      "Авиация",
      "Специальные подразделения",
    ],
    "Для детей": ["Мультфильмы", "Игрушки", "Сказки", "Школа"],
    Животные: ["Дикие", "Домашние", "Птицы", "Морские"],
    "Кино, мульты, аниме, игры": [
      "Персонажи",
      "Логотипы",
      "Эмблемы",
      "Символы",
    ],
    "Логотипы, гербы, шевроны": ["Компании", "Бренды", "Организации", "Группы"],
    Люди: ["Профессии", "Хобби", "Спорт", "Отдых"],
    Надписи: ["Цитаты", "Пожелания", "Имена", "Мотивационные"],
    Орнамент: ["Геометрический", "Растительный", "Этнический", "Современный"],
    "Пейзажи, города": ["Сельский", "Городской", "Горы", "Море"],
    Праздники: ["Новый год", "Дни рождения", "Свадьбы", "Национальные"],
  };

  const handleCategoryClick = (category: string) => {
    if (expandedCategory === category) {
      setExpandedCategory(null);
    } else {
      setExpandedCategory(category);
    }

    // Если передан обработчик выбора категории
    if (onSelectCategory && category !== "Все") {
      onSelectCategory(category);
    }
  };

  // Фильтруем категории, убирая "Все" из меню
  const menuCategories = categories.filter((cat) => cat !== "Все");

  return (
    <div className={`border rounded-md overflow-hidden shadow-sm ${className}`}>
      {menuCategories.map((category, index) => (
        <React.Fragment key={category}>
          <div
            className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer"
            onClick={() => handleCategoryClick(category)}
          >
            <span className="text-lg font-medium text-gray-800">
              {category}
            </span>
            <ChevronRight
              className={`h-5 w-5 text-gray-600 transition-transform ${
                expandedCategory === category ? "rotate-90" : ""
              }`}
            />
          </div>

          {/* Раскрывающиеся подкатегории */}
          {expandedCategory === category &&
            subCategories[category as keyof typeof subCategories] && (
              <div className="bg-gray-50 pl-8 pr-4 py-2">
                <ul className="space-y-2">
                  {subCategories[category as keyof typeof subCategories].map(
                    (subCategory) => (
                      <li key={subCategory}>
                        <Link
                          to="#"
                          className="text-gray-700 hover:text-purple-600 block py-1"
                          onClick={() => onSelectCategory?.(category)}
                        >
                          {subCategory}
                        </Link>
                      </li>
                    ),
                  )}
                </ul>
              </div>
            )}

          {index < menuCategories.length - 1 && <Separator />}
        </React.Fragment>
      ))}
    </div>
  );
};

export default CategoryMenu;
