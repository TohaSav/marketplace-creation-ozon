import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

export const WalletHeader = () => {
  const navigate = useNavigate();

  return (
    <div className="mb-8">
      <Button
        variant="ghost"
        onClick={() => navigate("/seller/dashboard")}
        className="mb-4"
      >
        <Icon name="ArrowLeft" size={16} className="mr-2" />
        Назад к кабинету
      </Button>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        Личный кошелек 💰
      </h1>
      <p className="text-gray-600">
        Управляйте финансами вашего магазина и оплачивайте тарифы
      </p>
    </div>
  );
};
