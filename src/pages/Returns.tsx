import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { useToast } from "@/hooks/use-toast";

export default function Returns() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    orderNumber: "",
    productName: "",
    returnReason: "",
    description: "",
    contactEmail: "",
    contactPhone: "",
  });
  const { toast } = useToast();

  const handleSubmitReturn = async () => {
    setIsSubmitting(true);

    // Проверяем обязательные поля
    if (
      !formData.orderNumber ||
      !formData.returnReason ||
      !formData.contactEmail
    ) {
      toast({
        title: "Ошибка",
        description: "Заполните все обязательные поля",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    // Имитируем отправку заявки
    setTimeout(() => {
      toast({
        title: "Заявка успешно подана!",
        description: `Номер заявки: #${Math.random().toString(36).substr(2, 9).toUpperCase()}. Мы свяжемся с вами в течение 24 часов.`,
      });
      setIsSubmitting(false);
      // Очищаем форму
      setFormData({
        orderNumber: "",
        productName: "",
        returnReason: "",
        description: "",
        contactEmail: "",
        contactPhone: "",
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8 lg:py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4">
            Возврат товара
          </h1>
          <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
            Простая процедура возврата в течение 14 дней
          </p>
        </div>

        {/* Return Conditions */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-white rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Условия возврата</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-green-600 mb-4 flex items-center gap-2">
                  <Icon name="CheckCircle" size={20} />
                  Можно вернуть
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Товар не использовался</li>
                  <li>• Сохранена оригинальная упаковка</li>
                  <li>• Есть все документы и бирки</li>
                  <li>• Товарный вид не нарушен</li>
                  <li>• Прошло не более 14 дней</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-red-600 mb-4 flex items-center gap-2">
                  <Icon name="XCircle" size={20} />
                  Нельзя вернуть
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Товары личной гигиены</li>
                  <li>• Нижнее белье</li>
                  <li>• Парфюмерия (вскрытая)</li>
                  <li>• Продукты питания</li>
                  <li>• Цифровые товары</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Return Process */}
        <div className="max-w-4xl mx-auto mb-12">
          <h2 className="text-2xl font-bold text-center mb-8">
            Как вернуть товар
          </h2>
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row items-start gap-6 p-6 bg-white rounded-lg shadow-sm">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                1
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">Подайте заявку</h3>
                <p className="text-gray-600 mb-4">
                  Создайте заявку на возврат в личном кабинете или обратитесь в
                  поддержку
                </p>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      Подать заявку
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="w-[95vw] max-w-[500px] max-h-[90vh] overflow-y-auto sm:w-full">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-2">
                        <Icon name="RotateCcw" size={20} />
                        Подача заявки на возврат
                      </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-2 sm:py-4">
                      <div className="space-y-2">
                        <Label htmlFor="orderNumber">Номер заказа *</Label>
                        <Input
                          id="orderNumber"
                          placeholder="Например: #12345678"
                          value={formData.orderNumber}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              orderNumber: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="productName">Название товара</Label>
                        <Input
                          id="productName"
                          placeholder="Укажите товар для возврата"
                          value={formData.productName}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              productName: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Причина возврата *</Label>
                        <Select
                          value={formData.returnReason}
                          onValueChange={(value) =>
                            setFormData({ ...formData, returnReason: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Выберите причину" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="size">
                              Не подошел размер
                            </SelectItem>
                            <SelectItem value="quality">
                              Низкое качество
                            </SelectItem>
                            <SelectItem value="defect">
                              Брак или дефект
                            </SelectItem>
                            <SelectItem value="different">
                              Товар не соответствует описанию
                            </SelectItem>
                            <SelectItem value="damaged">
                              Повреждение при доставке
                            </SelectItem>
                            <SelectItem value="other">
                              Другая причина
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="description">Подробное описание</Label>
                        <Textarea
                          id="description"
                          placeholder="Опишите подробнее причину возврата..."
                          value={formData.description}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              description: e.target.value,
                            })
                          }
                          rows={3}
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="contactEmail">
                            Email для связи *
                          </Label>
                          <Input
                            id="contactEmail"
                            type="email"
                            placeholder="your@email.com"
                            value={formData.contactEmail}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                contactEmail: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="contactPhone">Телефон</Label>
                          <Input
                            id="contactPhone"
                            placeholder="+7 (999) 123-45-67"
                            value={formData.contactPhone}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                contactPhone: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>

                      <div className="bg-blue-50 p-3 sm:p-4 rounded-lg">
                        <div className="flex items-start gap-2">
                          <Icon
                            name="Info"
                            className="text-blue-600 mt-0.5 flex-shrink-0"
                            size={16}
                          />
                          <div className="text-sm text-blue-800">
                            <p className="font-medium mb-1">
                              Что будет дальше:
                            </p>
                            <ul className="space-y-1 text-xs sm:text-sm">
                              <li>• Мы рассмотрим заявку в течение 24 часов</li>
                              <li>• Свяжемся с вами для уточнения деталей</li>
                              <li>• Организуем бесплатный забор товара</li>
                              <li>• Вернем деньги после проверки товара</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-3 pt-4 sticky bottom-0 bg-white">
                      <Button
                        onClick={handleSubmitReturn}
                        disabled={isSubmitting}
                        className="flex-1 h-11 sm:h-10"
                      >
                        {isSubmitting ? (
                          <>
                            <Icon
                              name="Loader2"
                              className="mr-2 h-4 w-4 animate-spin"
                            />
                            Отправляем...
                          </>
                        ) : (
                          "Подать заявку"
                        )}
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-start gap-6 p-6 bg-white rounded-lg shadow-sm">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                2
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">Упакуйте товар</h3>
                <p className="text-gray-600 mb-4">
                  Аккуратно упакуйте товар в оригинальную упаковку с документами
                </p>
                <div className="flex items-center gap-2 text-sm text-blue-600">
                  <Icon name="Package" size={16} />
                  Сохраните товарный вид
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-start gap-6 p-6 bg-white rounded-lg shadow-sm">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                3
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">
                  Передайте курьеру
                </h3>
                <p className="text-gray-600 mb-4">
                  Курьер заберет товар бесплатно в удобное для вас время
                </p>
                <div className="flex items-center gap-2 text-sm text-blue-600">
                  <Icon name="Truck" size={16} />
                  Бесплатный забор
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-start gap-6 p-6 bg-white rounded-lg shadow-sm">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                4
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">Получите возврат</h3>
                <p className="text-gray-600 mb-4">
                  Деньги вернутся на ваш счет в течение 3-5 рабочих дней
                </p>
                <div className="flex items-center gap-2 text-sm text-blue-600">
                  <Icon name="CreditCard" size={16} />
                  Возврат на карту или кошелек
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Return Reasons */}
        <div className="max-w-4xl mx-auto mb-12">
          <h2 className="text-2xl font-bold text-center mb-8">
            Причины возврата
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <Icon
                name="Shuffle"
                className="text-blue-600 mx-auto mb-4"
                size={32}
              />
              <h3 className="font-semibold mb-2">Не подошел размер</h3>
              <p className="text-gray-600 text-sm">
                Обменяем на подходящий размер или вернем деньги
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <Icon
                name="Eye"
                className="text-blue-600 mx-auto mb-4"
                size={32}
              />
              <h3 className="font-semibold mb-2">Не понравился</h3>
              <p className="text-gray-600 text-sm">
                Товар не соответствует ожиданиям по внешнему виду
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <Icon
                name="AlertTriangle"
                className="text-blue-600 mx-auto mb-4"
                size={32}
              />
              <h3 className="font-semibold mb-2">Дефект или брак</h3>
              <p className="text-gray-600 text-sm">
                Товар имеет производственные дефекты
              </p>
            </div>
          </div>
        </div>

        {/* Important Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-12">
          <div className="flex items-start gap-4">
            <Icon
              name="Info"
              className="text-blue-600 flex-shrink-0 mt-1"
              size={20}
            />
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">
                Важная информация
              </h3>
              <ul className="text-blue-800 space-y-1 text-sm">
                <li>
                  • Возврат денежных средств происходит тем же способом, которым
                  была произведена оплата
                </li>
                <li>
                  • При возврате товара, купленного в рассрочку, деньги
                  возвращаются после погашения кредита
                </li>
                <li>
                  • Стоимость доставки не возвращается, если товар возвращается
                  без дефектов
                </li>
                <li>• Сроки возврата могут увеличиться в праздничные дни</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Contact Support */}
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Нужна помощь?</h2>
          <p className="text-gray-600 mb-6">
            Наша служба поддержки поможет с оформлением возврата
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-blue-600 hover:bg-blue-700">
              Написать в поддержку
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
