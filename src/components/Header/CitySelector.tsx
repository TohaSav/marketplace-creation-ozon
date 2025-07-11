import { useState, useEffect } from "react";
import { russianCities } from "@/data/cities";
import Icon from "@/components/ui/icon";

interface CitySelectorProps {
  city: string;
  showDropdown: boolean;
  setShowDropdown: (show: boolean) => void;
  onSelectCity: (city: string) => void;
}

const CitySelector = ({
  city,
  showDropdown,
  setShowDropdown,
  onSelectCity,
}: CitySelectorProps) => {
  const [citySearch, setCitySearch] = useState("");

  const filteredCities = russianCities.filter((cityName) =>
    cityName.toLowerCase().includes(citySearch.toLowerCase()),
  );

  const handleSelectCity = (selectedCity: string) => {
    onSelectCity(selectedCity);
    setShowDropdown(false);
    setCitySearch("");
  };

  // Закрытие выпадающего меню при клике вне его
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showDropdown && event.target instanceof Element) {
        const target = event.target as Element;
        if (!target.closest(".city-dropdown")) {
          setShowDropdown(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown, setShowDropdown]);

  return (
    <div className="relative city-dropdown">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="text-gray-600 hover:text-blue-600 transition-colors flex items-center space-x-1"
      >
        <span>{city}</span>
        <Icon name="ChevronDown" size={16} />
      </button>

      {showDropdown && (
        <div className="absolute top-full left-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <div className="p-3 border-b border-gray-200">
            <input
              type="text"
              placeholder="Поиск города..."
              value={citySearch}
              onChange={(e) => setCitySearch(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="max-h-60 overflow-y-auto">
            {filteredCities.map((cityName) => (
              <button
                key={cityName}
                onClick={() => handleSelectCity(cityName)}
                className="w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors"
              >
                {cityName}
              </button>
            ))}
            {filteredCities.length === 0 && (
              <div className="px-4 py-2 text-gray-500">Город не найден</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CitySelector;
