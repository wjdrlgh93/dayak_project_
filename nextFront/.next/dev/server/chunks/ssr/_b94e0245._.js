module.exports = [
"[project]/util/drugApi.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getDrugDetail",
    ()=>getDrugDetail,
    "syncDrugs",
    ()=>syncDrugs
]);
const API_BASE_URL = "http://localhost:8080/api/drug";
const syncDrugs = async ()=>{
    const response = await fetch(`${API_BASE_URL}/sync`, {
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
}),
"[project]/app/(admin)/admin/druggen/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DrugPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$util$2f$drugApi$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/util/drugApi.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
function DrugPage() {
    const [keyword, setKeyword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [drugs, setDrugs] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]); // 약품 리스트
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false); // 로딩 상태
    const [message, setMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(""); // 알림 메시지
    // 테마 컬러 설정
    const themeColor = '#4f46e5'; // Indigo
    // 🔄 전체 동기화 핸들러
    const handleSync = async ()=>{
        if (!confirm("모든 e약은요 데이터를 동기화하시겠습니까? (시간이 소요됩니다)")) return;
        setLoading(true);
        setMessage("데이터 동기화 중... 잠시만 기다려주세요.");
        try {
            const resultMsg = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$util$2f$drugApi$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["syncDrugs"])();
            setMessage("✅ " + resultMsg);
        } catch (err) {
            setMessage("❌ 동기화 실패! 백엔드 로그를 확인해주세요.");
        } finally{
            setLoading(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            padding: '40px',
            maxWidth: '900px',
            margin: '0 auto',
            fontFamily: 'inherit'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                style: {
                    fontSize: '28px',
                    fontWeight: '800',
                    marginBottom: '25px',
                    color: '#1e293b'
                },
                children: "💊 e약은요 데이터 관리"
            }, void 0, false, {
                fileName: "[project]/app/(admin)/admin/druggen/page.tsx",
                lineNumber: 35,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    padding: '25px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '12px',
                    backgroundColor: '#f8fafc',
                    marginBottom: '30px'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            gap: '10px',
                            flexWrap: 'wrap'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                onSubmit: handleSearch,
                                style: {
                                    flex: 1,
                                    display: 'flex',
                                    gap: '8px',
                                    minWidth: '300px'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        placeholder: "약 이름 검색 (예: 타이레놀)",
                                        style: {
                                            flex: 1,
                                            padding: '12px 15px',
                                            border: '1px solid #cbd5e1',
                                            borderRadius: '8px',
                                            fontSize: '15px',
                                            outline: 'none'
                                        },
                                        value: keyword,
                                        onChange: (e)=>setKeyword(e.target.value)
                                    }, void 0, false, {
                                        fileName: "[project]/app/(admin)/admin/druggen/page.tsx",
                                        lineNumber: 49,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "submit",
                                        disabled: loading,
                                        style: {
                                            padding: '12px 24px',
                                            backgroundColor: loading ? '#ccc' : themeColor,
                                            color: '#fff',
                                            border: 'none',
                                            borderRadius: '8px',
                                            cursor: loading ? 'not-allowed' : 'pointer',
                                            fontWeight: 'bold'
                                        },
                                        children: "검색"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(admin)/admin/druggen/page.tsx",
                                        lineNumber: 63,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(admin)/admin/druggen/page.tsx",
                                lineNumber: 48,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleSync,
                                disabled: loading,
                                style: {
                                    padding: '12px 24px',
                                    backgroundColor: loading ? '#ccc' : '#10b981',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '8px',
                                    cursor: loading ? 'not-allowed' : 'pointer',
                                    fontWeight: 'bold',
                                    whiteSpace: 'nowrap'
                                },
                                children: loading ? "작업 중..." : "🔄 전체 데이터 동기화"
                            }, void 0, false, {
                                fileName: "[project]/app/(admin)/admin/druggen/page.tsx",
                                lineNumber: 80,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(admin)/admin/druggen/page.tsx",
                        lineNumber: 47,
                        columnNumber: 17
                    }, this),
                    message && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            marginTop: '20px',
                            padding: '15px',
                            borderRadius: '8px',
                            fontSize: '14px',
                            backgroundColor: message.includes("❌") ? "#fff1f2" : "#f5f3ff",
                            color: message.includes("❌") ? "#e11d48" : themeColor,
                            border: `1px solid ${message.includes("❌") ? "#fda4af" : "#c7d2fe"}`,
                            textAlign: 'center'
                        },
                        children: message
                    }, void 0, false, {
                        fileName: "[project]/app/(admin)/admin/druggen/page.tsx",
                        lineNumber: 99,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(admin)/admin/druggen/page.tsx",
                lineNumber: 40,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                    gap: '20px'
                },
                children: drugs.map((drug)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            border: '1px solid #e2e8f0',
                            borderRadius: '12px',
                            padding: '20px',
                            backgroundColor: '#fff',
                            display: 'flex',
                            flexDirection: 'column'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'flex-start',
                                    marginBottom: '10px'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        style: {
                                            fontSize: '18px',
                                            fontWeight: '700',
                                            margin: 0,
                                            color: '#0f172a'
                                        },
                                        children: drug.itemName
                                    }, void 0, false, {
                                        fileName: "[project]/app/(admin)/admin/druggen/page.tsx",
                                        lineNumber: 130,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontSize: '11px',
                                            color: '#64748b',
                                            backgroundColor: '#f1f5f9',
                                            padding: '2px 6px',
                                            borderRadius: '4px'
                                        },
                                        children: [
                                            "No. ",
                                            drug.itemSeq
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(admin)/admin/druggen/page.tsx",
                                        lineNumber: 131,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(admin)/admin/druggen/page.tsx",
                                lineNumber: 129,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    fontSize: '13px',
                                    color: '#64748b',
                                    marginBottom: '15px'
                                },
                                children: drug.entpName
                            }, void 0, false, {
                                fileName: "[project]/app/(admin)/admin/druggen/page.tsx",
                                lineNumber: 136,
                                columnNumber: 25
                            }, this),
                            drug.itemImage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: drug.itemImage,
                                alt: drug.itemName,
                                style: {
                                    width: '100%',
                                    height: '180px',
                                    objectFit: 'cover',
                                    borderRadius: '8px',
                                    marginBottom: '15px',
                                    border: '1px solid #f1f5f9'
                                }
                            }, void 0, false, {
                                fileName: "[project]/app/(admin)/admin/druggen/page.tsx",
                                lineNumber: 139,
                                columnNumber: 29
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    marginTop: 'auto'
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontSize: '13px',
                                        color: '#334155',
                                        backgroundColor: '#f8fafc',
                                        padding: '12px',
                                        borderRadius: '8px',
                                        lineHeight: '1.6'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                            style: {
                                                color: themeColor
                                            },
                                            children: "효능:"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(admin)/admin/druggen/page.tsx",
                                            lineNumber: 162,
                                            columnNumber: 33
                                        }, this),
                                        " ",
                                        drug.efficacy
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(admin)/admin/druggen/page.tsx",
                                    lineNumber: 154,
                                    columnNumber: 29
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/(admin)/admin/druggen/page.tsx",
                                lineNumber: 153,
                                columnNumber: 25
                            }, this)
                        ]
                    }, drug.itemSeq, true, {
                        fileName: "[project]/app/(admin)/admin/druggen/page.tsx",
                        lineNumber: 121,
                        columnNumber: 21
                    }, this))
            }, void 0, false, {
                fileName: "[project]/app/(admin)/admin/druggen/page.tsx",
                lineNumber: 115,
                columnNumber: 13
            }, this),
            drugs.length === 0 && !loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    textAlign: 'center',
                    color: '#94a3b8',
                    padding: '80px 0'
                },
                children: "데이터가 없습니다. 검색하거나 동기화를 진행해주세요."
            }, void 0, false, {
                fileName: "[project]/app/(admin)/admin/druggen/page.tsx",
                lineNumber: 170,
                columnNumber: 17
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    marginTop: '40px',
                    textAlign: 'center'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                    href: "/admin",
                    style: {
                        color: '#64748b',
                        textDecoration: 'none',
                        fontSize: '14px'
                    },
                    children: "← 어드민 페이지로 돌아가기"
                }, void 0, false, {
                    fileName: "[project]/app/(admin)/admin/druggen/page.tsx",
                    lineNumber: 176,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/(admin)/admin/druggen/page.tsx",
                lineNumber: 175,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/(admin)/admin/druggen/page.tsx",
        lineNumber: 34,
        columnNumber: 9
    }, this);
}
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].ReactJsxDevRuntime; //# sourceMappingURL=react-jsx-dev-runtime.js.map
}),
];

//# sourceMappingURL=_b94e0245._.js.map