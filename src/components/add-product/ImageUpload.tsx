import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Icon from "@/components/ui/icon";

interface ImageUploadProps {
  image: File | null;
  onImageChange: (file: File | null) => void;
}

export default function ImageUpload({
  image,
  onImageChange,
}: ImageUploadProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onImageChange(e.target.files[0]);
    }
  };

  const removeImage = () => {
    onImageChange(null);
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="image">Изображение товара</Label>
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
        {image ? (
          <div className="space-y-4">
            <img
              src={URL.createObjectURL(image)}
              alt="Preview"
              className="mx-auto h-32 w-32 object-cover rounded-lg"
            />
            <p className="text-sm text-gray-600">{image.name}</p>
            <Button type="button" variant="outline" onClick={removeImage}>
              Удалить изображение
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <Icon name="Upload" size={48} className="mx-auto text-gray-400" />
            <div>
              <label htmlFor="image" className="cursor-pointer">
                <span className="text-blue-600 hover:text-blue-700 font-medium">
                  Нажмите для загрузки
                </span>
                <span className="text-gray-600"> или перетащите файл сюда</span>
              </label>
              <input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
            <p className="text-xs text-gray-500">PNG, JPG, GIF до 10MB</p>
          </div>
        )}
      </div>
    </div>
  );
}
