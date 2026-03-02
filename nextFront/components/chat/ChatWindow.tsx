"use client";

import { useEffect, useState, useRef } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

interface Message {
  id?: number;
  sender: string;
  message: string;
  unreadCount: number;
  sentAt?: string;
  type?: "TALK" | "CLOSE";
}

interface ChatProps {
  userEmail: string;
  userName: string;
  adminName?: string;
  onClose: () => void;
}

export default function ChatWindow({
  userEmail,
  userName,
  adminName,
  onClose,
}: ChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTerminated, setIsTerminated] = useState(false);
  const stompClient = useRef<Client | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const roomId = userEmail;

  // 🚀 1. '나'인지 판별하는 로직 (관리자면 adminName과 비교, 유저면 userName과 비교)
  const checkIfMe = (sender: string) => {
    return adminName ? sender === adminName : sender === userName;
  };

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const response = await fetch(
          `http://168.107.15.125/api/chat/history/${roomId}`,
        );
        if (response.ok) {
          const history = await response.json();
          setMessages(history);
        }
      } catch (error) {
        console.error("이전 대화 내역 로드 실패:", error);
      }
    };

    fetchChatHistory();

    const client = new Client({
      webSocketFactory: () => new SockJS("http://168.107.15.125/ws-chat"),
      reconnectDelay: 5000,
      onConnect: () => {
        client.subscribe(`/topic/chat/${roomId}`, (message) => {
          const newMessage = JSON.parse(message.body);
          if (newMessage.type === "CLOSE") {
            setIsTerminated(true);
          } else {
            setMessages((prev) => [...prev, newMessage]);
          }
        });

        client.publish({
          destination: `/app/chat/read/${roomId}`,
          body: userEmail,
        });
      },
    });

    client.activate();
    stompClient.current = client;

    return () => {
      if (stompClient.current) stompClient.current.deactivate();
    };
  }, [roomId, userEmail]);

  const sendMessage = () => {
    if (!input.trim() || !stompClient.current || isTerminated) return;

    const payload = {
      sender: adminName || userName,
      message: input,
      type: "TALK",
    };

    stompClient.current.publish({
      destination: `/app/chat/send/${roomId}`,
      body: JSON.stringify(payload),
    });

    setInput("");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        backgroundColor: "#fff",
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
      }}
    >
      {/* 🔹 헤더: 카카오톡 스타일 */}
      <div
        style={{
          padding: "16px 20px",
          background: "#3b82f6",
          color: "#fff",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <div style={{ fontSize: "16px", fontWeight: "bold" }}>
            {adminName ? `${userName} 님과 상담` : "실시간 상담 센터"}
          </div>
          <div style={{ fontSize: "11px", opacity: 0.8, marginTop: "2px" }}>
            {isTerminated ? "상담 종료됨" : "상담원 연결 중"}
          </div>
        </div>
        <button
          onClick={onClose}
          style={{
            background: "none",
            border: "none",
            color: "#fff",
            cursor: "pointer",
            fontSize: "22px",
            padding: "0 5px",
          }}
        >
          ✕
        </button>
      </div>

      {/* 🔹 채팅 영역: 배경색 조정 */}
      <div
        ref={scrollRef}
        style={{
          flex: 1,
          padding: "20px",
          overflowY: "auto",
          backgroundColor: "#f3f4f6",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        {messages.map((msg, idx) => {
          const isMe = checkIfMe(msg.sender);
          return (
            <div
              key={idx}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: isMe ? "flex-end" : "flex-start",
                width: "100%",
              }}
            >
              {/* 이름 표시 (상대방일 때만) */}
              {!isMe && (
                <div
                  style={{
                    fontSize: "12px",
                    color: "#666",
                    marginBottom: "4px",
                    marginLeft: "4px",
                  }}
                >
                  {msg.sender}
                </div>
              )}

              <div
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  flexDirection: isMe ? "row-reverse" : "row",
                  gap: "6px",
                  maxWidth: "85%",
                }}
              >
                {/* 말풍선 */}
                <div
                  style={{
                    padding: "10px 14px",
                    borderRadius: isMe
                      ? "16px 2px 16px 16px"
                      : "2px 16px 16px 16px",
                    backgroundColor: isMe ? "#3b82f6" : "#fff",
                    color: isMe ? "#fff" : "#1f2937",
                    fontSize: "14px",
                    lineHeight: "1.5",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                    wordBreak: "break-all",
                  }}
                >
                  {msg.message}
                </div>

                {/* 안읽은 숫자 표시 */}
                {msg.unreadCount > 0 && (
                  <span
                    style={{
                      fontSize: "11px",
                      color: "#3b82f6",
                      fontWeight: "bold",
                      marginBottom: "2px",
                    }}
                  >
                    {msg.unreadCount}
                  </span>
                )}
              </div>
            </div>
          );
        })}

        {/* 🔒 종료 안내 */}
        {isTerminated && (
          <div style={{ textAlign: "center", margin: "20px 0" }}>
            <div
              style={{
                display: "inline-block",
                padding: "8px 16px",
                backgroundColor: "rgba(0,0,0,0.05)",
                borderRadius: "20px",
                fontSize: "12px",
                color: "#666",
              }}
            >
              상담이 종료되었습니다.
            </div>
          </div>
        )}
      </div>

      {/* 🔹 입력창: 하단 고정 */}
      <div
        style={{
          padding: "15px",
          backgroundColor: "#fff",
          borderTop: "1px solid #eee",
        }}
      >
        {!isTerminated ? (
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="메시지를 입력하세요..."
              style={{
                flex: 1,
                padding: "12px 16px",
                borderRadius: "24px",
                border: "1px solid #e5e7eb",
                backgroundColor: "#f9fafb",
                fontSize: "14px",
                outline: "none",
              }}
            />
            <button
              onClick={sendMessage}
              style={{
                padding: "10px 20px",
                background: "#3b82f6",
                color: "#fff",
                border: "none",
                borderRadius: "20px",
                fontWeight: "bold",
                cursor: "pointer",
                transition: "opacity 0.2s",
              }}
              onMouseOver={(e) => (e.currentTarget.style.opacity = "0.8")}
              onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
            >
              전송
            </button>
          </div>
        ) : (
          <div
            style={{
              textAlign: "center",
              padding: "10px",
              color: "#999",
              fontSize: "14px",
            }}
          >
            새로운 상담을 시작하려면 창을 다시 열어주세요.
          </div>
        )}
      </div>
    </div>
  );
}
