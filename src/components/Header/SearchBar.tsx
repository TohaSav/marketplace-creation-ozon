import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const SearchBar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current && 
        !searchRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsSearchOpen(false);
      }
    };

    if (isSearchOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSearchOpen]);

  return (
    <>
      {/* Десктоп версия - обычное поле поиска */}
      <div className="flex-1 max-w-2xl mx-8 hidden sm:block">
        <div className="relative">
          <input
            type="text"
            placeholder="Искать на Calibre Store"
            className="w-full pl-4 pr-12 py-3 rounded-lg border-2 border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 text-sm"
          />
          <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-primary text-white p-2 rounded-md hover:opacity-90 transition-all duration-300 shadow-md">
            <Icon name="Search" size={16} />
          </button>
        </div>
      </div>

      {/* Мобильная версия - только иконка */}
      <div className="sm:hidden">
        <button
          ref={buttonRef}
          onClick={() => setIsSearchOpen(!isSearchOpen)}
          className="p-2 text-gray-600 hover:text-primary transition-colors"
        >
          <Icon name={isSearchOpen ? "X" : "Search"} size={20} />
        </button>
      </div>

      {/* Выпадающее поле поиска для мобильных */}
      {isSearchOpen && (
        <div ref={searchRef} className="fixed top-16 left-0 right-0 bg-white border-b border-gray-200 p-4 z-50 sm:hidden shadow-md">
          <div className="relative">
            <input
              type="text"
              placeholder="Искать на Calibre Store"
              className="w-full pl-4 pr-12 py-3 rounded-lg border-2 border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 text-sm"
              autoFocus
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-primary text-white p-2 rounded-md hover:opacity-90 transition-all duration-300 shadow-md">
              <Icon name="Search" size={16} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchBar;