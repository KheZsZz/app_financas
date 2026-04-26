import React, { createContext, useContext, useEffect, useState } from "react";
import Toast from 'react-native-toast-message';
import { Session } from "@supabase/supabase-js";
import { supabase } from "@/config/supabase";
import { UserSchema, UserType } from "@/schemas/user.schema";
import api from "@/services/axios";

interface AuthContextProps {
  user: UserType | null;
  session: Session | null;
  isInitializing: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);

  const getUserProfile = async (token: string) => {
    try {
      // Usando axios (o método GET já é padrão)
      const { data } = await api.get('/users', {
        headers: { Authorization: `Bearer ${token}` },
      });

      const result = UserSchema.safeParse(data);

      if (result.success) {
        setUser(result.data);
      } else {
        setUser(null);
        Toast.show({
          type: 'error',
          text1: 'Dados corrompidos',
          text2: 'O perfil retornado pelo servidor é inválido.',
        });
      }
    } catch (error: any) {
      setUser(null);
      Toast.show({
        type: 'error',
        text1: 'Erro de conexão',
        text2: error?.response?.data?.message || 'Não foi possível carregar seu perfil.',
      });
    }
  };

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, _session) => {
      setSession(_session);
      
      if (_session?.access_token) {
        await getUserProfile(_session.access_token);
      } else {
        setUser(null);
      }
      
      setIsInitializing(false);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
    } catch (error) {
      console.error("Erro ao deslogar:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, session, isInitializing, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);