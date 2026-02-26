"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './signup.module.css'; 
import api from '@/util/api'; 

export default function SignupPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    nickName: '',
    gender: 'MAN',
    address: ''
  });
  
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({}); 

    try {
      
      const response = await api.post('/api/member/signup', formData);

      if (response.status === 200 || response.status === 201) {
        alert("회원가입이 성공적으로 완료되었습니다! 🎉");
        router.push('/main');
      }
    } catch (error: any) {
      
      if (error.response) {
        const errorData = error.response.data;
        console.log("백엔드 에러 데이터:", errorData);
        setErrors(errorData); 
      } else {
        console.error("Signup Error:", error);
        alert("서버와 통신 중 오류가 발생했습니다.");
      }
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>회원가입</h2>
      
      <form onSubmit={handleSubmit} className={styles.form}>
        {}
        <div>
          <label className={styles.label}>이메일</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="example@email.com"
            className={styles.input}
          />
          {errors.email && <span className={styles.errorText}>{errors.email}</span>}
        </div>

        {}
        <div>
          <label className={styles.label}>비밀번호</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="비밀번호를 입력하세요"
            className={styles.input}
          />
          {errors.password && <span className={styles.errorText}>{errors.password}</span>}
        </div>

        {}
        <div>
          <label className={styles.label}>이름</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="홍길동"
            className={styles.input}
          />
          {errors.name && <span className={styles.errorText}>{errors.name}</span>}
        </div>

        {}
        <div>
          <label className={styles.label}>닉네임</label>
          <input
            type="text"
            name="nickName"
            value={formData.nickName}
            onChange={handleChange}
            placeholder="별명을 입력하세요"
            className={styles.input}
          />
          {errors.nickName && <span className={styles.errorText}>{errors.nickName}</span>}
        </div>

        {}
        <div>
          <label className={styles.label}>성별</label>
          <select name="gender" value={formData.gender} onChange={handleChange} className={styles.select}>
            <option value="MAN">남성</option>
            <option value="WOMAN">여성</option>
          </select>
        </div>

        {}
        <div>
          <label className={styles.label}>주소</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="주소를 입력하세요"
            className={styles.input}
          />
          {errors.address && <span className={styles.errorText}>{errors.address}</span>}
        </div>

        <button type="submit" className={styles.button}>
          가입하기
        </button>
      </form>
    </div>
  );
}