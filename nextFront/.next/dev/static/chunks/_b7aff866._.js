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
    baseURL: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_API_URL || 'http://localhost:8080',
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
"[project]/app/(site)/medication/calender/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MedicationCalendarPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$util$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/util/api.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function MedicationCalendarPage() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [medications, setMedications] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [records, setRecords] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [currentDate, setCurrentDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(new Date());
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    // 🚀 선택된 날짜 상태 추가
    const [selectedDate, setSelectedDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const themeColor = '#4f46e5';
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MedicationCalendarPage.useEffect": ()=>{
            const token = localStorage.getItem('token');
            if (!token) {
                router.replace('/authLogin');
                return;
            }
            fetchAllData();
        }
    }["MedicationCalendarPage.useEffect"], [
        router
    ]);
    const fetchAllData = async ()=>{
        try {
            // 🚀 headers와 도메인을 생략하여 훨씬 간결해진 병렬 요청 [cite: 2026-02-18]
            const [medRes, recordRes] = await Promise.all([
                __TURBOPACK__imported__module__$5b$project$5d2f$util$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get('/api/medication/list'),
                __TURBOPACK__imported__module__$5b$project$5d2f$util$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get('/api/medication/check/history')
            ]);
            // Axios는 응답 데이터가 .data에 담겨 있습니다. [cite: 2026-02-18]
            setMedications(Array.isArray(medRes.data) ? medRes.data : []);
            setRecords(Array.isArray(recordRes.data) ? recordRes.data : []);
        } catch (e) {
            console.error("데이터 로딩 실패:", e);
            // 세션 만료 시 처리 (필요한 경우)
            if (e.response?.status === 401) {
                alert("세션이 만료되었습니다. 다시 로그인해주세요.");
            }
            setMedications([]);
            setRecords([]);
        } finally{
            setLoading(false);
        }
    };
    const getDayName = (dayIndex)=>{
        return [
            'SUN',
            'MON',
            'TUE',
            'WED',
            'THU',
            'FRI',
            'SAT'
        ][dayIndex];
    };
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    if (loading) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            padding: '150px',
            textAlign: 'center'
        },
        children: "로딩 중..."
    }, void 0, false, {
        fileName: "[project]/app/(site)/medication/calender/page.tsx",
        lineNumber: 77,
        columnNumber: 25
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            padding: '140px 20px 80px',
            maxWidth: '800px',
            margin: '0 auto',
            fontFamily: 'sans-serif'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    textAlign: 'center',
                    marginBottom: '40px'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        style: {
                            fontSize: '28px',
                            fontWeight: '800',
                            color: '#1e293b',
                            marginBottom: '10px'
                        },
                        children: "🗓️ 복약 캘린더"
                    }, void 0, false, {
                        fileName: "[project]/app/(site)/medication/calender/page.tsx",
                        lineNumber: 82,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            color: '#64748b'
                        },
                        children: "날짜를 클릭하여 상세 복약 내역을 확인하세요."
                    }, void 0, false, {
                        fileName: "[project]/app/(site)/medication/calender/page.tsx",
                        lineNumber: 83,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(site)/medication/calender/page.tsx",
                lineNumber: 81,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '25px',
                    padding: '0 10px'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>{
                            setCurrentDate(new Date(year, month - 1));
                            setSelectedDate(null);
                        },
                        style: {
                            padding: '10px 15px',
                            border: '1px solid #e2e8f0',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            backgroundColor: '#fff'
                        },
                        children: "◀ 이전 달"
                    }, void 0, false, {
                        fileName: "[project]/app/(site)/medication/calender/page.tsx",
                        lineNumber: 88,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        style: {
                            fontSize: '20px',
                            fontWeight: 'bold'
                        },
                        children: [
                            year,
                            "년 ",
                            month + 1,
                            "월"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(site)/medication/calender/page.tsx",
                        lineNumber: 94,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>{
                            setCurrentDate(new Date(year, month + 1));
                            setSelectedDate(null);
                        },
                        style: {
                            padding: '10px 15px',
                            border: '1px solid #e2e8f0',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            backgroundColor: '#fff'
                        },
                        children: "다음 달 ▶"
                    }, void 0, false, {
                        fileName: "[project]/app/(site)/medication/calender/page.tsx",
                        lineNumber: 95,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(site)/medication/calender/page.tsx",
                lineNumber: 87,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: 'grid',
                    gridTemplateColumns: 'repeat(7, 1fr)',
                    marginBottom: '10px',
                    textAlign: 'center',
                    fontWeight: '600',
                    color: '#64748b'
                },
                children: [
                    '일',
                    '월',
                    '화',
                    '수',
                    '목',
                    '금',
                    '토'
                ].map((d)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            padding: '10px'
                        },
                        children: d
                    }, d, false, {
                        fileName: "[project]/app/(site)/medication/calender/page.tsx",
                        lineNumber: 105,
                        columnNumber: 63
                    }, this))
            }, void 0, false, {
                fileName: "[project]/app/(site)/medication/calender/page.tsx",
                lineNumber: 104,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: 'grid',
                    gridTemplateColumns: 'repeat(7, 1fr)',
                    gap: '10px'
                },
                children: [
                    Array.from({
                        length: firstDay
                    }).map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {}, `empty-${i}`, false, {
                            fileName: "[project]/app/(site)/medication/calender/page.tsx",
                            lineNumber: 110,
                            columnNumber: 65
                        }, this)),
                    Array.from({
                        length: daysInMonth
                    }).map((_, i)=>{
                        const day = i + 1;
                        const dateObj = new Date(year, month, day);
                        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                        const dayName = getDayName(dateObj.getDay());
                        const totalToTake = medications.filter((m)=>m.intakeDays.includes(dayName) || m.intakeDays === 'EVERYDAY').length;
                        const dayRecords = Array.isArray(records) ? records.filter((r)=>r.checkDate === dateStr) : [];
                        const takenCount = new Set(dayRecords.map((r)=>r.medicationId)).size;
                        let bgColor = '#fff';
                        let borderColor = selectedDate === dateStr ? themeColor : '#e2e8f0'; // 🚀 선택된 날짜 강조
                        let statusIcon = '';
                        if (totalToTake > 0) {
                            if (takenCount === 0) {
                                bgColor = '#fff';
                            } else if (takenCount < totalToTake) {
                                bgColor = '#fffbeb';
                                if (selectedDate !== dateStr) borderColor = '#fbbf24';
                                statusIcon = '⚠️';
                            } else {
                                bgColor = '#f0fdf4';
                                if (selectedDate !== dateStr) borderColor = '#22c55e';
                                statusIcon = '✅';
                            }
                        }
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            onClick: ()=>setSelectedDate(dateStr),
                            style: {
                                minHeight: '100px',
                                border: `2px solid ${borderColor}`,
                                borderRadius: '12px',
                                padding: '10px',
                                backgroundColor: bgColor,
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                transform: selectedDate === dateStr ? 'scale(1.02)' : 'none',
                                boxShadow: selectedDate === dateStr ? '0 4px 12px rgba(0,0,0,0.1)' : 'none',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontSize: '14px',
                                        fontWeight: 'bold',
                                        color: selectedDate === dateStr ? themeColor : '#1e293b'
                                    },
                                    children: day
                                }, void 0, false, {
                                    fileName: "[project]/app/(site)/medication/calender/page.tsx",
                                    lineNumber: 162,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        textAlign: 'center'
                                    },
                                    children: totalToTake > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontSize: '11px',
                                            fontWeight: '700'
                                        },
                                        children: [
                                            statusIcon,
                                            " ",
                                            takenCount,
                                            "/",
                                            totalToTake
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(site)/medication/calender/page.tsx",
                                        lineNumber: 166,
                                        columnNumber: 37
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontSize: '10px',
                                            color: '#cbd5e1'
                                        },
                                        children: "-"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(site)/medication/calender/page.tsx",
                                        lineNumber: 170,
                                        columnNumber: 37
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/(site)/medication/calender/page.tsx",
                                    lineNumber: 164,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, day, true, {
                            fileName: "[project]/app/(site)/medication/calender/page.tsx",
                            lineNumber: 144,
                            columnNumber: 25
                        }, this);
                    })
                ]
            }, void 0, true, {
                fileName: "[project]/app/(site)/medication/calender/page.tsx",
                lineNumber: 109,
                columnNumber: 13
            }, this),
            selectedDate && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    marginTop: '40px',
                    padding: '25px',
                    backgroundColor: '#fff',
                    borderRadius: '16px',
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '20px'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                style: {
                                    margin: 0,
                                    fontSize: '20px',
                                    color: '#1e293b'
                                },
                                children: [
                                    "📍 ",
                                    selectedDate,
                                    " 상세 내역"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(site)/medication/calender/page.tsx",
                                lineNumber: 189,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setSelectedDate(null),
                                style: {
                                    border: 'none',
                                    background: 'none',
                                    cursor: 'pointer',
                                    fontSize: '18px',
                                    color: '#94a3b8'
                                },
                                children: "✕"
                            }, void 0, false, {
                                fileName: "[project]/app/(site)/medication/calender/page.tsx",
                                lineNumber: 190,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(site)/medication/calender/page.tsx",
                        lineNumber: 188,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '12px'
                        },
                        children: (()=>{
                            const dayName = getDayName(new Date(selectedDate).getDay());
                            const dayMeds = medications.filter((m)=>m.intakeDays.includes(dayName) || m.intakeDays === 'EVERYDAY');
                            if (dayMeds.length === 0) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    textAlign: 'center',
                                    color: '#64748b'
                                },
                                children: "이 날은 복약 일정이 없습니다."
                            }, void 0, false, {
                                fileName: "[project]/app/(site)/medication/calender/page.tsx",
                                lineNumber: 198,
                                columnNumber: 62
                            }, this);
                            return dayMeds.map((m)=>{
                                const isTaken = records.some((r)=>r.checkDate === selectedDate && r.medicationId === m.medicationId);
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        padding: '15px',
                                        borderRadius: '10px',
                                        border: '1px solid',
                                        backgroundColor: isTaken ? '#f0fdf4' : '#fff1f2',
                                        borderColor: isTaken ? '#22c55e' : '#fda4af'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                fontWeight: '700',
                                                color: isTaken ? '#166534' : '#9f1239'
                                            },
                                            children: m.medicineName
                                        }, void 0, false, {
                                            fileName: "[project]/app/(site)/medication/calender/page.tsx",
                                            lineNumber: 209,
                                            columnNumber: 41
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                fontSize: '14px',
                                                fontWeight: '800',
                                                color: isTaken ? '#166534' : '#9f1239'
                                            },
                                            children: isTaken ? '✅ 복용 완료' : '❌ 미복용'
                                        }, void 0, false, {
                                            fileName: "[project]/app/(site)/medication/calender/page.tsx",
                                            lineNumber: 210,
                                            columnNumber: 41
                                        }, this)
                                    ]
                                }, m.medicationId, true, {
                                    fileName: "[project]/app/(site)/medication/calender/page.tsx",
                                    lineNumber: 203,
                                    columnNumber: 37
                                }, this);
                            });
                        })()
                    }, void 0, false, {
                        fileName: "[project]/app/(site)/medication/calender/page.tsx",
                        lineNumber: 193,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(site)/medication/calender/page.tsx",
                lineNumber: 180,
                columnNumber: 17
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    marginTop: '40px',
                    padding: '20px',
                    backgroundColor: '#f8fafc',
                    borderRadius: '15px',
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '20px',
                    fontSize: '13px'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    width: '12px',
                                    height: '12px',
                                    backgroundColor: '#fff',
                                    border: '1px solid #e2e8f0',
                                    borderRadius: '3px'
                                }
                            }, void 0, false, {
                                fileName: "[project]/app/(site)/medication/calender/page.tsx",
                                lineNumber: 224,
                                columnNumber: 21
                            }, this),
                            " 미복용"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(site)/medication/calender/page.tsx",
                        lineNumber: 223,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    width: '12px',
                                    height: '12px',
                                    backgroundColor: '#fffbeb',
                                    border: '1px solid #fbbf24',
                                    borderRadius: '3px'
                                }
                            }, void 0, false, {
                                fileName: "[project]/app/(site)/medication/calender/page.tsx",
                                lineNumber: 227,
                                columnNumber: 21
                            }, this),
                            " 일부 복용"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(site)/medication/calender/page.tsx",
                        lineNumber: 226,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8    px'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    width: '12px',
                                    height: '12px',
                                    backgroundColor: '#f0fdf4',
                                    border: '1px solid #22c55e',
                                    borderRadius: '3px'
                                }
                            }, void 0, false, {
                                fileName: "[project]/app/(site)/medication/calender/page.tsx",
                                lineNumber: 230,
                                columnNumber: 21
                            }, this),
                            " 전체 복용 완료"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(site)/medication/calender/page.tsx",
                        lineNumber: 229,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(site)/medication/calender/page.tsx",
                lineNumber: 222,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/(site)/medication/calender/page.tsx",
        lineNumber: 80,
        columnNumber: 9
    }, this);
}
_s(MedicationCalendarPage, "RCEeE86DIuwlD/ZCEhZNhokrk4E=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = MedicationCalendarPage;
var _c;
__turbopack_context__.k.register(_c, "MedicationCalendarPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_b7aff866._.js.map