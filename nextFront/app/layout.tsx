// src/app/layout.tsx
import ChatFloatingButton from "@/components/common/ChatFloatingButton";
import { AuthProvider } from "@/src/context/AuthContext";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body suppressHydrationWarning={true}>
        {/* 🚀 AuthProvider로 감싸야 버튼이 실시간으로 반응합니다. */}
        <AuthProvider>
          {children}
          <ChatFloatingButton />
        </AuthProvider>
      </body>
    </html>
  );
}
