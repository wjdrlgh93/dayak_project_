"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getNoticeDetail, deleteNotice } from "@/util/noticeApi";
import Link from "next/link";

import "./noticeDetail.css"; 

export default function NoticeDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [notice, setNotice] = useState<any>(null);
  const isAdmin = true; 

  useEffect(() => {
    if (id) {
      getNoticeDetail(id as string)
        .then(setNotice)
        .catch((err) => {
          console.error(err);
          alert("공지사항을 불러오지 못했습니다.");
          router.back();
        });
    }
  }, [id, router]);

  const handleDelete = async () => {
    if (confirm("정말로 이 공지사항을 삭제하시겠습니까?")) {
      try {
        await deleteNotice(id as string);
        alert("삭제되었습니다.");
        router.push("/board");
      } catch (e) {
        alert("삭제 실패");
      }
    }
  };

  if (!notice) return <div className="loading">공지사항을 불러오는 중...</div>;

  return (
    <div className="board-detail-container">
      {}
      <div style={{ borderBottom: "2px solid #333", paddingBottom: "20px", marginBottom: "30px" }}>
        <h1>
          {notice.isPinned && <span style={{ color: "#e11d48", marginRight: "10px" }}>[공지]</span>}
          {notice.title}
        </h1>
        <div className="info-row">
          <div>
            <span className="writer-name">{notice.writer}</span>
            <span style={{ margin: "0 10px", color: "#ccc" }}>|</span>
            <span>{new Date(notice.createdAt).toLocaleString()}</span>
          </div>
        </div>
      </div>

      {}
      <div 
        className="board-content ql-editor" 
        dangerouslySetInnerHTML={{ __html: notice.content }} 
      />

      {}
      <div className="button-group">
        <Link href="/board">
          <button className="btn btn-list">목록으로</button>
        </Link>

        {isAdmin && (
          <div style={{ display: "flex", gap: "10px" }}>
            <Link href={`/admin/notice/edit/${id}`}>
              <button className="btn btn-edit">수정</button>
            </Link>
            <button onClick={handleDelete} className="btn btn-delete">삭제</button>
          </div>
        )}
      </div>
    </div>
  );
}