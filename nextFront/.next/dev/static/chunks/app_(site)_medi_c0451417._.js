(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/(site)/medi/drug.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "btn": "drug-module__urHObq__btn",
  "card": "drug-module__urHObq__card",
  "company": "drug-module__urHObq__company",
  "container": "drug-module__urHObq__container",
  "content": "drug-module__urHObq__content",
  "drugName": "drug-module__urHObq__drugName",
  "grid": "drug-module__urHObq__grid",
  "imgWrapper": "drug-module__urHObq__imgWrapper",
  "info": "drug-module__urHObq__info",
  "input": "drug-module__urHObq__input",
  "message": "drug-module__urHObq__message",
  "searchBox": "drug-module__urHObq__searchBox",
  "title": "drug-module__urHObq__title",
});
}),
"[project]/app/(site)/medi/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DrugSearchPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$site$292f$medi$2f$drug$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/app/(site)/medi/drug.module.css [app-client] (css module)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function DrugSearchPage() {
    _s();
    const [keyword, setKeyword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [results, setResults] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // 🧹 텍스트 정리 함수
    // [e약은요] 데이터는 가끔 <p> 태그나 줄바꿈 문자가 섞여 있어서 이걸 청소해줍니다.
    const cleanText = (text)=>{
        if (!text) return "정보 없음";
        // 1. HTML 태그 제거 (<p>, <br> 등)
        let cleaned = text.replace(/<[^>]*>?/g, ' ');
        // 2. 불필요한 공백 정리
        cleaned = cleaned.replace(/\s+/g, ' ').trim();
        return cleaned;
    };
    const handleSearch = async ()=>{
        if (!keyword) {
            alert("약 이름을 입력해주세요!");
            return;
        }
        setLoading(true);
        try {
            // 백엔드 호출 (DB 조회 -> 없으면 API 호출 -> 자동 저장 -> 반환)
            const res = await fetch(`http://localhost:8080/api/drug/search?keyword=${keyword}`);
            if (res.ok) {
                const data = await res.json();
                setResults(data);
            } else {
                alert("검색에 실패했습니다.");
            }
        } catch (e) {
            console.error(e);
            alert("서버와 연결할 수 없습니다.");
        } finally{
            setLoading(false);
        }
    };
    const handleKeyDown = (e)=>{
        if (e.key === 'Enter') handleSearch();
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$site$292f$medi$2f$drug$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].container,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$site$292f$medi$2f$drug$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].title,
                children: "💊 e약은요 검색 (스마트 DB)"
            }, void 0, false, {
                fileName: "[project]/app/(site)/medi/page.tsx",
                lineNumber: 64,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$site$292f$medi$2f$drug$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].searchBox,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "text",
                        placeholder: "약 이름을 입력하세요 (예: 타이레놀, 베아제)",
                        value: keyword,
                        onChange: (e)=>setKeyword(e.target.value),
                        onKeyDown: handleKeyDown,
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$site$292f$medi$2f$drug$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].input
                    }, void 0, false, {
                        fileName: "[project]/app/(site)/medi/page.tsx",
                        lineNumber: 68,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleSearch,
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$site$292f$medi$2f$drug$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].btn,
                        children: "검색"
                    }, void 0, false, {
                        fileName: "[project]/app/(site)/medi/page.tsx",
                        lineNumber: 76,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(site)/medi/page.tsx",
                lineNumber: 67,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$site$292f$medi$2f$drug$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].resultArea,
                children: loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$site$292f$medi$2f$drug$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].message,
                    children: [
                        "약을 찾고 있습니다... 🔍",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                            fileName: "[project]/app/(site)/medi/page.tsx",
                            lineNumber: 82,
                            columnNumber: 67
                        }, this),
                        "(없는 약은 식약처에서 가져옵니다)"
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/(site)/medi/page.tsx",
                    lineNumber: 82,
                    columnNumber: 21
                }, this) : results.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$site$292f$medi$2f$drug$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].grid,
                    children: results.map((drug, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$site$292f$medi$2f$drug$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].card,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$site$292f$medi$2f$drug$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].imgWrapper,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                        src: drug.itemImage || "/img/no_drug_img.png",
                                        alt: drug.itemName,
                                        onError: (e)=>e.currentTarget.src = "/img/no_drug_img.png"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(site)/medi/page.tsx",
                                        lineNumber: 89,
                                        columnNumber: 37
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/(site)/medi/page.tsx",
                                    lineNumber: 87,
                                    columnNumber: 33
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$site$292f$medi$2f$drug$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].content,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$site$292f$medi$2f$drug$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].company,
                                            children: drug.entpName
                                        }, void 0, false, {
                                            fileName: "[project]/app/(site)/medi/page.tsx",
                                            lineNumber: 96,
                                            columnNumber: 37
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$site$292f$medi$2f$drug$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].drugName,
                                            children: drug.itemName
                                        }, void 0, false, {
                                            fileName: "[project]/app/(site)/medi/page.tsx",
                                            lineNumber: 97,
                                            columnNumber: 37
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$site$292f$medi$2f$drug$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].info,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                    children: "효능/효과:"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(site)/medi/page.tsx",
                                                    lineNumber: 100,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    children: [
                                                        cleanText(drug.efficacy).substring(0, 80),
                                                        drug.efficacy && drug.efficacy.length > 80 ? "..." : ""
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/(site)/medi/page.tsx",
                                                    lineNumber: 102,
                                                    columnNumber: 41
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(site)/medi/page.tsx",
                                            lineNumber: 99,
                                            columnNumber: 37
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$site$292f$medi$2f$drug$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].info,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                    children: "용법/용량:"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(site)/medi/page.tsx",
                                                    lineNumber: 107,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    children: [
                                                        cleanText(drug.useMethod).substring(0, 50),
                                                        drug.useMethod && drug.useMethod.length > 50 ? "..." : ""
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/(site)/medi/page.tsx",
                                                    lineNumber: 108,
                                                    columnNumber: 41
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(site)/medi/page.tsx",
                                            lineNumber: 106,
                                            columnNumber: 37
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(site)/medi/page.tsx",
                                    lineNumber: 95,
                                    columnNumber: 33
                                }, this)
                            ]
                        }, index, true, {
                            fileName: "[project]/app/(site)/medi/page.tsx",
                            lineNumber: 86,
                            columnNumber: 29
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/app/(site)/medi/page.tsx",
                    lineNumber: 84,
                    columnNumber: 21
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$site$292f$medi$2f$drug$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].message,
                    children: "검색 결과가 없습니다."
                }, void 0, false, {
                    fileName: "[project]/app/(site)/medi/page.tsx",
                    lineNumber: 117,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/(site)/medi/page.tsx",
                lineNumber: 80,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/(site)/medi/page.tsx",
        lineNumber: 63,
        columnNumber: 9
    }, this);
}
_s(DrugSearchPage, "VHs4eqYQ8GMirUZHD/C3SBPKr7M=");
_c = DrugSearchPage;
var _c;
__turbopack_context__.k.register(_c, "DrugSearchPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=app_%28site%29_medi_c0451417._.js.map