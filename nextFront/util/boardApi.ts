

const BASE_URL = "/api"; 


const getHeaders = (token?: string) => {
  const headers: HeadersInit = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  return headers;
};



export const uploadBoardImage = async (token: string, file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file); 

  const res = await fetch(`${BASE_URL}/board/upload`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}` 
    },
    body: formData,
  });

  if (!res.ok) throw new Error("이미지 업로드 실패");
  return res.text(); 
};



export const getBoardList = async (page: number = 0, size: number = 9) => {
  const res = await fetch(`${BASE_URL}/board/list?page=${page}&size=${size}`, { cache: "no-store" });
  return res.json();
};

export const getBoardDetail = async (id: string) => {
  const res = await fetch(`${BASE_URL}/board/${id}`, { cache: "no-store" });
  return res.json();
};

export const createBoard = async (token: string, data: { title: string; content: string }) => {
  const res = await fetch(`${BASE_URL}/board`, {
    method: "POST",
    headers: getHeaders(token),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("작성 실패");
  return res.text();
};



export const updateBoard = async (token: string, id: string, data: { title: string; content: string }) => {
  const res = await fetch(`${BASE_URL}/board/${id}`, {
    method: "PUT",
    headers: getHeaders(token),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("수정 실패");
  return res.text();
};

export const deleteBoard = async (token: string, id: string) => {
  const res = await fetch(`${BASE_URL}/board/${id}`, {
    method: "DELETE",
    headers: getHeaders(token),
  });
  if (!res.ok) throw new Error("삭제 실패");
  return res.text();
};



export const getReplyList = async (boardId: string, page: number = 0) => {
  const res = await fetch(`${BASE_URL}/reply/list/${boardId}?page=${page}`, { cache: "no-store" });
  return res.json();
};

export const createReply = async (token: string, boardId: string, content: string) => {
  const res = await fetch(`${BASE_URL}/reply/${boardId}`, {
    method: "POST",
    headers: getHeaders(token),
    body: JSON.stringify({ content }),
  });
  if (!res.ok) throw new Error("댓글 작성 실패");
  return res.text();
};

export const deleteReply = async (token: string, replyId: number) => {
  const res = await fetch(`${BASE_URL}/reply/${replyId}`, {
    method: "DELETE",
    headers: getHeaders(token),
  });
  if (!res.ok) throw new Error("댓글 삭제 실패");
  return res.text();
};

export const updateReply = async (token: string, replyId: number, content: string) => {
  const response = await fetch(`${BASE_URL}/reply/${replyId}`, {
    method: "PATCH", 
    headers: getHeaders(token),
    body: JSON.stringify({ content }),
  });
  if (!response.ok) throw new Error("댓글 수정에 실패했습니다.");
  return response.text();
};



export const getAdminUserList = async (token: string, page: number = 0) => {
  const res = await fetch(`${BASE_URL}/admin/users?page=${page}&size=10`, {
    method: "GET",
    headers: getHeaders(token),
    cache: "no-store",
  });
  if (!res.ok) {
    if (res.status === 403) throw new Error("관리자 권한이 없습니다.");
    throw new Error("목록을 불러오는 데 실패했습니다.");
  }
  return res.json();
};

export const deleteAdminUser = async (token: string, id: number) => {
  const res = await fetch(`${BASE_URL}/admin/users/${id}`, {
    method: "DELETE",
    headers: getHeaders(token),
  });
  if (!res.ok) throw new Error("삭제 처리 중 오류가 발생했습니다.");
  return res; 
};

export const getAdminBoardList = async (token: string, page: number = 0) => {
  const res = await fetch(`${BASE_URL}/admin/boards?page=${page}&size=10`, {
    method: "GET",
    headers: getHeaders(token),
    cache: "no-store",
  });
  if (!res.ok) {
    if (res.status === 403) throw new Error("관리자 권한이 없습니다.");
    throw new Error("게시글 목록을 불러오는 데 실패했습니다.");
  }
  return res.json();
};

export const deleteAdminBoard = async (token: string, id: number) => {
  const res = await fetch(`${BASE_URL}/admin/boards/${id}`, {
    method: "DELETE",
    headers: getHeaders(token),
  });
  if (!res.ok) throw new Error("게시글 삭제 중 오류가 발생했습니다.");
  return res;
};