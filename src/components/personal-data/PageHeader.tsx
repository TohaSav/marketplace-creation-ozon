import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";

export default function PageHeader() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between mb-8">
      <Button
        variant="outline"
        onClick={() => navigate("/")}
        className="flex items-center gap-2"
      >
        <Icon name="ArrowLeft" size={20} />
        На главную
      </Button>
    </div>
  );
}
