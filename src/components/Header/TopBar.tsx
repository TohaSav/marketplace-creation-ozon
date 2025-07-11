import { Link } from "react-router-dom";
import CitySelector from "./CitySelector";

interface TopBarProps {
  city: string;
  showCityDropdown: boolean;
  setShowCityDropdown: (show: boolean) => void;
  selectCity: (city: string) => void;
}

const TopBar = ({
  city,
  showCityDropdown,
  setShowCityDropdown,
  selectCity,
}: TopBarProps) => {
  return (
    <div className="bg-[#f6f7f8] border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <div className="flex items-center justify-between h-8 text-xs">
          {/* Mobile: Show only essential links */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <Link
              to="/seller/register"
              className="text-gray-600 hover:text-blue-600 transition-colors hidden sm:block"
            >
              Продавайте на Calibre Store
            </Link>
            <Link
              to="/seller/register"
              className="text-gray-600 hover:text-blue-600 transition-colors sm:hidden"
            >
              Продавать
            </Link>
            <Link
              to="/support"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Помощь
            </Link>
          </div>

          {/* Mobile: Compact city selector */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <span className="text-gray-600 hidden sm:block">Пункты выдачи</span>
            <CitySelector
              city={city}
              showDropdown={showCityDropdown}
              setShowDropdown={setShowCityDropdown}
              onSelectCity={selectCity}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
