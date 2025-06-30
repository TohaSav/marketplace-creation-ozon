import Icon from "@/components/ui/icon";

export default function SubjectRights() {
  const rights = [
    {
      icon: "Eye",
      title: "Право на доступ к персональным данным",
      description:
        "Получение информации о факте обработки, целях, способах и сроках",
      bgColor: "emerald-50",
      titleColor: "emerald-800",
      iconColor: "emerald-600",
      descColor: "emerald-700",
    },
    {
      icon: "Edit",
      title: "Право на уточнение персональных данных",
      description: "Исправление неточных, неполных или недостоверных данных",
      bgColor: "blue-50",
      titleColor: "blue-800",
      iconColor: "blue-600",
      descColor: "blue-700",
    },
    {
      icon: "Trash2",
      title: "Право на уничтожение персональных данных",
      description: "Удаление персональных данных при определенных условиях",
      bgColor: "red-50",
      titleColor: "red-800",
      iconColor: "red-600",
      descColor: "red-700",
    },
    {
      icon: "XCircle",
      title: "Право на отзыв согласия",
      description:
        "Отзыв ранее данного согласия на обработку персональных данных",
      bgColor: "orange-50",
      titleColor: "orange-800",
      iconColor: "orange-600",
      descColor: "orange-700",
    },
  ];

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">
        8. Права субъектов персональных данных
      </h2>
      <div className="grid gap-4">
        {rights.map((right, index) => (
          <div
            key={index}
            className={`flex items-start gap-3 p-4 bg-${right.bgColor} rounded-lg`}
          >
            <Icon
              name={right.icon as any}
              size={20}
              className={`text-${right.iconColor} mt-1`}
            />
            <div className="flex-1">
              <h4 className={`font-semibold text-${right.titleColor}`}>
                {right.title}
              </h4>
              <p className={`text-sm text-${right.descColor} mt-1`}>
                {right.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
