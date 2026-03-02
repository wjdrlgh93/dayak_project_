"use client";
import RegionSelector from "@/components/common/RegionSelector";
import KakaoMap from "@/components/map/KakaoMap";
import api from "@/util/api";
import { useState } from "react";
import "./location.css";

// 🚀 [수정 1] 콘솔 로그에 찍힌 실제 데이터 이름으로 인터페이스 변경 [cite: 2026-02-19]
interface Pharmacy {
  id: string;
  place_name: string;   // dutyName -> place_name
  address_name: string; // dutyAddr -> address_name
  phone: string;        // dutyTel1 -> phone
  x: string;            // wgs84Lon -> x
  y: string;            // wgs84Lat -> y
  qt?: string;          // 영업시간
}

export default function PharmacyPage() {
  const [pharmacyList, setPharmacyList] = useState<Pharmacy[]>([]);
  const [centerPos, setCenterPos] = useState({ lat: 37.5665, lng: 126.9780 });

  const handleRegionSelect = async (city: string, district: string) => {
    try {
      const response = await api.get(`/api/pharmacy/region`, {
        params: { city, district }
      });
      
      console.log("서버 응답 데이터:", response.data); 
      setPharmacyList(response.data);

      if (response.data.length > 0) {
        // 🚀 [수정 2] 좌표 키값 변경 (y, x) [cite: 2026-02-19]
        // 여기가 틀려서 지도가 NaN(숫자 아님) 좌표로 이동하려다 멈췄던 겁니다.
        setCenterPos({ 
          lat: Number(response.data[0].y), 
          lng: Number(response.data[0].x) 
        });
      }
    } catch (error) {
      console.error("검색 실패", error);
    }
  };

  const moveToLocation = (lat: string, lng: string) => {
    setCenterPos({ lat: Number(lat), lng: Number(lng) });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
      <h2 style={{ marginBottom: '20px', fontWeight: 'bold', color: '#333' }}>전국 약국 지도</h2>
      
      <div style={{ marginBottom: '30px' }}>
        <RegionSelector onRegionSelect={handleRegionSelect} />
      </div>

      <div style={{ height: '500px', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', marginBottom: '30px' }}>
        <KakaoMap pharmacyList={pharmacyList as any} centerPos={centerPos} />
      </div>

      <div>
        <h3 style={{ fontSize: '1.2rem', marginBottom: '15px', fontWeight: 'bold' }}>
          검색 결과 <span style={{ color: '#3b82f6' }}>{pharmacyList.length}</span>건
        </h3>

        {pharmacyList.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#888', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
            지역을 선택하면 약국 목록이 여기에 표시됩니다.
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            {pharmacyList.map((pharmacy) => (
              <div 
                key={pharmacy.id}
                // 🚀 [수정 3] y, x 좌표 사용
                onClick={() => moveToLocation(pharmacy.y, pharmacy.x)}
                style={{
                  border: '1px solid #e0e0e0',
                  borderRadius: '10px',
                  padding: '20px',
                  backgroundColor: '#fff',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
                  e.currentTarget.style.borderColor = '#3b82f6';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.boxShadow = '0 2px 5px rgba(0,0,0,0.05)';
                  e.currentTarget.style.borderColor = '#e0e0e0';
                }}
              >
                {/* 🚀 [수정 4] 데이터 이름 변경 (place_name, address_name) */}
                <h4 style={{ margin: '0 0 8px 0', fontSize: '1.1rem', color: '#333' }}>
                  {pharmacy.place_name} 
                </h4>
                <p style={{ margin: '0 0 5px 0', fontSize: '0.9rem', color: '#666' }}>
                  📍 {pharmacy.address_name} 
                </p>
                <p style={{ margin: '0 0 5px 0', fontSize: '0.9rem', color: '#888' }}>
                  📞 {pharmacy.phone || "전화번호 없음"} 
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}