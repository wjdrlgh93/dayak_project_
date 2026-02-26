(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/(site)/profile/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>GuardianSettings
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function GuardianSettings() {
    _s();
    const [friends, setFriends] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // 🚀 에러 1 해결: token을 함수 내부에서 가져오도록 정의
    const getAuthToken = ()=>localStorage.getItem('token');
    // 친구 목록 불러오기
    const fetchFriends = async ()=>{
        const token = getAuthToken();
        if (!token) return alert("로그인이 필요합니다.");
        setLoading(true);
        try {
            const res = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get('http://localhost:8080/api/medication/kakao/friends', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            // 카카오 응답 구조에 따라 elements 추출
            setFriends(res.data.elements || []);
        } catch (e) {
            console.error("친구 목록 로드 실패", e);
            alert("친구 목록을 불러올 수 없습니다. 권한 설정을 확인해주세요.");
        } finally{
            setLoading(false);
        }
    };
    // 🚀 에러 3 해결: saveGuardian 함수 정의
    const saveGuardian = async (uuid, nickName)=>{
        const token = getAuthToken();
        if (!confirm(`[${nickName}] 님을 보호자로 지정하시겠습니까?`)) return;
        try {
            await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post('http://localhost:8080/api/member/guardian', {
                guardianUuid: uuid,
                guardianName: nickName
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            alert("✅ 보호자 지정이 완료되었습니다!");
            setFriends([]); // 목록 닫기
        } catch (e) {
            alert("보호자 저장 중 오류가 발생했습니다.");
        }
    };
    // 🚀 에러 2 해결: 모든 코드는 반드시 이 return (함수 바디) 안에 있어야 합니다.
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            marginTop: '30px',
            padding: '20px',
            backgroundColor: '#f9fafb',
            borderRadius: '15px',
            border: '1px solid #e5e7eb'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                style: {
                    marginBottom: '10px',
                    fontSize: '18px',
                    fontWeight: 'bold'
                },
                children: "👩‍👧‍👦 보호자 연결 (카카오톡)"
            }, void 0, false, {
                fileName: "[project]/app/(site)/profile/page.tsx",
                lineNumber: 55,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                style: {
                    fontSize: '13px',
                    color: '#64748b',
                    marginBottom: '15px'
                },
                children: "20분간 복약 확인이 안 될 경우, 선택한 보호자에게 알림이 전송됩니다."
            }, void 0, false, {
                fileName: "[project]/app/(site)/profile/page.tsx",
                lineNumber: 56,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: fetchFriends,
                disabled: loading,
                style: {
                    padding: '12px 20px',
                    backgroundColor: '#fee500',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    width: '100%'
                },
                children: loading ? "불러오는 중..." : "내 카톡 친구 목록 불러오기"
            }, void 0, false, {
                fileName: "[project]/app/(site)/profile/page.tsx",
                lineNumber: 60,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    marginTop: '15px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px'
                },
                children: friends.map((f)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '12px',
                            backgroundColor: '#fff',
                            borderRadius: '10px',
                            border: '1px solid #e5e7eb'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px'
                                },
                                children: [
                                    f.profile_thumbnail_image && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                        src: f.profile_thumbnail_image,
                                        alt: "profile",
                                        style: {
                                            width: '30px',
                                            height: '30px',
                                            borderRadius: '50%'
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/app/(site)/profile/page.tsx",
                                        lineNumber: 79,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontWeight: '600'
                                        },
                                        children: f.profile_nickname
                                    }, void 0, false, {
                                        fileName: "[project]/app/(site)/profile/page.tsx",
                                        lineNumber: 81,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(site)/profile/page.tsx",
                                lineNumber: 77,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>saveGuardian(f.uuid, f.profile_nickname),
                                style: {
                                    padding: '6px 12px',
                                    backgroundColor: '#4f46e5',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '6px',
                                    cursor: 'pointer',
                                    fontSize: '12px',
                                    fontWeight: 'bold'
                                },
                                children: "지정"
                            }, void 0, false, {
                                fileName: "[project]/app/(site)/profile/page.tsx",
                                lineNumber: 83,
                                columnNumber: 25
                            }, this)
                        ]
                    }, f.uuid, true, {
                        fileName: "[project]/app/(site)/profile/page.tsx",
                        lineNumber: 73,
                        columnNumber: 21
                    }, this))
            }, void 0, false, {
                fileName: "[project]/app/(site)/profile/page.tsx",
                lineNumber: 71,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/(site)/profile/page.tsx",
        lineNumber: 54,
        columnNumber: 9
    }, this);
}
_s(GuardianSettings, "rUi36gyWlfx+FoRDShBFIBNsh/0=");
_c = GuardianSettings;
var _c;
__turbopack_context__.k.register(_c, "GuardianSettings");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=app_%28site%29_profile_page_tsx_3019ab90._.js.map