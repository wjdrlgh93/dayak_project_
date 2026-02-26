"use client";

import { useState } from "react";
import "./sync.css";

export default function AdminSyncPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("전국 약국 데이터를 공공데이터 API로부터 수집합니다.");

  const handleSync = async () => {
    const confirmSync = confirm(
      "전체 데이터를 동기화하시겠습니까?\n데이터 양이 많아 약 1~3분 정도 소요될 수 있습니다."
    );
    if (!confirmSync) return;

    setStatus("loading");
    setMessage("백엔드에서 200개씩 분할 수집 중입니다. 브라우저를 끄지 마세요...");

    try {
      const response = await fetch("/api/pharmacy/sync-all", {
        method: "POST",
      });

      if (response.ok) {
        const result = await response.text();
        setStatus("success");
        setMessage(`✅ ${result}`);
      } else {
        throw new Error("서버 응답 에러");
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
      setMessage("❌ 동기화 실패: 서버 연결 상태나 API 키를 확인하세요.");
    }
  };

  return (
    <div className="admin-sync-container">
      <div className="sync-box">
        <div className="sync-header">
          <h1>Data Management</h1>
          <p>Pharmacy Database Synchronizer</p>
        </div>

        <div className={`status-panel ${status}`}>
          <div className="icon-area">
            {status === "loading" && <div className="spinner"></div>}
            {status === "success" && <span className="icon">✔</span>}
            {status === "error" && <span className="icon">✖</span>}
            {status === "idle" && <span className="icon">⚙</span>}
          </div>
          <div className="message-area">
            <p className="main-msg">{message}</p>
            {status === "loading" && <p className="sub-msg">백엔드 로그에서 진행 상황을 확인할 수 있습니다.</p>}
          </div>
        </div>

        <button 
          className="btn-sync-trigger" 
          onClick={handleSync} 
          disabled={status === "loading"}
        >
          {status === "loading" ? "수집 중..." : "동기화 시작하기"}
        </button>

        <div className="sync-guide">
          <h3>수집 가이드</h3>
          <ul>
            <li><strong>Batch Size:</strong> 200개씩 분할 요청</li>
            <li><strong>Upsert:</strong> 기존 데이터는 업데이트, 신규 데이터는 추가</li>
            <li><strong>Endpoint:</strong> /getParmacyFullDown (전체기관)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}