import Icon from "@/components/ui/icon";

export default function LegalBasis() {
  const legalBasisItems = [
    {
      icon: "FileText",
      title: "Согласие субъекта персональных данных",
      description: "п. 1 ч. 1 ст. 6 ФЗ «О персональных данных»",
      bgColor: "amber-50",
      textColor: "amber-800",
      iconColor: "amber-600",
      descColor: "amber-700",
    },
    {
      icon: "Scale",
      title: "Исполнение договора",
      description: "п. 5 ч. 1 ст. 6 ФЗ «О персональных данных»",
      bgColor: "blue-50",
      textColor: "blue-800",
      iconColor: "blue-600",
      descColor: "blue-700",
    },
    {
      icon: "Shield",
      title: "Законные интересы",
      description: "п. 6 ч. 1 ст. 6 ФЗ «О персональных данных»",
      bgColor: "green-50",
      textColor: "green-800",
      iconColor: "green-600",
      descColor: "green-700",
    },
  ];

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">
        5. Правовые основания обработки
      </h2>
      <div className="space-y-4">
        {legalBasisItems.map((item, index) => (
          <div
            key={index}
            className={`flex items-start gap-3 p-4 bg-${item.bgColor} rounded-lg`}
          >
            <Icon
              name={item.icon as any}
              size={20}
              className={`text-${item.iconColor} mt-1`}
            />
            <div>
              <h4 className={`font-semibold text-${item.textColor}`}>
                {item.title}
              </h4>
              <p className={`text-sm text-${item.descColor}`}>
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
