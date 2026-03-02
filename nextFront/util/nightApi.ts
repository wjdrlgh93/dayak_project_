const BASE_URL = "api/night";

export const getPharmacyList = async (lat: number, lon: number) => {
  // 백엔드에 위도, 경도만 보내면 알아서 필터링해서 줌
  const res = await fetch(`${BASE_URL}/list?lat=${lat}&lon=${lon}`, { 
    cache: "no-store" 
  });
  
  if (!res.ok) {
    throw new Error("약국 정보를 불러오지 못했습니다.");
  }
  
  return res.json();
};