(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/util/drugApi.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getDrugDetail",
    ()=>getDrugDetail,
    "searchDrugs",
    ()=>searchDrugs,
    "syncDrugs",
    ()=>syncDrugs
]);
// 맨 앞에 / 를 붙여서 절대 경로로 만듭니다. 
// 만약 백엔드 도메인이 다르다면 "http://168.107.15.125/api/drug"를 직접 적으세요.
const API_BASE_URL = "/api/drug";
const searchDrugs = async (keyword, page = 0, size = 10)=>{
    const response = await fetch(`${API_BASE_URL}/search?keyword=${keyword}&page=${page}&size=${size}`);
    if (!response.ok) throw new Error("검색 실패");
    return response.json();
};
const syncDrugs = async ()=>{
    // 이전 질문에서 관리자 동기화 경로는 /api/admin/pill/sync 였습니다.
    // 이 부분도 확인이 필요합니다.
    const response = await fetch("/api/admin/pill/sync", {
        method: "POST"
    });
    if (!response.ok) throw new Error("동기화 실패");
    return response.text();
};
const getDrugDetail = async (itemSeq)=>{
    const response = await fetch(`${API_BASE_URL}/${itemSeq}`);
    if (!response.ok) throw new Error("상세 정보를 불러올 수 없습니다.");
    return response.json();
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/(site)/drug/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DrugPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"); // Suspense 추가
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$util$2f$drugApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/util/drugApi.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
/**
 * 1. 실제 약품 검색 로직을 담당하는 컴포넌트
 * useSearchParams()를 사용하기 때문에 Suspense 하위로 분리했습니다.
 */ function DrugContent() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])();
    // URL에서 초기값 읽어오기
    const initialKeyword = searchParams.get('keyword') || "";
    const initialPage = parseInt(searchParams.get('page') || "0");
    const [keyword, setKeyword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialKeyword);
    const [drugs, setDrugs] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [message, setMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [page, setPage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialPage);
    const [totalPages, setTotalPages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    // URL 파라미터가 바뀔 때마다 데이터 페칭
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DrugContent.useEffect": ()=>{
            const currentKeyword = searchParams.get('keyword');
            const currentPage = parseInt(searchParams.get('page') || "0");
            if (currentKeyword) {
                fetchDrugs(currentKeyword, currentPage);
                setKeyword(currentKeyword);
                setPage(currentPage);
            }
        }
    }["DrugContent.useEffect"], [
        searchParams
    ]);
    const fetchDrugs = async (searchKeyword, searchPage)=>{
        setLoading(true);
        setMessage("데이터를 불러오는 중...");
        try {
            const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$util$2f$drugApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["searchDrugs"])(searchKeyword, searchPage, 10);
            setDrugs(data.content);
            setTotalPages(data.totalPages);
            setPage(data.number);
            if (data.totalElements === 0) {
                setMessage("검색 결과가 없습니다.");
            } else {
                setMessage("");
            }
        } catch (err) {
            setMessage("오류가 발생했습니다.");
            setDrugs([]);
        } finally{
            setLoading(false);
        }
    };
    const handleSearch = (e)=>{
        e.preventDefault();
        if (!keyword.trim()) return;
        router.push(`/drug?keyword=${keyword}&page=0`);
    };
    const handlePageChange = (newPage)=>{
        if (newPage >= 0 && newPage < totalPages) {
            router.push(`/drug?keyword=${keyword}&page=${newPage}`);
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    };
    const handleSync = async ()=>{
        if (!confirm("동기화 하시겠습니까?")) return;
        setLoading(true);
        try {
            const resultMsg = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$util$2f$drugApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["syncDrugs"])();
            alert(resultMsg);
        } catch (err) {
            alert("동기화 실패");
        } finally{
            setLoading(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "searchBox",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                    onSubmit: handleSearch,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            type: "text",
                            className: "input",
                            placeholder: "약 이름 (예: 타이레놀)",
                            value: keyword,
                            onChange: (e)=>setKeyword(e.target.value)
                        }, void 0, false, {
                            fileName: "[project]/app/(site)/drug/page.tsx",
                            lineNumber: 93,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "submit",
                            className: "btn",
                            disabled: loading,
                            children: "검색"
                        }, void 0, false, {
                            fileName: "[project]/app/(site)/drug/page.tsx",
                            lineNumber: 100,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/(site)/drug/page.tsx",
                    lineNumber: 92,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/(site)/drug/page.tsx",
                lineNumber: 91,
                columnNumber: 13
            }, this),
            message && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "message",
                children: message
            }, void 0, false, {
                fileName: "[project]/app/(site)/drug/page.tsx",
                lineNumber: 104,
                columnNumber: 25
            }, this),
            !loading && drugs.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid",
                children: drugs.map((drug)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: `/drug/${drug.itemSeq}`,
                        style: {
                            textDecoration: 'none',
                            color: 'inherit'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "card",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "imgWrapper",
                                    children: drug.itemImage ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                        src: drug.itemImage,
                                        alt: drug.itemName
                                    }, void 0, false, {
                                        fileName: "[project]/app/(site)/drug/page.tsx",
                                        lineNumber: 112,
                                        columnNumber: 55
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "이미지 없음"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(site)/drug/page.tsx",
                                        lineNumber: 112,
                                        columnNumber: 106
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/(site)/drug/page.tsx",
                                    lineNumber: 111,
                                    columnNumber: 33
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "content",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "company",
                                            children: drug.entpName
                                        }, void 0, false, {
                                            fileName: "[project]/app/(site)/drug/page.tsx",
                                            lineNumber: 115,
                                            columnNumber: 37
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "drugName",
                                            children: drug.itemName
                                        }, void 0, false, {
                                            fileName: "[project]/app/(site)/drug/page.tsx",
                                            lineNumber: 116,
                                            columnNumber: 37
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "info",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                    children: "효능:"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(site)/drug/page.tsx",
                                                    lineNumber: 117,
                                                    columnNumber: 57
                                                }, this),
                                                " ",
                                                drug.efficacy
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(site)/drug/page.tsx",
                                            lineNumber: 117,
                                            columnNumber: 37
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(site)/drug/page.tsx",
                                    lineNumber: 114,
                                    columnNumber: 33
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(site)/drug/page.tsx",
                            lineNumber: 110,
                            columnNumber: 29
                        }, this)
                    }, drug.itemSeq, false, {
                        fileName: "[project]/app/(site)/drug/page.tsx",
                        lineNumber: 109,
                        columnNumber: 25
                    }, this))
            }, void 0, false, {
                fileName: "[project]/app/(site)/drug/page.tsx",
                lineNumber: 107,
                columnNumber: 17
            }, this),
            !loading && drugs.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "pagination-container",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "page-btn",
                        onClick: ()=>handlePageChange(page - 1),
                        disabled: page === 0,
                        children: "< 이전"
                    }, void 0, false, {
                        fileName: "[project]/app/(site)/drug/page.tsx",
                        lineNumber: 127,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "page-info",
                        children: [
                            "Page ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "current-page",
                                children: page + 1
                            }, void 0, false, {
                                fileName: "[project]/app/(site)/drug/page.tsx",
                                lineNumber: 128,
                                columnNumber: 54
                            }, this),
                            " of ",
                            totalPages
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(site)/drug/page.tsx",
                        lineNumber: 128,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "page-btn",
                        onClick: ()=>handlePageChange(page + 1),
                        disabled: page >= totalPages - 1,
                        children: "다음 >"
                    }, void 0, false, {
                        fileName: "[project]/app/(site)/drug/page.tsx",
                        lineNumber: 129,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(site)/drug/page.tsx",
                lineNumber: 126,
                columnNumber: 17
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    marginTop: '20px',
                    textAlign: 'center'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: handleSync,
                    className: "btn",
                    style: {
                        backgroundColor: '#666'
                    },
                    children: "데이터 동기화"
                }, void 0, false, {
                    fileName: "[project]/app/(site)/drug/page.tsx",
                    lineNumber: 135,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/(site)/drug/page.tsx",
                lineNumber: 134,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true);
}
_s(DrugContent, "Xef2JQWC52n5aeII1W+oJt+B55I=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"]
    ];
});
_c = DrugContent;
function DrugPage() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "container",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "title",
                children: "e약은요 검색"
            }, void 0, false, {
                fileName: "[project]/app/(site)/drug/page.tsx",
                lineNumber: 147,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Suspense"], {
                fallback: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "message",
                    children: "검색 화면을 불러오는 중입니다..."
                }, void 0, false, {
                    fileName: "[project]/app/(site)/drug/page.tsx",
                    lineNumber: 150,
                    columnNumber: 33
                }, void 0),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DrugContent, {}, void 0, false, {
                    fileName: "[project]/app/(site)/drug/page.tsx",
                    lineNumber: 151,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/(site)/drug/page.tsx",
                lineNumber: 150,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/(site)/drug/page.tsx",
        lineNumber: 146,
        columnNumber: 9
    }, this);
}
_c1 = DrugPage;
var _c, _c1;
__turbopack_context__.k.register(_c, "DrugContent");
__turbopack_context__.k.register(_c1, "DrugPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_df12c21a._.js.map