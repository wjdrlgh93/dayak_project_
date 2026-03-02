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
    // 🚀 공지와 게시글을 병렬로 호출 (공지는 항상 1페이지 5개만 가져옴) [cite: 2026-02-24]
    Promise.all([getBoardList(page), api.get(`/api/notice/list?page=0&size=5`)])
      .then(([boardRes, noticeRes]) => {
        setBoardData(boardRes);
        // 백엔드가 Page 객체를 반환하므로 .content 경로가 맞습니다. [cite: 2026-02-24]
        setNoticeData(noticeRes.data.content || []);
      })
      .catch((err) => {
        console.error("데이터 로딩 실패:", err);
      });
  }, [page]);

  // 🚀 통합 리스트 생성 로직 수정
  const unifiedList = useMemo(() => {
    if (!boardData) return [];

    // 💡 수정됨: .filter((n: any) => n.isPinned) 를 제거했습니다.
    // 백엔드에서 이미 정렬해 오므로, 가져온 5개의 공지를 모두 상단에 배치합니다. [cite: 2026-02-24]
    const topNotices = noticeData.map((n: any) => ({
      ...n,
      isNotice: true,
    }));

    const regularPosts = boardData.content || [];

    return [...topNotices, ...regularPosts];
  }, [boardData, noticeData]);

  if (!boardData) return <div className="loading-state">로딩 중...</div>;

  return (
    <div className="board-container">
      <div className="board-header">
        <div className="header-text">
          <h1 className="board-title">커뮤니티</h1>
          <p className="board-subtitle">
            새로운 소식과 다양한 이야기를 만나보세요.
          </p>
        </div>
        <Link href="/board/write">
          <button className="btn-write-main">글쓰기</button>
        </Link>
      </div>

      <div className="board-list-wrapper">
        {unifiedList.length > 0 ? (
          unifiedList.map((item: any) => (
            <Link
              key={item.isNotice ? `notice-${item.id}` : `post-${item.id}`}
              href={
                item.isNotice ? `/board/notice/${item.id}` : `/board/${item.id}`
              }
              className={`list-item ${item.isNotice ? "notice-row" : ""}`}
            >
              <div
                className={`item-id-badge ${item.isNotice ? "badge-notice" : ""}`}
              >
                {item.isNotice ? "NOTICE" : item.id}
              </div>

              <div className="item-content-wrap">
                <span
                  className={`item-title-text ${item.isNotice ? "text-notice" : ""}`}
                >
                  {item.title}
                </span>
                <div className="item-info-row">
                  {/* 공지사항은 작성자를 '관리자'로 고정하거나 데이터값을 사용합니다. */}
                  <span className="item-author">
                    {item.isNotice
                      ? item.adminName || "관리자"
                      : item.userNickname}
                  </span>
                  <span className="divider">|</span>
                  <span className="item-date">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </span>
                  {!item.isNotice && (
                    <>
                      <span className="divider">|</span>
                      <span>조회 {item.viewCount}</span>
                    </>
                  )}
                </div>
              </div>

              <div className="item-arrow" style={{ opacity: 0.5 }}>
                {item.isNotice ? "📌" : "→"}
              </div>
            </Link>
          ))
        ) : (
          <div style={{ padding: "50px", textAlign: "center", color: "#999" }}>
            게시글이 존재하지 않습니다.
          </div>
        )}
      </div>

      {/* 페이지네이션 */}
      <div className="pagination-container">
        <button
          className="page-nav-btn"
          disabled={boardData.first}
          onClick={() => router.push(`/board?page=${page - 1}`)}
        >
          이전
        </button>
        <div className="page-numbers">
          <span className="current-page">{page + 1}</span> /{" "}
          {boardData.totalPages || 1}
        </div>
        <button
          className="page-nav-btn"
          disabled={boardData.last}
          onClick={() => router.push(`/board?page=${page + 1}`)}
        >
          다음
        </button>
      </div>
    </div>
  );
}

export default function BoardListPage() {
  return (
    <Suspense fallback={<div className="loading-state">불러오는 중...</div>}>
      <BoardListContent />
    </Suspense>
  );
}
