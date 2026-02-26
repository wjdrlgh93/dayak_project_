"use client";
import { useEffect, useState } from "react";
import { getReplyList, createReply, deleteReply, updateReply } from "@/util/boardApi";


const getProfileImageUrl = (fileUrl: string | null) => {
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://168.107.15.125"; 

  if (!fileUrl) return "/images/default_profile.png"; 

  
  if (fileUrl.startsWith("http") || fileUrl.startsWith("https")) {
    return fileUrl;
  }

  
  return `${BASE_URL}${fileUrl}`;
};

export default function CommentSection({ boardId, myId }: any) {
  const [replies, setReplies] = useState<any[]>([]);
  const [text, setText] = useState("");
  
  
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState("");

  const load = () => getReplyList(boardId, 0).then(d => setReplies(d.content));
  useEffect(() => { load(); }, [boardId]);

  
  const add = async () => {
    const token = localStorage.getItem("token");
    if (!token) return alert("로그인이 필요한 서비스입니다.");
    if (!text.trim()) return alert("내용을 입력해주세요.");
    
    await createReply(token, boardId, text).then(() => { 
      setText(""); 
      load(); 
    });
  };

  
  const remove = async (rid: number) => {
    const token = localStorage.getItem("token");
    if (token && confirm("댓글을 삭제하시겠습니까?")) {
      await deleteReply(token, rid).then(() => load());
    }
  };

  
  const startEdit = (reply: any) => {
    setEditingId(reply.id);
    setEditText(reply.content);
  };

  
  const saveEdit = async (rid: number) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    
    await updateReply(token, rid, editText).then(() => {
      setEditingId(null);
      load();
    });
  };

  return (
    <div className="comment-section">
      <div className="comment-count-header">
        댓글 <span>{replies.length}</span>
      </div>
      
      <div className="comment-form">
        <textarea 
          className="comment-input" 
          value={text} 
          onChange={e => setText(e.target.value)} 
          placeholder="따뜻한 댓글을 남겨주세요." 
          rows={3}
        />
        <div className="form-actions">
          <button onClick={add} className="btn-submit">등록</button>
        </div>
      </div>

      <div className="comment-list">
        {replies.map((r: any) => {
          
          const isAuthor = Number(myId) === Number(r.userId);
          
          return (
            <div key={r.id} className="comment-item">
              <div className="comment-item-header">
                <div className="comment-user-info">
                  <img 
                    
                    src={getProfileImageUrl(r.userProfileImage)}
                    alt="프로필" 
                    className="comment-profile-img"
                    onError={(e) => { 
                      e.currentTarget.onerror = null; 
                      e.currentTarget.src = "/images/default_profile.png"; 
                    }}
                  />
                  <div className="comment-author-meta">
                    <span className="comment-author">{r.userNickname}</span>
                    <span className="comment-date">{new Date(r.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
                
                {}
                {isAuthor && (
                  <div className="comment-actions">
                    {editingId === r.id ? (
                      <>
                        <button onClick={() => saveEdit(r.id)} className="action-btn save">저장</button>
                        <button onClick={() => setEditingId(null)} className="action-btn cancel">취소</button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => startEdit(r)} className="action-btn edit">수정</button>
                        <button onClick={() => remove(r.id)} className="action-btn delete">삭제</button>
                      </>
                    )}
                  </div>
                )}
              </div>

              <div className="comment-content">
                {editingId === r.id ? (
                  <textarea 
                    className="edit-input"
                    value={editText}
                    onChange={e => setEditText(e.target.value)}
                    autoFocus
                  />
                ) : (
                  <p>{r.content}</p>
                )}
              </div>
            </div>
          ); 
        })}
      </div>
    </div>
  );
}