import Icon from "@/components/ui/icon";
import { Link } from "react-router-dom";

interface EmptyStateProps {
  icon: string;
  title: string;
  description: string;
  actionText?: string;
  actionLink?: string;
  className?: string;
}

const EmptyState = ({
  icon,
  title,
  description,
  actionText,
  actionLink,
  className = "",
}: EmptyStateProps) => {
  return (
    <div className={`text-center py-12 ${className}`}>
      <div className="flex justify-center mb-6">
        <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
          <Icon name={icon} size={48} className="text-gray-400" />
        </div>
      </div>

      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-6 max-w-md mx-auto">{description}</p>

      {actionText && actionLink && (
        <Link
          to={actionLink}
          className="inline-flex items-center px-6 py-3 bg-gradient-primary text-white rounded-lg hover:opacity-90 transition-all duration-300 shadow-md"
        >
          {actionText}
        </Link>
      )}
    </div>
  );
};

export default EmptyState;
