import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

export const useAuthRedirect = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Если пользователь авторизован, перенаправляем в соответствующий профиль
    if (user) {
      if (user.userType === 'seller') {
        // Продавцы идут в кабинет продавца
        navigate('/seller/dashboard', { replace: true });
      } else {
        // Покупатели идут в профиль
        navigate('/profile', { replace: true });
      }
    }
  }, [user, navigate]);
};

export default useAuthRedirect;