import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  userType?: 'user' | 'seller';
  redirectTo?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  userType, 
  redirectTo 
}) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Если нет пользователя, перенаправляем на логин
    if (!user) {
      navigate('/login', { replace: true });
      return;
    }

    // Если указан тип пользователя и он не совпадает
    if (userType && user.userType !== userType) {
      if (user.userType === 'seller') {
        navigate('/seller/dashboard', { replace: true });
      } else {
        navigate('/profile', { replace: true });
      }
      return;
    }

    // Если указан конкретный редирект
    if (redirectTo) {
      navigate(redirectTo, { replace: true });
      return;
    }
  }, [user, userType, redirectTo, navigate]);

  // Показываем контент только если пользователь авторизован и соответствует типу
  if (!user) {
    return null;
  }

  if (userType && user.userType !== userType) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;