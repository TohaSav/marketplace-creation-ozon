import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { DeliveryMethod, DeliveryAddress } from "@/types/delivery";
import { DELIVERY_METHODS, calculateDeliveryPrice } from "@/data/delivery";
import Icon from "@/components/ui/icon";

interface DeliverySelectorProps {
  selectedMethodId?: string;
  deliveryAddress?: Partial<DeliveryAddress>;
  cartWeight?: number;
  onMethodSelect: (methodId: string, price: number) => void;
  onAddressChange: (address: DeliveryAddress) => void;
}

export default function DeliverySelector({
  selectedMethodId,
  deliveryAddress,
  cartWeight = 1,
  onMethodSelect,
  onAddressChange,
}: DeliverySelectorProps) {
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [addressForm, setAddressForm] = useState<Partial<DeliveryAddress>>(
    deliveryAddress || {},
  );

  const handleMethodSelect = (methodId: string) => {
    const price = calculateDeliveryPrice(methodId, cartWeight, 100); // 100км по умолчанию
    onMethodSelect(methodId, price);
  };

  const handleAddressSubmit = () => {
    if (
      addressForm.city &&
      addressForm.street &&
      addressForm.house &&
      addressForm.postalCode
    ) {
      onAddressChange(addressForm as DeliveryAddress);
      setShowAddressForm(false);
    }
  };

  const selectedMethod = DELIVERY_METHODS.find(
    (m) => m.id === selectedMethodId,
  );
  const deliveryPrice = selectedMethodId
    ? calculateDeliveryPrice(selectedMethodId, cartWeight, 100)
    : 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon name="Truck" size={20} />
          Способ доставки
        </CardTitle>
        <CardDescription>
          Выберите удобный способ получения заказа
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <RadioGroup value={selectedMethodId} onValueChange={handleMethodSelect}>
          {DELIVERY_METHODS.map((method) => {
            const price = calculateDeliveryPrice(method.id, cartWeight, 100);

            return (
              <div key={method.id} className="space-y-4">
                <div className="flex items-start space-x-3">
                  <RadioGroupItem
                    value={method.id}
                    id={method.id}
                    className="mt-1"
                  />
                  <Label htmlFor={method.id} className="flex-1 cursor-pointer">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Icon
                            name={method.icon}
                            size={20}
                            className="text-blue-600"
                          />
                          <div>
                            <div className="font-semibold flex items-center gap-2">
                              {method.name}
                              {method.isPopular && (
                                <Badge variant="secondary" className="text-xs">
                                  Популярно
                                </Badge>
                              )}
                            </div>
                            <div className="text-sm text-gray-600">
                              {method.fullName}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-lg">{price}₽</div>
                          <div className="text-sm text-gray-500">
                            {method.estimatedDays}
                          </div>
                        </div>
                      </div>

                      <p className="text-sm text-gray-600">
                        {method.description}
                      </p>

                      <div className="flex flex-wrap gap-1">
                        {method.features.slice(0, 3).map((feature, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="text-xs"
                          >
                            {feature}
                          </Badge>
                        ))}
                        {method.features.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{method.features.length - 3} ещё
                          </Badge>
                        )}
                      </div>
                    </div>
                  </Label>
                </div>

                {selectedMethodId === method.id && (
                  <div className="ml-6 pl-4 border-l-2 border-blue-200 space-y-3">
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <h4 className="font-medium text-blue-900 mb-2">
                        Особенности доставки {method.name}:
                      </h4>
                      <ul className="text-sm text-blue-800 space-y-1">
                        {method.features.map((feature, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <Icon
                              name="Check"
                              size={14}
                              className="text-blue-600"
                            />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </RadioGroup>

        {selectedMethod && (
          <>
            <Separator />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Адрес доставки</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowAddressForm(!showAddressForm)}
                >
                  <Icon
                    name={showAddressForm ? "X" : "Edit"}
                    size={16}
                    className="mr-2"
                  />
                  {showAddressForm ? "Отмена" : "Изменить"}
                </Button>
              </div>

              {deliveryAddress && !showAddressForm ? (
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm space-y-1">
                    <div>
                      <strong>Город:</strong> {deliveryAddress.city}
                    </div>
                    <div>
                      <strong>Адрес:</strong> {deliveryAddress.street},{" "}
                      {deliveryAddress.house}
                    </div>
                    {deliveryAddress.apartment && (
                      <div>
                        <strong>Квартира:</strong> {deliveryAddress.apartment}
                      </div>
                    )}
                    <div>
                      <strong>Индекс:</strong> {deliveryAddress.postalCode}
                    </div>
                  </div>
                </div>
              ) : showAddressForm || !deliveryAddress ? (
                <div className="space-y-4 p-4 border rounded-lg">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label htmlFor="city">Город *</Label>
                      <Input
                        id="city"
                        value={addressForm.city || ""}
                        onChange={(e) =>
                          setAddressForm((prev) => ({
                            ...prev,
                            city: e.target.value,
                          }))
                        }
                        placeholder="Москва"
                      />
                    </div>
                    <div>
                      <Label htmlFor="postalCode">Почтовый индекс *</Label>
                      <Input
                        id="postalCode"
                        value={addressForm.postalCode || ""}
                        onChange={(e) =>
                          setAddressForm((prev) => ({
                            ...prev,
                            postalCode: e.target.value,
                          }))
                        }
                        placeholder="123456"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="street">Улица *</Label>
                    <Input
                      id="street"
                      value={addressForm.street || ""}
                      onChange={(e) =>
                        setAddressForm((prev) => ({
                          ...prev,
                          street: e.target.value,
                        }))
                      }
                      placeholder="ул. Тверская"
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label htmlFor="house">Дом *</Label>
                      <Input
                        id="house"
                        value={addressForm.house || ""}
                        onChange={(e) =>
                          setAddressForm((prev) => ({
                            ...prev,
                            house: e.target.value,
                          }))
                        }
                        placeholder="12"
                      />
                    </div>
                    <div>
                      <Label htmlFor="apartment">Квартира</Label>
                      <Input
                        id="apartment"
                        value={addressForm.apartment || ""}
                        onChange={(e) =>
                          setAddressForm((prev) => ({
                            ...prev,
                            apartment: e.target.value,
                          }))
                        }
                        placeholder="45"
                      />
                    </div>
                  </div>

                  <Button
                    onClick={handleAddressSubmit}
                    disabled={
                      !addressForm.city ||
                      !addressForm.street ||
                      !addressForm.house ||
                      !addressForm.postalCode
                    }
                    className="w-full"
                  >
                    <Icon name="Save" size={16} className="mr-2" />
                    Сохранить адрес
                  </Button>
                </div>
              ) : null}
            </div>

            <Separator />

            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-green-900">
                    Выбрана доставка: {selectedMethod.name}
                  </h4>
                  <p className="text-sm text-green-700">
                    Срок доставки: {selectedMethod.estimatedDays}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-900">
                    {deliveryPrice}₽
                  </div>
                  <div className="text-sm text-green-700">
                    стоимость доставки
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
