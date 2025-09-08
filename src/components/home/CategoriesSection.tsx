import { Link } from "react-router-dom";

export default function CategoriesSection() {
  return (
    <div className="flex justify-center items-center space-x-6 mb-8">
      <Link
        to="/electronics"
        className="relative w-12 h-12 bg-gradient-to-br from-brand-primary/10 to-brand-secondary/10 rounded-full flex items-center justify-center hover:from-brand-primary/20 hover:to-brand-secondary/20 transition-all duration-300 group"
        title="Электроника"
      >
        <svg
          className="w-6 h-6 text-primary group-hover:scale-110 transition-transform"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
          />
        </svg>
      </Link>

      <Link
        to="/clothing"
        className="relative w-12 h-12 bg-gradient-to-br from-pink-100 to-brand-accent/10 rounded-full flex items-center justify-center hover:from-pink-200 hover:to-brand-accent/20 transition-all duration-300 group"
        title="Одежда"
      >
        <svg
          className="w-6 h-6 text-accent group-hover:scale-110 transition-transform"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4 4 4 0 004-4V5z"
          />
        </svg>
      </Link>

      <Link
        to="/home-garden"
        className="relative w-12 h-12 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center hover:from-green-200 hover:to-emerald-200 transition-all duration-300 group"
        title="Дом и сад"
      >
        <svg
          className="w-6 h-6 text-green-600 group-hover:scale-110 transition-transform"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap pointer-events-none">
          Дом и сад
        </div>
      </Link>

      <Link
        to="/sport"
        className="relative w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center hover:bg-orange-200 transition-all duration-300 group"
        title="Спорт"
      >
        <svg
          className="w-6 h-6 text-orange-600 group-hover:scale-110 transition-transform"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap pointer-events-none">
          Спорт
        </div>
      </Link>

      <Link
        to="/beauty"
        className="relative w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center hover:bg-purple-200 transition-all duration-300 group"
        title="Красота"
      >
        <svg
          className="w-6 h-6 text-purple-600 group-hover:scale-110 transition-transform"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap pointer-events-none">
          Красота
        </div>
      </Link>

      <Link
        to="/books"
        className="relative w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center hover:bg-indigo-200 transition-all duration-300 group"
        title="Книги"
      >
        <svg
          className="w-6 h-6 text-indigo-600 group-hover:scale-110 transition-transform"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap pointer-events-none">
          Книги
        </div>
      </Link>
    </div>
  );
}