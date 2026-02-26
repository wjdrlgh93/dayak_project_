"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { createBoard } from "@/util/boardApi";
import Editor from "@/components/Editor";
import "./boardWrite.css"; 

export default function BoardWritePage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const hasAlerted = useRef(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      if (!hasAlerted.current) {
        hasAlerted.current = true;
        alert("로그인이 필요한 페이지입니다.");
        router.replace("/authLogin");
      }
    } else {
      setIsLoading(false);
    }
  }, [router]);

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("로그인이 필요합니다.");
      router.replace("/authLogin");
      return;
    }

    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 입력해주세요.");
      return;
    }

    try {
      await createBoard(token, { title, content });
      router.push("/board");
    } catch (error) {
      console.error("작성 실패:", error);
      alert("글 작성에 실패했습니다.");
    }
  };

  if (isLoading) return null;

  return (
    <div className="board-container">
      <div className="write-card">
        <div className="write-header">
          <h1 className="write-title">새 글 작성</h1>
          <p className="write-subtitle">당신의 소중한 정보를 공유해주세요.</p>
        </div>
        
        <div className="write-form">
          <div className="input-group">
            <label className="input-label">제목</label>
            <input 
              type="text" 
              className="write-input" 
              placeholder="제목을 입력하세요" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
            />
          </div>
          
          <div className="input-group">
            <label className="input-label">내용</label>
            <div className="editor-wrapper">
              <Editor value={content} onChange={setContent} />
            </div>
          </div>

          <div className="write-actions">
            <button 
              onClick={() => router.back()} 
              className="btn-cancel"
            >
              취소
            </button>
            <button 
              onClick={handleSubmit} 
              className="btn-submit-main"
            >
              작성 완료
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}