import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Story } from "@/types/stories";

interface StoriesTabProps {
  stories: Story[];
  onCreateStory?: () => void;
  onDeleteStory?: (storyId: string) => void;
}

export default function StoriesTab({
  stories,
  onCreateStory,
  onDeleteStory,
}: StoriesTabProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Stories товаров</CardTitle>
          <Button
            className="bg-purple-600 hover:bg-purple-700"
            onClick={onCreateStory}
          >
            <Icon name="Plus" size={16} className="mr-2" />
            Создать Story
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {/* Pricing Info */}
        <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h3 className="font-semibold text-blue-900 mb-2">Тарифы Stories</h3>
          <div className="grid gap-2 md:grid-cols-2 text-sm">
            <div className="flex justify-between">
              <span>Неделя (7 дней):</span>
              <span className="font-medium">100₽ (97₽ с кошелька -3%)</span>
            </div>
            <div className="flex justify-between">
              <span>Месяц (30 дней):</span>
              <span className="font-medium">500₽ (485₽ с кошелька -3%)</span>
            </div>
          </div>
        </div>

        {stories.length === 0 ? (
          <div className="text-center py-8">
            <Icon
              name="Camera"
              size={48}
              className="mx-auto text-gray-300 mb-4"
            />
            <p className="text-gray-500">Пока нет созданных Stories</p>
            <p className="text-sm text-gray-400 mt-2">
              Создавайте Stories для продвижения товаров на главной странице
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {stories.map((story) => (
              <Card key={story.id} className="overflow-hidden">
                <div className="flex gap-4 p-4">
                  <img
                    src={story.image || "/placeholder.svg"}
                    alt={story.title}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold">{story.title}</h4>
                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                          {story.description}
                        </p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Icon name="Eye" size={12} />
                            {story.views}
                          </span>
                          <span className="flex items-center gap-1">
                            <Icon name="MousePointer" size={12} />
                            {story.clicks}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          className={
                            story.isActive ? "bg-green-500" : "bg-gray-500"
                          }
                        >
                          {story.isActive ? "Активна" : "Неактивна"}
                        </Badge>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => onDeleteStory?.(story.id)}
                          className="text-red-600"
                        >
                          <Icon name="Trash2" size={14} />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
