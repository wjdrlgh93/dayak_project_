"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/util/api';

interface Medication {
    medicationId: number;
    medicineName: string;
    intakeDays: string;
}

interface CheckRecord {
    id: number;
    checkDate: string;
    medicineName: string;
    medicationId: number;
}

export default function MedicationCalendarPage() {
    const router = useRouter();
    const [medications, setMedications] = useState<Medication[]>([]);
    const [records, setRecords] = useState<CheckRecord[]>([]);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [loading, setLoading] = useState(true);
    const [selectedDate, setSelectedDate] = useState<string | null>(null);

    const themeColor = '#4f46e5';

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.replace('/authLogin');
            return;
        }
        fetchAllData();
    }, [router]);

    const fetchAllData = async () => {
        try {
            const [medRes, recordRes] = await Promise.all([
                api.get('/api/medication/list'),
                api.get('/api/medication/check/history')
            ]);
            setMedications(Array.isArray(medRes.data) ? medRes.data : []);
            setRecords(Array.isArray(recordRes.data) ? recordRes.data : []);
        } catch (e: any) {
            console.error("데이터 로딩 실패:", e);
        } finally {
            setLoading(false);
        }
    };

    const getDayName = (dayIndex: number) => {
        return ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'][dayIndex];
    };

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    if (loading) return <div style={{ padding: '150px', textAlign: 'center' }}>로딩 중...</div>;

    return (
        <div className="calendar-page-root">
            {}
            <style jsx>{`
                .calendar-page-root {
                    padding: 120px 16px 60px;
                    max-width: 800px;
                    margin: 0 auto;
                    font-family: 'Pretendard', sans-serif;
                }
                .header-section { text-align: center; margin-bottom: 30px; }
                .calendar-title { font-size: 24px; font-weight: 800; color: #1e293b; margin-bottom: 8px; }
                .calendar-nav { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
                .day-names { display: grid; grid-template-columns: repeat(7, 1fr); text-align: center; font-weight: 700; color: #64748b; margin-bottom: 10px; }
                .calendar-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 8px; }
                .day-cell {
                    min-height: 90px;
                    border-radius: 12px;
                    padding: 8px;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    border: 2px solid #e2e8f0;
                    background: #fff;
                }
                .status-container { text-align: center; font-size: 11px; }

                
                .detail-card {
                    margin-top: 30px;
                    padding: 20px;
                    background: #fff;
                    border-radius: 16px;
                    border: 1px solid #e2e8f0;
                    box-shadow: 0 10px 25px -5px rgba(0,0,0,0.05);
                }
                .med-item {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 12px;
                    border-radius: 10px;
                    margin-bottom: 8px;
                    border: 1px solid #f1f5f9;
                }

                @media (max-width: 400px) {
                    .calendar-page-root { padding-top: 100px; }
                    .calendar-title { font-size: 20px; }
                    .calendar-grid { gap: 4px; }
                    .day-cell { min-height: 65px; padding: 4px; border-radius: 8px; }
                    .day-cell span { font-size: 12px; }
                    .status-container { font-size: 9px; letter-spacing: -1px; }
                    .day-names div { font-size: 12px; }
                }
            `}</style>

            <div className="header-section">
                <h1 className="calendar-title">🗓️ 복약 캘린더</h1>
                <p style={{ color: '#64748b', fontSize: '14px' }}>날짜를 눌러 상세 내역을 확인하세요.</p>
            </div>

            <div className="calendar-nav">
                <button style={{ padding: '8px 12px', border: '1px solid #e2e8f0', background: '#fff', borderRadius: '8px', cursor: 'pointer' }} onClick={() => setCurrentDate(new Date(year, month - 1))}>◀</button>
                <h2 style={{ fontSize: '18px', fontWeight: 'bold' }}>{year}년 {month + 1}월</h2>
                <button style={{ padding: '8px 12px', border: '1px solid #e2e8f0', background: '#fff', borderRadius: '8px', cursor: 'pointer' }} onClick={() => setCurrentDate(new Date(year, month + 1))}>▶</button>
            </div>

            <div className="day-names">
                {['일', '월', '화', '수', '목', '금', '토'].map(d => <div key={d}>{d}</div>)}
            </div>

            <div className="calendar-grid">
                {Array.from({ length: firstDay }).map((_, i) => <div key={`empty-${i}`} />)}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                    const day = i + 1;
                    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                    const dayName = getDayName(new Date(year, month, day).getDay());

                    const dayMeds = medications.filter(m => m.intakeDays.includes(dayName) || m.intakeDays === 'EVERYDAY');
                    const totalToTake = dayMeds.length;
                    const dayRecords = records.filter(r => r.checkDate === dateStr);
                    const takenCount = new Set(dayRecords.map(r => r.medicationId)).size;

                    let bgColor = '#fff';
                    let borderColor = selectedDate === dateStr ? themeColor : '#e2e8f0';
                    let statusColor = '#94a3b8';

                    if (totalToTake > 0) {
                        if (takenCount === 0) { borderColor = '#cbd5e1'; }
                        else if (takenCount < totalToTake) { bgColor = '#fffbeb'; borderColor = '#fbbf24'; statusColor = '#d97706'; }
                        else { bgColor = '#f0fdf4'; borderColor = '#22c55e'; statusColor = '#16a34a'; }
                    }

                    return (
                        <div key={day} className="day-cell" onClick={() => setSelectedDate(dateStr)}
                            style={{ 
                                backgroundColor: bgColor, 
                                borderColor: selectedDate === dateStr ? themeColor : borderColor,
                                transform: selectedDate === dateStr ? 'scale(1.05)' : 'none',
                                zIndex: selectedDate === dateStr ? 10 : 1
                            }}>
                            <span style={{ fontWeight: '700' }}>{day}</span>
                            <div className="status-container" style={{ color: statusColor }}>
                                {totalToTake > 0 ? (takenCount === totalToTake ? '✅' : `${takenCount}/${totalToTake}`) : ''}
                            </div>
                        </div>
                    );
                })}
            </div>

            {selectedDate && (
                <div className="detail-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                        <h3 style={{ margin: 0, fontSize: '18px' }}>📍 {selectedDate}</h3>
                        <button onClick={() => setSelectedDate(null)} style={{ border: 'none', background: 'none', color: '#94a3b8', cursor: 'pointer' }}>닫기</button>
                    </div>
                    {(() => {
                        const dayName = getDayName(new Date(selectedDate).getDay());
                        const meds = medications.filter(m => m.intakeDays.includes(dayName) || m.intakeDays === 'EVERYDAY');
                        if (meds.length === 0) return <p style={{ color: '#64748b', textAlign: 'center' }}>일정이 없습니다.</p>;
                        return meds.map(m => {
                            const isTaken = records.some(r => r.checkDate === selectedDate && r.medicationId === m.medicationId);
                            return (
                                <div key={m.medicationId} className="med-item" style={{ backgroundColor: isTaken ? '#f0fdf4' : '#fff1f2', borderColor: isTaken ? '#22c55e' : '#fda4af' }}>
                                    <span style={{ fontWeight: '600' }}>{m.medicineName}</span>
                                    <span style={{ fontSize: '12px', fontWeight: '800', color: isTaken ? '#16a34a' : '#e11d48' }}>
                                        {isTaken ? '복용 완료' : '미복용'}
                                    </span>
                                </div>
                            );
                        });
                    })()}
                </div>
            )}
        </div>
    );
}