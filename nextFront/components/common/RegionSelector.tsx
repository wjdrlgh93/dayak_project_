"use client"

import React, { useState } from 'react';

// 1. 전국 지역 데이터 (전남 예시 포함)
const REGION_DATA: { [key: string]: string[] } = {
  "서울특별시": ["강남구", "강동구", "강북구", "강서구", "관악구", "광진구", "구로구", "금천구", "노원구", "도봉구", "동대문구", "동작구", "마포구", "서대문구", "서초구", "성동구", "성북구", "송파구", "양천구", "영등포구", "용산구", "은평구", "종로구", "중구", "중랑구"],
  "부산광역시": ["강서구", "금정구", "기장군", "남구", "동구", "동래구", "부산진구", "북구", "사상구", "사하구", "서구", "수영구", "연제구", "영도구", "중구", "해운대구"],
  "대구광역시": ["남구", "달서구", "달성군", "동구", "북구", "서구", "수성구", "중구", "군위군"],
  "인천광역시": ["강화군", "계양구", "미추홀구", "남동구", "동구", "부평구", "서구", "연수구", "옹진군", "중구"],
  "광주광역시": ["광산구", "남구", "동구", "북구", "서구"],
  "대전광역시": ["대덕구", "동구", "서구", "유성구", "중구"],
  "울산광역시": ["남구", "동구", "북구", "울주군", "중구"],
  "세종특별자치시": ["세종특별자치시"],
  "경기도": ["가평군", "고양시 덕양구", "고양시 일산동구", "고양시 일산서구", "과천시", "광명시", "광주시", "구리시", "군포시", "김포시", "남양주시", "동두천시", "부천시", "성남시 수정구", "성남시 중원구", "성남시 분당구", "수원시 장안구", "수원시 권선구", "수원시 팔달구", "수원시 영통구", "시흥시", "안산시 상록구", "안산시 단원구", "안성시", "안양시 만안구", "안양시 동안구", "양주시", "양평군", "여주시", "연천군", "오산시", "용인시 처인구", "용인시 기흥구", "용인시 수지구", "의왕시", "의정부시", "이천시", "파주시", "평택시", "포천시", "하남시", "화성시"],
  "강원특별자치도": ["강릉시", "고성군", "동해시", "삼척시", "속초시", "양구군", "양양군", "영월군", "원주시", "인제군", "정선군", "철원군", "춘천시", "태백시", "평창군", "홍천군", "화천군", "횡성군"],
  "충청북도": ["괴산군", "단양군", "보은군", "영동군", "옥천군", "음성군", "제천시", "증평군", "진천군", "청주시 상당구", "청주시 서원구", "청주시 흥덕구", "청주시 청원구", "충주시"],
  "충청남도": ["계룡시", "공주시", "금산군", "논산시", "당진시", "보령시", "부여군", "서산시", "서천군", "아산시", "예산군", "천안시 동남구", "천안시 서북구", "청양군", "태안군", "홍성군"],
  "전북특별자치도": ["고창군", "군산시", "김제시", "남원시", "무주군", "부안군", "순창군", "완주군", "익산시", "임실군", "장수군", "전주시 완산구", "전주시 덕진구", "진안군"],
  "전라남도": ["강진군", "고흥군", "곡성군", "광양시", "구례군", "나주시", "담양군", "목포시", "무안군", "보성군", "순천시", "신안군", "여수시", "영광군", "영암군", "완도군", "장성군", "장흥군", "진도군", "함평군", "해남군", "화순군"],
  "경상북도": ["경산시", "경주시", "고령군", "구미시", "김천시", "문경시", "봉화군", "상주시", "성주군", "안동시", "영덕군", "영양군", "영주시", "영천시", "예천군", "울릉군", "울진군", "의성군", "청도군", "청송군", "칠곡군", "포항시 남구", "포항시 북구"],
  "경상남도": ["거제시", "거창군", "고성군", "김해시", "남해군", "밀양시", "사천시", "산청군", "양산시", "의령군", "진주시", "창녕군", "창원시 의창구", "창원시 성산구", "창원시 마산합포구", "창원시 마산회원구", "창원시 진해구", "통영시", "하동군", "함안군", "함양군", "합천군"],
  "제주특별자치도": ["서귀포시", "제주시"]
};

interface RegionSelectorProps {
  onRegionSelect: (city: string, district: string) => void;
}

export default function RegionSelector({ onRegionSelect }: RegionSelectorProps) {
  // 수정: 초기값을 데이터에 존재하는 정확한 키 값인 "서울특별시"로 변경했습니다.
  // 또는 Object.keys(REGION_DATA)[0] 을 사용하여 첫 번째 항목을 자동으로 선택하게 할 수 있습니다.
  const [selectedSido, setSelectedSido] = useState("서울특별시");

  return (
    <div style={containerStyle}>
      {/* 왼쪽: 시/도 리스트 */}
      <div style={sidebarStyle}>
        {Object.keys(REGION_DATA).map(sido => (
          <div 
            key={sido} 
            onClick={() => setSelectedSido(sido)}
            style={{
              ...sidebarItemStyle,
              color: selectedSido === sido ? '#3b82f6' : '#333',
              backgroundColor: selectedSido === sido ? '#f0f7ff' : 'transparent',
              fontWeight: selectedSido === sido ? 'bold' : 'normal',
            }}
          >
            {sido}
            {selectedSido === sido && <span style={arrowStyle}>〉</span>}
          </div>
        ))}
      </div>

      {/* 오른쪽: 시/군/구 그리드 */}
      <div style={gridContainerStyle}>
        <div style={gridHeaderStyle}>
          <span style={activeBadgeStyle}>전체</span>
        </div>
        <div style={gridStyle}>
          {/* 수정: 안전하게 REGION_DATA[selectedSido]?.map 을 사용합니다. */}
          {REGION_DATA[selectedSido]?.map(d => (
            <div 
              key={d} 
              onClick={() => onRegionSelect(selectedSido, d)}
              style={gridItemStyle}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f5f5f5')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              {d}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ... 스타일 정의는 동일하게 유지 ...
const containerStyle: React.CSSProperties = {
  display: 'flex',
  border: '1px solid #ddd',
  borderRadius: '8px',
  overflow: 'hidden',
  height: '400px',
  backgroundColor: '#fff',
};

const sidebarStyle: React.CSSProperties = {
  width: '120px',
  borderRight: '1px solid #eee',
  backgroundColor: '#f9f9f9',
  overflowY: 'auto',
};

const sidebarItemStyle: React.CSSProperties = {
  padding: '12px 15px',
  cursor: 'pointer',
  fontSize: '14px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderBottom: '1px solid #f0f0f0',
};

const arrowStyle: React.CSSProperties = {
  fontSize: '12px',
};

const gridContainerStyle: React.CSSProperties = {
  flex: 1,
  padding: '20px',
  overflowY: 'auto',
};

const gridHeaderStyle: React.CSSProperties = {
  marginBottom: '15px',
  borderBottom: '1px solid #eee',
  paddingBottom: '10px',
};

const activeBadgeStyle: React.CSSProperties = {
  backgroundColor: '#e0efff',
  color: '#3b82f6',
  padding: '5px 12px',
  borderRadius: '20px',
  fontSize: '13px',
  fontWeight: 'bold',
};

const gridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
  gap: '10px',
};

const gridItemStyle: React.CSSProperties = {
  padding: '10px',
  fontSize: '13px',
  color: '#555',
  cursor: 'pointer',
  textAlign: 'left',
  borderRadius: '4px',
  transition: 'background 0.2s',
};