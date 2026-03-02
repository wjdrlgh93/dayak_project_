"use client";

import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode"; // 🚀 토큰 해독용
import api from "@/util/api";
import ChatWindow from "@/components/chat/ChatWindow";

interface ChatRoom {
  roomId: string;
  lastMessage: string;
  sender: string;
  unreadCount: number;
}

export default function AdminChatList() {
  const [rooms, setRooms] = useState<ChatRoom[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<ChatRoom | null>(null);
  const [adminName, setAdminName] = useState<string>("관리자"); // 🚀 토큰에서 가져올 이름

  // 🚀 토큰에서 관리자 이름 꺼내기
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        // 토큰 페이로드의 키값(name, sub, nickname 등)에 맞춰 수정하세요.
        setAdminName(decoded.sub || decoded.nickname || "관리자");
      } catch (err) {
        console.error("토큰 해독 실패", err);
      }
    }
    fetchRooms();
  }, []);

  const fetchRooms = () => {
    api
      .get("/api/chat/rooms")
      .then((res) => {
        const formattedRooms = res.data.map((email: string) => ({
          roomId: email,
          sender: email, // 기본값을 이메일로 설정
          lastMessage: "최근 대화 없음",
          unreadCount: 0,
        }));
        setRooms(formattedRooms);
      })
      .catch((err) => console.error("채팅방 로딩 실패", err));
  };

  useEffect(() => {
    const timer = setInterval(fetchRooms, 10000);
    return () => clearInterval(timer);
  }, []);

  const terminateChat = async (e: React.MouseEvent, room: ChatRoom) => {
    e.stopPropagation();
    if (!confirm(`${room.roomId} 님의 상담을 종료하시겠습니까?`)) return;
    try {
      await api.delete(`/api/chat/room/${room.roomId}`);
      alert("상담이 종료되었습니다.");
      if (selectedRoom?.roomId === room.roomId) setSelectedRoom(null);
      fetchRooms();
    } catch (err) {
      console.error("상담 종료 실패:", err);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        height: "88vh",
        background: "#f1f5f9",
        padding: "10px",
      }}
    >
      {/* 📌 왼쪽: 고정 너비 상담 목록 사이드바 */}
      <div
        style={{
          width: "380px", // 🚀 너비 고정 (짤림 방지)
          background: "#fff",
          borderRadius: "16px",
          boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
          display: "flex",
          flexDirection: "column",
          marginRight: "20px",
          overflow: "hidden",
        }}
      >
        <div style={{ padding: "20px", borderBottom: "1px solid #f1f5f9" }}>
          <h2
            style={{
              fontSize: "20px",
              fontWeight: "800",
              color: "#1e293b",
              margin: 0,
            }}
          >
            📥 실시간 상담{" "}
            <span style={{ color: "#3b82f6", fontSize: "14px" }}>
              {rooms.length}
            </span>
          </h2>
          <p style={{ fontSize: "12px", color: "#64748b", marginTop: "5px" }}>
            담당자: {adminName}님
          </p>
        </div>

        <div
          style={{ flex: 1, overflowY: "auto", padding: "10px" }}
          className="custom-scrollbar"
        >
          {rooms.map((room) => (
            <div
              key={room.roomId}
              onClick={() => setSelectedRoom(room)}
              style={{
                padding: "16px",
                marginBottom: "10px",
                borderRadius: "12px",
                cursor: "pointer",
                transition: "all 0.2s ease",
                border: "1px solid transparent",
                backgroundColor:
                  selectedRoom?.roomId === room.roomId ? "#eff6ff" : "#fff",
                borderColor:
                  selectedRoom?.roomId === room.roomId ? "#bfdbfe" : "#f1f5f9",
                position: "relative",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.boxShadow =
                  "0 4px 12px rgba(0,0,0,0.05)")
              }
              onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "4px",
                }}
              >
                {/* 👤 유저 정보 (이메일 우선 표시) */}
                <div
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    flex: 1,
                  }}
                >
                  <span
                    style={{
                      fontSize: "15px",
                      fontWeight: "700",
                      color: "#334155",
                    }}
                  >
                    {room.roomId.split("@")[0]} {/* 이메일 아이디만 강조 */}
                  </span>
                  <span
                    style={{
                      fontSize: "12px",
                      color: "#94a3b8",
                      marginLeft: "6px",
                    }}
                  >
                    @{room.roomId.split("@")[1]}
                  </span>
                </div>

                {room.unreadCount > 0 && (
                  <span
                    style={{
                      background: "#ef4444",
                      color: "#fff",
                      padding: "2px 8px",
                      borderRadius: "20px",
                      fontSize: "10px",
                      fontWeight: "bold",
                    }}
                  >
                    {room.unreadCount}
                  </span>
                )}
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-end",
                }}
              >
                <p
                  style={{
                    fontSize: "13px",
                    color: "#64748b",
                    margin: 0,
                    flex: 1,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    paddingRight: "10px",
                  }}
                >
                  {room.lastMessage}
                </p>
                <button
                  onClick={(e) => terminateChat(e, room)}
                  style={{
                    padding: "4px 8px",
                    fontSize: "11px",
                    borderRadius: "6px",
                    border: "none",
                    background: "#fee2e2",
                    color: "#ef4444",
                    cursor: "pointer",
                    fontWeight: "600",
                  }}
                >
                  종료
                </button>
              </div>
            </div>
          ))}
          {rooms.length === 0 && (
            <div
              style={{
                textAlign: "center",
                padding: "40px 0",
                color: "#94a3b8",
              }}
            >
              상담 대기 고객이 없습니다.
            </div>
          )}
        </div>
      </div>

      {/* 📌 오른쪽: 채팅창 메인 영역 */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {selectedRoom ? (
          <div
            style={{
              height: "100%",
              background: "#fff",
              borderRadius: "16px",
              overflow: "hidden",
              boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
            }}
          >
            <ChatWindow
              key={selectedRoom.roomId}
              userEmail={selectedRoom.roomId}
              userName={selectedRoom.roomId} // 상대방 이름 자리
              adminName={adminName} // 🚀 토큰에서 가져온 내 이름 전달
              onClose={() => setSelectedRoom(null)}
            />
          </div>
        ) : (
          <div
            style={{
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              color: "#94a3b8",
            }}
          >
            <div style={{ fontSize: "60px", marginBottom: "20px" }}>💬</div>
            <p style={{ fontSize: "18px", fontWeight: "500" }}>
              상담할 채팅방을 선택해 주세요
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
