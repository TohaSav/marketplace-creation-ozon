import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { SubscriptionStatus } from "@/types/subscription";

interface SubscriptionInfoProps {
  subscriptionStatus: SubscriptionStatus;
}

export default function SubscriptionInfo({
  subscriptionStatus,
}: SubscriptionInfoProps) {
  return (
    <Card className="mb-6 bg-blue-50 border-blue-200">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Icon name="Info" size={20} className="text-blue-600" />
            <div>
              <h3 className="font-semibold text-blue-900">
                Тариф "{subscriptionStatus.planName}"
              </h3>
              <p className="text-sm text-blue-700">
                Использовано товаров: {subscriptionStatus.productsUsed} /{" "}
                {subscriptionStatus.maxProducts === -1
                  ? "∞"
                  : subscriptionStatus.maxProducts}
              </p>
            </div>
          </div>
          {subscriptionStatus.maxProducts !== -1 && (
            <div className="text-right">
              <div className="text-lg font-bold text-blue-900">
                {subscriptionStatus.maxProducts -
                  subscriptionStatus.productsUsed}
              </div>
              <div className="text-sm text-blue-700">товаров осталось</div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
