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

    
    const markerPosition = new window.kakao.maps.LatLng(lat, lng);
    const marker = new window.kakao.maps.Marker({
      position: markerPosition,
    });
    marker.setMap(map);

    
    
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
        height: '250px', 
        borderRadius: '12px',
        marginBottom: '20px',
        border: '1px solid #eee'
      }} 
    />
  );
}