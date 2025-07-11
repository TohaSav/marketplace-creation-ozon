import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function FavoritesTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon name="Heart" size={20} />
          Избранное
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center py-8">
          <Icon name="Heart" size={48} className="text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Список избранного пуст
          </h3>
          <p className="text-gray-500 mb-4">
            Добавляйте товары в избранное, чтобы не потерять их
          </p>
          <Link to="/">
            <Button>Перейти к покупкам</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
