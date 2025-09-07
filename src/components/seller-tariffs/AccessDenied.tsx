import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

export default function AccessDenied() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Card className="text-center">
          <CardHeader>
            <CardTitle className="text-2xl text-red-600">
              Доступ запрещен
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-6">
              Данная страница доступна только зарегистрированным продавцам.
            </p>
            <Button onClick={() => navigate("/")} variant="outline">
              <Icon name="ArrowLeft" size={16} className="mr-2" />
              На главную
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}