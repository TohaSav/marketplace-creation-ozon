import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NOTIFICATION_SETTINGS } from "@/constants/profile.constants";

export default function NotificationsTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon name="Bell" size={20} />
          Уведомления
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {NOTIFICATION_SETTINGS.map((setting, index) => (
            <div
              key={setting.id}
              className={`flex items-center justify-between py-3 ${
                index < NOTIFICATION_SETTINGS.length - 1 ? "border-b" : ""
              }`}
            >
              <div>
                <div className="font-medium">{setting.title}</div>
                <div className="text-sm text-gray-500">
                  {setting.description}
                </div>
              </div>
              <Button variant="outline" size="sm">
                {setting.enabled ? "Включено" : "Выключено"}
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
