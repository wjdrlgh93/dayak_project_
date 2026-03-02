"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { getBoardDetail, deleteBoard } from "@/util/boardApi";
import CommentSection from "@/components/CommentSection";
import "./boardList.css"; 

export default function BoardDetailPage({ params }: any) {
  const { id } = useParams();
  const router = useRouter();
  
  // 상태 관리
  const [board, setBoard] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [myId, setMyId] = useState<number>(0); 
  
  const hasAlerted = useRef(false);
  const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;

  // 1. 초기 로드 시 내 정보(ID) 및 게시글 데이터 가져오기
  useEffect(() => {
    const token = localStorage.getItem("token");
    const savedId = localStorage.getItem("userId");

    // 로그인 체크
    if (!token) {
      if (!hasAlerted.current) {
        hasAlerted.current = true;
        alert("로그인이 필요한 페이지입니다.");
        router.replace("/authLogin");
      }
      return;
    }

    // 내 ID 설정
    if (savedId) {
      setMyId(Number(savedId));
    }

    // 게시글 상세 정보 불러오기
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

  // 게시글 삭제 핸들러
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

  // 로딩 처리
  if (isLoading || !board) {
    return <div className="board-container">로딩중...</div>;
  }

  return (
    <div className="board-container">
      {/* 제목 및 작성자 정보 헤더 */}
      <div className="board-header">
        <h1 className="board-title">{board.title}</h1>
        
        <div className="detail-meta">
          <div className="detail-user">
            {/* 🚀 [수정됨] 이미지 경로 /img 추가 및 무한 루프 방지 로직 적용 */}
            <img 
              src={
                board.userProfileImage 
                  ? (board.userProfileImage.startsWith("http") 
                      ? board.userProfileImage  // 🚀 http로 시작하면(OCI 주소면) 그대로 사용
                      : `${IMAGE_BASE_URL}${board.userProfileImage}`) // 아니면 기존처럼 베이스 주소 결합
                  : "/img/default_profile.png" // 이미지가 없으면 기본 이미지
              }
              className="detail-profile" 
              alt="프로필"
              onError={(e) => { 
                const target = e.currentTarget;
                // 이미 대체 이미지 경로로 설정되어 있는데도 에러가 나면
                // 이미지를 숨겨서 무한 루프(브라우저 멈춤)를 방지합니다.
                if (target.src.includes("/img/default_profile.png")) {
                    target.style.display = 'none';
                    return;
                }
                // 이미지 로드 실패 시 public/img 폴더의 기본 이미지로 교체
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

          {/* 게시글 작성자와 로그인 유저 ID 비교 */}
          {myId === Number(board.userId) && (
            <div className="detail-actions">
              <button onClick={() => router.push(`/board/update/${id}`)} className="btn btn-secondary">수정</button>
              <button onClick={handleDelete} className="btn btn-danger">삭제</button>
            </div>
          )}
        </div>
      </div>

      {/* 본문 내용 */}
      <div className="detail-content" dangerouslySetInnerHTML={{ __html: board.content }} />

      <hr className="divider" />

      {/* 댓글 컴포넌트 */}
      <CommentSection boardId={id} myId={myId} />
    </div>
  );
}