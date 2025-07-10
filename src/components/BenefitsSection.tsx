import Icon from "@/components/ui/icon";

export default function BenefitsSection() {
  const benefits = [
    {
      icon: "Truck",
      title: "Быстрая доставка",
      description: "Доставка от 1 дня по всей России",
    },
    {
      icon: "Shield",
      title: "Гарантия качества",
      description: "Проверенные продавцы и товары",
    },
    {
      icon: "RefreshCw",
      title: "Легкий возврат",
      description: "14 дней на возврат без вопросов",
    },
    {
      icon: "Headphones",
      title: "Поддержка 24/7",
      description: "Всегда готовы помочь вам",
    },
  ];

  return (
    <section className="mb-12 bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-8">
      <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
        Почему выбирают Calibre Store?
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {benefits.map((benefit, index) => (
          <div key={index} className="text-center">
            <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon
                name={benefit.icon as any}
                className="text-white"
                size={32}
              />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {benefit.title}
            </h3>
            <p className="text-gray-600">{benefit.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
