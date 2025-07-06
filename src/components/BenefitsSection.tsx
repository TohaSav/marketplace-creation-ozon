import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

interface Benefit {
  icon: string;
  title: string;
  description: string;
  color: string;
}

const benefits: Benefit[] = [
  {
    icon: "Truck",
    title: "Быстрая доставка",
    description: "Доставка в день заказа по всей России",
    color: "blue",
  },
  {
    icon: "Shield",
    title: "Гарантия качества",
    description: "Все товары проверены и сертифицированы",
    color: "green",
  },
  {
    icon: "CreditCard",
    title: "Удобная оплата",
    description: "Любые способы оплаты, рассрочка 0%",
    color: "purple",
  },
];

export default function BenefitsSection() {
  return (
    <div className="mb-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {benefits.map((benefit, index) => (
          <Card
            key={index}
            className={`text-center p-8 bg-gradient-to-br from-${benefit.color}-50 to-${benefit.color}-100 border-2 border-${benefit.color}-200`}
          >
            <div
              className={`w-16 h-16 bg-${benefit.color}-500 rounded-2xl flex items-center justify-center mx-auto mb-4`}
            >
              <Icon name={benefit.icon as any} className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {benefit.title}
            </h3>
            <p className="text-gray-600">{benefit.description}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
