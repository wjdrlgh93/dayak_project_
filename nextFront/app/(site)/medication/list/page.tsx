"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import api from '@/util/api';

interface Medication {
    medicationId: number;
    medicineName: string;
    intakeTime: string;
    intakeDays: string;
    isKakaoAlert: boolean;
}

export default function MedicationListPage() {
    const [medications, setMedications] = useState<Medication[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.replace('/authLogin');
            return;
        }
        fetchMedications();
    }, [router]);

   const fetchMedications = async () => {
    try {
        // 🚀 도메인 생략 및 자동 토큰 주입 [cite: 2026-02-18]
        const res = await api.get('/api/medication/list');
        
        // Axios는 응답 데이터가 .data에 담겨 있습니다. [cite: 2026-02-18]
        setMedications(Array.isArray(res.data) ? res.data : []);
    } catch (e: any) {
        console.error("목록 로드 실패", e);
        
        if (e.response?.status === 401) {
            alert("세션이 만료되었습니다. 다시 로그인해주세요.");
        }
    } finally {
        setLoading(false);
    }
};

// 2. 삭제 함수 (localStorage에서 직접 꺼내던 로직 제거)
const handleDelete = async (id: number) => {
    if (!confirm("정말 이 복약 알림을 삭제하시겠습니까?")) return;
    
    try {
        // 🚀 경로만 사용하여 DELETE 요청 [cite: 2026-02-18]
        await api.delete(`/api/medication/${id}`);
        
        alert("삭제되었습니다. ✅");
        // 상태 업데이트로 화면에서 즉시 제거
        setMedications(medications.filter(m => m.medicationId !== id));
    } catch (e: any) {
        console.error("삭제 실패:", e);
        
        if (e.response?.status === 401) {
            alert("삭제 권한이 없거나 세션이 만료되었습니다.");
        } else {
            alert("삭제 중 오류가 발생했습니다.");
        }
    }
};

    if (loading) return <div style={{ padding: '150px', textAlign: 'center' }}>로딩 중...</div>;

    return (
        <div style={{ padding: '140px 20px 80px', maxWidth: '600px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <h1 style={{ fontSize: '24px', fontWeight: '800' }}>💊 복약 관리 목록</h1>
                <Link href="/medication/add" style={{ 
                    padding: '10px 15px', backgroundColor: '#4f46e5', color: '#fff', 
                    borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px' 
                }}>+ 약 추가</Link>
            </div>

            {medications.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '50px', backgroundColor: '#f8fafc', borderRadius: '15px', color: '#64748b' }}>
                    등록된 복약 알림이 없습니다.
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    {medications.map((med) => (
                        <div key={med.medicationId} style={{ 
                            padding: '20px', border: '1px solid #e2e8f0', borderRadius: '15px', 
                            display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff'
                        }}>
                            <div>
                                <div style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '5px' }}>{med.medicineName}</div>
                                <div style={{ fontSize: '14px', color: '#64748b' }}>
                                    ⏰ {med.intakeTime.substring(0, 5)} | 📅 {med.intakeDays}
                                </div>
                                {med.isKakaoAlert && <span style={{ fontSize: '11px', color: '#4f46e5', fontWeight: 'bold' }}>💬 카톡 알림 켜짐</span>}
                            </div>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <Link href={`/medication/edit/${med.medicationId}`} style={{ 
                                    padding: '8px 12px', backgroundColor: '#f1f5f9', color: '#475569', 
                                    borderRadius: '6px', textDecoration: 'none', fontSize: '13px', fontWeight: 'bold'
                                }}>수정</Link>
                                <button onClick={() => handleDelete(med.medicationId)} style={{ 
                                    padding: '8px 12px', backgroundColor: '#fee2e2', color: '#ef4444', 
                                    border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', fontWeight: 'bold'
                                }}>삭제</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            
            <div style={{ marginTop: '30px', textAlign: 'center' }}>
                <Link href="/medication/calender" style={{ color: '#4f46e5', textDecoration: 'none', fontWeight: 'bold' }}>📅 복약 달력 보기</Link>
            </div>
        </div>
    );
}