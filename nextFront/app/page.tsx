"use client"; // 🚀 클라이언트 컴포넌트 선언

import Spline from '@splinetool/react-spline'; // 에러 방지를 위해 /next를 뺀 기본 라이브러리 사용 권장
import Link from "next/link";

// ❌ export default async function Home() 이 아닙니다!
// ✅ 아래처럼 async를 완전히 제거해야 합니다.
export default function Home() {
  return (
    <main style={{ 
      width: '100vw', 
      height: '100vh', 
      margin: 0, 
      padding: 0, 
      overflow: 'hidden',
      backgroundColor: 'black' 
    }}>
      {/* 1. 흰색 여백을 없애는 글로벌 스타일 */}
      <style jsx global>{`
        html, body {
          margin: 0 !important;
          padding: 0 !important;
          width: 100%;
          height: 100%;
          overflow: hidden;
          background-color: black;
        }
      `}</style>

      {/* 2. 클릭 영역을 화면 전체로 확장 */}
      <Link href="/main" style={{ 
        display: 'block', 
        width: '100%', 
        height: '100%',
        textDecoration: 'none'
      }}>
        <Spline
          scene="https://prod.spline.design/gdJr7skAp6CW9RuL/scene.splinecode" 
          
          
          
          style={{
            width: '100%',
            height: '100%',
            display: 'block'
          }}
        />
      </Link>
    </main>
  );
}