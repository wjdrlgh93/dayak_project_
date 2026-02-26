"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { jwtDecode } from "jwt-decode";

export default function AdminDashboard() {
  const [userRole, setUserRole] = useState<string>("");

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        
        console.log("토큰에서 추출한 권한:", decoded.auth); 
        
        
        setUserRole(decoded.auth || ""); 
      } catch (error) {
        console.error("토큰 해독 실패:", error);
      }
    }
  }, []);

  
  const allMenus = [
    { title: "회원 관리", path: "/admin/member", icon: "👤", roles: ["MASTER", "ADMIN", "MANAGER"] },
    { title: "게시물 관리", path: "/admin/board", icon: "📝", roles: ["MASTER", "ADMIN", "MANAGER"] },
    { title: "일반의약품 관리", path: "/admin/druggen", icon: "💊", roles: ["MASTER", "ADMIN"] },
    { title: "전문의약품 동기화", path: "/admin/drugpro", icon: "💉", roles: ["MASTER", "ADMIN"] },
    { title: "약국목록 동기화", path: "/admin/pharmacy", icon: "🏥", roles: ["MASTER", "ADMIN"] },
    { title: "공지사항 작성", path: "/admin/notice/write", icon: "📢", roles: ["MASTER", "ADMIN", "MANAGER"] }, 
    { title: "공지사항 리스트", path: "/admin/notice/list", icon: "📢", roles: ["MASTER", "ADMIN", "MANAGER"] }, 
  ];

  
  const filteredMenus = allMenus.filter(menu => menu.roles.includes(userRole));

  return (
    <div className="admin-container">
      <div className="write-header" style={{ padding: '20px', textAlign: 'center' }}>
        <h1 className="admin-title">관리자 대시보드</h1>
        <p className="write-subtitle">
            현재 권한: <span style={{ color: '#4f46e5', fontWeight: 'bold' }}>{userRole}</span>
        </p>
      </div>
      
      <div className="dashboard-grid">
        {filteredMenus.map((menu, index) => (
          <Link href={menu.path} key={index} className="dashboard-card">
            <div className="card-icon">{menu.icon}</div>
            <div className="card-title">{menu.title}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}