"use client";

import React, { useEffect, useRef } from 'react';

interface DetailMapProps {
  lat: number;
  lng: number;
}

export default function DetailMap({ lat, lng }: DetailMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {

    if (!window.kakao || !window.kakao.maps) {
      console.error("Kakao Maps script is not loaded.");
      return;
    }

    const container = mapContainer.current;
    if (!container) return;


    const options = {
      center: new window.kakao.maps.LatLng(lat, lng),
      level: 3, 
    };
    const map = new window.kakao.maps.Map(container, options);

    // 3. 마커 생성 및 표시
    const markerPosition = new window.kakao.maps.LatLng(lat, lng);
    const marker = new window.kakao.maps.Marker({
      position: markerPosition,
    });
    marker.setMap(map);

    // 4. 지도 레이아웃 재설정 (모달 렌더링 시 깨짐 방지)
    // 약간의 지연을 주어 모달이 다 뜬 뒤 사이즈를 잡도록 함
    setTimeout(() => {
        map.relayout();
        map.setCenter(markerPosition);
    }, 100);

  }, [lat, lng]);

  return (
    <div 
      ref={mapContainer} 
      style={{ 
        width: '100%', 
        height: '250px', // 모달 내 지도 높이
        borderRadius: '12px',
        marginBottom: '20px',
        border: '1px solid #eee'
      }} 
    />
  );
}