import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";

interface Ticket {
  id: string;
  subject: string;
  message: string;
  status: "open" | "in_progress" | "resolved" | "closed";
  priority: "low" | "medium" | "high" | "urgent";
  createdAt: string;
  lastReply?: string;
}

export default function SupportTab() {
  const [showCreateTicket, setShowCreateTicket] = useState(false);
  const [tickets] = useState<Ticket[]>([
    {
      id: "T001",
      subject: "Проблема с загрузкой товаров",
      message: "Не могу загрузить новые товары в каталог...",
      status: "in_progress",
      priority: "high",
      createdAt: "2024-01-15",
      lastReply: "2024-01-16"
    },
    {
      id: "T002", 
      subject: "Вопрос по выводу средств",
      message: "Как долго обрабатывается заявка на вывод?",
      status: "resolved",
      priority: "medium",
      createdAt: "2024-01-10",
      lastReply: "2024-01-11"
    }
  ]);

  const [newTicket, setNewTicket] = useState({
    subject: "",
    message: "",
    priority: "medium" as const
  });

  const faqItems = [
    {
      question: "Как добавить новый товар?",
      answer: "Перейдите в раздел 'Товары' и нажмите кнопку 'Добавить товар'. Заполните все обязательные поля и загрузите изображения."
    },
    {
      question: "Сколько времени обрабатывается заявка на вывод средств?",
      answer: "Обработка заявки занимает 1-3 рабочих дня. Средства поступают на указанный счет в течение 5-7 рабочих дней."
    },
    {
      question: "Как изменить тарифный план?",
      answer: "В разделе 'Настройки' найдите блок 'Подписка' и нажмите 'Изменить тариф'. Выберите подходящий план и произведите оплату."
    },
    {
      question: "Почему товар не отображается в каталоге?",
      answer: "Товар может быть на модерации или деактивирован. Проверьте статус товара в разделе 'Товары'."
    }
  ];

  const handleCreateTicket = () => {
    if (!newTicket.subject || !newTicket.message) {
      toast({
        title: "Ошибка",
        description: "Заполните все обязательные поля",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Обращение создано",
      description: "Ваше обращение принято в работу. Ответ придет в течение 24 часов."
    });

    setNewTicket({ subject: "", message: "", priority: "medium" });
    setShowCreateTicket(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open": return "bg-yellow-100 text-yellow-800";
      case "in_progress": return "bg-blue-100 text-blue-800";
      case "resolved": return "bg-green-100 text-green-800";
      case "closed": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "low": return "bg-gray-100 text-gray-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "high": return "bg-orange-100 text-orange-800";
      case "urgent": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Быстрые контакты */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="MessageCircle" size={24} className="text-blue-600" />
            </div>
            <h3 className="font-semibold mb-2">Онлайн-чат</h3>
            <p className="text-sm text-gray-600 mb-4">Быстрые ответы 24/7</p>
            <Button variant="outline" className="w-full">
              Открыть чат
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Phone" size={24} className="text-green-600" />
            </div>
            <h3 className="font-semibold mb-2">Телефон</h3>
            <p className="text-sm text-gray-600 mb-4">+7 (800) 555-01-23</p>
            <Button variant="outline" className="w-full">
              Позвонить
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Mail" size={24} className="text-purple-600" />
            </div>
            <h3 className="font-semibold mb-2">Email</h3>
            <p className="text-sm text-gray-600 mb-4">support@calibrestore.ru</p>
            <Button variant="outline" className="w-full">
              Написать
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Мои обращения */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Мои обращения</CardTitle>
              <Button 
                onClick={() => setShowCreateTicket(!showCreateTicket)}
                size="sm"
              >
                <Icon name="Plus" size={16} className="mr-2" />
                Создать обращение
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {showCreateTicket && (
              <div className="border rounded-lg p-4 mb-4 bg-gray-50">
                <h4 className="font-medium mb-3">Новое обращение</h4>
                <div className="space-y-3">
                  <Input
                    placeholder="Тема обращения"
                    value={newTicket.subject}
                    onChange={(e) => setNewTicket({...newTicket, subject: e.target.value})}
                  />
                  <Select 
                    value={newTicket.priority} 
                    onValueChange={(value: any) => setNewTicket({...newTicket, priority: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Низкий приоритет</SelectItem>
                      <SelectItem value="medium">Средний приоритет</SelectItem>
                      <SelectItem value="high">Высокий приоритет</SelectItem>
                      <SelectItem value="urgent">Срочно</SelectItem>
                    </SelectContent>
                  </Select>
                  <Textarea
                    placeholder="Опишите проблему или вопрос подробно..."
                    value={newTicket.message}
                    onChange={(e) => setNewTicket({...newTicket, message: e.target.value})}
                    rows={4}
                  />
                  <div className="flex gap-2">
                    <Button onClick={handleCreateTicket} size="sm">
                      Отправить
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => setShowCreateTicket(false)}
                      size="sm"
                    >
                      Отмена
                    </Button>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-3">
              {tickets.map((ticket) => (
                <div key={ticket.id} className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium">{ticket.subject}</h4>
                    <div className="flex gap-2">
                      <Badge className={getStatusColor(ticket.status)}>
                        {ticket.status === "open" && "Открыто"}
                        {ticket.status === "in_progress" && "В работе"}
                        {ticket.status === "resolved" && "Решено"}
                        {ticket.status === "closed" && "Закрыто"}
                      </Badge>
                      <Badge className={getPriorityColor(ticket.priority)}>
                        {ticket.priority === "low" && "Низкий"}
                        {ticket.priority === "medium" && "Средний"}
                        {ticket.priority === "high" && "Высокий"}
                        {ticket.priority === "urgent" && "Срочно"}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{ticket.message}</p>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>№{ticket.id}</span>
                    <span>Создано: {ticket.createdAt}</span>
                    {ticket.lastReply && <span>Последний ответ: {ticket.lastReply}</span>}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Часто задаваемые вопросы */}
        <Card>
          <CardHeader>
            <CardTitle>Часто задаваемые вопросы</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {faqItems.map((item, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon name="HelpCircle" size={14} className="text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">{item.question}</h4>
                      <p className="text-sm text-gray-600">{item.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Icon name="BookOpen" size={20} className="text-blue-600" />
                <h4 className="font-medium text-blue-900">База знаний</h4>
              </div>
              <p className="text-sm text-blue-800 mb-3">
                Полная документация и руководства для продавцов
              </p>
              <Button variant="outline" size="sm" className="text-blue-600 border-blue-600">
                Открыть базу знаний
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}