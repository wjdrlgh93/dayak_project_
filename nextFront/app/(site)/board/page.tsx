"use client";

import { useEffect, useState, Suspense, useMemo } from "react";
import Link from "next/link";
import { getBoardList } from "@/util/boardApi";
import { useSearchParams, useRouter } from "next/navigation";
import api from "@/util/api";
import "./boardlist.css";

function BoardListContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const page = parseInt(searchParams.get("page") || "0");
  
  const [boardData, setBoardData] = useState<any>(null);
  const [noticeData, setNoticeData] = useState<any[]>([]);

  useEffect(() => {
    
    Promise.all([
      getBoardList(page),
      api.get(`/api/notice/list?page=0&size=5`)
    ]).then(([boardRes, noticeRes]) => {
      setBoardData(boardRes);
      setNoticeData(noticeRes.data.content || []);
    });
  }, [page]);

  
  const unifiedList = useMemo(() => {
    if (!boardData) return [];
    
    const pinnedNotices = noticeData
      .filter((n: any) => n.isPinned)
      .map((n: any) => ({ ...n, isNotice: true }));

    const regularPosts = boardData.content || [];

    return [...pinnedNotices, ...regularPosts];
  }, [boardData, noticeData]);

  if (!boardData) return <div className="loading-state">로딩 중...</div>;

  return (
    <div className="board-container">
      <div className="board-header">
        <div className="header-text">
          <h1 className="board-title">커뮤니티</h1>
          <p className="board-subtitle">새로운 소식과 다양한 이야기를 만나보세요.</p>
        </div>
        <Link href="/board/write">
          <button className="btn-write-main">글쓰기</button>
        </Link>
      </div>

      <div className="board-list-wrapper">
        {unifiedList.map((item: any) => (
          <Link 
            key={item.isNotice ? `notice-${item.id}` : `post-${item.id}`}
            href={item.isNotice ? `/board/notice/${item.id}` : `/board/${item.id}`}
            className={`list-item ${item.isNotice ? "notice-row" : ""}`}
          >
            <div className={`item-id-badge ${item.isNotice ? "badge-notice" : ""}`}>
              {item.isNotice ? "NOTICE" : item.id}
            </div>

            <div className="item-content-wrap">
              <span className={`item-title-text ${item.isNotice ? "text-notice" : ""}`}>
                {item.title}
              </span>
              <div className="item-info-row">
                <span className="item-author">{item.isNotice ? "관리자" : item.userNickname}</span>
                <span className="divider">|</span>
                <span className="item-date">{new Date(item.createdAt).toLocaleDateString()}</span>
                {!item.isNotice && (
                  <>
                    <span className="divider">|</span>
                    <span>조회 {item.viewCount}</span>
                  </>
                )}
              </div>
            </div>
            
            <div className="item-arrow" style={{ opacity: 0.3 }}>
              {item.isNotice ? "📌" : "→"}
            </div>
          </Link>
        ))}
      </div>

      {}
      <div className="pagination-container">
        <button className="page-nav-btn" disabled={boardData.first} onClick={() => router.push(`/board?page=${page - 1}`)}>이전</button>
        <div className="page-numbers">
          <span className="current-page">{page + 1}</span> / {boardData.totalPages}
        </div>
        <button className="page-nav-btn" disabled={boardData.last} onClick={() => router.push(`/board?page=${page + 1}`)}>다음</button>
      </div>
    </div>
  );
}

export default function BoardListPage() {
  return (
    <Suspense fallback={<div>불러오는 중...</div>}>
      <BoardListContent />
    </Suspense>
  );
}