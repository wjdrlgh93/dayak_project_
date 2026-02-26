"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './login.module.css';
import { jwtDecode } from "jwt-decode"; 
import api from '@/util/api';

export default function LoginPage() {
  const router = useRouter();
  const hasAlerted = useRef(false);
  const [isLoading, setIsLoading] = useState(true);
  const KAKAO_KEY = process.env.NEXT_PUBLIC_KAKAO_API_KEY;
  const API_URL = process.env.NEXT_PUBLIC_API_PORT_URL || "http://168.107.15.125:8080";

  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_KEY}&redirect_uri=${API_URL}/api/auth/kakao/callback&response_type=code&prompt=consent`;
 
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  useEffect(() => {
    console.log("현재 API_URL:", API_URL);
  }, [API_URL]);

  
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      if (!hasAlerted.current) {
        hasAlerted.current = true;
        alert("이미 로그인된 상태입니다.");
        router.replace('/main');
      }
    } else {
      setIsLoading(false);
    }
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
    
    const response = await api.post('/api/member/login', formData);

    
    if (response.status === 200) {
      
      const data = response.data;
      const token = data.accessToken || data.token;
      
      localStorage.setItem('token', token);
      
      try {
        const decoded: any = jwtDecode(token);
        if (decoded.userId) {
          localStorage.setItem('userId', String(decoded.userId));
          console.log("userId 저장 완료:", decoded.userId);
        }
      } catch (decodeError) {
        console.error("토큰 디코딩 실패:", decodeError);
      }

      alert("로그인 되었습니다! 🔓");
      window.location.href = '/main'; 
    }
  } catch (error: any) {
    
    if (error.response && error.response.status === 401) {
      alert("이메일 또는 비밀번호를 확인해주세요. ❌");
    } else {
      console.error("Login Error:", error);
      alert("서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    }
  }
};

  if (isLoading) {
    return null;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>로그인</h2>
      <form onSubmit={handleLogin} className={styles.form}>
        
        <div className={styles.inputGroup}>
          <label className={styles.label}>이메일</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={styles.input}
            placeholder="이메일 입력"
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>비밀번호</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={styles.input}
            placeholder="비밀번호 입력"
            required
          />
        </div>

        <button type="submit" className={styles.button}>로그인</button>

        {}
        <div style={{ marginTop: '30px', textAlign: 'center' }}>
            <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                marginBottom: '20px', 
                color: '#94a3b8', 
                fontSize: '13px' 
            }}>
                <div style={{ flex: 1, height: '1px', backgroundColor: '#e2e8f0' }}></div>
                <span style={{ padding: '0 10px' }}>간편 로그인</span>
                <div style={{ flex: 1, height: '1px', backgroundColor: '#e2e8f0' }}></div>
            </div>

            <a href={KAKAO_AUTH_URL} style={{ display: 'inline-block', transition: 'opacity 0.2s' }}>
                <img 
                    src="./kakao_login_medium_wide.png" 
                    alt="카카오 로그인" 
                    style={{ height: '45px', cursor: 'pointer' }}
                />
            </a>
        </div>

        <div className={styles.footer}>
          <Link href="/authJoin" className={styles.link}>회원가입 하기</Link>
        </div>
      </form>
    </div>
  );
}