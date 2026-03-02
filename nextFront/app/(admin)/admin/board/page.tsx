"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getAdminBoardList, deleteAdminBoard } from "@/util/boardApi";
import '../member/memberAdmin.css'; 

export default function BoardManagementPage() {
  const [boardData, setBoardData] = useState<any>(null); 
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const fetchBoards = async (page: number) => {
    setIsLoading(true);
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const data = await getAdminBoardList(token, page);
      setBoardData(data);
    } catch (error) {
      console.error("목록 로드 실패:", error);
      alert("게시글 목록을 불러오는 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBoards(currentPage);
  }, [currentPage]);

  const handleDelete = async (id: number) => {
    if (!confirm("이 게시글을 영구적으로 삭제하시겠습니까?\n삭제된 데이터는 복구할 수 없습니다.")) return;

    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await deleteAdminBoard(token, id);
      if (res.ok) {
        alert("게시글이 삭제되었습니다.");
        fetchBoards(currentPage); 
      } else {
        alert("삭제 권한이 없거나 오류가 발생했습니다.");
      }
    } catch (error) {
      alert("삭제 처리 중 통신 오류가 발생했습니다.");
    }
  };

  if (isLoading && !boardData) return <div className="admin-main">데이터 로딩 중...</div>;

  return (
    <div className="admin-users-container">
      <h1 className="admin-title">게시물 관리</h1>
      <p className="write-subtitle">전체 게시글을 모니터링하고 부적절한 콘텐츠를 삭제할 수 있습니다.</p>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>번호</th>
              <th>제목</th>
              <th>작성자</th>
              <th>조회수</th>
              <th>작성일</th>
              <th>관리</th>
            </tr>
          </thead>
          <tbody>
  {boardData?.content.map((post: any) => (
    <tr key={post.id}>
      <td data-label="번호">{post.id}</td>
      
      {/* 🚀 제목 클릭 시 해당 게시물로 이동 */}
      <td data-label="제목" style={{ textAlign: 'left', fontWeight: '500' }}>
        <Link 
          href={`/board/${post.id}`} // 👈 요청하신 board/[id] 형식
          className="admin-board-link"
          style={{ 
            textDecoration: 'none', 
            color: '#1e293b',
            cursor: 'pointer' 
          }}
        >
          {post.title}
        </Link>
      </td>

      <td data-label="작성자">{post.userNickname}</td>
      <td data-label="조회수">{post.viewCount.toLocaleString()}</td>
      <td data-label="작성일">
        {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : "-"}
      </td>
      <td data-label="관리">
        <button className="btn-delete" onClick={() => handleDelete(post.id)}>
          삭제
        </button>
      </td>
    </tr>
  ))}
</tbody>
        </table>
      </div>

      <div className="pagination">
        <button 
          className="page-btn" 
          disabled={boardData?.first} 
          onClick={() => setCurrentPage(prev => prev - 1)}
        >
          이전
        </button>
        
        <span className="current-page-info">
          <strong>{boardData?.number + 1}</strong> / {boardData?.totalPages} 페이지
        </span>

        <button 
          className="page-btn" 
          disabled={boardData?.last} 
          onClick={() => setCurrentPage(prev => prev + 1)}
        >
          다음
        </button>
      </div>
    </div>
  );
}