import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: string;
  color: string;
}

export default function StatCard({ title, value, icon, color }: StatCardProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">{title}</p>
            <p className={`text-2xl font-bold ${color}`}>{value}</p>
          </div>
          <Icon name={icon} size={24} className={color} />
        </div>
      </CardContent>
    </Card>
  );
}
