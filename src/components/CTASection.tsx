import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function CTASection() {
  const navigate = useNavigate();

  return (
    <section className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        Готовы начать продавать?
      </h2>
      <p className="text-lg mb-8 opacity-90">
        Присоединяйтесь к тысячам продавцов и начните зарабатывать уже сегодня
      </p>
      <div className="space-x-4">
        <Button
          size="lg"
          variant="secondary"
          onClick={() => navigate("/seller")}
          className="font-semibold"
        >
          Стать продавцом
        </Button>
        <Button
          size="lg"
          variant="outline"
          onClick={() => navigate("/how-to-sell")}
          className="font-semibold border-white text-white hover:bg-white hover:text-purple-600"
        >
          Узнать больше
        </Button>
      </div>
    </section>
  );
}
