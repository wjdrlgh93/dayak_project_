

const API_BASE_URL = "/api/drug"; 

export const searchDrugs = async (keyword: string, page: number = 0, size: number = 10) => {
  const response = await fetch(
    `${API_BASE_URL}/search?keyword=${keyword}&page=${page}&size=${size}`
  );
  if (!response.ok) throw new Error("검색 실패");
  return response.json();
};

export const syncDrugs = async () => {
  
  
  const response = await fetch("/api/admin/pill/sync", {
    method: "POST",
  });
  if (!response.ok) throw new Error("동기화 실패");
  return response.text();
};

export const getDrugDetail = async (itemSeq: string) => {
  const response = await fetch(`${API_BASE_URL}/${itemSeq}`);
  if (!response.ok) throw new Error("상세 정보를 불러올 수 없습니다.");
  return response.json();
};