(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/(site)/drug/drug.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "btn": "drug-module__uheO-q__btn",
  "card": "drug-module__uheO-q__card",
  "company": "drug-module__uheO-q__company",
  "container": "drug-module__uheO-q__container",
  "content": "drug-module__uheO-q__content",
  "drugName": "drug-module__uheO-q__drugName",
  "grid": "drug-module__uheO-q__grid",
  "imgWrapper": "drug-module__uheO-q__imgWrapper",
  "info": "drug-module__uheO-q__info",
  "input": "drug-module__uheO-q__input",
  "message": "drug-module__uheO-q__message",
  "searchBox": "drug-module__uheO-q__searchBox",
  "title": "drug-module__uheO-q__title",
});
}),
"[project]/app/(site)/drug/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DrugSearchPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$site$292f$drug$2f$drug$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/app/(site)/drug/drug.module.css [app-client] (css module)"); // CSS 파일 연동
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function DrugSearchPage() {
    _s();
    const [keyword, setKeyword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [results, setResults] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [errorMsg, setErrorMsg] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const handleSearch = async ()=>{
        // 검색어 입력 확인 (빈칸 방지)
        if (!keyword.trim()) {
            setErrorMsg("약 이름을 입력해주세요. (예: 타이레놀)");
            return;
        }
        setErrorMsg(null);
        setLoading(true);
        try {
            // 백엔드로 검색 요청을 보냅니다!
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`http://localhost:8080/api/drug/search?keyword=${keyword}`);
            setResults(response.data);
        } catch (error) {
            console.error("검색 실패:", error);
            setErrorMsg("서버와 연결할 수 없습니다. 백엔드 서버가 켜져 있는지 확인해주세요.");
        } finally{
            setLoading(false);
        }
    };
    // 엔터키 쳤을 때도 검색되게 하는 센스!
    const handleKeyDown = (e)=>{
        if (e.key === 'Enter') handleSearch();
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$site$292f$drug$2f$drug$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].container,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$site$292f$drug$2f$drug$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].title,
                children: "💊 스마트 약 검색 (e약은요)"
            }, void 0, false, {
                fileName: "[project]/app/(site)/drug/page.tsx",
                lineNumber: 54,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$site$292f$drug$2f$drug$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].searchBox,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "text",
                        placeholder: "약 이름을 입력하세요",
                        value: keyword,
                        onChange: (e)=>{
                            setKeyword(e.target.value);
                            if (errorMsg) setErrorMsg(null); // 타이핑 시작하면 에러메시지 지우기
                        },
                        onKeyDown: handleKeyDown,
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$site$292f$drug$2f$drug$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].input
                    }, void 0, false, {
                        fileName: "[project]/app/(site)/drug/page.tsx",
                        lineNumber: 58,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleSearch,
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$site$292f$drug$2f$drug$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].btn,
                        children: "검색"
                    }, void 0, false, {
                        fileName: "[project]/app/(site)/drug/page.tsx",
                        lineNumber: 69,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(site)/drug/page.tsx",
                lineNumber: 57,
                columnNumber: 13
            }, this),
            errorMsg && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$site$292f$drug$2f$drug$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].errorMessage,
                children: [
                    "🚨 ",
                    errorMsg
                ]
            }, void 0, true, {
                fileName: "[project]/app/(site)/drug/page.tsx",
                lineNumber: 73,
                columnNumber: 26
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$site$292f$drug$2f$drug$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].resultArea,
                children: loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$site$292f$drug$2f$drug$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].message,
                    children: [
                        "약을 찾고 있습니다... 🔍",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                            fileName: "[project]/app/(site)/drug/page.tsx",
                            lineNumber: 78,
                            columnNumber: 67
                        }, this),
                        "(DB에 없으면 식약처에서 가져옵니다)"
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/(site)/drug/page.tsx",
                    lineNumber: 78,
                    columnNumber: 21
                }, this) : results.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$site$292f$drug$2f$drug$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].grid,
                    children: results.map((drug, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$site$292f$drug$2f$drug$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].card,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$site$292f$drug$2f$drug$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].imgWrapper,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                        src: drug.itemImage || "/img/no_drug_img.png",
                                        alt: drug.itemName,
                                        onError: (e)=>e.currentTarget.src = "/img/no_drug_img.png"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(site)/drug/page.tsx",
                                        lineNumber: 85,
                                        columnNumber: 37
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/(site)/drug/page.tsx",
                                    lineNumber: 83,
                                    columnNumber: 33
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$site$292f$drug$2f$drug$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].content,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$site$292f$drug$2f$drug$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].company,
                                            children: drug.entpName
                                        }, void 0, false, {
                                            fileName: "[project]/app/(site)/drug/page.tsx",
                                            lineNumber: 92,
                                            columnNumber: 37
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$site$292f$drug$2f$drug$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].drugName,
                                            children: drug.itemName
                                        }, void 0, false, {
                                            fileName: "[project]/app/(site)/drug/page.tsx",
                                            lineNumber: 93,
                                            columnNumber: 37
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$site$292f$drug$2f$drug$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].info,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                    children: "효능/효과:"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(site)/drug/page.tsx",
                                                    lineNumber: 96,
                                                    columnNumber: 41
                                                }, this),
                                                !drug.efficacy || drug.efficacy === "정보 없음" || drug.efficacy === "정보를 가져올 수 없습니다." ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                    href: `https://terms.naver.com/search.naver?query=${drug.itemName}`,
                                                    target: "_blank",
                                                    rel: "noopener noreferrer",
                                                    style: {
                                                        display: 'inline-block',
                                                        marginTop: '5px',
                                                        color: '#00c73c',
                                                        textDecoration: 'none',
                                                        fontWeight: 'bold'
                                                    },
                                                    children: "🔍 네이버 지식백과에서 확인하기"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(site)/drug/page.tsx",
                                                    lineNumber: 99,
                                                    columnNumber: 45
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    children: drug.efficacy.length > 80 ? drug.efficacy.substring(0, 80) + "..." : drug.efficacy
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(site)/drug/page.tsx",
                                                    lineNumber: 108,
                                                    columnNumber: 45
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(site)/drug/page.tsx",
                                            lineNumber: 95,
                                            columnNumber: 37
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$site$292f$drug$2f$drug$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].info,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                    children: "용법/용량:"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(site)/drug/page.tsx",
                                                    lineNumber: 113,
                                                    columnNumber: 41
                                                }, this),
                                                !drug.useMethod || drug.useMethod === "정보 없음" || drug.useMethod === "정보를 가져올 수 없습니다." ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                    href: `https://terms.naver.com/search.naver?query=${drug.itemName}`,
                                                    target: "_blank",
                                                    rel: "noopener noreferrer",
                                                    style: {
                                                        display: 'inline-block',
                                                        marginTop: '5px',
                                                        color: '#00c73c',
                                                        textDecoration: 'none',
                                                        fontWeight: 'bold'
                                                    },
                                                    children: "🔍 네이버 지식백과에서 확인하기"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(site)/drug/page.tsx",
                                                    lineNumber: 116,
                                                    columnNumber: 45
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    children: drug.useMethod.length > 50 ? drug.useMethod.substring(0, 50) + "..." : drug.useMethod
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(site)/drug/page.tsx",
                                                    lineNumber: 125,
                                                    columnNumber: 45
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(site)/drug/page.tsx",
                                            lineNumber: 112,
                                            columnNumber: 37
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(site)/drug/page.tsx",
                                    lineNumber: 91,
                                    columnNumber: 33
                                }, this)
                            ]
                        }, index, true, {
                            fileName: "[project]/app/(site)/drug/page.tsx",
                            lineNumber: 82,
                            columnNumber: 29
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/app/(site)/drug/page.tsx",
                    lineNumber: 80,
                    columnNumber: 21
                }, this) : // 검색 전이거나 결과가 없을 때
                !loading && keyword && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$site$292f$drug$2f$drug$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].message,
                    children: "검색 결과가 없습니다."
                }, void 0, false, {
                    fileName: "[project]/app/(site)/drug/page.tsx",
                    lineNumber: 134,
                    columnNumber: 44
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/(site)/drug/page.tsx",
                lineNumber: 76,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/(site)/drug/page.tsx",
        lineNumber: 53,
        columnNumber: 9
    }, this);
}
_s(DrugSearchPage, "a3VGjK0X7Q3brqi/mujgBuCzox0=");
_c = DrugSearchPage;
var _c;
__turbopack_context__.k.register(_c, "DrugSearchPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=app_%28site%29_drug_5a3c62d0._.js.map