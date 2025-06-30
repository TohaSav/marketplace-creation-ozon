export default function DataCategories() {
  const dataTypes = [
    {
      title: "Идентификационные данные:",
      color: "primary",
      items: [
        "Фамилия, имя, отчество",
        "Пол",
        "Дата рождения",
        "Место рождения",
        "Гражданство",
      ],
    },
    {
      title: "Контактные данные:",
      color: "secondary",
      items: [
        "Номер телефона",
        "Адрес электронной почты",
        "Адрес места жительства",
        "Адрес доставки",
        "Почтовый индекс",
      ],
    },
    {
      title: "Паспортные данные:",
      color: "accent",
      items: [
        "Серия и номер паспорта",
        "Дата выдачи паспорта",
        "Код подразделения",
        "Кем выдан паспорт",
      ],
    },
    {
      title: "Финансовые данные:",
      color: "muted",
      items: [
        "Номер банковской карты (частично маскированный)",
        "Банковские реквизиты",
        "Информация о платежах",
        "История транзакций",
      ],
    },
  ];

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">
        3. Категории обрабатываемых персональных данных
      </h2>
      <div className="space-y-4">
        {dataTypes.map((type, index) => (
          <div key={index} className={`border-l-4 border-${type.color} pl-4`}>
            <h4 className={`font-semibold text-${type.color}`}>{type.title}</h4>
            <ul className="list-disc pl-6 text-sm text-muted-foreground mt-2 space-y-1">
              {type.items.map((item, itemIndex) => (
                <li key={itemIndex}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
