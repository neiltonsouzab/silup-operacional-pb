import React from 'react';

import Loading from '../components/Loading';

import { useAuth } from '../hooks/auth';

import AppRoutes from './app.routes';
import AuthRoutes from './auth.routes';

const Routes: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loading text="Carregando..." />;
  }

  return user ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;
