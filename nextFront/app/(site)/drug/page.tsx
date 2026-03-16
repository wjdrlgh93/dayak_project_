"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { searchDrugs } from "@/util/drugApi"; // syncDrugs는 여기서 빼버립니다.
import Link from "next/link";
import "./drug.css";

function DrugContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialKeyword = searchParams.get("keyword") || "";
  const initialPage = parseInt(searchParams.get("page") || "0");

  const [keyword, setKeyword] = useState<string>(initialKeyword);
  const [drugs, setDrugs] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const [page, setPage] = useState<number>(initialPage);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [totalElements, setTotalElements] = useState<number>(0);

  useEffect(() => {
    const currentKeyword = searchParams.get("keyword");
    const currentPage = parseInt(searchParams.get("page") || "0");

    if (currentKeyword) {
      fetchDrugs(currentKeyword, currentPage);
      setKeyword(currentKeyword);
      setPage(currentPage);
    }
  }, [searchParams]);

  const fetchDrugs = async (searchKeyword: string, searchPage: number) => {
    setLoading(true);
    setMessage(""); // 검색 시작 시 메시지 초기화

    try {
      // 백엔드의 지능형 검색 API 호출
      const data = await searchDrugs(searchKeyword, searchPage, 10);

      setDrugs(data.content);
      setTotalPages(data.totalPages);
      setTotalElements(data.totalElements);
      setPage(data.number);

      if (data.totalElements === 0) {
        setMessage("죄송합니다. 찾으시는 약품 정보가 없습니다.");
      }
    } catch (err) {
      setMessage(
        "정보를 불러오는 중 잠시 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.",
      );
      setDrugs([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyword.trim()) return;
    router.push(`/drug?keyword=${encodeURIComponent(keyword)}&page=0`);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 0 && newPage < totalPages) {
      router.push(`/drug?keyword=${keyword}&page=${newPage}`);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      {/* 검색 섹션 */}
      <div className="searchBox">
        <form onSubmit={handleSearch} className="searchForm">
          <input
            type="text"
            className="input"
            placeholder="증상이나 약 이름을 입력해 보세요 (예: 두통, 복통)"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button type="submit" className="btn searchBtn" disabled={loading}>
            {loading ? "검색 중..." : "검색"}
          </button>
        </form>
      </div>

      {/* 결과 안내 메시지 */}
      {message && <div className="message infoMessage">{message}</div>}

      {/* 로딩 중일 때 보여줄 UI (필요 시 스피너 등 추가) */}
      {loading && (
        <div className="loadingContainer">
          <p className="loadingText">
            정보를 분석하고 있습니다. 잠시만 기다려 주세요...
          </p>
        </div>
      )}

      {/* 검색 결과 리스트 */}
      {!loading && drugs.length > 0 && (
        <div className="grid">
          {drugs.map((drug: any) => (
            <Link
              href={`/drug/${drug.itemSeq}`}
              key={drug.itemSeq}
              className="cardLink"
            >
              <div className="card">
                <div className="imgWrapper">
                  {drug.itemImage ? (
                    <img
                      src={drug.itemImage}
                      alt={drug.itemName}
                      loading="lazy"
                    />
                  ) : (
                    <div className="noImg">Medifull</div>
                  )}
                </div>
                <div className="content">
                  <span className="company">{drug.entpName}</span>
                  <h3 className="drugName">{drug.itemName}</h3>
                  <p className="info line-clamp">
                    <strong>효능:</strong> {drug.efficacy}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* 페이지네이션 */}
      {!loading && drugs.length > 0 && (
        <div className="pagination-container">
          <button
            className="page-btn"
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 0}
          >
            &lt; 이전
          </button>
          <span className="page-info">
            <strong>{page + 1}</strong> / {totalPages}
          </span>
          <button
            className="page-btn"
            onClick={() => handlePageChange(page + 1)}
            disabled={page >= totalPages - 1}
          >
            다음 &gt;
          </button>
        </div>
      )}
    </>
  );
}

export default function DrugPage() {
  return (
    <div className="container userPage">
      <header className="pageHeader">
        <h1 className="title">의약품 정보 검색</h1>
      </header>

      <Suspense
        fallback={<div className="message">검색창을 불러오고 있습니다...</div>}
      >
        <DrugContent />
      </Suspense>
    </div>
  );
}
