"use client";

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { getNoticeList, deleteNotice } from "@/util/noticeApi"; 
import "./noticelist.css"; 

function AdminNoticeListContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const page = parseInt(searchParams.get("page") || "0");
  const [data, setData] = useState<any>(null);

  
  const loadNotices = () => {
    getNoticeList(page, 10).then(setData);
  };

  useEffect(() => {
    loadNotices();
  }, [page]);

  
  const handleDelete = async (id: string, title: string) => {
    if (confirm(`[${title}]\n이 공지사항을 삭제하시겠습니까?`)) {
      try {
        await deleteNotice(id);
        alert("삭제되었습니다.");
        loadNotices(); 
      } catch (e) {
        alert("삭제 실패");
      }
    }
  };

  if (!data) return <div className="loading-state">공지사항 목록을 불러오는 중...</div>;

  return (
    <div className="board-container" style={{ maxWidth: '1100px' }}>
      <div className="board-header">
        <div className="header-text">
          <h1 className="board-title">📢 공지사항 관리</h1>
          <p className="board-subtitle">공지사항을 작성하고 수정하거나 삭제할 수 있습니다.</p>
        </div>
        <Link href="/admin/notice/write">
          <button className="btn-write-main" style={{ backgroundColor: '#e11d48' }}>새 공지 작성</button>
        </Link>
      </div>

      <div className="board-list-wrapper">
        {data.content.length > 0 ? (
          data.content.map((notice: any) => (
            <div key={notice.id} className="list-item" style={{ cursor: 'default', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                <div className="item-id-badge" style={{ backgroundColor: notice.isPinned ? '#e11d48' : '#666' }}>
                  {notice.isPinned ? "고정" : notice.id}
                </div>
                <div className="item-content-wrap">
                  <Link href={`/board/notice/${notice.id}`}>
                    <span className="item-title-text" style={{ fontWeight: notice.isPinned ? 'bold' : 'normal' }}>
                        {notice.title}
                    </span>
                  </Link>
                  <div className="item-info-row">
                    <span className="item-author">{notice.writer}</span>
                    <span className="divider">|</span>
                    <span className="item-date">{new Date(notice.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              {}
              <div style={{ display: 'flex', gap: '10px', marginLeft: '20px' }}>
                <button 
                  onClick={() => router.push(`/admin/notice/edit/${notice.id}`)}
                  style={{ padding: '6px 12px', borderRadius: '4px', border: '1px solid #2563eb', color: '#2563eb', background: '#fff', cursor: 'pointer' }}
                >
                  수정
                </button>
                <button 
                  onClick={() => handleDelete(notice.id, notice.title)}
                  style={{ padding: '6px 12px', borderRadius: '4px', border: 'none', color: '#fff', background: '#ef4444', cursor: 'pointer' }}
                >
                  삭제
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-state">등록된 공지사항이 없습니다.</div>
        )}
      </div>

      {}
      <div className="pagination-container">
        <button className="page-nav-btn" disabled={data.first} onClick={() => router.push(`/admin/notice/list?page=${page - 1}`)}>&lt; 이전</button>
        <div className="page-numbers">
          <span className="current-page">{page + 1}</span>
          <span className="total-pages">/ {data.totalPages || 1}</span>
        </div>
        <button className="page-nav-btn" disabled={data.last} onClick={() => router.push(`/admin/notice/list?page=${page + 1}`)}>다음 &gt;</button>
      </div>
    </div>
  );
}

export default function AdminNoticeListPage() {
  return (
    <Suspense fallback={<div className="loading-state">페이지 로딩 중...</div>}>
      <AdminNoticeListContent />
    </Suspense>
  );
}