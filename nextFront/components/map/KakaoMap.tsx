"use client";

import React, { useEffect, useRef, useState } from "react";
import Script from "next/script";

const KAKAO_KEY = process.env.NEXT_PUBLIC_KAKAO_APP_KEY;

interface Pharmacy {
  id: string;
  place_name: string;
  address_name: string;
  y: string;
  x: string;
}

interface KakaoMapProps {
  pharmacyList: Pharmacy[];
  centerPos?: { lat: number; lng: number };
}

export default function KakaoMap({ pharmacyList, centerPos }: KakaoMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [mapInstance, setMapInstance] = useState<any>(null);
  const markersRef = useRef<any[]>([]);

  // 🚀 1. 지도 초기화 함수 [cite: 2026-02-19]
  const initMap = () => {
    if (!window.kakao || !window.kakao.maps) return;

    window.kakao.maps.load(() => {
      // 이미 지도가 생성되어 있다면 새로 만들지 않음 [cite: 2026-02-19]
      if (mapInstance) return;

      const options = {
        center: new window.kakao.maps.LatLng(
          centerPos?.lat || 37.5665,
          centerPos?.lng || 126.978,
        ),
        level: 5,
      };
      const map = new window.kakao.maps.Map(mapContainer.current, options);
      setMapInstance(map);
    });
  };

  // 🚀 2. [추가] 새로고침 없이도 지도가 뜨도록 체크 [cite: 2026-02-19]
  useEffect(() => {
    if (window.kakao && window.kakao.maps) {
      initMap();
    }
  }, []);

  // 🚀 3. 지역 변경 시 지도 중심 이동
  useEffect(() => {
    if (mapInstance && centerPos) {
      const moveLatLon = new window.kakao.maps.LatLng(
        centerPos.lat,
        centerPos.lng,
      );
      mapInstance.panTo(moveLatLon);
    }
  }, [centerPos, mapInstance]);

  // 🚀 4. 약국 리스트 마커 표시 및 클릭 이벤트 추가 [cite: 2026-02-19]
  useEffect(() => {
    if (!mapInstance || !pharmacyList) return;

    markersRef.current.forEach((m) => m.setMap(null));
    markersRef.current = [];

    pharmacyList.forEach((pharmacy) => {
      const marker = new window.kakao.maps.Marker({
        position: new window.kakao.maps.LatLng(
          Number(pharmacy.y),
          Number(pharmacy.x),
        ),
        map: mapInstance,
        title: pharmacy.place_name,
      });

      // 🖱️ [추가] 마커 클릭 시 카카오맵 길찾기로 이동 [cite: 2026-02-19]
      window.kakao.maps.event.addListener(marker, "click", function () {
        const url = `https://map.kakao.com/link/map/${pharmacy.place_name},${pharmacy.y},${pharmacy.x}`;
        window.open(url, "_blank"); // 새 탭으로 열기
      });

      markersRef.current.push(marker);
    });
  }, [pharmacyList, mapInstance]);

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <Script
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_KEY}&autoload=false&libraries=services`}
        onLoad={initMap}
        strategy="afterInteractive"
      />
      <div ref={mapContainer} style={{ width: "100%", height: "100%" }} />
    </div>
  );
}
