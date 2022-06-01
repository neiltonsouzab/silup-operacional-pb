import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import api from '../services/api';

interface User {
  id: number;
  name: string;
  cpf: string;
}

interface AuthState {
  user: User;
  token: string;
}

interface SignCredentials {
  cpf: string;
  password: string;
}

interface AuthContextData {
  user: User;
  loading: boolean;
  signIn(credentials: SignCredentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>({} as AuthState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStoragedData(): Promise<void> {
      const [token, user] = await AsyncStorage.multiGet([
        '@silup:token',
        '@silup:user',
      ]);

      if (token[1] && user[1]) {
        api.defaults.params = {
          TOKEN_USER: token[1],
        };

        setData({
          token: token[1],
          user: JSON.parse(user[1]),
        });
      }

      setLoading(false);
    }

    loadStoragedData();
  }, []);

  const signIn = useCallback(async ({ cpf, password }) => {
    const response = await api.get('/logar', {
      params: {
        usuario: cpf,
        password,
      },
    });

    const { status, message, data: responseData } = response.data;

    if (!status) {
      throw Error(message);
    }

    const { id, usuario, nombre, tk_acesso_users } = responseData;
    const user = { id, cpf: usuario, name: nombre };
    const token = tk_acesso_users;

    await AsyncStorage.multiSet([
      ['@silup:token', token],
      ['@silup:user', JSON.stringify(user)],
    ]);

    api.defaults.params = {
      TOKEN_USER: token,
    };

    setData({ token, user });
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove(['@silup:token', '@silup:user']);

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
