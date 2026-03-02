// 1. 배포 환경을 고려하여 BASE_URL 수정 [cite: 2026-02-18, 2026-02-19]
// Nginx 설정 덕분에 /api만 적어도 서버가 알아서 백엔드(8080)로 배달합니다. [cite: 2026-02-18]
const BASE_URL = "/api"; 

// 공통 헤더 (토큰 포함)
const getHeaders = (token?: string) => {
  const headers: HeadersInit = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  return headers;
};

// --- 🚀 이미지 업로드 API 추가 --- [cite: 2026-02-18]
// 에디터에서 파일을 선택하면 OCI 버킷에 저장하고 URL을 받아옵니다. [cite: 2026-02-18, 2026-02-19]
export const uploadBoardImage = async (token: string, file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file); // 백엔드 @RequestParam("file")과 일치해야 함 [cite: 2026-02-18]

  const res = await fetch(`${BASE_URL}/board/upload`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}` // JSON이 아니므로 Content-Type은 생략 (자동 설정) [cite: 2026-02-19]
    },
    body: formData,
  });

  if (!res.ok) throw new Error("이미지 업로드 실패");
  return res.text(); // 서버가 리턴한 https://objectstorage... 주소 [cite: 2026-02-18, 2026-02-19]
};

// --- 게시글 API ---

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

// ... 이하 기존 deleteBoard, 댓글 API, 관리자 API 로직은 동일하게 유지하되 주소만 BASE_URL 참조 ... [cite: 2026-02-19]

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

// --- 댓글 API ---

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

// --- 관리자 API ---

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