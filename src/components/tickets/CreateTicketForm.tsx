import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { useTickets } from "@/hooks/useTickets";
import {
  TicketCategory,
  TicketPriority,
  TICKET_CATEGORY_LABELS,
  TICKET_PRIORITY_LABELS,
} from "@/types/tickets";

interface CreateTicketFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
  defaultUserData?: {
    userId: string;
    userName: string;
    userEmail: string;
  };
}

export default function CreateTicketForm({
  onSuccess,
  onCancel,
  defaultUserData,
}: CreateTicketFormProps) {
  const { createTicket } = useTickets();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    userName: defaultUserData?.userName || "",
    userEmail: defaultUserData?.userEmail || "",
    subject: "",
    description: "",
    category: "general" as TicketCategory,
    priority: "medium" as TicketPriority,
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.userName.trim()) {
      newErrors.userName = "Имя обязательно для заполнения";
    }

    if (!formData.userEmail.trim()) {
      newErrors.userEmail = "Email обязателен для заполнения";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.userEmail)) {
      newErrors.userEmail = "Некорректный формат email";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Тема обязательна для заполнения";
    } else if (formData.subject.length < 5) {
      newErrors.subject = "Тема должна содержать минимум 5 символов";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Описание обязательно для заполнения";
    } else if (formData.description.length < 10) {
      newErrors.description = "Описание должно содержать минимум 10 символов";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    try {
      const ticket = await createTicket({
        userId: defaultUserData?.userId || `user-${Date.now()}`,
        userName: formData.userName,
        userEmail: formData.userEmail,
        subject: formData.subject,
        description: formData.description,
        category: formData.category,
        priority: formData.priority,
      });

      if (ticket) {
        toast({
          title: "Тикет создан успешно!",
          description: `Ваше обращение зарегистрировано под номером #${ticket.id.slice(-6)}`,
        });

        // Сброс формы
        setFormData({
          userName: defaultUserData?.userName || "",
          userEmail: defaultUserData?.userEmail || "",
          subject: "",
          description: "",
          category: "general",
          priority: "medium",
        });

        onSuccess?.();
      }
    } catch (error) {
      console.error("Ошибка создания тикета:", error);
      toast({
        title: "Ошибка",
        description: "Не удалось создать тикет. Попробуйте еще раз.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Убираем ошибку при изменении поля
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon name="MessageSquare" size={24} />
          Создать обращение в поддержку
        </CardTitle>
        <p className="text-sm text-gray-600">
          Опишите вашу проблему или вопрос, и мы поможем вам в ближайшее время
        </p>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Информация о пользователе */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="userName">Ваше имя *</Label>
              <Input
                id="userName"
                type="text"
                value={formData.userName}
                onChange={(e) => handleInputChange("userName", e.target.value)}
                placeholder="Введите ваше имя"
                disabled={!!defaultUserData?.userName}
                className={errors.userName ? "border-red-500" : ""}
              />
              {errors.userName && (
                <p className="text-sm text-red-500 mt-1">{errors.userName}</p>
              )}
            </div>

            <div>
              <Label htmlFor="userEmail">Email *</Label>
              <Input
                id="userEmail"
                type="email"
                value={formData.userEmail}
                onChange={(e) => handleInputChange("userEmail", e.target.value)}
                placeholder="your@email.com"
                disabled={!!defaultUserData?.userEmail}
                className={errors.userEmail ? "border-red-500" : ""}
              />
              {errors.userEmail && (
                <p className="text-sm text-red-500 mt-1">{errors.userEmail}</p>
              )}
            </div>
          </div>

          {/* Тема обращения */}
          <div>
            <Label htmlFor="subject">Тема обращения *</Label>
            <Input
              id="subject"
              type="text"
              value={formData.subject}
              onChange={(e) => handleInputChange("subject", e.target.value)}
              placeholder="Кратко опишите суть проблемы"
              className={errors.subject ? "border-red-500" : ""}
            />
            {errors.subject && (
              <p className="text-sm text-red-500 mt-1">{errors.subject}</p>
            )}
          </div>

          {/* Категория и приоритет */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="category">Категория</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => handleInputChange("category", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Выберите категорию" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(TICKET_CATEGORY_LABELS).map(
                    ([key, label]) => (
                      <SelectItem key={key} value={key}>
                        {label}
                      </SelectItem>
                    ),
                  )}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="priority">Приоритет</Label>
              <Select
                value={formData.priority}
                onValueChange={(value) => handleInputChange("priority", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Выберите приоритет" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      {TICKET_PRIORITY_LABELS.low}
                    </div>
                  </SelectItem>
                  <SelectItem value="medium">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      {TICKET_PRIORITY_LABELS.medium}
                    </div>
                  </SelectItem>
                  <SelectItem value="high">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      {TICKET_PRIORITY_LABELS.high}
                    </div>
                  </SelectItem>
                  <SelectItem value="urgent">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      {TICKET_PRIORITY_LABELS.urgent}
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Описание проблемы */}
          <div>
            <Label htmlFor="description">Подробное описание *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Опишите вашу проблему максимально подробно. Укажите когда возникла проблема, какие действия вы выполняли, какой результат ожидали получить..."
              rows={6}
              className={errors.description ? "border-red-500" : ""}
            />
            {errors.description && (
              <p className="text-sm text-red-500 mt-1">{errors.description}</p>
            )}
            <p className="text-sm text-gray-500 mt-1">
              Минимум 10 символов. Чем подробнее описание, тем быстрее мы сможем
              помочь.
            </p>
          </div>

          {/* Информационное сообщение */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Icon name="Info" size={20} className="text-blue-600 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-blue-800 mb-1">
                  Что происходит дальше?
                </p>
                <ul className="text-blue-700 space-y-1">
                  <li>• Ваше обращение получит уникальный номер</li>
                  <li>• Мы рассмотрим его в течение 24 часов</li>
                  <li>• Вы получите ответ на указанный email</li>
                  <li>
                    • При необходимости мы запросим дополнительную информацию
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Кнопки */}
          <div className="flex flex-col sm:flex-row gap-3 justify-end">
            {onCancel && (
              <Button type="button" variant="outline" onClick={onCancel}>
                <Icon name="X" size={16} className="mr-2" />
                Отмена
              </Button>
            )}
            <Button type="submit" disabled={loading} className="min-w-[200px]">
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Создание...
                </>
              ) : (
                <>
                  <Icon name="Send" size={16} className="mr-2" />
                  Отправить обращение
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
