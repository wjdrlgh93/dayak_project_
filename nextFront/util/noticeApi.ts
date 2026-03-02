import api from "@/util/api";

// 1. 공지사항 목록 조회
export const getNoticeList = async (page: number = 0, size: number = 10) => {
  const res = await api.get(`/api/notice/list?page=${page}&size=${size}`);
  return res.data;
};

// 2. 공지사항 상세 조회 (수정 및 보기용)
export const getNoticeDetail = async (id: string) => {
  const res = await api.get(`/api/notice/${id}`);
  return res.data;
};

// 3. 공지사항 작성
export const createNotice = async (data: any) => {
  const res = await api.post("/api/notice", data);
  return res.data;
};

// 🚀 4. 공지사항 수정
export const updateNotice = async (id: string, data: any) => {
  const res = await api.put(`/api/notice/${id}`, data);
  return res.data;
};

// 🚀 5. 공지사항 삭제
export const deleteNotice = async (id: string) => {
  const res = await api.delete(`/api/notice/${id}`);
  return res.data;
};