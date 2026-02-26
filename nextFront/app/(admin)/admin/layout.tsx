"use client";

import "./admin.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode"; 

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    
    const token = localStorage.getItem("token");

    if (!token) {
      alert("로그인이 필요합니다.");
      router.replace("/authLogin");
      return;
    }

    try {
      
      const decoded: any = jwtDecode(token);
      
      
      
      const userRole = decoded.auth || decoded.role; 

      console.log("현재 사용자 권한:", userRole); 

      
      if (userRole === "ADMIN" || userRole === "MASTER") {
        setIsAuthorized(true);
      } else {
        alert("관리자 접근 권한이 없습니다. (현재 권한: " + userRole + ")");
        router.replace("/"); 
      }
    } catch (error) {
      console.error("토큰 검증 실패:", error);
      alert("로그인 정보가 올바르지 않습니다.");
      localStorage.removeItem("token"); 
      router.replace("/authLogin");
    }

  }, [router]);

  
  if (!isAuthorized) {
    return (
      <div className="admin-loading" style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh', 
        fontSize: '1.2rem', 
        fontWeight: 'bold' 
      }}>
        <p>관리자 권한을 확인 중입니다...</p>
      </div>
    );
  }

  return (
    <div className="admin-wrapper">
      {}
      <aside className="admin-sidebar">
        <h2>ADMIN</h2>
        <nav className="admin-nav">
          <Link href="/admin" className="admin-nav-item">메인페이지</Link>
          <Link href="/admin/member" className="admin-nav-item">회원 관리</Link>
          <Link href="/admin/board" className="admin-nav-item">게시글 관리</Link>
          <Link href="/admin/notice/list" className="admin-nav-item">공지사항 관리</Link>
          <Link href="/" className="admin-nav-item" style={{marginTop: '50px', color: '#ff6b6b'}}>
            메인으로 이동
          </Link>
        </nav>
      </aside>

      {}
      <main className="admin-main">
        <div className="admin-content-container">
          {children}
        </div>
      </main>
    </div>
  );
}