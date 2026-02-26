"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import api from '@/util/api'; 

export default function AddMedicationPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [isAuthChecking, setIsAuthChecking] = useState(true); 
    
    const dayOptions = [
        { label: '월', value: 'MON' }, { label: '화', value: 'TUE' }, { label: '수', value: 'WED' },
        { label: '목', value: 'THU' }, { label: '금', value: 'FRI' }, { label: '토', value: 'SAT' }, { label: '일', value: 'SUN' }
    ];

    const [formData, setFormData] = useState({
        medicineName: '',
        intakeTime: '09:00',
        selectedDays: [] as string[],
        isKakaoAlert: true
    });

    const themeColor = '#4f46e5';

    
    useEffect(() => {
        const checkSocialAuth = async () => {
            const token = localStorage.getItem('token');
            
            if (!token) {
                alert("로그인이 필요한 페이지입니다.");
                router.replace('/authLogin');
                return;
            }

            try {
                
                const res = await api.get('/api/member/detail');
                
                
                if (res.data.socialLogin === 0) {
                    alert("카카오톡 연동을 해주세요!");
                    router.back(); 
                    return;
                }

                
                setIsAuthChecking(false);
            } catch (error) {
                console.error("인증 확인 중 오류:", error);
                alert("사용자 정보를 확인할 수 없습니다. 다시 로그인해주세요.");
                router.replace('/authLogin');
            }
        };

        checkSocialAuth();
    }, [router]);

    const toggleDay = (day: string) => {
        setFormData(prev => ({
            ...prev,
            selectedDays: prev.selectedDays.includes(day)
                ? prev.selectedDays.filter(d => d !== day)
                : [...prev.selectedDays, day]
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.selectedDays.length === 0) return alert("복용 요일을 하나 이상 선택해주세요.");

        setLoading(true);

        try {
            await api.post('/api/medication', {
                medicineName: formData.medicineName,
                intakeTime: formData.intakeTime + ":00",
                intakeDays: formData.selectedDays.join(','),
                isKakaoAlert: formData.isKakaoAlert
            });

            alert("✅ 복약 알림이 등록되었습니다!");
            router.push('/medication/list');
        } catch (error: any) {
            console.error(error);
            if (error.response?.status === 401) {
                alert("세션이 만료되었습니다. 다시 로그인해주세요.");
                router.replace('/authLogin');
            } else {
                alert("등록 중 오류가 발생했습니다.");
            }
        } finally {
            setLoading(false);
        }
    };

    if (isAuthChecking) {
        return <div style={{ padding: '150px', textAlign: 'center' }}>권한 확인 중...</div>;
    }

    return (
        <div style={{ padding: '40px 20px', maxWidth: '500px', margin: '0 auto' }}>
            <h1 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '30px', textAlign: 'center',paddingTop: '100px' }}>
                💊 새 복약 알림 등록
            </h1>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '14px', fontWeight: 'bold', color: '#475569' }}>어떤 약인가요?</label>
                    <input
                        type="text"
                        placeholder="예: 타이레놀, 아침 영양제"
                        required
                        style={{ padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '16px' }}
                        value={formData.medicineName}
                        onChange={(e) => setFormData({ ...formData, medicineName: e.target.value })}
                    />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '14px', fontWeight: 'bold', color: '#475569' }}>언제 복용하시나요?</label>
                    <input
                        type="time"
                        required
                        style={{ padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '16px' }}
                        value={formData.intakeTime}
                        onChange={(e) => setFormData({ ...formData, intakeTime: e.target.value })}
                    />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '14px', fontWeight: 'bold', color: '#475569' }}>복용 요일을 선택하세요</label>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '5px' }}>
                        {dayOptions.map((day) => (
                            <button
                                key={day.value}
                                type="button"
                                onClick={() => toggleDay(day.value)}
                                style={{
                                    flex: 1, padding: '10px 0', borderRadius: '6px', border: '1px solid',
                                    borderColor: formData.selectedDays.includes(day.value) ? themeColor : '#cbd5e1',
                                    backgroundColor: formData.selectedDays.includes(day.value) ? themeColor : '#fff',
                                    color: formData.selectedDays.includes(day.value) ? '#fff' : '#475569',
                                    cursor: 'pointer', fontWeight: 'bold', fontSize: '14px', transition: 'all 0.2s'
                                }}
                            >
                                {day.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div style={{ 
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between', 
                    padding: '15px', backgroundColor: '#f8fafc', borderRadius: '8px', marginTop: '10px'
                }}>
                    <div>
                        <div style={{ fontWeight: 'bold', fontSize: '15px' }}>카카오톡 알림 받기</div>
                        <div style={{ fontSize: '12px', color: '#64748b' }}>설정한 시간에 카톡으로 알려드려요.</div>
                    </div>
                    <input 
                        type="checkbox" 
                        style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                        checked={formData.isKakaoAlert}
                        onChange={(e) => setFormData({ ...formData, isKakaoAlert: e.target.checked })}
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    style={{
                        marginTop: '20px', padding: '15px', backgroundColor: loading ? '#ccc' : themeColor,
                        color: '#fff', border: 'none', borderRadius: '8px', fontSize: '18px', fontWeight: 'bold',
                        cursor: loading ? 'not-allowed' : 'pointer'
                    }}
                >
                    {loading ? "등록 중..." : "알림 등록하기"}
                </button>
            </form>

            <div style={{ marginTop: '20px', textAlign: 'center' }}>
                <Link href="/main" style={{ color: '#64748b', textDecoration: 'none', fontSize: '14px' }}>취소하고 돌아가기</Link>
            </div>
        </div>
    );
}