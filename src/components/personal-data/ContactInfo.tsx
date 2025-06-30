import Icon from "@/components/ui/icon";

export default function ContactInfo() {
  const contactItems = [
    {
      icon: "Mail",
      title: "Email:",
      value: "legal@marketmaster.ru",
      color: "primary",
    },
    {
      icon: "Phone",
      title: "Телефон:",
      value: "+7 (800) 123-45-67",
      color: "secondary",
    },
    {
      icon: "MapPin",
      title: "Почтовый адрес:",
      value: "115114, г. Москва,\nул. Примерная, д. 123, к. 1",
      color: "accent",
    },
    {
      icon: "Clock",
      title: "Часы работы:",
      value: "Пн-Пт: 9:00-18:00 (МСК)",
      color: "muted-foreground",
    },
  ];

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">10. Контактная информация</h2>
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-6 rounded-lg">
        <p className="text-muted-foreground leading-relaxed mb-4">
          По вопросам обработки персональных данных и реализации своих прав вы
          можете обратиться:
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          {contactItems.map((item, index) => (
            <div key={index} className="space-y-3">
              <div
                className={`flex items-${item.icon === "MapPin" ? "start" : "center"} gap-3`}
              >
                <Icon
                  name={item.icon as any}
                  size={18}
                  className={`text-${item.color} ${item.icon === "MapPin" ? "mt-1" : ""}`}
                />
                <div>
                  <span className="font-medium">{item.title}</span>
                  <br />
                  <span className="text-sm text-muted-foreground whitespace-pre-line">
                    {item.value}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
