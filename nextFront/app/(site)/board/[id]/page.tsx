"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { getBoardDetail, deleteBoard } from "@/util/boardApi";
import CommentSection from "@/components/CommentSection";
import "./boardList.css"; 

export default function BoardDetailPage({ params }: any) {
  const { id } = useParams();
  const router = useRouter();
  
  
  const [board, setBoard] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [myId, setMyId] = useState<number>(0); 
  
  const hasAlerted = useRef(false);
  const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;

  
  useEffect(() => {
    const token = localStorage.getItem("token");
    const savedId = localStorage.getItem("userId");

    
    if (!token) {
      if (!hasAlerted.current) {
        hasAlerted.current = true;
        alert("로그인이 필요한 페이지입니다.");
        router.replace("/authLogin");
      }
      return;
    }

    
    if (savedId) {
      setMyId(Number(savedId));
    }

    
    if (id) {
      getBoardDetail(id as string)
        .then((data) => {
          setBoard(data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error("데이터 로딩 실패:", err);
          setIsLoading(false);
        });
    }
  }, [id, router]);

  
  const handleDelete = async () => {
    if (confirm("정말 삭제하시겠습니까?")) {
      const token = localStorage.getItem("token");
      if (token && id) {
        try {
          await deleteBoard(token, id as string);
          router.push("/board");
        } catch (error) {
          alert("삭제에 실패했습니다.");
        }
      }
    }
  };

  
  if (isLoading || !board) {
    return <div className="board-container">로딩중...</div>;
  }

  return (
    <div className="board-container">
      {}
      <div className="board-header">
        <h1 className="board-title">{board.title}</h1>
        
        <div className="detail-meta">
          <div className="detail-user">
            {}
            <img 
              src={
                board.userProfileImage 
                  ? (board.userProfileImage.startsWith("http") 
                      ? board.userProfileImage  
                      : `${IMAGE_BASE_URL}${board.userProfileImage}`) 
                  : "/img/default_profile.png" 
              }
              className="detail-profile" 
              alt="프로필"
              onError={(e) => { 
                const target = e.currentTarget;
                
                
                if (target.src.includes("/img/default_profile.png")) {
                    target.style.display = 'none';
                    return;
                }
                
                target.src = "/img/default_profile.png"; 
              }}
            />
            <div className="detail-user-info">
              <div className="detail-nickname">{board.userNickname}</div>
              <div className="detail-sub-info">
                {new Date(board.createdAt).toLocaleDateString()} · 조회 {board.viewCount}
              </div>
            </div>
          </div>

          {}
          {myId === Number(board.userId) && (
            <div className="detail-actions">
              <button onClick={() => router.push(`/board/update/${id}`)} className="btn btn-secondary">수정</button>
              <button onClick={handleDelete} className="btn btn-danger">삭제</button>
            </div>
          )}
        </div>
      </div>

      {}
      <div className="detail-content" dangerouslySetInnerHTML={{ __html: board.content }} />

      <hr className="divider" />

      {}
      <CommentSection boardId={id} myId={myId} />
    </div>
  );
}