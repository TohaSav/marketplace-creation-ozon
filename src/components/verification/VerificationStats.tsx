import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

interface VerificationStatsProps {
  pendingCount: number;
  approvedCount: number;
  rejectedCount: number;
}

const VerificationStats: React.FC<VerificationStatsProps> = ({
  pendingCount,
  approvedCount,
  rejectedCount,
}) => {
  const stats = [
    {
      label: "На рассмотрении",
      value: pendingCount,
      icon: "Clock",
      bgColor: "bg-yellow-100",
      iconColor: "text-yellow-600",
    },
    {
      label: "Одобрено",
      value: approvedCount,
      icon: "CheckCircle",
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      label: "Отклонено",
      value: rejectedCount,
      icon: "XCircle",
      bgColor: "bg-red-100",
      iconColor: "text-red-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {stats.map((stat) => (
        <Card key={stat.label}>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className={`p-2 ${stat.bgColor} rounded-lg`}>
                <Icon
                  name={stat.icon as any}
                  size={24}
                  className={stat.iconColor}
                />
              </div>
              <div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default VerificationStats;
