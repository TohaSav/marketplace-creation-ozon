import Icon from "@/components/ui/icon";

interface LocationModalProps {
  show: boolean;
  onRequestLocation: () => void;
  onDeclineLocation: () => void;
}

const LocationModal = ({
  show,
  onRequestLocation,
  onDeclineLocation,
}: LocationModalProps) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md mx-4">
        <div className="flex items-center mb-4">
          <Icon name="MapPin" size={24} className="text-blue-600 mr-2" />
          <h3 className="text-lg font-semibold">Определить ваш город?</h3>
        </div>
        <p className="text-gray-600 mb-6">
          Мы можем определить ваш город автоматически, чтобы показать актуальные
          цены и условия доставки.
        </p>
        <div className="flex space-x-3">
          <button
            onClick={onRequestLocation}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Разрешить
          </button>
          <button
            onClick={onDeclineLocation}
            className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Отказаться
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocationModal;
