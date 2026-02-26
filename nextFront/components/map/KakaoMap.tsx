"use client"

import React, { useEffect, useRef, useState } from 'react'
import Script from 'next/script'

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

  
  const initMap = () => {
    if (!window.kakao || !window.kakao.maps) return;

    window.kakao.maps.load(() => {
      
      if (mapInstance) return; 

      const options = {
        center: new window.kakao.maps.LatLng(centerPos?.lat || 37.5665, centerPos?.lng || 126.9780),
        level: 5
      };
      const map = new window.kakao.maps.Map(mapContainer.current, options);
      setMapInstance(map);
    });
  };

  
  useEffect(() => {
    if (window.kakao && window.kakao.maps) {
      initMap();
    }
  }, []);

  
  useEffect(() => {
    if (mapInstance && centerPos) {
      const moveLatLon = new window.kakao.maps.LatLng(centerPos.lat, centerPos.lng);
      mapInstance.panTo(moveLatLon);
    }
  }, [centerPos, mapInstance]);

  
  useEffect(() => {
    if (!mapInstance || !pharmacyList) return;

    markersRef.current.forEach(m => m.setMap(null));
    markersRef.current = [];

    pharmacyList.forEach((pharmacy) => {
      const marker = new window.kakao.maps.Marker({
        position: new window.kakao.maps.LatLng(Number(pharmacy.y), Number(pharmacy.x)),
        map: mapInstance,
        title: pharmacy.place_name
      });

      
      window.kakao.maps.event.addListener(marker, 'click', function() {
        const url = `https://map.kakao.com/link/map/${pharmacy.place_name},${pharmacy.y},${pharmacy.x}`;
        window.open(url, '_blank'); 
      });

      markersRef.current.push(marker);
    });
  }, [pharmacyList, mapInstance]);

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <Script
        src={`
        onLoad={initMap} 
        strategy="afterInteractive"
      />
      <div ref={mapContainer} style={{ width: '100%', height: '100%' }} />
    </div>
  );
}