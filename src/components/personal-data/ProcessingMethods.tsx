import Icon from "@/components/ui/icon";

export default function ProcessingMethods() {
  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">
        6. Способы обработки персональных данных
      </h2>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-purple-50 p-4 rounded-lg">
          <h4 className="font-semibold text-purple-800 mb-2 flex items-center gap-2">
            <Icon name="Zap" size={18} />
            Автоматизированная обработка
          </h4>
          <ul className="text-sm text-purple-700 space-y-1">
            <li>• Сбор, запись, систематизация</li>
            <li>• Накопление, хранение</li>
            <li>• Уточнение, обновление</li>
            <li>• Использование, передача</li>
          </ul>
        </div>
        <div className="bg-orange-50 p-4 rounded-lg">
          <h4 className="font-semibold text-orange-800 mb-2 flex items-center gap-2">
            <Icon name="User" size={18} />
            Неавтоматизированная обработка
          </h4>
          <ul className="text-sm text-orange-700 space-y-1">
            <li>• Обработка обращений</li>
            <li>• Консультации по продуктам</li>
            <li>• Рассмотрение спорных ситуаций</li>
            <li>• Верификация документов</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
