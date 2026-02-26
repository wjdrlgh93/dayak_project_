module.exports = [
"[project]/app/favicon.ico.mjs { IMAGE => \"[project]/app/favicon.ico (static in ecmascript, tag client)\" } [app-rsc] (structured image object, ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/favicon.ico.mjs { IMAGE => \"[project]/app/favicon.ico (static in ecmascript, tag client)\" } [app-rsc] (structured image object, ecmascript)"));
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/app/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/layout.tsx [app-rsc] (ecmascript)"));
}),
"[project]/app/(site)/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/(site)/layout.tsx [app-rsc] (ecmascript)"));
}),
"[project]/util/drugApi.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "searchDrugs",
    ()=>searchDrugs,
    "syncDrugs",
    ()=>syncDrugs
]);
const API_BASE_URL = "http://localhost:8080/api/drug";
const searchDrugs = async (keyword, page = 0, size = 10)=>{
    const response = await fetch(`${API_BASE_URL}/search?keyword=${keyword}&page=${page}&size=${size}`);
    if (!response.ok) throw new Error("검색 실패");
    return response.json(); // 이제 Page 객체(content, totalPages 등)가 반환됨
};
const syncDrugs = async ()=>{
    const response = await fetch(`${API_BASE_URL}/sync`, {
        method: "POST"
    });
    if (!response.ok) throw new Error("동기화 실패");
    return response.text();
};
}),
"[project]/app/(site)/drug/drug.module.css [app-rsc] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "btn": "drug-module__uheO-q__btn",
  "card": "drug-module__uheO-q__card",
  "company": "drug-module__uheO-q__company",
  "container": "drug-module__uheO-q__container",
  "content": "drug-module__uheO-q__content",
  "current-page": "drug-module__uheO-q__current-page",
  "drugName": "drug-module__uheO-q__drugName",
  "grid": "drug-module__uheO-q__grid",
  "imgWrapper": "drug-module__uheO-q__imgWrapper",
  "info": "drug-module__uheO-q__info",
  "input": "drug-module__uheO-q__input",
  "message": "drug-module__uheO-q__message",
  "page-btn": "drug-module__uheO-q__page-btn",
  "page-info": "drug-module__uheO-q__page-info",
  "pagination-container": "drug-module__uheO-q__pagination-container",
  "searchBox": "drug-module__uheO-q__searchBox",
  "sync": "drug-module__uheO-q__sync",
  "title": "drug-module__uheO-q__title",
});
}),
"[project]/app/(site)/drug/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DrugPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$util$2f$drugApi$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/util/drugApi.ts [app-rsc] (ecmascript)"); // API 경로 확인 필요
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$site$292f$drug$2f$drug$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/app/(site)/drug/drug.module.css [app-rsc] (css module)");
;
;
;
;
function DrugPage() {
    const [keyword, setKeyword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useState"])("");
    // ⭐️ 수정됨: 빈 배열([])만 쓰면 타입스크립트가 뭔지 몰라 에러가 날 수 있습니다.
    // <any[]> 혹은 위에서 만든 <Drug[]>를 붙여줍니다.
    const [drugs, setDrugs] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useState"])(false);
    const [message, setMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useState"])("");
    const [page, setPage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useState"])(0);
    const [totalPages, setTotalPages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useState"])(0);
    // ⭐️ 수정됨: 매개변수 뒤에 : string, : number 타입을 명시했습니다.
    const fetchDrugs = async (searchKeyword, searchPage)=>{
        setLoading(true);
        setMessage("데이터를 불러오는 중...");
        try {
            const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$util$2f$drugApi$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["searchDrugs"])(searchKeyword, searchPage, 10);
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
    // 이벤트 객체 타입 (React.FormEvent)
    const handleSearch = (e)=>{
        e.preventDefault();
        if (!keyword.trim()) return;
        setPage(0);
        fetchDrugs(keyword, 0);
    };
    const handlePageChange = (newPage)=>{
        if (newPage >= 0 && newPage < totalPages) {
            fetchDrugs(keyword, newPage);
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    };
    const handleSync = async ()=>{
        if (!confirm("데이터 동기화를 시작하시겠습니까? (시간이 소요됩니다)")) return;
        setLoading(true);
        setMessage("동기화 진행 중...");
        try {
            const resultMsg = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$util$2f$drugApi$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["syncDrugs"])();
            setMessage("✅ " + resultMsg);
        } catch (err) {
            setMessage("❌ 동기화 실패");
        } finally{
            setLoading(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "container",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "title",
                children: "e약은요 검색"
            }, void 0, false, {
                fileName: "[project]/app/(site)/drug/page.tsx",
                lineNumber: 83,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "searchBox",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                        onSubmit: handleSearch,
                        style: {
                            display: 'flex',
                            width: '100%',
                            gap: '10px',
                            justifyContent: 'center'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "text",
                                className: "input",
                                placeholder: "증상이나 약 이름을 입력하세요 (예: 두통)",
                                value: keyword,
                                onChange: (e)=>setKeyword(e.target.value)
                            }, void 0, false, {
                                fileName: "[project]/app/(site)/drug/page.tsx",
                                lineNumber: 87,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "submit",
                                className: "btn",
                                disabled: loading,
                                children: "검색"
                            }, void 0, false, {
                                fileName: "[project]/app/(site)/drug/page.tsx",
                                lineNumber: 94,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(site)/drug/page.tsx",
                        lineNumber: 86,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleSync,
                        className: "btn sync",
                        disabled: loading,
                        children: loading ? "작업 중..." : "전체 동기화"
                    }, void 0, false, {
                        fileName: "[project]/app/(site)/drug/page.tsx",
                        lineNumber: 98,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(site)/drug/page.tsx",
                lineNumber: 85,
                columnNumber: 13
            }, this),
            message && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "message",
                children: message
            }, void 0, false, {
                fileName: "[project]/app/(site)/drug/page.tsx",
                lineNumber: 103,
                columnNumber: 25
            }, this),
            !loading && drugs.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid",
                children: drugs.map((drug)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "card",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "imgWrapper",
                                children: drug.itemImage ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: drug.itemImage,
                                    alt: drug.itemName
                                }, void 0, false, {
                                    fileName: "[project]/app/(site)/drug/page.tsx",
                                    lineNumber: 112,
                                    columnNumber: 37
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        color: '#ccc'
                                    },
                                    children: "이미지 없음"
                                }, void 0, false, {
                                    fileName: "[project]/app/(site)/drug/page.tsx",
                                    lineNumber: 114,
                                    columnNumber: 37
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/(site)/drug/page.tsx",
                                lineNumber: 110,
                                columnNumber: 29
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "content",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "company",
                                        children: drug.entpName
                                    }, void 0, false, {
                                        fileName: "[project]/app/(site)/drug/page.tsx",
                                        lineNumber: 118,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "drugName",
                                        children: drug.itemName
                                    }, void 0, false, {
                                        fileName: "[project]/app/(site)/drug/page.tsx",
                                        lineNumber: 119,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "info",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                children: "효능:"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(site)/drug/page.tsx",
                                                lineNumber: 121,
                                                columnNumber: 37
                                            }, this),
                                            " ",
                                            drug.efficacy
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(site)/drug/page.tsx",
                                        lineNumber: 120,
                                        columnNumber: 33
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(site)/drug/page.tsx",
                                lineNumber: 117,
                                columnNumber: 29
                            }, this)
                        ]
                    }, drug.itemSeq, true, {
                        fileName: "[project]/app/(site)/drug/page.tsx",
                        lineNumber: 109,
                        columnNumber: 25
                    }, this))
            }, void 0, false, {
                fileName: "[project]/app/(site)/drug/page.tsx",
                lineNumber: 106,
                columnNumber: 17
            }, this),
            !loading && drugs.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "pagination-container",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "page-btn",
                        onClick: ()=>handlePageChange(page - 1),
                        disabled: page === 0,
                        children: "< 이전"
                    }, void 0, false, {
                        fileName: "[project]/app/(site)/drug/page.tsx",
                        lineNumber: 131,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "page-info",
                        children: [
                            "Page ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "current-page",
                                children: page + 1
                            }, void 0, false, {
                                fileName: "[project]/app/(site)/drug/page.tsx",
                                lineNumber: 140,
                                columnNumber: 30
                            }, this),
                            " of ",
                            totalPages
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(site)/drug/page.tsx",
                        lineNumber: 139,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "page-btn",
                        onClick: ()=>handlePageChange(page + 1),
                        disabled: page >= totalPages - 1,
                        children: "다음 >"
                    }, void 0, false, {
                        fileName: "[project]/app/(site)/drug/page.tsx",
                        lineNumber: 143,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(site)/drug/page.tsx",
                lineNumber: 130,
                columnNumber: 17
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/(site)/drug/page.tsx",
        lineNumber: 82,
        columnNumber: 9
    }, this);
}
}),
"[project]/app/(site)/drug/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/(site)/drug/page.tsx [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__187bf829._.js.map