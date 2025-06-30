import Icon from "@/components/ui/icon";
import { Card, CardContent } from "@/components/ui/card";
import { formatStatValue } from "@/utils/seller-dashboard.utils";

interface StatsCardProps {
  title: string;
  value: number;
  icon: string;
  color: string;
  format: string;
  extra?: React.ReactNode;
}

export default function StatsCard({
  title,
  value,
  icon,
  color,
  format,
  extra,
}: StatsCardProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">{title}</p>
            <div className="flex items-center">
              <p className="text-2xl font-bold">
                {formatStatValue(value, format)}
              </p>
              {format === "rating" && (
                <Icon
                  name="Star"
                  className="text-yellow-500 fill-current ml-1"
                  size={20}
                />
              )}
            </div>
            {extra}
          </div>
          <Icon name={icon as any} className={color} size={24} />
        </div>
      </CardContent>
    </Card>
  );
}
