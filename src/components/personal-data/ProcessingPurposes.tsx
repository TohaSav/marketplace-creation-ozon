export default function ProcessingPurposes() {
  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">
        4. Цели обработки персональных данных
      </h2>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-semibold text-blue-800 mb-2">Основные цели:</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Регистрация пользователей</li>
            <li>• Обработка заказов</li>
            <li>• Организация доставки</li>
            <li>• Обеспечение безопасности</li>
          </ul>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <h4 className="font-semibold text-green-800 mb-2">
            Дополнительные цели:
          </h4>
          <ul className="text-sm text-green-700 space-y-1">
            <li>• Маркетинговые исследования</li>
            <li>• Персонализация предложений</li>
            <li>• Аналитика и статистика</li>
            <li>• Обслуживание клиентов</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
