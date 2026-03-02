"use client";

import React, { useState, useEffect, Suspense } from 'react'; // Suspense 추가
import { useRouter, useSearchParams } from 'next/navigation';
import { searchDrugs, syncDrugs } from '@/util/drugApi';
import Link from 'next/link';
import './drug.css';

/**
 * 1. 실제 약품 검색 로직을 담당하는 컴포넌트
 * useSearchParams()를 사용하기 때문에 Suspense 하위로 분리했습니다.
 */
function DrugContent() {
    const router = useRouter();
    const searchParams = useSearchParams();

    // URL에서 초기값 읽어오기
    const initialKeyword = searchParams.get('keyword') || "";
    const initialPage = parseInt(searchParams.get('page') || "0");

    const [keyword, setKeyword] = useState<string>(initialKeyword);
    const [drugs, setDrugs] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    
    const [page, setPage] = useState<number>(initialPage);
    const [totalPages, setTotalPages] = useState<number>(0);

    // URL 파라미터가 바뀔 때마다 데이터 페칭
    useEffect(() => {
        const currentKeyword = searchParams.get('keyword');
        const currentPage = parseInt(searchParams.get('page') || "0");
        
        if (currentKeyword) {
            fetchDrugs(currentKeyword, currentPage);
            setKeyword(currentKeyword);
            setPage(currentPage);
        }
    }, [searchParams]);

    const fetchDrugs = async (searchKeyword: string, searchPage: number) => {
        setLoading(true);
        setMessage("데이터를 불러오는 중...");
        try {
            const data = await searchDrugs(searchKeyword, searchPage, 10);
            setDrugs(data.content);
            setTotalPages(data.totalPages);
            setPage(data.number);

            if(data.totalElements === 0) {
                setMessage("검색 결과가 없습니다.");
            } else {
                setMessage("");
            }
        } catch (err) {
            setMessage("오류가 발생했습니다.");
            setDrugs([]);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (!keyword.trim()) return;
        router.push(`/drug?keyword=${keyword}&page=0`);
    };

    const handlePageChange = (newPage: number) => {
        if (newPage >= 0 && newPage < totalPages) {
            router.push(`/drug?keyword=${keyword}&page=${newPage}`);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handleSync = async () => {
        if (!confirm("동기화 하시겠습니까?")) return;
        setLoading(true);
        try {
            const resultMsg = await syncDrugs();
            alert(resultMsg);
        } catch (err) {
            alert("동기화 실패");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="searchBox">
                <form onSubmit={handleSearch}>
                    <input
                        type="text"
                        className="input"
                        placeholder="약 이름 (예: 타이레놀)"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                    />
                    <button type="submit" className="btn" disabled={loading}>검색</button>
                </form>
            </div>

            {message && <div className="message">{message}</div>}

            {!loading && drugs.length > 0 && (
                <div className="grid">
                    {drugs.map((drug: any) => (
                        <Link href={`/drug/${drug.itemSeq}`} key={drug.itemSeq} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <div className="card">
                                <div className="imgWrapper">
                                    {drug.itemImage ? <img src={drug.itemImage} alt={drug.itemName} /> : <span>이미지 없음</span>}
                                </div>
                                <div className="content">
                                    <span className="company">{drug.entpName}</span>
                                    <h3 className="drugName">{drug.itemName}</h3>
                                    <p className="info"><strong>효능:</strong> {drug.efficacy}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}

            {!loading && drugs.length > 0 && (
                <div className="pagination-container">
                    <button className="page-btn" onClick={() => handlePageChange(page - 1)} disabled={page === 0}>&lt; 이전</button>
                    <span className="page-info">Page <span className="current-page">{page + 1}</span> of {totalPages}</span>
                    <button className="page-btn" onClick={() => handlePageChange(page + 1)} disabled={page >= totalPages - 1}>다음 &gt;</button>
                </div>
            )}
            
            {/* 동기화 버튼 필요한 경우 여기에 배치 */}
            <div style={{ marginTop: '20px', textAlign: 'center' }}>
                <button onClick={handleSync} className="btn" style={{ backgroundColor: '#666' }}>데이터 동기화</button>
            </div>
        </>
    );
}

/**
 * 2. 메인 페이지 컴포넌트
 */
export default function DrugPage() {
    return (
        <div className="container">
            <h1 className="title">e약은요 검색</h1>
            
            {/* 빌드 에러 방지를 위해 Suspense로 감싸줍니다. */}
            <Suspense fallback={<div className="message">검색 화면을 불러오는 중입니다...</div>}>
                <DrugContent />
            </Suspense>
        </div>
    );
}