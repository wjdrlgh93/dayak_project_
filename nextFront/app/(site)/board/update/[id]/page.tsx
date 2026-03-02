"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { getBoardDetail, updateBoard } from "@/util/boardApi";
import Editor from "@/components/Editor";
import "../board.css"; 

export default function BoardEditPage() {
  const { id } = useParams();
  const router = useRouter();
  
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const hasAlerted = useRef(false);

  // 1. 기존 데이터 불러오기 및 권한 체크
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      if (!hasAlerted.current) {
        hasAlerted.current = true;
        alert("로그인이 필요한 페이지입니다.");
        router.replace("/authLogin");
      }
      return;
    }

    if (id) {
      getBoardDetail(id as string)
        .then((data) => {
          setTitle(data.title);
          setContent(data.content);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error("데이터 로딩 실패:", err);
          alert("데이터를 불러올 수 없습니다.");
          router.back();
        });
    }
  }, [id, router]);

  // 2. 수정 처리 핸들러
  const handleUpdate = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 입력해주세요.");
      return;
    }

    try {
      // updateBoard API 호출 (id와 수정된 데이터 전달)
      await updateBoard(token, id as string, { title, content });
      alert("수정이 완료되었습니다.");
      router.push(`/board/detail/${id}`); // 수정 후 상세 페이지로 이동
    } catch (error) {
      console.error("수정 실패:", error);
      alert("글 수정에 실패했습니다.");
    }
  };

  if (isLoading) return <div className="board-container">로딩중...</div>;

  return (
    <div className="board-container">
      <div className="write-card">
        <div className="write-header">
          <h1 className="write-title">게시글 수정</h1>
          <p className="write-subtitle">내용을 알맞게 수정한 후 작성 완료 버튼을 눌러주세요.</p>
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
              onClick={handleUpdate} 
              className="btn-submit-main"
            >
              수정 완료
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}