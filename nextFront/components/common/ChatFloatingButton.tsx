"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/src/context/AuthContext";
import ChatWindow from "../chat/ChatWindow";

export default function ChatFloatingButton() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isLoading, refreshUser } = useAuth(); // 🚀 로그인 정보 가져오기
  const pathname = usePathname();

  // 🚀 페이지가 바뀔 때마다 로그인 상태를 한 번 더 체크 (보안 강화)
  useEffect(() => {
    refreshUser();
  }, [pathname]);

  // 1. 메인 페이지("/")에서는 렌더링하지 않음
  if (pathname === "/") return null;

  // 2. 로딩 중이거나 로그인이 안 되어 있으면(user가 null이면) 절대 안 띄움
  if (isLoading || !user) return null;

  return (
    <div style={{ position: "relative" }}>
      {isOpen && (
        <div
          style={{
            position: "fixed",
            bottom: "100px",
            right: "30px",
            width: "360px",
            height: "550px",
            zIndex: 9999,
            backgroundColor: "#fff",
            borderRadius: "16px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
            overflow: "hidden",
            border: "1px solid #eee",
          }}
        >
          <ChatWindow
            userEmail={user.email} // 🚀 전역 유저 정보 사용
            userName={user.name}
            onClose={() => setIsOpen(false)}
          />
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: "fixed",
          bottom: "30px",
          right: "30px",
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          backgroundColor: "#3b82f6",
          color: "#fff",
          fontSize: "28px",
          border: "none",
          cursor: "pointer",
          zIndex: 9999,
          boxShadow: "0 4px 15px rgba(59, 130, 246, 0.4)",
          transition: "transform 0.2s ease",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        {isOpen ? "✖" : "💬"}
      </button>
    </div>
  );
}
