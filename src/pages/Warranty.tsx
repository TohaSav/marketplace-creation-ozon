import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { Link } from "react-router-dom";

export default function Warranty() {
  const warrantyCategories = [
    {
      category: "Электроника",
      period: "12-24 месяца",
      icon: "Smartphone",
      color: "blue",
      items: [
        "Смартфоны",
        "Планшеты",
        "Ноутбуки",
        "Телевизоры",
        "Аудиотехника",
      ],
    },
    {
      category: "Бытовая техника",
      period: "12-36 месяцев",
      icon: "Home",
      color: "green",
      items: ["Холодильники", "Стиральные машины", "Микроволновки", "Пылесосы"],
    },
    {
      category: "Одежда и обувь",
      period: "14 дней",
      icon: "Shirt",
      color: "purple",
      items: ["Одежда", "Обувь", "Аксессуары", "Украшения"],
    },
    {
      category: "Товары для дома",
      period: "6-12 месяцев",
      icon: "Sofa",
      color: "orange",
      items: ["Мебель", "Посуда", "Текстиль", "Декор"],
    },
  ];

  const warrantySteps = [
    {
      step: 1,
      title: "Обнаружили проблему",
      description: "Товар перестал работать или имеет дефект",
      icon: "AlertTriangle",
    },
    {
      step: 2,
      title: "Свяжитесь с нами",
      description: "Опишите проблему через форму или по телефону",
      icon: "Phone",
    },
    {
      step: 3,
      title: "Диагностика",
      description: "Наши специалисты определят причину неисправности",
      icon: "Search",
    },
    {
      step: 4,
      title: "Решение",
      description: "Ремонт, замена или возврат средств",
      icon: "CheckCircle",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Хлебные крошки */}
        <nav className="flex items-center gap-2 text-sm text-gray-600 mb-8">
          <Link to="/" className="hover:text-blue-600">
            Главная
          </Link>
          <Icon name="ChevronRight" size={16} />
          <span>Гарантия</span>
        </nav>

        {/* Заголовок */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Гарантийные условия
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Мы гарантируем качество всех товаров и предоставляем полную
            поддержку покупателям
          </p>
        </div>

        {/* Основные принципы */}
        <Card className="mb-12 bg-gradient-to-r from-blue-50 to-green-50 border-0">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-center mb-8">
              Наши гарантии
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <Icon
                  name="Shield"
                  size={48}
                  className="text-blue-600 mx-auto mb-4"
                />
                <h3 className="font-semibold mb-2">100% качество</h3>
                <p className="text-gray-600 text-sm">
                  Все товары проходят тщательную проверку перед отправкой
                </p>
              </div>
              <div className="text-center">
                <Icon
                  name="RotateCcw"
                  size={48}
                  className="text-green-600 mx-auto mb-4"
                />
                <h3 className="font-semibold mb-2">Легкий возврат</h3>
                <p className="text-gray-600 text-sm">
                  Простая процедура возврата в течение гарантийного срока
                </p>
              </div>
              <div className="text-center">
                <Icon
                  name="Headphones"
                  size={48}
                  className="text-purple-600 mx-auto mb-4"
                />
                <h3 className="font-semibold mb-2">Поддержка 24/7</h3>
                <p className="text-gray-600 text-sm">
                  Наша служба поддержки готова помочь в любое время
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Гарантийные сроки по категориям */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-center mb-8">
            Гарантийные сроки
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {warrantyCategories.map((category, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <Icon
                    name={category.icon as any}
                    size={40}
                    className={`text-${category.color}-600 mx-auto mb-2`}
                  />
                  <CardTitle className="text-lg">{category.category}</CardTitle>
                  <Badge
                    className={`bg-${category.color}-100 text-${category.color}-800`}
                  >
                    {category.period}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm space-y-1">
                    {category.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-center gap-2">
                        <Icon
                          name="Check"
                          size={14}
                          className="text-green-600"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Процедура гарантийного обслуживания */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-center">
              Как воспользоваться гарантией
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {warrantySteps.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon
                      name={step.icon as any}
                      size={24}
                      className="text-blue-600"
                    />
                  </div>
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 text-sm font-bold">
                    {step.step}
                  </div>
                  <h3 className="font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Условия гарантии */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="CheckCircle" size={24} className="text-green-600" />
                Гарантия распространяется
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <Icon
                    name="Check"
                    size={16}
                    className="text-green-600 mt-0.5"
                  />
                  <span className="text-sm">
                    На заводские дефекты и производственный брак
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon
                    name="Check"
                    size={16}
                    className="text-green-600 mt-0.5"
                  />
                  <span className="text-sm">
                    На поломки при нормальной эксплуатации
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon
                    name="Check"
                    size={16}
                    className="text-green-600 mt-0.5"
                  />
                  <span className="text-sm">
                    На товары с сохраненной упаковкой и документами
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon
                    name="Check"
                    size={16}
                    className="text-green-600 mt-0.5"
                  />
                  <span className="text-sm">
                    На товары, купленные в нашем магазине
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon
                    name="Check"
                    size={16}
                    className="text-green-600 mt-0.5"
                  />
                  <span className="text-sm">
                    На соответствие заявленным характеристикам
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="XCircle" size={24} className="text-red-600" />
                Гарантия НЕ распространяется
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <Icon name="X" size={16} className="text-red-600 mt-0.5" />
                  <span className="text-sm">На механические повреждения</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="X" size={16} className="text-red-600 mt-0.5" />
                  <span className="text-sm">
                    На повреждения от воды или влаги
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="X" size={16} className="text-red-600 mt-0.5" />
                  <span className="text-sm">
                    На поломки из-за неправильной эксплуатации
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="X" size={16} className="text-red-600 mt-0.5" />
                  <span className="text-sm">
                    На товары после самостоятельного ремонта
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="X" size={16} className="text-red-600 mt-0.5" />
                  <span className="text-sm">
                    На расходные материалы и комплектующие
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Необходимые документы */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="FileText" size={24} className="text-blue-600" />
              Необходимые документы для гарантии
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <Icon
                  name="Receipt"
                  size={32}
                  className="text-green-600 mx-auto mb-3"
                />
                <h3 className="font-semibold mb-2">Чек или квитанция</h3>
                <p className="text-sm text-gray-600">
                  Подтверждение покупки в нашем магазине
                </p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <Icon
                  name="CreditCard"
                  size={32}
                  className="text-blue-600 mx-auto mb-3"
                />
                <h3 className="font-semibold mb-2">Гарантийный талон</h3>
                <p className="text-sm text-gray-600">
                  Заполненный талон с печатью магазина
                </p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <Icon
                  name="User"
                  size={32}
                  className="text-purple-600 mx-auto mb-3"
                />
                <h3 className="font-semibold mb-2">Документ личности</h3>
                <p className="text-sm text-gray-600">
                  Паспорт или другой удостоверяющий документ
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Варианты решения */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-center">
              Варианты гарантийного обслуживания
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 border-2 border-blue-200 rounded-lg">
                <Icon
                  name="Wrench"
                  size={40}
                  className="text-blue-600 mx-auto mb-4"
                />
                <h3 className="font-semibold mb-2">Ремонт</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Бесплатное устранение дефектов в сервисном центре
                </p>
                <Badge className="bg-blue-100 text-blue-800">До 30 дней</Badge>
              </div>
              <div className="text-center p-6 border-2 border-green-200 rounded-lg">
                <Icon
                  name="RefreshCw"
                  size={40}
                  className="text-green-600 mx-auto mb-4"
                />
                <h3 className="font-semibold mb-2">Замена</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Обмен на аналогичный товар при невозможности ремонта
                </p>
                <Badge className="bg-green-100 text-green-800">
                  До 14 дней
                </Badge>
              </div>
              <div className="text-center p-6 border-2 border-red-200 rounded-lg">
                <Icon
                  name="DollarSign"
                  size={40}
                  className="text-red-600 mx-auto mb-4"
                />
                <h3 className="font-semibold mb-2">Возврат средств</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Полный возврат стоимости при серьезных дефектах
                </p>
                <Badge className="bg-red-100 text-red-800">До 7 дней</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Контакты для гарантийных вопросов */}
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-0">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Вопросы по гарантии?</h2>
            <p className="text-gray-700 mb-6">
              Наши специалисты помогут разобраться с любой ситуацией
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg">
                <Icon name="Phone" size={16} className="mr-2" />
                +7 (904) 980-82-75
              </Button>
              <Button variant="outline" size="lg">
                <Icon name="Mail" size={16} className="mr-2" />
                swi79@bk.ru
              </Button>
              <Link to="/support">
                <Button variant="outline" size="lg">
                  <Icon name="MessageCircle" size={16} className="mr-2" />
                  Служба поддержки
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
