import Icon from "@/components/ui/icon";

export default function ProcessingTerms() {
  const terms = [
    {
      icon: "Clock",
      title: "Активные пользователи",
      description: "До момента удаления аккаунта",
      bgColor: "cyan-100",
      iconColor: "cyan-600",
      titleColor: "cyan-800",
      descColor: "cyan-700",
    },
    {
      icon: "Calendar",
      title: "Неактивные пользователи",
      description: "3 года с момента последней активности",
      bgColor: "blue-100",
      iconColor: "blue-600",
      titleColor: "blue-800",
      descColor: "blue-700",
    },
    {
      icon: "Archive",
      title: "Архивные данные",
      description: "5 лет для финансовой отчетности",
      bgColor: "indigo-100",
      iconColor: "indigo-600",
      titleColor: "indigo-800",
      descColor: "indigo-700",
    },
  ];

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">
        7. Сроки обработки персональных данных
      </h2>
      <div className="bg-gradient-to-r from-cyan-50 to-blue-50 p-6 rounded-lg">
        <div className="grid md:grid-cols-3 gap-4">
          {terms.map((term, index) => (
            <div key={index} className="text-center">
              <div
                className={`w-12 h-12 bg-${term.bgColor} rounded-full flex items-center justify-center mx-auto mb-2`}
              >
                <Icon
                  name={term.icon as any}
                  size={24}
                  className={`text-${term.iconColor}`}
                />
              </div>
              <h4 className={`font-semibold text-${term.titleColor}`}>
                {term.title}
              </h4>
              <p className={`text-sm text-${term.descColor} mt-1`}>
                {term.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
