import { useState } from "react";
import { useLocation } from "@/hooks/useLocation";
import { useAuth } from "@/context/AuthContext";
import TopBar from "./TopBar";
import Logo from "./Logo";
import CatalogButton from "./CatalogButton";
import SearchBar from "./SearchBar";
import Navigation from "./Navigation";
import LocationModal from "./LocationModal";
import MobileBottomMenu from "./MobileBottomMenu";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const [showCityDropdown, setShowCityDropdown] = useState(false);

  const {
    city,
    showLocationRequest,
    requestLocation,
    declineLocation,
    selectCity,
  } = useLocation();

  const { user } = useAuth();
  // Проверяем, авторизован ли пользователь
  const isLoggedIn =
    !!user ||
    localStorage.getItem("user-token") ||
    localStorage.getItem("seller-token");

  return (
    <>
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <TopBar
          city={city}
          showCityDropdown={showCityDropdown}
          setShowCityDropdown={setShowCityDropdown}
          selectCity={selectCity}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Logo />

            <CatalogButton
              isCatalogOpen={isCatalogOpen}
              setIsCatalogOpen={setIsCatalogOpen}
            />

            <SearchBar />

            {/* Десктопная навигация - скрываем на мобильных */}
            <div className="hidden md:block">
              <Navigation
                isLoggedIn={isLoggedIn}
                isMenuOpen={isMenuOpen}
                setIsMenuOpen={setIsMenuOpen}
              />
            </div>
          </div>
        </div>

        <LocationModal
          show={showLocationRequest}
          onRequestLocation={requestLocation}
          onDeclineLocation={declineLocation}
        />
      </header>

      {/* Мобильное меню снизу */}
      <MobileBottomMenu />
    </>
  );
};

export default Header;