import api from "@/util/api";


export const getNoticeList = async (page: number = 0, size: number = 10) => {
  const res = await api.get(`/api/notice/list?page=${page}&size=${size}`);
  return res.data;
};


export const getNoticeDetail = async (id: string) => {
  const res = await api.get(`/api/notice/${id}`);
  return res.data;
};


export const createNotice = async (data: any) => {
  const res = await api.post("/api/notice", data);
  return res.data;
};


export const updateNotice = async (id: string, data: any) => {
  const res = await api.put(`/api/notice/${id}`, data);
  return res.data;
};


export const deleteNotice = async (id: string) => {
  const res = await api.delete(`/api/notice/${id}`);
  return res.data;
};