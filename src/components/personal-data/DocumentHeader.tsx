import { CardHeader, CardTitle } from "@/components/ui/card";

export default function DocumentHeader() {
  return (
    <CardHeader>
      <CardTitle className="text-3xl font-bold text-center mb-4">
        Обработка персональных данных
      </CardTitle>
      <p className="text-muted-foreground text-center">
        Согласие на обработку персональных данных для маркетплейса Calibre Store
        <br />
        Дата последнего обновления: {new Date().toLocaleDateString("ru-RU")}
      </p>
    </CardHeader>
  );
}
