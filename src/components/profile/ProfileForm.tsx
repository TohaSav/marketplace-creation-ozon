import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserProfile, UserStats } from "@/types/profile.types";

interface ProfileFormProps {
  user: UserProfile & UserStats;
  isEditing: boolean;
  onToggleEdit: () => void;
}

const FormField = ({
  label,
  icon,
  type = "text",
  defaultValue,
  placeholder,
  disabled,
}: {
  label: string;
  icon: string;
  type?: string;
  defaultValue?: string;
  placeholder?: string;
  disabled: boolean;
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label}
    </label>
    <div className="relative">
      <Icon
        name={icon as any}
        size={20}
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
      />
      <input
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        disabled={disabled}
        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
      />
    </div>
  </div>
);

export default function ProfileForm({
  user,
  isEditing,
  onToggleEdit,
}: ProfileFormProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Личные данные</CardTitle>
          <Button
            variant={isEditing ? "default" : "outline"}
            onClick={onToggleEdit}
          >
            <Icon
              name={isEditing ? "Check" : "Edit"}
              size={16}
              className="mr-2"
            />
            {isEditing ? "Сохранить" : "Редактировать"}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            label="Полное имя"
            icon="User"
            defaultValue={user.name}
            disabled={!isEditing}
          />

          <FormField
            label="Email"
            icon="Mail"
            type="email"
            defaultValue={user.email}
            disabled={!isEditing}
          />

          <FormField
            label="Телефон"
            icon="Phone"
            type="tel"
            defaultValue={user.phone || ""}
            placeholder="Введите номер телефона"
            disabled={!isEditing}
          />

          <FormField
            label="Дата рождения"
            icon="Calendar"
            type="date"
            defaultValue={user.birthDate}
            disabled={!isEditing}
          />

          <FormField
            label="Город"
            icon="MapPin"
            defaultValue={user.city}
            placeholder="Введите ваш город"
            disabled={!isEditing}
          />

          <FormField
            label="Адрес доставки"
            icon="Home"
            defaultValue={user.address}
            placeholder="Введите адрес доставки"
            disabled={!isEditing}
          />
        </div>
      </CardContent>
    </Card>
  );
}
