import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  SECURITY_ACTIONS,
  PRIVACY_ACTIONS,
} from "@/constants/profile.constants";

export default function SettingsTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon name="Settings" size={20} />
          Настройки аккаунта
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="font-medium mb-3">Безопасность</h3>
            <div className="space-y-3">
              {SECURITY_ACTIONS.map((action) => (
                <Button
                  key={action.id}
                  variant="outline"
                  className="w-full justify-start"
                >
                  <Icon name={action.icon as any} size={16} className="mr-2" />
                  {action.title}
                </Button>
              ))}
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="font-medium mb-3">Конфиденциальность</h3>
            <div className="space-y-3">
              {PRIVACY_ACTIONS.map((action) => (
                <Button
                  key={action.id}
                  variant={action.variant}
                  className="w-full justify-start"
                >
                  <Icon name={action.icon as any} size={16} className="mr-2" />
                  {action.title}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
