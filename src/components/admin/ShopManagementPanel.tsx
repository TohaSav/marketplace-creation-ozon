import { Shop } from "@/types/admin";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  getStatusColor,
  getStatusText,
  formatDate,
} from "@/utils/admin-helpers";
import Icon from "@/components/ui/icon";

interface ShopManagementPanelProps {
  selectedShop: Shop | null;
  activationDays: string;
  onActivationDaysChange: (days: string) => void;
  onActivateShop: (shopId: string) => void;
  onVerifyShop: (shopId: string, verified: boolean) => void;
  onExtendPeriod: (shopId: string, additionalDays: number) => void;
}

const ACTIVATION_OPTIONS = [
  { value: "7", label: "7 дней" },
  { value: "14", label: "14 дней" },
  { value: "30", label: "30 дней" },
  { value: "60", label: "60 дней" },
  { value: "90", label: "90 дней" },
  { value: "365", label: "365 дней" },
];

export default function ShopManagementPanel({
  selectedShop,
  activationDays,
  onActivationDaysChange,
  onActivateShop,
  onVerifyShop,
  onExtendPeriod,
}: ShopManagementPanelProps) {
  if (!selectedShop) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Settings" size={20} />
            Управление
          </CardTitle>
          <CardDescription>Выберите магазин для управления</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center text-gray-500 py-12">
            <Icon
              name="MousePointer"
              size={48}
              className="mx-auto mb-4 opacity-50"
            />
            <p>Выберите магазин из списка для управления</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon name="Settings" size={20} />
          Управление
        </CardTitle>
        <CardDescription>Настройки для {selectedShop.name}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Информация о магазине */}
        <div className="space-y-3">
          <div>
            <Label className="text-sm font-medium">Статус</Label>
            <div className="flex items-center gap-2 mt-1">
              <Badge className={getStatusColor(selectedShop.status)}>
                {getStatusText(selectedShop.status)}
              </Badge>
              {selectedShop.verified && (
                <Badge variant="secondary">
                  <Icon name="BadgeCheck" size={12} className="mr-1" />
                  Верифицирован
                </Badge>
              )}
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium">Период работы</Label>
            <p className="text-sm text-gray-600 mt-1">
              {selectedShop.daysRemaining} из {selectedShop.totalDays} дней
            </p>
          </div>

          <div>
            <Label className="text-sm font-medium">Последняя оплата</Label>
            <p className="text-sm text-gray-600 mt-1">
              {formatDate(selectedShop.lastPayment)}
            </p>
          </div>
        </div>

        <Separator />

        {/* Активация периода */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Активировать период</Label>
          <Select value={activationDays} onValueChange={onActivationDaysChange}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {ACTIVATION_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            className="w-full"
            onClick={() => onActivateShop(selectedShop.id)}
          >
            <Icon name="Play" size={16} className="mr-2" />
            Активировать бесплатно
          </Button>
        </div>

        {/* Продление периода */}
        {selectedShop.status === "active" && (
          <div className="space-y-3">
            <Label className="text-sm font-medium">Продлить период</Label>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onExtendPeriod(selectedShop.id, 7)}
              >
                +7 дней
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onExtendPeriod(selectedShop.id, 30)}
              >
                +30 дней
              </Button>
            </div>
          </div>
        )}

        <Separator />

        {/* Верификация */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Верификация магазина</Label>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">
              {selectedShop.verified ? "Верифицирован" : "Не верифицирован"}
            </span>
            <Switch
              checked={selectedShop.verified}
              onCheckedChange={(checked) =>
                onVerifyShop(selectedShop.id, checked)
              }
            />
          </div>
          <p className="text-xs text-gray-500">
            Верифицированные магазины получают особый значок доверия
          </p>
        </div>

        <Separator />

        {/* Дополнительные действия */}
        <div className="space-y-2">
          <Button variant="outline" className="w-full" size="sm">
            <Icon name="Mail" size={16} className="mr-2" />
            Отправить уведомление
          </Button>
          <Button variant="outline" className="w-full" size="sm">
            <Icon name="FileText" size={16} className="mr-2" />
            Просмотреть отчёты
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
