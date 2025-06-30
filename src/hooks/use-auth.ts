import { login as loginApi, LoginParams, logout as logoutApi } from '@/api/services/auth';
import { useAuthStore } from '@/stores/auth-store';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const navigate = useNavigate();
  const { setTokens, clearAuth, isAuthenticated } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ username: '', password: '' });

  const login = async (params: LoginParams) => {

    setLoading(true);
    try {
      const { code, data } = await loginApi({
        ...params,
      });

      if (code === 200 && data?.jwtToken) {
        setTokens(
          data.jwtToken,
          null
        );

        navigate('/home')
      } else if (code === 601) {
        setErrors({ ...errors, password: '비밀번호가 일치하지 않습니다.' });
      } else {
        alert('로그인 요청에 실패하였습니다.');
      }

      console.log(code)
      console.log(data)
    } catch (error) {
      console.log('error',error);
      alert('로그인 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logoutApi();
    } finally {
      clearAuth();
      navigate('/login');
      setLoading(false);
    }
  };

  return {
    login,
    logout: handleLogout,
    loading,
    errors,
    isAuthenticated
  };
};