// 맨 앞에 / 를 붙여서 절대 경로로 만듭니다. 
// 만약 백엔드 도메인이 다르다면 "http://168.107.15.125/api/drug"를 직접 적으세요.
const API_BASE_URL = "/api/drug"; 

export const searchDrugs = async (keyword: string, page: number = 0, size: number = 10) => {
  const response = await fetch(
    `${API_BASE_URL}/search?keyword=${keyword}&page=${page}&size=${size}`
  );
  if (!response.ok) throw new Error("검색 실패");
  return response.json();
};

export const syncDrugs = async () => {
  // 이전 질문에서 관리자 동기화 경로는 /api/admin/pill/sync 였습니다.
  // 이 부분도 확인이 필요합니다.
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