import Icon from "@/components/ui/icon";

export default function SubjectCategories() {
  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">
        2. Категории субъектов персональных данных
      </h2>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-secondary/10 p-4 rounded-lg">
          <h4 className="font-semibold mb-2 flex items-center gap-2">
            <Icon name="Users" size={18} />
            Покупатели
          </h4>
          <p className="text-sm text-muted-foreground">
            Физические лица, совершающие покупки на маркетплейсе
          </p>
        </div>
        <div className="bg-accent/10 p-4 rounded-lg">
          <h4 className="font-semibold mb-2 flex items-center gap-2">
            <Icon name="Store" size={18} />
            Продавцы
          </h4>
          <p className="text-sm text-muted-foreground">
            Индивидуальные предприниматели и представители юридических лиц
          </p>
        </div>
        <div className="bg-primary/10 p-4 rounded-lg">
          <h4 className="font-semibold mb-2 flex items-center gap-2">
            <Icon name="MessageSquare" size={18} />
            Посетители сайта
          </h4>
          <p className="text-sm text-muted-foreground">
            Лица, осуществляющие посещение маркетплейса
          </p>
        </div>
        <div className="bg-muted/30 p-4 rounded-lg">
          <h4 className="font-semibold mb-2 flex items-center gap-2">
            <Icon name="Mail" size={18} />
            Подписчики
          </h4>
          <p className="text-sm text-muted-foreground">
            Лица, подписавшиеся на рассылку и уведомления
          </p>
        </div>
      </div>
    </section>
  );
}
