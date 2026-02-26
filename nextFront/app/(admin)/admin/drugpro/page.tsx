"use client"

import React, { useState } from 'react';
import axios from 'axios';
import api from '@/util/api';

export default function AdminSyncPage() {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');

    const handleSync = async () => {
        if (!confirm("전체 데이터를 동기화하시겠습니까? 수 분이 소요될 수 있습니다.")) return;

        setStatus('loading');
        setMessage('식약처 서버에서 데이터를 수집하여 DB에 저장 중입니다. 브라우저를 닫지 마세요...');

        try {
            const response = await api.post('/api/pill/sync');
            setStatus('success');
            setMessage(response.data);
            alert("✅ 동기화 완료!");
        } catch (error) {
            console.error(error);
            setStatus('error');
            setMessage('동기화 중 오류가 발생했습니다. 백엔드 콘솔 로그를 확인하세요.');
        }
    };

    return (
        <div style={{ padding: '40px', maxWidth: '600px', margin: '0 auto' }}>
            <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>⚙️ 알약 데이터 관리자 설정</h1>
            <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
                <h3 style={{ marginTop: 0 }}>식약처 DB 전체 동기화</h3>
                <p style={{ color: '#666', fontSize: '14px' }}>
                    식약처 API의 모든 알약 데이터를 우리 DB(PillEntity)로 가져옵니다.<br/>
                    <strong>한 번만 실행하면 이후 검색 속도가 비약적으로 빨라집니다.</strong> 
                </p>
                
                <button 
                    onClick={handleSync}
                    disabled={status === 'loading'}
                    style={{
                        padding: '12px 24px',
                        backgroundColor: status === 'loading' ? '#ccc' : '#0070f3',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                        fontSize: '16px',
                        fontWeight: 'bold'
                    }}
                >
                    {status === 'loading' ? '동기화 진행 중...' : '데이터 전체 동기화 시작'}
                </button>

                {message && (
                    <div style={{ 
                        marginTop: '20px', 
                        padding: '15px', 
                        borderRadius: '5px',
                        backgroundColor: status === 'error' ? '#fff0f0' : '#eefaff',
                        color: status === 'error' ? '#d00' : '#0070f3',
                        border: `1px solid ${status === 'error' ? '#fac' : '#ade'}`
                    }}>
                        {message}
                    </div>
                )}
            </div>
            
            <div style={{ marginTop: '20px' }}>
                <a href="/admin" style={{ color: '#666', textDecoration: 'none', fontSize: '14px' }}>← 어드민 페이지로 돌아가기</a>
            </div>
        </div>
    );
}