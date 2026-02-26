const BASE_URL = "api/night";

export const getPharmacyList = async (lat: number, lon: number) => {
  
  const res = await fetch(`${BASE_URL}/list?lat=${lat}&lon=${lon}`, { 
    cache: "no-store" 
  });
  
  if (!res.ok) {
    throw new Error("약국 정보를 불러오지 못했습니다.");
  }
  
  return res.json();
};