(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/util/drugApi.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/(site)/med/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DrugPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$util$2f$drugApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/util/drugApi.ts [app-client] (ecmascript)"); // 위에서 만든 파일 import
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function DrugPage() {
    _s();
    const [keyword, setKeyword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [drugs, setDrugs] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]); // 약품 리스트
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false); // 로딩 상태
    const [message, setMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(""); // 알림 메시지
    // 🔍 검색 핸들러
    const handleSearch = async (e)=>{
        e.preventDefault();
        if (!keyword) return;
        setLoading(true);
        setMessage("검색 중입니다...");
        try {
            const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$util$2f$drugApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["searchDrugs"])(keyword);
            setDrugs(data);
            setMessage(`총 ${data.length}개의 약품을 찾았습니다.`);
        } catch (err) {
            setMessage("검색 중 오류가 발생했습니다.");
        } finally{
            setLoading(false);
        }
    };
    // 🔄 전체 동기화 핸들러 (핵심 기능!)
    const handleSync = async ()=>{
        if (!confirm("모든 e약은요 데이터를 동기화하시겠습니까? (시간이 소요됩니다)")) return;
        setLoading(true);
        setMessage("데이터 동기화 중... 잠시만 기다려주세요.");
        try {
            const resultMsg = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$util$2f$drugApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["syncDrugs"])();
            setMessage("✅ " + resultMsg);
        // 동기화 후 '타이레놀' 같은 예시로 자동 검색 한번 해주면 좋음
        // handleSearchAuto("타이레놀"); 
        } catch (err) {
            setMessage("❌ 동기화 실패! 백엔드 로그를 확인해주세요.");
        } finally{
            setLoading(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-8 max-w-4xl mx-auto",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "text-3xl font-bold mb-6 text-gray-800",
                children: "💊 e약은요 관리자 페이지"
            }, void 0, false, {
                fileName: "[project]/app/(site)/med/page.tsx",
                lineNumber: 50,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col md:flex-row gap-4 mb-8 bg-gray-100 p-6 rounded-xl",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                        onSubmit: handleSearch,
                        className: "flex-1 flex gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "text",
                                placeholder: "약 이름 검색 (예: 타이레놀)",
                                className: "flex-1 p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500",
                                value: keyword,
                                onChange: (e)=>setKeyword(e.target.value)
                            }, void 0, false, {
                                fileName: "[project]/app/(site)/med/page.tsx",
                                lineNumber: 56,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "submit",
                                disabled: loading,
                                className: "bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition disabled:bg-gray-400",
                                children: "검색"
                            }, void 0, false, {
                                fileName: "[project]/app/(site)/med/page.tsx",
                                lineNumber: 63,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(site)/med/page.tsx",
                        lineNumber: 55,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleSync,
                        disabled: loading,
                        className: "bg-green-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-700 transition shadow-md disabled:bg-gray-400 whitespace-nowrap",
                        children: loading ? "작업 중..." : "🔄 전체 데이터 동기화"
                    }, void 0, false, {
                        fileName: "[project]/app/(site)/med/page.tsx",
                        lineNumber: 73,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(site)/med/page.tsx",
                lineNumber: 53,
                columnNumber: 7
            }, this),
            message && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `p-4 mb-6 rounded-lg text-center font-medium ${message.includes("❌") ? "bg-red-100 text-red-700" : "bg-blue-50 text-blue-700"}`,
                children: message
            }, void 0, false, {
                fileName: "[project]/app/(site)/med/page.tsx",
                lineNumber: 84,
                columnNumber: 9
            }, this),
            loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-center my-10",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"
                }, void 0, false, {
                    fileName: "[project]/app/(site)/med/page.tsx",
                    lineNumber: 92,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/(site)/med/page.tsx",
                lineNumber: 91,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 md:grid-cols-2 gap-6",
                children: drugs.map((drug)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "border rounded-xl p-5 shadow-sm hover:shadow-md transition bg-white flex flex-col",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between items-start mb-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-xl font-bold text-gray-900",
                                        children: drug.itemName
                                    }, void 0, false, {
                                        fileName: "[project]/app/(site)/med/page.tsx",
                                        lineNumber: 101,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded",
                                        children: [
                                            "No. ",
                                            drug.itemSeq
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(site)/med/page.tsx",
                                        lineNumber: 102,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(site)/med/page.tsx",
                                lineNumber: 100,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-gray-500 mb-2",
                                children: drug.entpName
                            }, void 0, false, {
                                fileName: "[project]/app/(site)/med/page.tsx",
                                lineNumber: 107,
                                columnNumber: 13
                            }, this),
                            drug.itemImage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: drug.itemImage,
                                alt: drug.itemName,
                                className: "w-full h-40 object-cover rounded-lg mb-3 border"
                            }, void 0, false, {
                                fileName: "[project]/app/(site)/med/page.tsx",
                                lineNumber: 111,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-auto",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-gray-700 line-clamp-3 bg-gray-50 p-3 rounded",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                            children: "효능:"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(site)/med/page.tsx",
                                            lineNumber: 116,
                                            columnNumber: 17
                                        }, this),
                                        " ",
                                        drug.efficacy
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(site)/med/page.tsx",
                                    lineNumber: 115,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/(site)/med/page.tsx",
                                lineNumber: 114,
                                columnNumber: 13
                            }, this)
                        ]
                    }, drug.itemSeq, true, {
                        fileName: "[project]/app/(site)/med/page.tsx",
                        lineNumber: 99,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/app/(site)/med/page.tsx",
                lineNumber: 97,
                columnNumber: 7
            }, this),
            drugs.length === 0 && !loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center text-gray-400 py-20",
                children: "데이터가 없습니다. 검색하거나 동기화를 진행해주세요."
            }, void 0, false, {
                fileName: "[project]/app/(site)/med/page.tsx",
                lineNumber: 124,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/(site)/med/page.tsx",
        lineNumber: 49,
        columnNumber: 5
    }, this);
}
_s(DrugPage, "Zh5vB3yMTTGm5Hg+QgqBPn1swC4=");
_c = DrugPage;
var _c;
__turbopack_context__.k.register(_c, "DrugPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_05e32a1c._.js.map