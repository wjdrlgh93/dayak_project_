"use client";

import { useState } from "react";
import api from "@/util/api";
import { useRouter } from "next/navigation";
import Editor from "@/components/Editor"; 

export default function NoticeWritePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    isPinned: false, 
  });

  const handleSubmit = async () => {
    try {
      
      const plainText = formData.content.replace(/<[^>]+>/g, "").trim();

      if (!formData.title || !plainText) {
        alert("제목과 내용을 입력해주세요.");
        return;
      }

      
      await api.post("/api/notice", formData);
      alert("공지사항이 등록되었습니다!");
      router.push("/admin"); 
    } catch (e) {
      console.error(e);
      alert("등록 실패");
    }
  };

  return (
    <div style={{ padding: "40px", maxWidth: "900px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}>📢 공지사항 작성</h1>
      
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {}
        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <label style={{ fontWeight: "bold", color: "#444" }}>제목</label>
          <input
            type="text"
            placeholder="공지 제목을 입력하세요"
            style={{ padding: "15px", fontSize: "16px", border: "1px solid #ddd", borderRadius: "8px" }}
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
        </div>

        {}
        <label style={{ 
          display: "flex", 
          alignItems: "center", 
          gap: "10px", 
          cursor: "pointer", 
          fontSize: "16px", 
          padding: "10px", 
          background: "#fff0f0", 
          borderRadius: "8px", 
          border: "1px solid #ffcccc" 
        }}>
          <input
            type="checkbox"
            checked={formData.isPinned}
            onChange={(e) => setFormData({ ...formData, isPinned: e.target.checked })}
            style={{ width: "20px", height: "20px", accentColor: "#e11d48" }}
          />
          <span style={{ fontWeight: "bold", color: "#e11d48" }}>📌 게시판 최상단에 고정하기</span>
        </label>

        {}
        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <label style={{ fontWeight: "bold", color: "#444" }}>내용</label>
          {}
          <Editor 
            value={formData.content} 
            onChange={(content: string) => setFormData({ ...formData, content })} 
          />
        </div>

        {}
        <button
          onClick={handleSubmit}
          style={{ 
            padding: "15px", 
            backgroundColor: "#2563eb", 
            color: "white", 
            border: "none", 
            borderRadius: "8px", 
            fontSize: "18px", 
            cursor: "pointer", 
            fontWeight: "bold",
            marginTop: "10px" 
          }}
        >
          공지사항 등록하기
        </button>
      </div>
    </div>
  );
}