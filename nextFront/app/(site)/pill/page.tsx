"use client"

import React, { useState, useEffect, Suspense } from 'react';
import axios from 'axios';
import { useRouter, useSearchParams, usePathname } from 'next/navigation'; 
import styles from './pill.module.css';
import { DRUG_SHAPES, COLOR_CLASSES } from '@/src/constants/pillFilters';

interface PillItem {
    itemSeq: string;
    itemName: string;
    entpName: string;
    itemImage: string | null;
    printFront: string;
    drugShape: string;
    colorClass1: string;
    efficacy: string | null;
    link: string | null;
}

function SearchContent() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // 상태 관리 (itemName 추가됨 ⭐️)
    const [itemName, setItemName] = useState('');
    const [printFront, setPrintFront] = useState('');
    const [drugShape, setDrugShape] = useState('');
    const [colorClass1, setColorClass1] = useState('');
    
    const [results, setResults] = useState<PillItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);

    // 페이지네이션
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);

    // ✅ URL 파라미터 감지 (itemName 추가 ⭐️)
    useEffect(() => {
        const name = searchParams.get('itemName') || '';
        const print = searchParams.get('printFront') || '';
        const shape = searchParams.get('drugShape') || '';
        const color = searchParams.get('colorClass1') || '';
        const page = parseInt(searchParams.get('page') || '0', 10);

        setItemName(name);
        setPrintFront(print);
        setDrugShape(shape);
        setColorClass1(color);

        // 조건이 하나라도 있으면 검색 실행
        if (name || print || shape || color) {
            fetchData(name, print, shape, color, page);
        }
    }, [searchParams]);

    // ✅ 데이터 가져오기 (itemName 추가 ⭐️)
    const fetchData = async (name: string, print: string, shape: string, color: string, page: number) => {
        setLoading(true);
        setHasSearched(true);
        
        try {
            const response = await axios.get(`api/pill/search`, {
                params: { 
                    itemName: name.trim(), // ⭐️ 백엔드로 전달
                    printFront: print.trim(),
                    drugShape: shape === "전체" ? "" : shape, 
                    colorClass1: color === "전체" ? "" : color,
                    page: page,
                    size: 20
                }
            });
            
            const data = response.data;
            setResults(data.content || []);
            setTotalPages(data.totalPages || 0);
            setTotalElements(data.totalElements || 0);
            setCurrentPage(page);

        } catch (error) {
            console.error("검색 중 오류 발생:", error);
            setResults([]);
        } finally {
            setLoading(false);
        }
    };

    // ✅ URL 업데이트 (itemName 추가 ⭐️)
    const updateURL = (name: string, print: string, shape: string, color: string, page: number) => {
        const params = new URLSearchParams();
        if (name) params.set('itemName', name);
        if (print) params.set('printFront', print);
        if (shape && shape !== "전체") params.set('drugShape', shape);
        if (color && color !== "전체") params.set('colorClass1', color);
        params.set('page', page.toString());

        router.push(`${pathname}?${params.toString()}`);
    };

    // 핸들러들
    const handleSearch = () => {
        // 유효성 검사에도 이름 추가
        if (!itemName.trim() && !printFront.trim() && !drugShape && !colorClass1) {
            alert("검색 조건을 최소 하나 이상 입력해주세요.");
            return;
        }
        updateURL(itemName, printFront, drugShape, colorClass1, 0);
    };

    const handlePageChange = (newPage: number) => {
        if (newPage < 0 || newPage >= totalPages) return;
        updateURL(itemName, printFront, drugShape, colorClass1, newPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') handleSearch();
    };

    const handleCardClick = (itemSeq: string) => {
        router.push(`/pill/${itemSeq}`);
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h2 className={styles.title}>💊 스마트 알약 식별</h2>
                <p className={styles.subTitle}>
                    이름, 모양, 색상으로 약을 찾아보세요.<br/>
                    <span style={{fontSize: '0.9rem', color: '#666'}}>
                        (네이버 지식백과 연동)
                    </span>
                </p>
            </header>

            <div className={styles.searchFilter}>
                {/* ⭐️ 제품명 입력칸 추가 */}
                <div className={styles.inputGroup}>
                    <label>제품명</label>
                    <input 
                        type="text" 
                        value={itemName} 
                        onChange={(e) => setItemName(e.target.value)} 
                        onKeyDown={handleKeyDown}
                        placeholder="예: 타이레놀" 
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label>식별문자</label>
                    <input 
                        type="text" 
                        value={printFront} 
                        onChange={(e) => setPrintFront(e.target.value)} 
                        onKeyDown={handleKeyDown}
                        placeholder="예: TY, 500" 
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label>모양</label>
                    <select value={drugShape} onChange={(e) => setDrugShape(e.target.value)}>
                        <option value="">전체</option>
                        {DRUG_SHAPES.map((s) => (
                            <option key={s.value} value={s.value}>{s.label}</option>
                        ))}
                    </select>
                </div>
                <div className={styles.inputGroup}>
                    <label>색상</label>
                    <select value={colorClass1} onChange={(e) => setColorClass1(e.target.value)}>
                        <option value="">전체</option>
                        {COLOR_CLASSES.map((c) => (
                            <option key={c.value} value={c.value}>{c.label}</option>
                        ))}
                    </select>
                </div>
                <button onClick={handleSearch} className={styles.searchBtn}>
                    검색하기
                </button>
            </div>

            <hr className={styles.divider} />

            <div className={styles.resultContainer}>
                {loading ? (
                    <div className={styles.loadingWrapper}>
                        <div className={styles.spinner}></div>
                        <p>검색 중입니다... 🧪</p>
                    </div>
                ) : results && results.length > 0 ? (
                    <>
                        <div className={styles.resultHeader}>
                            <span>총 <strong>{totalElements}</strong>개의 알약 (페이지 {currentPage + 1}/{totalPages})</span>
                        </div>

                        <div className={styles.pillGrid}>
                            {results.map((pill) => (
                                <div 
                                    key={pill.itemSeq} 
                                    className={styles.pillCard}
                                    onClick={() => handleCardClick(pill.itemSeq)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <div className={styles.pillImg}>
                                        <img 
                                            src={pill.itemImage || "/img/no_drug_img.png"} 
                                            alt={pill.itemName} 
                                            onError={(e) => { e.currentTarget.src = "/img/no_drug_img.png" }}
                                        />
                                    </div>
                                    <div className={styles.pillInfo}>
                                        <span className={styles.entpName}>{pill.entpName}</span>
                                        <h3 className={styles.drugName}>{pill.itemName}</h3>
                                        
                                        {pill.efficacy && pill.efficacy !== "정보 없음" ? (
                                            <div className={styles.efficacyBox}>
                                                <strong>💡 효능 요약</strong>
                                                <p>{pill.efficacy}</p>
                                            </div>
                                        ) : (
                                            <p className={styles.noEfficacy}>상세 정보 없음</p>
                                        )}
                                        
                                        <div className={styles.pillTags}>
                                            <span className={styles.tag}>{pill.drugShape}</span>
                                            <span className={styles.tag}>{pill.colorClass1}</span>
                                            {pill.printFront && <span className={styles.tag}>{pill.printFront}</span>}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className={styles.pagination}>
                            <button 
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 0}
                                className={styles.pageBtn}
                            >
                                &lt; 이전
                            </button>
                            <span className={styles.pageNumber}>{currentPage + 1}</span>
                            <button 
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage >= totalPages - 1}
                                className={styles.pageBtn}
                            >
                                다음 &gt;
                            </button>
                        </div>
                    </>
                ) : hasSearched && (
                    <div className={styles.noResult}>
                        <p>검색 결과가 없습니다.</p>
                        <small>조건을 확인해주세요.</small>
                    </div>
                )}
            </div>
        </div>
    );
}

export default function PillSearchPage() {
    return (
        <Suspense fallback={<div>로딩 중...</div>}>
            <SearchContent />
        </Suspense>
    );
}