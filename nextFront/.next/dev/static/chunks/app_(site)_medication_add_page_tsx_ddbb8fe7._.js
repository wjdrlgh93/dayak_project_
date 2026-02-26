(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/(site)/medication/add/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AddMedicationPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"); // 🚀 useEffect 추가
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function AddMedicationPage() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isAuthChecking, setIsAuthChecking] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true); // 🚀 인증 확인 상태 추가
    // 요일 목록
    const dayOptions = [
        {
            label: '월',
            value: 'MON'
        },
        {
            label: '화',
            value: 'TUE'
        },
        {
            label: '수',
            value: 'WED'
        },
        {
            label: '목',
            value: 'THU'
        },
        {
            label: '금',
            value: 'FRI'
        },
        {
            label: '토',
            value: 'SAT'
        },
        {
            label: '일',
            value: 'SUN'
        }
    ];
    const [formData, setFormData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        medicineName: '',
        intakeTime: '09:00',
        selectedDays: [],
        isKakaoAlert: true
    });
    const themeColor = '#4f46e5'; // Indigo
    // 🚀 페이지 진입 시 로그인 체크
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AddMedicationPage.useEffect": ()=>{
            const token = localStorage.getItem('token');
            if (!token) {
                alert("로그인이 필요한 페이지입니다.");
                router.replace('/login'); // 로그인 페이지로 리다이렉트
                return;
            }
            setIsAuthChecking(false); // 토큰이 있으면 폼 보여주기
        }
    }["AddMedicationPage.useEffect"], [
        router
    ]);
    // 요일 선택 핸들러
    const toggleDay = (day)=>{
        setFormData((prev)=>({
                ...prev,
                selectedDays: prev.selectedDays.includes(day) ? prev.selectedDays.filter((d)=>d !== day) : [
                    ...prev.selectedDays,
                    day
                ]
            }));
    };
    // 등록 요청
    const handleSubmit = async (e)=>{
        e.preventDefault();
        if (formData.selectedDays.length === 0) return alert("복용 요일을 하나 이상 선택해주세요.");
        setLoading(true);
        const token = localStorage.getItem('token');
        try {
            await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post('http://localhost:8080/api/medication', {
                medicineName: formData.medicineName,
                intakeTime: formData.intakeTime + ":00",
                intakeDays: formData.selectedDays.join(','),
                isKakaoAlert: formData.isKakaoAlert
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            alert("✅ 복약 알림이 등록되었습니다!");
            router.push('/medication/list'); // 등록 후 목록 페이지로 이동
        } catch (error) {
            console.error(error);
            if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isAxiosError(error) && error.response?.status === 401) {
                alert("세션이 만료되었습니다. 다시 로그인해주세요.");
                router.replace('/login');
            } else {
                alert("등록 중 오류가 발생했습니다.");
            }
        } finally{
            setLoading(false);
        }
    };
    // 🚀 인증 확인 중에는 폼을 렌더링하지 않음
    if (isAuthChecking) {
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            padding: '40px 20px',
            maxWidth: '500px',
            margin: '0 auto',
            fontFamily: 'inherit'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                style: {
                    fontSize: '24px',
                    fontWeight: '800',
                    marginBottom: '30px',
                    textAlign: 'center'
                },
                children: "💊 새 복약 알림 등록"
            }, void 0, false, {
                fileName: "[project]/app/(site)/medication/add/page.tsx",
                lineNumber: 96,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                onSubmit: handleSubmit,
                style: {
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '8px'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                style: {
                                    fontSize: '14px',
                                    fontWeight: 'bold',
                                    color: '#475569'
                                },
                                children: "어떤 약인가요?"
                            }, void 0, false, {
                                fileName: "[project]/app/(site)/medication/add/page.tsx",
                                lineNumber: 102,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "text",
                                placeholder: "예: 타이레놀, 아침 영양제",
                                required: true,
                                style: {
                                    padding: '12px',
                                    borderRadius: '8px',
                                    border: '1px solid #cbd5e1',
                                    fontSize: '16px'
                                },
                                value: formData.medicineName,
                                onChange: (e)=>setFormData({
                                        ...formData,
                                        medicineName: e.target.value
                                    })
                            }, void 0, false, {
                                fileName: "[project]/app/(site)/medication/add/page.tsx",
                                lineNumber: 103,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(site)/medication/add/page.tsx",
                        lineNumber: 101,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '8px'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                style: {
                                    fontSize: '14px',
                                    fontWeight: 'bold',
                                    color: '#475569'
                                },
                                children: "언제 복용하시나요?"
                            }, void 0, false, {
                                fileName: "[project]/app/(site)/medication/add/page.tsx",
                                lineNumber: 114,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "time",
                                required: true,
                                style: {
                                    padding: '12px',
                                    borderRadius: '8px',
                                    border: '1px solid #cbd5e1',
                                    fontSize: '16px'
                                },
                                value: formData.intakeTime,
                                onChange: (e)=>setFormData({
                                        ...formData,
                                        intakeTime: e.target.value
                                    })
                            }, void 0, false, {
                                fileName: "[project]/app/(site)/medication/add/page.tsx",
                                lineNumber: 115,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(site)/medication/add/page.tsx",
                        lineNumber: 113,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '8px'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                style: {
                                    fontSize: '14px',
                                    fontWeight: 'bold',
                                    color: '#475569'
                                },
                                children: "복용 요일을 선택하세요"
                            }, void 0, false, {
                                fileName: "[project]/app/(site)/medication/add/page.tsx",
                                lineNumber: 125,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    gap: '5px'
                                },
                                children: dayOptions.map((day)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>toggleDay(day.value),
                                        style: {
                                            flex: 1,
                                            padding: '10px 0',
                                            borderRadius: '6px',
                                            border: '1px solid',
                                            borderColor: formData.selectedDays.includes(day.value) ? themeColor : '#cbd5e1',
                                            backgroundColor: formData.selectedDays.includes(day.value) ? themeColor : '#fff',
                                            color: formData.selectedDays.includes(day.value) ? '#fff' : '#475569',
                                            cursor: 'pointer',
                                            fontWeight: 'bold',
                                            fontSize: '14px',
                                            transition: 'all 0.2s'
                                        },
                                        children: day.label
                                    }, day.value, false, {
                                        fileName: "[project]/app/(site)/medication/add/page.tsx",
                                        lineNumber: 128,
                                        columnNumber: 29
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/(site)/medication/add/page.tsx",
                                lineNumber: 126,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(site)/medication/add/page.tsx",
                        lineNumber: 124,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '15px',
                            backgroundColor: '#f8fafc',
                            borderRadius: '8px',
                            marginTop: '10px'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontWeight: 'bold',
                                            fontSize: '15px'
                                        },
                                        children: "카카오톡 알림 받기"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(site)/medication/add/page.tsx",
                                        lineNumber: 162,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontSize: '12px',
                                            color: '#64748b'
                                        },
                                        children: "설정한 시간에 카톡으로 알려드려요."
                                    }, void 0, false, {
                                        fileName: "[project]/app/(site)/medication/add/page.tsx",
                                        lineNumber: 163,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(site)/medication/add/page.tsx",
                                lineNumber: 161,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "checkbox",
                                style: {
                                    width: '20px',
                                    height: '20px',
                                    cursor: 'pointer'
                                },
                                checked: formData.isKakaoAlert,
                                onChange: (e)=>setFormData({
                                        ...formData,
                                        isKakaoAlert: e.target.checked
                                    })
                            }, void 0, false, {
                                fileName: "[project]/app/(site)/medication/add/page.tsx",
                                lineNumber: 165,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(site)/medication/add/page.tsx",
                        lineNumber: 152,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "submit",
                        disabled: loading,
                        style: {
                            marginTop: '20px',
                            padding: '15px',
                            backgroundColor: loading ? '#ccc' : themeColor,
                            color: '#fff',
                            border: 'none',
                            borderRadius: '8px',
                            fontSize: '18px',
                            fontWeight: 'bold',
                            cursor: loading ? 'not-allowed' : 'pointer'
                        },
                        children: loading ? "등록 중..." : "알림 등록하기"
                    }, void 0, false, {
                        fileName: "[project]/app/(site)/medication/add/page.tsx",
                        lineNumber: 173,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(site)/medication/add/page.tsx",
                lineNumber: 100,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    marginTop: '20px',
                    textAlign: 'center'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    href: "/main",
                    style: {
                        color: '#64748b',
                        textDecoration: 'none',
                        fontSize: '14px'
                    },
                    children: "취소하고 돌아가기"
                }, void 0, false, {
                    fileName: "[project]/app/(site)/medication/add/page.tsx",
                    lineNumber: 193,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/(site)/medication/add/page.tsx",
                lineNumber: 192,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/(site)/medication/add/page.tsx",
        lineNumber: 95,
        columnNumber: 9
    }, this);
}
_s(AddMedicationPage, "mflrSG7TA5vuWywSjtkKaaIAVe8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = AddMedicationPage;
var _c;
__turbopack_context__.k.register(_c, "AddMedicationPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=app_%28site%29_medication_add_page_tsx_ddbb8fe7._.js.map