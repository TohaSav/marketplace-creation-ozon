import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <div className="flex items-center">
      <Link to="/" className="cursor-pointer hover:opacity-90">
        <img
          src="https://cdn.poehali.dev/files/9f25042d-dade-4251-bc28-a3be03872fdf.png"
          alt="Calibre Store"
          className="h-10 w-auto"
        />
      </Link>
    </div>
  );
};

export default Logo;
