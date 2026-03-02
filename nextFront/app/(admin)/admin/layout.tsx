"use client";

import "./admin.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode"; // 🚀 패키지 임포트 필수

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    // 1. 토큰 가져오기 (이전 로그인 로직에서 'token'이라는 이름으로 저장함)
    const token = localStorage.getItem("token");

    if (!token) {
      alert("로그인이 필요합니다.");
      router.replace("/authLogin");
      return;
    }

    try {
      // 2. 토큰 해독 (Payload 확인)
      const decoded: any = jwtDecode(token);

      // 🚀 핵심: 토큰에 담긴 권한 필드 이름 확인 (auth 또는 role)
      // 이전 로그를 보니 토큰에 "auth": "MEMBER" 라고 되어 있었습니다.
      const userRole = decoded.auth || decoded.role;

      console.log("현재 사용자 권한:", userRole); // 디버깅용 로그

      // 3. 권한 검사
      if (userRole === "ADMIN" || userRole === "MASTER") {
        setIsAuthorized(true);
      } else {
        alert("관리자 접근 권한이 없습니다. (현재 권한: " + userRole + ")");
        router.replace("/");
      }
    } catch (error) {
      console.error("토큰 검증 실패:", error);
      alert("로그인 정보가 올바르지 않습니다.");
      localStorage.removeItem("token"); // 잘못된 토큰 삭제
      router.replace("/authLogin");
    }
  }, [router]);

  // 권한 확인 전 로딩 화면
  if (!isAuthorized) {
    return (
      <div
        className="admin-loading"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          fontSize: "1.2rem",
          fontWeight: "bold",
        }}
      >
        <p>관리자 권한을 확인 중입니다...</p>
      </div>
    );
  }

  return (
    <div className="admin-wrapper">
      {/* 좌측 헤더(사이드바) */}
      <aside className="admin-sidebar">
        <h2>ADMIN</h2>
        <nav className="admin-nav">
          <Link href="/admin" className="admin-nav-item">
            메인페이지
          </Link>
          <Link href="/admin/member" className="admin-nav-item">
            회원 관리
          </Link>
          <Link href="/admin/board" className="admin-nav-item">
            게시글 관리
          </Link>
          <Link href="/admin/notice/list" className="admin-nav-item">
            공지사항 관리
          </Link>
          <Link
            href="/"
            className="admin-nav-item"
            style={{ marginTop: "50px", color: "#ff6b6b" }}
          >
            메인으로 이동
          </Link>
        </nav>
      </aside>

      {/* 우측 본문 */}
      <main className="admin-main">
        <div className="admin-content-container">{children}</div>
      </main>
    </div>
  );
}
