"use client";

import { useEffect, useState } from "react";
import { getAdminUserList, deleteAdminUser } from "@/util/boardApi";
import './memberAdmin.css'

export default function UserManagementPage() {
  const [userData, setUserData] = useState<any>(null); 
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  
  const fetchUsers = async (page: number) => {
    setIsLoading(true);
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      
      const data = await getAdminUserList(token, page);
      setUserData(data);
    } catch (error) {
      console.error("목록 로드 실패:", error);
      alert("데이터를 불러오는 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  
  const handleDelete = async (id: number) => {
    if (!confirm("해당 회원을 강제 탈퇴 처리하시겠습니까?\n작성한 게시글도 모두 삭제됩니다.")) return;

    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await deleteAdminUser(token, id);
      if (res.ok) {
        alert("처리가 완료되었습니다.");
        fetchUsers(currentPage); 
      }
    } catch (error) {
      alert("삭제 처리 중 오류가 발생했습니다.");
    }
  };

  if (isLoading && !userData) return <div className="admin-main">데이터 로딩 중...</div>;

  return (
    <div>
      <h1 className="admin-title">회원 관리</h1>
      <p className="write-subtitle">전체 회원 목록을 조회하고 관리할 수 있습니다.</p>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>이메일</th>
              <th>이름</th>
              <th>닉네임</th>
              <th>권한</th>
              <th>가입일</th>
              <th>관리</th>
            </tr>
          </thead>
         <tbody>
  {userData?.content.map((user: any) => {
    
    const isHighPrivilege = user.role === 'ADMIN' || user.role === 'MASTER';
    
    return (
      <tr key={user.id} style={{ opacity: user.isDeleted ? 0.5 : 1 }}>
        <td>{user.id}</td>
        <td>{user.email}</td>
        <td>{user.name}</td>
        <td>{user.nickName}</td>
        <td>
          <span className={`badge ${
            user.role === 'MASTER' ? 'badge-master' : 
            user.role === 'ADMIN' ? 'badge-admin' : 'badge-user'
          }`}>
            {user.role}
          </span>
        </td>
        <td>{user.createTime ? new Date(user.createTime).toLocaleDateString() : "-"}</td>
        <td>
          {}
          {user.isDeleted ? (
            <span style={{ color: '#aaa', fontSize: '12px' }}>탈퇴됨</span>
          ) : isHighPrivilege ? (
            
            <span className="text-restricted">보호됨</span>
          ) : (
            
            <button className="btn-delete" onClick={() => handleDelete(user.id)}>
              강제탈퇴
            </button>
          )}
        </td>
      </tr>
    );
  })}
</tbody>
        </table>
      </div>

      {}
      <div className="pagination">
        <button 
          className="page-btn" 
          disabled={userData?.first} 
          onClick={() => setCurrentPage(prev => prev - 1)}
        >
          이전
        </button>
        
        <span className="current-page-info">
          <strong>{userData?.number + 1}</strong> / {userData?.totalPages} 페이지
        </span>

        <button 
          className="page-btn" 
          disabled={userData?.last} 
          onClick={() => setCurrentPage(prev => prev + 1)}
        >
          다음
        </button>
      </div>
    </div>
  );
}