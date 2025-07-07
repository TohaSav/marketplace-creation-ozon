import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface ProductsSectionProps {
  title: string;
  products: number[];
}

export default function ProductsSection({
  title,
  products,
}: ProductsSectionProps) {
  // Показываем секцию только если есть товары
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div className="mb-12">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
        {title}
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-3">
        {products.map((item) => (
          <Card
            key={item}
            className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-0 bg-white rounded-2xl overflow-hidden hover:scale-105"
          >
            <CardContent className="p-0">
              <div className="aspect-square bg-gradient-to-br from-slate-50 to-slate-100 relative overflow-hidden">
                <Icon
                  name="Package"
                  className="w-8 h-8 text-slate-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                />
                <div className="absolute top-2 right-2 bg-emerald-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                  -15%
                </div>
              </div>
              <div className="p-3">
                <div className="h-3 bg-slate-200 rounded-full mb-2" />
                <div className="h-2 bg-slate-200 rounded-full w-2/3 mb-3" />
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <div className="h-4 bg-emerald-100 rounded-full w-12 mb-1" />
                    <div className="h-2 bg-slate-200 rounded-full w-8" />
                  </div>
                  <Button
                    size="sm"
                    className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-full w-8 h-8 p-0 shadow-lg"
                  >
                    <Icon name="Plus" className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
