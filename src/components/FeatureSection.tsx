import React from "react";
import Icon from "@/components/ui/icon";

interface Feature {
  icon: string;
  title: string;
  description: string;
}

const FeatureSection = () => {
  const features: Feature[] = [
    {
      icon: "FileDigit",
      title: "Все популярные форматы",
      description:
        "Поддержка DST, PES, JEF, HUS, VP3, EXP и других форматов для любых машин",
    },
    {
      icon: "Zap",
      title: "Мгновенная загрузка",
      description: "Получите ваши файлы сразу после оплаты и начните вышивать",
    },
    {
      icon: "BarChart2",
      title: "Качественные дизайны",
      description:
        "Профессиональная оцифровка и проверка на реальном оборудовании",
    },
    {
      icon: "Headphones",
      title: "Техническая поддержка",
      description: "Поможем разобраться с форматами и настройками ваших файлов",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Преимущества наших дизайнов
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300"
            >
              <div className="bg-russian-blue/10 w-14 h-14 mb-4 rounded-lg flex items-center justify-center">
                <Icon
                  name={feature.icon}
                  className="text-russian-blue w-7 h-7"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
