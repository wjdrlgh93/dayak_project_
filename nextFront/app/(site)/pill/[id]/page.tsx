"use client"

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import styles from './detail.module.css'; 

interface PillDetail {
    itemSeq: string;
    itemName: string;
    entpName: string;
    itemImage: string | null;
    printFront: string;
    printBack: string;
    drugShape: string;
    colorClass1: string;
    className: string; 
    chart: string;     
    efficacy: string | null;
}

export default function PillDetailPage() {
    const { id } = useParams(); 
    const router = useRouter();
    
    const [pill, setPill] = useState<PillDetail | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            fetchDetail();
        }
    }, [id]);

    const fetchDetail = async () => {
        try {
            
            const response = await axios.get(`/api/pill/${id}`);
            setPill(response.data);
        } catch (error) {
            console.error("상세 정보 조회 실패:", error);
            alert("정보를 가져올 수 없습니다.");
            router.back(); 
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className={styles.loadingContainer}>
                <div className={styles.spinner}></div>
                <p>약학 정보를 분석 중입니다... 💊</p>
            </div>
        );
    }

    if (!pill) return null;

    return (
        <div className={styles.container}>
            {}
            <button onClick={() => router.back()} className={styles.backBtn}>
                ← 목록으로 돌아가기
            </button>

            <div className={styles.contentWrapper}>
                {}
                <div className={styles.imageSection}>
                    <img 
                        src={pill.itemImage || "/img/no_drug_img.png"} 
                        alt={pill.itemName} 
                        className={styles.pillImage}
                        onError={(e) => { e.currentTarget.src = "/img/no_drug_img.png" }}
                    />
                    <div className={styles.badges}>
                        <span className={styles.badge}>{pill.drugShape}</span>
                        <span className={styles.badge}>{pill.colorClass1}</span>
                        {pill.className && <span className={styles.classBadge}>{pill.className}</span>}
                    </div>
                </div>

                {}
                <div className={styles.infoSection}>
                    <p className={styles.entpName}>{pill.entpName}</p>
                    <h1 className={styles.drugName}>{pill.itemName}</h1>
                    
                    <div className={styles.section}>
                        <h3>💡 효능 · 효과 (상세)</h3>
                        <div className={styles.efficacyBox}>
                            {pill.efficacy && pill.efficacy !== "정보 없음" ? (
                                <p>{pill.efficacy}</p>
                            ) : (
                                <p className={styles.noInfo}>상세 효능 정보가 등록되지 않았습니다.</p>
                            )}
                        </div>
                    </div>

                    <div className={styles.gridInfo}>
                        <div className={styles.infoItem}>
                            <label>식별 문자 (앞)</label>
                            <span>{pill.printFront || "-"}</span>
                        </div>
                        <div className={styles.infoItem}>
                            <label>식별 문자 (뒤)</label>
                            <span>{pill.printBack || "-"}</span>
                        </div>
                        <div className={styles.infoItem}>
                            <label>제형</label>
                            <span>{pill.chart}</span>
                        </div>
                        <div className={styles.infoItem}>
                            <label>품목 코드</label>
                            <span>{pill.itemSeq}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}