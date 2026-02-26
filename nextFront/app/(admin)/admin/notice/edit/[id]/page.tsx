"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useParams } from "next/navigation";
import { getNoticeDetail, updateNotice } from "@/util/noticeApi";
import Editor from "@/components/Editor";
import "./noticeEdit.css"; 

function EditForm() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    isPinned: false,
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      getNoticeDetail(id as string)
        .then((data) => {
          setFormData({
            title: data.title,
            content: data.content,
            isPinned: data.isPinned,
          });
          setIsLoading(false);
        })
        .catch((err) => {
          console.error(err);
          alert("데이터를 불러오지 못했습니다.");
          router.back();
        });
    }
  }, [id, router]);

  const handleUpdate = async () => {
    try {
      const plainText = formData.content.replace(/<[^>]+>/g, "").trim();
      if (!formData.title || !plainText) {
        alert("제목과 내용을 입력해주세요.");
        return;
      }

      await updateNotice(id as string, formData);
      alert("공지사항이 수정되었습니다!");
      router.push(`/board/notice/${id}`); 
    } catch (e) {
      console.error(e);
      alert("수정 실패");
    }
  };

  if (isLoading) return <div className="loading-state">데이터 불러오는 중...</div>;

  return (
    <div className="edit-page-container">
      <h1 className="edit-title">🛠️ 공지사항 수정</h1>
      
      <div className="board-form-wrapper">
        {}
        <div className="form-group">
          <label className="form-label">제목</label>
          <input
            className="title-input"
            type="text"
            placeholder="공지 제목을 입력하세요"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
        </div>

        {}
        <label className="pin-toggle-area">
          <input
            type="checkbox"
            checked={formData.isPinned}
            onChange={(e) => setFormData({ ...formData, isPinned: e.target.checked })}
          />
          <span className="pin-text">📌 게시판 최상단에 고정하기</span>
        </label>

        {}
        <div className="editor-section">
          <label className="form-label">내용</label>
          <Editor 
            value={formData.content} 
            onChange={(content: string) => setFormData({ ...formData, content })} 
          />
        </div>

        {}
        <div className="button-group">
          <button onClick={handleUpdate} className="btn-submit">수정 완료</button>
          <button onClick={() => router.back()} className="btn-cancel">취소</button>
        </div>
      </div>
    </div>
  );
}

export default function NoticeEditPage() {
  return (
    <Suspense fallback={<div className="loading-state">페이지 로딩 중...</div>}>
      <EditForm />
    </Suspense>
  );
}