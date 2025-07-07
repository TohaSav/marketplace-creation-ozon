import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

export const WalletAccessDenied = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <Card className="text-center">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <Icon name="Lock" size={64} className="text-red-500" />
          </div>
          <CardTitle className="text-2xl text-red-600">
            Кошелек недоступен
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 text-lg mb-6">
            Личный кошелек доступен только для активных продавцов.
          </p>
          <Button
            onClick={() => navigate("/seller/dashboard")}
            variant="outline"
          >
            <Icon name="ArrowLeft" size={16} className="mr-2" />
            Вернуться к кабинету
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
