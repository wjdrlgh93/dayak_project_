// app/drug/[id]/page.tsx
"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getDrugDetail } from '@/util/drugApi';
import '../drug.css'; // CSS 재사용

export default function DrugDetailPage() {
    const { id } = useParams(); // URL에서 itemSeq(id) 가져오기
    const router = useRouter();
    const [drug, setDrug] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            getDrugDetail(id as string)
                .then(data => setDrug(data))
                .catch(err => alert("정보를 불러오지 못했습니다."))
                .finally(() => setLoading(false));
        }
    }, [id]);

    if (loading) return <div className="message">로딩 중...</div>;
    if (!drug) return <div className="message">데이터가 없습니다.</div>;

    return (
        <div className="container">
            {/* 뒤로 가기 버튼 */}
            <button 
                onClick={() => router.back()} 
                className="btn" 
                style={{ marginBottom: '20px', padding: '10px 20px', backgroundColor: '#666' }}
            >
                ← 목록으로 돌아가기
            </button>

            <div className="detail-card" style={{ 
                backgroundColor: 'white', 
                padding: '40px', 
                borderRadius: '16px', 
                boxShadow: '0 4px 20px rgba(0,0,0,0.05)' 
            }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '40px' }}>
                    {drug.itemImage ? (
                        <img 
                            src={drug.itemImage} 
                            alt={drug.itemName} 
                            style={{ maxWidth: '100%', maxHeight: '400px', borderRadius: '12px', marginBottom: '20px' }} 
                        />
                    ) : (
                        <div style={{ width: '100%', height: '200px', backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '12px' }}>이미지 없음</div>
                    )}
                    <h1 style={{ fontSize: '2rem', marginBottom: '10px', color: '#333' }}>{drug.itemName}</h1>
                    <span style={{ fontSize: '1.1rem', color: '#666' }}>{drug.entpName}</span>
                </div>

                <div className="detail-content" style={{ lineHeight: '1.8' }}>
                    <Section title="효능·효과" content={drug.efficacy} />
                    <Section title="사용법" content={drug.useMethod} />
                    <Section title="주의사항" content={drug.caution} />
                </div>
            </div>
        </div>
    );
}

// 간단한 섹션 컴포넌트
function Section({ title, content }: { title: string, content: string }) {
    if (!content || content === "정보 없음") return null;
    return (
        <div style={{ marginBottom: '30px' }}>
            <h3 style={{ fontSize: '1.4rem', borderLeft: '4px solid #2563eb', paddingLeft: '10px', marginBottom: '15px', color: '#111' }}>
                {title}
            </h3>
            <p style={{ color: '#444', whiteSpace: 'pre-wrap' }}>{content}</p>
        </div>
    );
}