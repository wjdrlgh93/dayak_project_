"use client";

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import api from '@/util/api'; 

export default function EditMedicationPage() {
    const router = useRouter();
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        medicineName: '',
        intakeTime: '09:00',
        selectedDays: [] as string[],
        isKakaoAlert: true
    });

    const dayOptions = [
        { label: '월', value: 'MON' }, { label: '화', value: 'TUE' }, { label: '수', value: 'WED' },
        { label: '목', value: 'THU' }, { label: '금', value: 'FRI' }, { label: '토', value: 'SAT' }, { label: '일', value: 'SUN' }
    ];

    const themeColor = '#4f46e5';

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.replace('/authLogin');
            return;
        }
        validateAndFetch(); 
    }, [id, router]);

    const validateAndFetch = async () => {
        try {
            
            const userRes = await api.get('/api/member/detail');

            if (userRes.data.socialLogin === 0) {
                alert("카카오톡 연동을 해주세요!");
                router.back();
                return;
            }

            
            
            const res = await api.get(`/api/medication/${id}`);
            
            const data = res.data;
            setFormData({
                medicineName: data.medicineName,
                intakeTime: data.intakeTime.substring(0, 5),
                selectedDays: data.intakeDays.split(','),
                isKakaoAlert: data.isKakaoAlert
            });
            
            setLoading(false);
        } catch (e) {
            console.error("데이터 로드 실패:", e);
            alert("정보를 가져오는 중 오류가 발생했습니다.");
            router.back();
        }
    };

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

        setSubmitting(true);

        try {
            console.log("🚀 전송 데이터:", {
                medicineName: formData.medicineName,
                isKakaoAlert: formData.isKakaoAlert 
            });
            
            await api.put(`/api/medication/${id}`, {
                medicineName: formData.medicineName,
                intakeTime: formData.intakeTime + ":00",
                intakeDays: formData.selectedDays.join(','),
                isKakaoAlert: formData.isKakaoAlert
            });

            alert("✅ 복약 정보가 수정되었습니다!");
            router.push('/medication/list');
        } catch (error) {
            alert("수정 중 오류가 발생했습니다.");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <div style={{ padding: '150px', textAlign: 'center' }}>권한 및 정보 확인 중...</div>;

    return (
        <div style={{ padding: '40px 20px', maxWidth: '500px', margin: '0 auto' }}>
            <h1 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '30px', textAlign: 'center' }}>✏️ 복약 정보 수정</h1>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '14px', fontWeight: 'bold' }}>약 이름</label>
                    <input
                        type="text"
                        required
                        style={{ padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                        value={formData.medicineName}
                        onChange={(e) => setFormData({ ...formData, medicineName: e.target.value })}
                    />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '14px', fontWeight: 'bold' }}>복용 시간</label>
                    <input
                        type="time"
                        required
                        style={{ padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                        value={formData.intakeTime}
                        onChange={(e) => setFormData({ ...formData, intakeTime: e.target.value })}
                    />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '14px', fontWeight: 'bold' }}>요일 선택</label>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '4px' }}>
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
                                    cursor: 'pointer', fontWeight: 'bold', fontSize: '12px'
                                }}
                            >
                                {day.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '15px', backgroundColor: '#f8fafc', borderRadius: '8px' }}>
                    <span style={{ fontWeight: 'bold' }}>카카오톡 알림 사용</span>
                    <input 
                        type="checkbox" 
                        style={{ width: '20px', height: '20px' }}
                        checked={formData.isKakaoAlert}
                        onChange={(e) => setFormData({ ...formData, isKakaoAlert: e.target.checked })}
                    />
                </div>

                <button
                    type="submit"
                    disabled={submitting}
                    style={{
                        marginTop: '10px', padding: '15px', backgroundColor: submitting ? '#ccc' : themeColor,
                        color: '#fff', border: 'none', borderRadius: '8px', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer'
                    }}
                >
                    {submitting ? "수정 중..." : "수정 완료"}
                </button>
                <button type="button" onClick={() => router.back()} style={{ border: 'none', background: 'none', color: '#64748b', cursor: 'pointer' }}>취소</button>
            </form>
        </div>
    );
}