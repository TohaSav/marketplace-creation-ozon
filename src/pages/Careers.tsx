import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { Link } from "react-router-dom";

export default function Careers() {
  const vacancies = [
    {
      id: 1,
      title: "Frontend разработчик",
      department: "Разработка",
      type: "Полная занятость",
      location: "Москва / Удаленно",
      salary: "120 000 - 180 000 ₽",
      description:
        "Разработка пользовательских интерфейсов для нашей торговой платформы",
      requirements: ["React", "TypeScript", "3+ года опыта"],
      isHot: true,
    },
    {
      id: 2,
      title: "Backend разработчик",
      department: "Разработка",
      type: "Полная занятость",
      location: "Москва / Удаленно",
      salary: "130 000 - 200 000 ₽",
      description: "Создание и поддержка серверной части приложения",
      requirements: ["Node.js", "Python", "SQL", "4+ года опыта"],
      isHot: true,
    },
    {
      id: 3,
      title: "Product Manager",
      department: "Продукт",
      type: "Полная занятость",
      location: "Москва",
      salary: "150 000 - 220 000 ₽",
      description:
        "Управление развитием продукта и аналитика пользовательского опыта",
      requirements: ["Опыт в PM", "Аналитические навыки", "E-commerce опыт"],
      isHot: false,
    },
    {
      id: 4,
      title: "UX/UI Дизайнер",
      department: "Дизайн",
      type: "Полная занятость",
      location: "Москва / Удаленно",
      salary: "80 000 - 120 000 ₽",
      description:
        "Создание интуитивного и привлекательного пользовательского интерфейса",
      requirements: ["Figma", "Принципы UX", "Портфолио"],
      isHot: false,
    },
    {
      id: 5,
      title: "Менеджер по продажам",
      department: "Продажи",
      type: "Полная занятость",
      location: "Москва",
      salary: "60 000 - 100 000 ₽ + бонусы",
      description:
        "Привлечение новых продавцов на платформу и развитие партнерских отношений",
      requirements: ["Опыт в продажах", "Коммуникабельность", "Знание рынка"],
      isHot: false,
    },
    {
      id: 6,
      title: "Аналитик данных",
      department: "Аналитика",
      type: "Полная занятость",
      location: "Москва / Удаленно",
      salary: "90 000 - 140 000 ₽",
      description:
        "Анализ данных пользователей и бизнес-метрик для принятия решений",
      requirements: ["SQL", "Python/R", "Опыт в аналитике"],
      isHot: false,
    },
  ];

  const benefits = [
    {
      icon: "Heart",
      title: "Медицинская страховка",
      description: "Полная страховка для вас и вашей семьи",
    },
    {
      icon: "Home",
      title: "Гибкий график",
      description: "Удаленная работа и flexible-часы",
    },
    {
      icon: "GraduationCap",
      title: "Обучение",
      description: "Курсы, конференции и развитие навыков",
    },
    {
      icon: "Coffee",
      title: "Офис-комфорт",
      description: "Современный офис с кухней и зоной отдыха",
    },
    {
      icon: "Zap",
      title: "Бонусы",
      description: "Премии за достижения и 13-я зарплата",
    },
    {
      icon: "Calendar",
      title: "Отпуск",
      description: "28 дней отпуска + больничные",
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
          <span>Карьера</span>
        </nav>

        {/* Заголовок */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Карьера в CalibreStore
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Присоединяйтесь к нашей команде и помогите создать лучшую торговую
            платформу в России
          </p>
        </div>

        {/* Почему мы */}
        <Card className="mb-12 bg-gradient-to-r from-blue-50 to-purple-50 border-0">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl font-bold mb-4">
                  Почему CalibreStore?
                </h2>
                <p className="text-gray-700 mb-6">
                  Мы — динамично развивающаяся технологическая компания, которая
                  меняет способ онлайн-торговли в России. Работая с нами, вы
                  получите уникальный опыт создания продуктов, которыми
                  пользуются миллионы людей.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-blue-100 text-blue-800">
                    Стартап-культура
                  </Badge>
                  <Badge className="bg-green-100 text-green-800">
                    Быстрый рост
                  </Badge>
                  <Badge className="bg-purple-100 text-purple-800">
                    Инновации
                  </Badge>
                </div>
              </div>
              <div className="text-center">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">50+</div>
                    <div className="text-sm text-gray-600">Сотрудников</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">3</div>
                    <div className="text-sm text-gray-600">Года на рынке</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">
                      15M+
                    </div>
                    <div className="text-sm text-gray-600">Пользователей</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <div className="text-2xl font-bold text-red-600">100%</div>
                    <div className="text-sm text-gray-600">Удаленка</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Льготы */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-center mb-8">
            Что мы предлагаем
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <Icon
                    name={benefit.icon as any}
                    size={32}
                    className="text-blue-600 mb-4"
                  />
                  <h3 className="font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-gray-600 text-sm">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Открытые вакансии */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-center mb-8">
            Открытые вакансии
          </h2>
          <div className="space-y-4">
            {vacancies.map((vacancy) => (
              <Card
                key={vacancy.id}
                className="hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex-1 mb-4 lg:mb-0">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold">
                          {vacancy.title}
                        </h3>
                        {vacancy.isHot && (
                          <Badge className="bg-red-100 text-red-800">
                            🔥 Hot
                          </Badge>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-2 mb-3">
                        <Badge variant="outline">{vacancy.department}</Badge>
                        <Badge variant="outline">{vacancy.type}</Badge>
                        <Badge variant="outline">
                          <Icon name="MapPin" size={12} className="mr-1" />
                          {vacancy.location}
                        </Badge>
                      </div>
                      <p className="text-gray-600 text-sm mb-2">
                        {vacancy.description}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {vacancy.requirements.map((req, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="text-xs"
                          >
                            {req}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-green-600 mb-2">
                        {vacancy.salary}
                      </div>
                      <Button>Откликнуться</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Процесс найма */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-center">Процесс найма</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-blue-600 font-bold">1</span>
                </div>
                <h3 className="font-semibold mb-2">Отклик</h3>
                <p className="text-sm text-gray-600">
                  Отправьте резюме на интересующую вакансию
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-green-600 font-bold">2</span>
                </div>
                <h3 className="font-semibold mb-2">Собеседование</h3>
                <p className="text-sm text-gray-600">
                  Знакомство с HR и техническое интервью
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-purple-600 font-bold">3</span>
                </div>
                <h3 className="font-semibold mb-2">Тестовое задание</h3>
                <p className="text-sm text-gray-600">
                  Практическое задание по специальности
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-red-600 font-bold">4</span>
                </div>
                <h3 className="font-semibold mb-2">Оффер</h3>
                <p className="text-sm text-gray-600">
                  Обсуждение условий и welcome в команду!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Не нашли подходящую вакансию */}
        <Card className="bg-gray-100 border-0">
          <CardContent className="p-8 text-center">
            <Icon
              name="Mail"
              size={48}
              className="text-gray-400 mx-auto mb-4"
            />
            <h2 className="text-2xl font-bold mb-4">
              Не нашли подходящую вакансию?
            </h2>
            <p className="text-gray-700 mb-6">
              Отправьте нам свое резюме, и мы свяжемся с вами, когда появится
              подходящая позиция
            </p>
            <Button size="lg">Отправить резюме</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
