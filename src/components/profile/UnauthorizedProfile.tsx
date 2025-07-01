import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function UnauthorizedProfile() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardContent className="p-6 text-center">
          <Icon name="User" size={48} className="text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Войдите в аккаунт
          </h2>
          <p className="text-gray-500 mb-4">
            Чтобы просматривать профиль, нужно авторизоваться
          </p>
          <Link to="/login">
            <Button>Войти в аккаунт</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
