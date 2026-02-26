"use client"

import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import styles from './mypage.module.css';
import api from '@/util/api';

interface MemberDto {
  email: string;
  name: string;
  nickName: string;
  address: string;
  fileUrl?: string; 
}

export default function MyPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [member, setMember] = useState<MemberDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);

  const [formData, setFormData] = useState({
    nickName: '',
    address: '',
    currentPassword: '',
    newPassword: ''
  });

  const fetchMember = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        alert("로그인이 필요합니다.");
        router.push('/authLogin');
        return;
    }

    try {
        const res = await api.get('/api/member/detail');
        const data = res.data;
        setMember(data);
        setFormData({ 
            nickName: data.nickName, 
            address: data.address || '',
            currentPassword: '',
            newPassword: ''
        });
    } catch (e: any) {
        console.error("회원 정보 로드 실패:", e);
        if (e.response?.status === 401 || e.response?.status === 403) {
            alert("로그인 세션이 만료되었습니다. 다시 로그인해주세요.");
            localStorage.removeItem('token');
            router.push('/authLogin');
        } else {
            alert("서버 오류가 발생했습니다.");
        }
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
    fetchMember();
  }, []);

  const handleUpdate = async () => {
    if (formData.newPassword && !formData.currentPassword) {
        alert("비밀번호를 변경하려면 현재 비밀번호를 입력해야 합니다.");
        return;
    }

    try {
        await api.put('/api/member/update', formData);
        alert("성공적으로 수정되었습니다.");
        setEditMode(false);
        fetchMember();
    } catch (e: any) {
        const errorMsg = e.response?.data || "서버 통신 오류";
        alert("수정 실패: " + errorMsg);
    }
  };

  
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];
    const uploadData = new FormData();
    
    uploadData.append('file', file);

    try {
        
        await api.post('/api/member/profileImg', uploadData, {
            headers: {
                
                
                'Content-Type': 'multipart/form-data'
            }
        });

        alert("프로필 사진이 변경되었습니다.");
        fetchMember(); 
    } catch (e: any) {
        console.error("이미지 업로드 상세 에러:", e.response?.data || e.message);
        alert("이미지 업로드에 실패했습니다.");
    }
};

  if (loading) return <div className={styles.loading}>로딩중...</div>;
  if (!member) return <div className={styles.loading}>회원 정보가 없습니다.</div>;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>마이페이지</h2>
      
      <div className={styles.card}>
        <div className={styles.profileSection}>
            <div 
                className={styles.imgWrapper} 
                onClick={() => fileInputRef.current?.click()}
            >
                {}
                <img 
                    src={member.fileUrl || "/img/default_profile.png"} 
                    alt="프로필" 
                    className={styles.profileImg}
                    onError={(e) => { 
                        const target = e.currentTarget;
                        if (!target.src.includes("/img/default_profile.png")) {
                            target.src = "/img/default_profile.png";
                        } else {
                            target.style.display = 'none';
                        }
                    }}
                />
                <div className={styles.overlay}>📷 변경</div>
            </div>
            <input 
                type="file" 
                ref={fileInputRef} 
                style={{display:'none'}} 
                accept="image/*"
                onChange={handleFileChange}
            />
        </div>

        <div className={styles.infoSection}>
            <div className={styles.row}>
                <label>이메일</label>
                <input type="text" value={member.email} disabled className={styles.inputDisabled} />
            </div>

            <div className={styles.row}>
                <label>이름</label>
                <input type="text" value={member.name} disabled className={styles.inputDisabled} />
            </div>

            <div className={styles.row}>
                <label>닉네임</label>
                {editMode ? (
                    <input 
                        value={formData.nickName} 
                        onChange={(e)=>setFormData({...formData, nickName: e.target.value})}
                        className={styles.input}
                    />
                ) : (
                    <div className={styles.textValue}>{member.nickName}</div>
                )}
            </div>

            <div className={styles.row}>
                <label>주소</label>
                {editMode ? (
                    <input 
                        value={formData.address} 
                        onChange={(e)=>setFormData({...formData, address: e.target.value})}
                        className={styles.input}
                    />
                ) : (
                    <div className={styles.textValue}>{member.address || "주소 없음"}</div>
                )}
            </div>

            {editMode && (
                <div className={styles.passwordSection}>
                    <h4 className={styles.subTitle}>🔒 비밀번호 변경 (선택)</h4>
                    <div className={styles.row}>
                        <label>현재 비밀번호</label>
                        <input 
                            type="password"
                            placeholder="변경하려면 현재 비밀번호 입력"
                            value={formData.currentPassword} 
                            onChange={(e)=>setFormData({...formData, currentPassword: e.target.value})}
                            className={styles.input}
                        />
                    </div>
                    <div className={styles.row}>
                        <label>새 비밀번호</label>
                        <input 
                            type="password"
                            placeholder="새 비밀번호 입력"
                            value={formData.newPassword} 
                            onChange={(e)=>setFormData({...formData, newPassword: e.target.value})}
                            className={styles.input}
                        />
                    </div>
                </div>
            )}

            <div className={styles.btnArea}>
                {editMode ? (
                    <>
                        <button onClick={handleUpdate} className={styles.saveBtn}>저장하기</button>
                        <button onClick={()=>{
                            setEditMode(false);
                            setFormData({
                                ...formData, 
                                nickName: member.nickName, 
                                address: member.address,
                                currentPassword: '',
                                newPassword: ''
                            });
                        }} className={styles.cancelBtn}>취소</button>
                    </>
                ) : (
                    <button onClick={()=>setEditMode(true)} className={styles.editBtn}>수정하기</button>
                )}
            </div>
        </div>
      </div>
    </div>
  );
}