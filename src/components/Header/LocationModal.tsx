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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-sm sm:max-w-md mx-auto max-h-[90vh] overflow-y-auto">
        <div className="p-4 sm:p-6">
          <div className="flex items-center mb-4">
            <Icon name="MapPin" size={24} className="text-blue-600 mr-2 flex-shrink-0" />
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
              Определить ваш город?
            </h3>
          </div>
          <p className="text-gray-600 mb-6 text-sm sm:text-base leading-relaxed">
            Мы можем определить ваш город автоматически, чтобы показать актуальные
            цены и условия доставки.
          </p>
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
            <button
              onClick={onRequestLocation}
              className="w-full sm:flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-colors font-medium text-sm sm:text-base"
            >
              Разрешить
            </button>
            <button
              onClick={onDeclineLocation}
              className="w-full sm:flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 active:bg-gray-300 transition-colors font-medium text-sm sm:text-base"
            >
              Отказаться
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationModal;