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
    
    const token = searchParams.get('token');

    if (token) {
      
      localStorage.setItem('token', token);

      
      try {
        const decoded: any = jwtDecode(token);
        if (decoded.userId) {
          localStorage.setItem('userId', String(decoded.userId));
          console.log("Social Login Success! UserId:", decoded.userId);
        }
      } catch (e) {
        console.error("Token decode failed", e);
      }

      
      window.location.href = '/main';
    } else {
      
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
      {}
      <Suspense fallback={<div>로딩 중...</div>}>
        <LoginSuccessContent />
      </Suspense>
    </div>
  );
}