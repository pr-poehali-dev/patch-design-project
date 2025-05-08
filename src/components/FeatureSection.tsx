
import Icon from "@/components/ui/icon";

interface Feature {
  icon: string;
  title: string;
  description: string;
}

const FeatureSection = () => {
  const features: Feature[] = [
    {
      icon: "Sparkles",
      title: "Уникальные дизайны",
      description: "Авторские работы, которые сделают вашу одежду неповторимой"
    },
    {
      icon: "Star",
      title: "Высокое качество",
      description: "Профессиональные дизайны для любого оборудования"
    },
    {
      icon: "Truck",
      title: "Быстрая доставка",
      description: "Мгновенное получение файлов после оплаты"
    }
  ];

  return (
    <section className="bg-gray-100 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Почему выбирают нас</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-purple-100 w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center">
                <Icon name={feature.icon} className="text-purple-600 w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
