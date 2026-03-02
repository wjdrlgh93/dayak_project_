"use client";

import { createContext, useContext, useEffect, useState } from "react";
import api from "@/util/api";

interface AuthContextType {
  user: { email: string; name: string } | null;
  isLoading: boolean;
  refreshUser: () => Promise<void>; // 로그인 후 정보를 다시 불러올 때 사용
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<{ email: string; name: string } | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);

  const refreshUser = async () => {
    // ⚠️ api.ts에서 'token'을 사용하므로 여기서도 'token'을 확인합니다.
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;

    if (!token) {
      setUser(null);
      setIsLoading(false);
      return;
    }

    try {
      const res = await api.get("/api/member/detail");
      setUser({ email: res.data.email, name: res.data.nickName });
    } catch (err) {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
