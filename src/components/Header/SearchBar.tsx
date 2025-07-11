import Icon from "@/components/ui/icon";

const SearchBar = () => {
  return (
    <div className="flex-1 max-w-2xl mx-8">
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
  );
};

export default SearchBar;
