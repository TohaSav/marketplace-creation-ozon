import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Story } from "@/types/seller-dashboard.types";

interface StoriesTabProps {
  stories: Story[];
  onCreateStory?: () => void;
  onDeleteStory?: (storyId: number) => void;
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
        {stories.length === 0 ? (
          <div className="text-center py-8">
            <Icon
              name="Camera"
              size={48}
              className="mx-auto text-gray-300 mb-4"
            />
            <p className="text-gray-500">Пока нет созданных Stories</p>
            <p className="text-sm text-gray-400 mt-2">
              Создавайте Stories для привлечения покупателей
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {stories.map((story) => (
              <Card key={story.id} className="overflow-hidden">
                <div className="aspect-[9/16] relative">
                  <img
                    src={
                      story.image
                        ? URL.createObjectURL(story.image)
                        : "/placeholder.svg"
                    }
                    alt="Story"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => onDeleteStory?.(story.id)}
                    >
                      <Icon name="Trash2" size={14} />
                    </Button>
                  </div>
                </div>
                <div className="p-2">
                  <p className="text-xs text-gray-600 truncate">
                    Товар ID: {story.productId}
                  </p>
                  {story.discount && (
                    <Badge className="text-xs mt-1">
                      Скидка {story.discount}%
                    </Badge>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
