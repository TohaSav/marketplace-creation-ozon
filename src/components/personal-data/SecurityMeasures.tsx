import Icon from "@/components/ui/icon";

export default function SecurityMeasures() {
  const organizationalMeasures = [
    { icon: "Shield", text: "Назначение ответственных лиц" },
    { icon: "Users", text: "Обучение сотрудников" },
    { icon: "FileText", text: "Разработка локальных актов" },
    { icon: "CheckSquare", text: "Контроль соблюдения требований" },
  ];

  const technicalMeasures = [
    { icon: "Lock", text: "Криптографическая защита" },
    { icon: "Server", text: "Защищенные сервера хранения" },
    { icon: "Key", text: "Системы аутентификации" },
    { icon: "Activity", text: "Мониторинг доступа" },
  ];

  const MeasuresList = ({
    title,
    measures,
    colorClass,
  }: {
    title: string;
    measures: Array<{ icon: string; text: string }>;
    colorClass: string;
  }) => (
    <div>
      <h4 className={`font-semibold mb-3 text-${colorClass}`}>{title}</h4>
      <div className="space-y-3">
        {measures.map((measure, index) => (
          <div key={index} className="flex items-start gap-2">
            <Icon
              name={measure.icon as any}
              size={16}
              className={`text-${colorClass} mt-1`}
            />
            <span className="text-sm">{measure.text}</span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">
        9. Меры по обеспечению безопасности персональных данных
      </h2>
      <div className="grid md:grid-cols-2 gap-6">
        <MeasuresList
          title="Организационные меры:"
          measures={organizationalMeasures}
          colorClass="primary"
        />
        <MeasuresList
          title="Технические меры:"
          measures={technicalMeasures}
          colorClass="secondary"
        />
      </div>
    </section>
  );
}
