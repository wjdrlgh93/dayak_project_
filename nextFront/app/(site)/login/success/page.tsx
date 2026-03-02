"use client";

import { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { jwtDecode } from "jwt-decode"; 

/**
 * 1. 실제 로그인 로직을 담당하는 컴포넌트 [cite: 2026-02-18]
 * useSearchParams()를 사용하기 때문에 Suspense 하위로 분리했습니다.
 */
function LoginSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // URL에서 토큰 추출
    const token = searchParams.get('token');

    if (token) {
      // 로컬 스토리지에 토큰 저장
      localStorage.setItem('token', token);

      // 토큰 디코딩하여 userId 추출 및 저장
      try {
        const decoded: any = jwtDecode(token);
        if (decoded.userId) {
          localStorage.setItem('userId', String(decoded.userId));
          console.log("Social Login Success! UserId:", decoded.userId);
        }
      } catch (e) {
        console.error("Token decode failed", e);
      }

      // 메인 페이지로 이동
      window.location.href = '/main';
    } else {
      // 토큰이 없으면 로그인 실패 처리
      alert("로그인에 실패했습니다.");
      router.replace('/main');
    }
  }, [searchParams, router]);

  return (
    <div style={{ textAlign: 'center' }}>
      <p>로그인 처리 중입니다...</p>
      <p>잠시만 기다려주세요.</p>
    </div>
  );
}

export default function LoginSuccessPage() {
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh', 
      fontSize: '18px', 
      fontWeight: 'bold' 
    }}>
      {/* 빌드 시 CSR 바일아웃 에러를 방지하기 위해 Suspense로 감싸줍니다. [cite: 2026-02-18] */}
      <Suspense fallback={<div>로딩 중...</div>}>
        <LoginSuccessContent />
      </Suspense>
    </div>
  );
}