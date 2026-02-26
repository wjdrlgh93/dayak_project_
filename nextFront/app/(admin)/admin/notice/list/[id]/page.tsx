"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getNoticeDetail, deleteNotice } from "@/util/noticeApi";
import Link from "next/link";

export default function AdminNoticeDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [notice, setNotice] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      getNoticeDetail(id)
        .then((data) => {
          setNotice(data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error(err);
          alert("공지사항을 불러올 수 없습니다.");
          router.push("/admin/notice");
        });
    }
  }, [id, router]);

  const handleDelete = async () => {
    if (confirm("이 공지사항을 정말 삭제하시겠습니까?")) {
      try {
        await deleteNotice(id);
        alert("삭제되었습니다.");
        router.push("/admin/notice");
      } catch (e) {
        alert("삭제 실패");
      }
    }
  };

  if (isLoading) return <div style={{ padding: "40px", textAlign: "center" }}>로딩 중...</div>;

  return (
    <div style={{ padding: "40px", maxWidth: "900px", margin: "0 auto" }}>
      {}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px", borderBottom: "2px solid #eee", paddingBottom: "20px" }}>
        <div>
          <button onClick={() => router.push("/admin/notice")} style={{ background: "none", border: "none", color: "#666", cursor: "pointer", fontSize: "14px" }}>
            ← 목록으로 돌아가기
          </button>
          <h1 style={{ fontSize: "24px", fontWeight: "bold", marginTop: "10px" }}>
            {notice.isPinned && <span style={{ color: "#e11d48", marginRight: "8px" }}>[고정]</span>}
            {notice.title}
          </h1>
        </div>
        
        <div style={{ display: "flex", gap: "10px" }}>
          <button 
            onClick={() => router.push(`/admin/notice/edit/${id}`)}
            style={{ padding: "10px 20px", backgroundColor: "#2563eb", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" }}
          >
            수정하기
          </button>
          <button 
            onClick={handleDelete}
            style={{ padding: "10px 20px", backgroundColor: "#ef4444", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" }}
          >
            삭제
          </button>
        </div>
      </div>

      {}
      <div style={{ display: "flex", gap: "20px", color: "#888", fontSize: "14px", marginBottom: "30px" }}>
        <span>작성자: {notice.writer || "관리자"}</span>
        <span>날짜: {new Date(notice.createdAt).toLocaleString()}</span>
      </div>

      {}
      <div 
        className="ql-editor" 
        style={{ minHeight: "400px", lineHeight: "1.6", fontSize: "16px", border: "1,px solid #f0f0f0", padding: "20px", borderRadius: "8px", background: "#fff" }}
        dangerouslySetInnerHTML={{ __html: notice.content }} 
      />

      {}
      <div style={{ marginTop: "40px", textAlign: "center" }}>
        <button 
          onClick={() => router.push("/admin/notice")}
          style={{ padding: "12px 30px", backgroundColor: "#666", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" }}
        >
          목록 페이지로
        </button>
      </div>
    </div>
  );
}