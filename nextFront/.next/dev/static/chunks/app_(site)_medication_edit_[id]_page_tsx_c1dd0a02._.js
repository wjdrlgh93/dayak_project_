(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/(site)/medication/edit/[id]/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>EditMedicationPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function EditMedicationPage() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const { id } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"])();
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [submitting, setSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [formData, setFormData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        medicineName: '',
        intakeTime: '09:00',
        selectedDays: [],
        isKakaoAlert: true
    });
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
    const themeColor = '#4f46e5';
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "EditMedicationPage.useEffect": ()=>{
            const token = localStorage.getItem('token');
            if (!token) {
                router.replace('/authLogin');
                return;
            }
            fetchOriginalData(token);
        }
    }["EditMedicationPage.useEffect"], [
        id,
        router
    ]);
    const fetchOriginalData = async (token)=>{
        try {
            const res = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`http://localhost:8080/api/medication/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const data = res.data;
            setFormData({
                medicineName: data.medicineName,
                intakeTime: data.intakeTime.substring(0, 5),
                selectedDays: data.intakeDays.split(','),
                isKakaoAlert: data.isKakaoAlert
            });
        } catch (e) {
            alert("데이터를 불러오지 못했습니다.");
            router.back();
        } finally{
            setLoading(false);
        }
    };
    const toggleDay = (day)=>{
        setFormData((prev)=>({
                ...prev,
                selectedDays: prev.selectedDays.includes(day) ? prev.selectedDays.filter((d)=>d !== day) : [
                    ...prev.selectedDays,
                    day
                ]
            }));
    };
    const handleSubmit = async (e)=>{
        e.preventDefault();
        if (formData.selectedDays.length === 0) return alert("복용 요일을 하나 이상 선택해주세요.");
        setSubmitting(true);
        const token = localStorage.getItem('token');
        try {
            await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].put(`http://localhost:8080/api/medication/${id}`, {
                medicineName: formData.medicineName,
                intakeTime: formData.intakeTime + ":00",
                intakeDays: formData.selectedDays.join(','),
                isKakaoAlert: formData.isKakaoAlert
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            alert("✅ 복약 정보가 수정되었습니다!");
            router.push('/medication/list');
        } catch (error) {
            alert("수정 중 오류가 발생했습니다.");
        } finally{
            setSubmitting(false);
        }
    };
    if (loading) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            padding: '150px',
            textAlign: 'center'
        },
        children: "정보 불러오는 중..."
    }, void 0, false, {
        fileName: "[project]/app/(site)/medication/edit/[id]/page.tsx",
        lineNumber: 91,
        columnNumber: 25
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            padding: '40px 20px',
            maxWidth: '500px',
            margin: '0 auto'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                style: {
                    fontSize: '24px',
                    fontWeight: '800',
                    marginBottom: '30px',
                    textAlign: 'center'
                },
                children: "✏️ 복약 정보 수정"
            }, void 0, false, {
                fileName: "[project]/app/(site)/medication/edit/[id]/page.tsx",
                lineNumber: 95,
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
                                    fontWeight: 'bold'
                                },
                                children: "약 이름"
                            }, void 0, false, {
                                fileName: "[project]/app/(site)/medication/edit/[id]/page.tsx",
                                lineNumber: 99,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "text",
                                required: true,
                                style: {
                                    padding: '12px',
                                    borderRadius: '8px',
                                    border: '1px solid #cbd5e1'
                                },
                                value: formData.medicineName,
                                onChange: (e)=>setFormData({
                                        ...formData,
                                        medicineName: e.target.value
                                    })
                            }, void 0, false, {
                                fileName: "[project]/app/(site)/medication/edit/[id]/page.tsx",
                                lineNumber: 100,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(site)/medication/edit/[id]/page.tsx",
                        lineNumber: 98,
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
                                    fontWeight: 'bold'
                                },
                                children: "복용 시간"
                            }, void 0, false, {
                                fileName: "[project]/app/(site)/medication/edit/[id]/page.tsx",
                                lineNumber: 110,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "time",
                                required: true,
                                style: {
                                    padding: '12px',
                                    borderRadius: '8px',
                                    border: '1px solid #cbd5e1'
                                },
                                value: formData.intakeTime,
                                onChange: (e)=>setFormData({
                                        ...formData,
                                        intakeTime: e.target.value
                                    })
                            }, void 0, false, {
                                fileName: "[project]/app/(site)/medication/edit/[id]/page.tsx",
                                lineNumber: 111,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(site)/medication/edit/[id]/page.tsx",
                        lineNumber: 109,
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
                                    fontWeight: 'bold'
                                },
                                children: "요일 선택"
                            }, void 0, false, {
                                fileName: "[project]/app/(site)/medication/edit/[id]/page.tsx",
                                lineNumber: 121,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    gap: '4px'
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
                                            fontSize: '12px'
                                        },
                                        children: day.label
                                    }, day.value, false, {
                                        fileName: "[project]/app/(site)/medication/edit/[id]/page.tsx",
                                        lineNumber: 124,
                                        columnNumber: 29
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/(site)/medication/edit/[id]/page.tsx",
                                lineNumber: 122,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(site)/medication/edit/[id]/page.tsx",
                        lineNumber: 120,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '15px',
                            backgroundColor: '#f8fafc',
                            borderRadius: '8px'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontWeight: 'bold'
                                },
                                children: "카카오톡 알림 사용"
                            }, void 0, false, {
                                fileName: "[project]/app/(site)/medication/edit/[id]/page.tsx",
                                lineNumber: 143,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "checkbox",
                                style: {
                                    width: '20px',
                                    height: '20px'
                                },
                                checked: formData.isKakaoAlert,
                                onChange: (e)=>setFormData({
                                        ...formData,
                                        isKakaoAlert: e.target.checked
                                    })
                            }, void 0, false, {
                                fileName: "[project]/app/(site)/medication/edit/[id]/page.tsx",
                                lineNumber: 144,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(site)/medication/edit/[id]/page.tsx",
                        lineNumber: 142,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "submit",
                        disabled: submitting,
                        style: {
                            marginTop: '10px',
                            padding: '15px',
                            backgroundColor: submitting ? '#ccc' : themeColor,
                            color: '#fff',
                            border: 'none',
                            borderRadius: '8px',
                            fontSize: '18px',
                            fontWeight: 'bold',
                            cursor: 'pointer'
                        },
                        children: submitting ? "수정 중..." : "수정 완료"
                    }, void 0, false, {
                        fileName: "[project]/app/(site)/medication/edit/[id]/page.tsx",
                        lineNumber: 152,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>router.back(),
                        style: {
                            border: 'none',
                            background: 'none',
                            color: '#64748b',
                            cursor: 'pointer'
                        },
                        children: "취소"
                    }, void 0, false, {
                        fileName: "[project]/app/(site)/medication/edit/[id]/page.tsx",
                        lineNumber: 162,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(site)/medication/edit/[id]/page.tsx",
                lineNumber: 97,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/(site)/medication/edit/[id]/page.tsx",
        lineNumber: 94,
        columnNumber: 9
    }, this);
}
_s(EditMedicationPage, "zRCNF4qfXmugcmxf2ziumpn67v4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"]
    ];
});
_c = EditMedicationPage;
var _c;
__turbopack_context__.k.register(_c, "EditMedicationPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=app_%28site%29_medication_edit_%5Bid%5D_page_tsx_c1dd0a02._.js.map