(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/util/api.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [app-client] (ecmascript)");
;
const api = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].create({
    // 환경 변수에서 주소를 가져오고, 없으면 기본값으로 localhost 사용
    baseURL: ("TURBOPACK compile-time value", "http://168.107.15.125"),
    headers: {
        'Content-Type': 'application/json'
    }
});
// 요청 인터셉터를 사용하여 자동으로 토큰을 실어 보낼 수도 있습니다.
api.interceptors.request.use((config)=>{
    const token = ("TURBOPACK compile-time truthy", 1) ? localStorage.getItem('token') : "TURBOPACK unreachable";
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
const __TURBOPACK__default__export__ = api;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/(site)/medication/list/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MedicationListPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$util$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/util/api.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function MedicationListPage() {
    _s();
    const [medications, setMedications] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MedicationListPage.useEffect": ()=>{
            const token = localStorage.getItem('token');
            if (!token) {
                router.replace('/authLogin');
                return;
            }
            fetchMedications();
        }
    }["MedicationListPage.useEffect"], [
        router
    ]);
    const fetchMedications = async ()=>{
        try {
            // 🚀 도메인 생략 및 자동 토큰 주입 [cite: 2026-02-18]
            const res = await __TURBOPACK__imported__module__$5b$project$5d2f$util$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get('/api/medication/list');
            // Axios는 응답 데이터가 .data에 담겨 있습니다. [cite: 2026-02-18]
            setMedications(Array.isArray(res.data) ? res.data : []);
        } catch (e) {
            console.error("목록 로드 실패", e);
            if (e.response?.status === 401) {
                alert("세션이 만료되었습니다. 다시 로그인해주세요.");
            }
        } finally{
            setLoading(false);
        }
    };
    // 2. 삭제 함수 (localStorage에서 직접 꺼내던 로직 제거)
    const handleDelete = async (id)=>{
        if (!confirm("정말 이 복약 알림을 삭제하시겠습니까?")) return;
        try {
            // 🚀 경로만 사용하여 DELETE 요청 [cite: 2026-02-18]
            await __TURBOPACK__imported__module__$5b$project$5d2f$util$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].delete(`/api/medication/${id}`);
            alert("삭제되었습니다. ✅");
            // 상태 업데이트로 화면에서 즉시 제거
            setMedications(medications.filter((m)=>m.medicationId !== id));
        } catch (e) {
            console.error("삭제 실패:", e);
            if (e.response?.status === 401) {
                alert("삭제 권한이 없거나 세션이 만료되었습니다.");
            } else {
                alert("삭제 중 오류가 발생했습니다.");
            }
        }
    };
    if (loading) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            padding: '150px',
            textAlign: 'center'
        },
        children: "로딩 중..."
    }, void 0, false, {
        fileName: "[project]/app/(site)/medication/list/page.tsx",
        lineNumber: 71,
        columnNumber: 25
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            padding: '140px 20px 80px',
            maxWidth: '600px',
            margin: '0 auto'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '30px'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        style: {
                            fontSize: '24px',
                            fontWeight: '800'
                        },
                        children: "💊 복약 관리 목록"
                    }, void 0, false, {
                        fileName: "[project]/app/(site)/medication/list/page.tsx",
                        lineNumber: 76,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: "/medication/add",
                        style: {
                            padding: '10px 15px',
                            backgroundColor: '#4f46e5',
                            color: '#fff',
                            borderRadius: '8px',
                            textDecoration: 'none',
                            fontWeight: 'bold',
                            fontSize: '14px'
                        },
                        children: "+ 약 추가"
                    }, void 0, false, {
                        fileName: "[project]/app/(site)/medication/list/page.tsx",
                        lineNumber: 77,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(site)/medication/list/page.tsx",
                lineNumber: 75,
                columnNumber: 13
            }, this),
            medications.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    textAlign: 'center',
                    padding: '50px',
                    backgroundColor: '#f8fafc',
                    borderRadius: '15px',
                    color: '#64748b'
                },
                children: "등록된 복약 알림이 없습니다."
            }, void 0, false, {
                fileName: "[project]/app/(site)/medication/list/page.tsx",
                lineNumber: 84,
                columnNumber: 17
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '15px'
                },
                children: medications.map((med)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            padding: '20px',
                            border: '1px solid #e2e8f0',
                            borderRadius: '15px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            backgroundColor: '#fff'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontSize: '18px',
                                            fontWeight: 'bold',
                                            marginBottom: '5px'
                                        },
                                        children: med.medicineName
                                    }, void 0, false, {
                                        fileName: "[project]/app/(site)/medication/list/page.tsx",
                                        lineNumber: 95,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontSize: '14px',
                                            color: '#64748b'
                                        },
                                        children: [
                                            "⏰ ",
                                            med.intakeTime.substring(0, 5),
                                            " | 📅 ",
                                            med.intakeDays
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(site)/medication/list/page.tsx",
                                        lineNumber: 96,
                                        columnNumber: 33
                                    }, this),
                                    med.isKakaoAlert && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontSize: '11px',
                                            color: '#4f46e5',
                                            fontWeight: 'bold'
                                        },
                                        children: "💬 카톡 알림 켜짐"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(site)/medication/list/page.tsx",
                                        lineNumber: 99,
                                        columnNumber: 54
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(site)/medication/list/page.tsx",
                                lineNumber: 94,
                                columnNumber: 29
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    gap: '10px'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: `/medication/edit/${med.medicationId}`,
                                        style: {
                                            padding: '8px 12px',
                                            backgroundColor: '#f1f5f9',
                                            color: '#475569',
                                            borderRadius: '6px',
                                            textDecoration: 'none',
                                            fontSize: '13px',
                                            fontWeight: 'bold'
                                        },
                                        children: "수정"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(site)/medication/list/page.tsx",
                                        lineNumber: 102,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>handleDelete(med.medicationId),
                                        style: {
                                            padding: '8px 12px',
                                            backgroundColor: '#fee2e2',
                                            color: '#ef4444',
                                            border: 'none',
                                            borderRadius: '6px',
                                            cursor: 'pointer',
                                            fontSize: '13px',
                                            fontWeight: 'bold'
                                        },
                                        children: "삭제"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(site)/medication/list/page.tsx",
                                        lineNumber: 106,
                                        columnNumber: 33
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(site)/medication/list/page.tsx",
                                lineNumber: 101,
                                columnNumber: 29
                            }, this)
                        ]
                    }, med.medicationId, true, {
                        fileName: "[project]/app/(site)/medication/list/page.tsx",
                        lineNumber: 90,
                        columnNumber: 25
                    }, this))
            }, void 0, false, {
                fileName: "[project]/app/(site)/medication/list/page.tsx",
                lineNumber: 88,
                columnNumber: 17
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    marginTop: '30px',
                    textAlign: 'center'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    href: "/medication/calender",
                    style: {
                        color: '#4f46e5',
                        textDecoration: 'none',
                        fontWeight: 'bold'
                    },
                    children: "📅 복약 달력 보기"
                }, void 0, false, {
                    fileName: "[project]/app/(site)/medication/list/page.tsx",
                    lineNumber: 117,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/(site)/medication/list/page.tsx",
                lineNumber: 116,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/(site)/medication/list/page.tsx",
        lineNumber: 74,
        columnNumber: 9
    }, this);
}
_s(MedicationListPage, "lHhiPUE0D+i63VeZjhD1DxXMBNQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = MedicationListPage;
var _c;
__turbopack_context__.k.register(_c, "MedicationListPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_1eff2094._.js.map