(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/(site)/mypage/mypage.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "btnArea": "mypage-module__TCVgia__btnArea",
  "cancelBtn": "mypage-module__TCVgia__cancelBtn",
  "card": "mypage-module__TCVgia__card",
  "container": "mypage-module__TCVgia__container",
  "editBtn": "mypage-module__TCVgia__editBtn",
  "imgWrapper": "mypage-module__TCVgia__imgWrapper",
  "infoSection": "mypage-module__TCVgia__infoSection",
  "input": "mypage-module__TCVgia__input",
  "inputDisabled": "mypage-module__TCVgia__inputDisabled",
  "loading": "mypage-module__TCVgia__loading",
  "overlay": "mypage-module__TCVgia__overlay",
  "passwordSection": "mypage-module__TCVgia__passwordSection",
  "profileImg": "mypage-module__TCVgia__profileImg",
  "profileSection": "mypage-module__TCVgia__profileSection",
  "row": "mypage-module__TCVgia__row",
  "saveBtn": "mypage-module__TCVgia__saveBtn",
  "subTitle": "mypage-module__TCVgia__subTitle",
  "textValue": "mypage-module__TCVgia__textValue",
  "title": "mypage-module__TCVgia__title",
});
}),
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
"[project]/app/(site)/mypage/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MyPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$site$292f$mypage$2f$mypage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/app/(site)/mypage/mypage.module.css [app-client] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$util$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/util/api.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function MyPage() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const fileInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [member, setMember] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [editMode, setEditMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // 수정 입력값 (닉네임, 주소, 비밀번호)
    const [formData, setFormData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        nickName: '',
        address: '',
        currentPassword: '',
        newPassword: '' // 새 비번 (변경용)
    });
    // 1. 내 정보 불러오기
    const fetchMember = async ()=>{
        // 🚀 인터셉터에서 토큰을 자동으로 관리하므로 호출부에서는 유무만 체크합니다.
        const token = localStorage.getItem('token');
        if (!token) {
            alert("로그인이 필요합니다.");
            router.push('/authLogin');
            return;
        }
        try {
            // 도메인 생략, 헤더 자동 주입
            const res = await __TURBOPACK__imported__module__$5b$project$5d2f$util$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get('/api/member/detail');
            // Axios는 응답 데이터가 res.data에 객체로 담겨 있습니다.
            const data = res.data;
            setMember(data);
            setFormData({
                nickName: data.nickName,
                address: data.address || '',
                currentPassword: '',
                newPassword: ''
            });
        } catch (e) {
            console.error("회원 정보 로드 실패:", e);
            // 🚀 에러 상태 코드별 처리
            if (e.response?.status === 401 || e.response?.status === 403) {
                alert("로그인 세션이 만료되었습니다. 다시 로그인해주세요.");
                localStorage.removeItem('token');
                router.push('/authLogin');
            } else if (e.response?.status === 404) {
                alert("정보를 찾을 수 없습니다. (404)");
            } else {
                alert("서버 오류가 발생했습니다.");
            }
        } finally{
            setLoading(false);
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MyPage.useEffect": ()=>{
            fetchMember();
        }
    }["MyPage.useEffect"], []);
    // 2. 정보 수정 요청 (비밀번호 포함)
    const handleUpdate = async ()=>{
        if (formData.newPassword && !formData.currentPassword) {
            alert("비밀번호를 변경하려면 현재 비밀번호를 입력해야 합니다.");
            return;
        }
        try {
            // 🚀 PUT 요청: JSON 변환과 헤더 설정이 자동화됩니다.
            await __TURBOPACK__imported__module__$5b$project$5d2f$util$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].put('/api/member/update', formData);
            alert("성공적으로 수정되었습니다.");
            setEditMode(false);
            fetchMember(); // 갱신
        } catch (e) {
            console.error("수정 실패:", e);
            // 백엔드에서 보낸 에러 메시지 추출 (Axios는 e.response.data에 담김)
            const errorMsg = e.response?.data || "서버 통신 오류";
            alert("수정 실패: " + errorMsg);
        }
    };
    // 3. 이미지 파일 변경 (선택 즉시 업로드)
    const handleFileChange = async (e)=>{
        if (!e.target.files || e.target.files.length === 0) return;
        const file = e.target.files[0];
        const uploadData = new FormData();
        uploadData.append('file', file);
        try {
            // 🚀 파일 업로드: headers를 따로 지정하지 않아도 
            // FormData를 전달하면 Axios가 Content-Type을 알아서 잡아줍니다.
            await __TURBOPACK__imported__module__$5b$project$5d2f$util$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post('/api/member/profileImg', uploadData);
            alert("프로필 사진이 변경되었습니다.");
            fetchMember(); // 이미지 갱신
        } catch (e) {
            console.error("이미지 업로드 실패:", e);
            alert("이미지 업로드에 실패했습니다.");
        }
    };
    if (loading) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$site$292f$mypage$2f$mypage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].loading,
        children: "로딩중..."
    }, void 0, false, {
        fileName: "[project]/app/(site)/mypage/page.tsx",
        lineNumber: 121,
        columnNumber: 23
    }, this);
    if (!member) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$site$292f$mypage$2f$mypage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].loading,
        children: "회원 정보가 없습니다."
    }, void 0, false, {
        fileName: "[project]/app/(site)/mypage/page.tsx",
        lineNumber: 122,
        columnNumber: 23
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$site$292f$mypage$2f$mypage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].container,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$site$292f$mypage$2f$mypage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].title,
                children: "마이페이지"
            }, void 0, false, {
                fileName: "[project]/app/(site)/mypage/page.tsx",
                lineNumber: 126,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$site$292f$mypage$2f$mypage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].card,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$site$292f$mypage$2f$mypage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].profileSection,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$site$292f$mypage$2f$mypage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].imgWrapper,
                                onClick: ()=>fileInputRef.current?.click(),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                        src: member.fileUrl || "/img/default_profile.png",
                                        alt: "프로필",
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$site$292f$mypage$2f$mypage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].profileImg,
                                        onError: (e)=>{
                                            e.currentTarget.src = "/img/default_profile.png";
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/app/(site)/mypage/page.tsx",
                                        lineNumber: 135,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$site$292f$mypage$2f$mypage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].overlay,
                                        children: "📷 변경"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(site)/mypage/page.tsx",
                                        lineNumber: 141,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(site)/mypage/page.tsx",
                                lineNumber: 131,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "file",
                                ref: fileInputRef,
                                style: {
                                    display: 'none'
                                },
                                accept: "image/*",
                                onChange: handleFileChange
                            }, void 0, false, {
                                fileName: "[project]/app/(site)/mypage/page.tsx",
                                lineNumber: 143,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(site)/mypage/page.tsx",
                        lineNumber: 130,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$site$292f$mypage$2f$mypage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].infoSection,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$site$292f$mypage$2f$mypage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].row,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        children: "이메일"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(site)/mypage/page.tsx",
                                        lineNumber: 157,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        value: member.email,
                                        disabled: true,
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$site$292f$mypage$2f$mypage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].inputDisabled
                                    }, void 0, false, {
                                        fileName: "[project]/app/(site)/mypage/page.tsx",
                                        lineNumber: 158,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(site)/mypage/page.tsx",
                                lineNumber: 156,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$site$292f$mypage$2f$mypage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].row,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        children: "이름"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(site)/mypage/page.tsx",
                                        lineNumber: 163,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        value: member.name,
                                        disabled: true,
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$site$292f$mypage$2f$mypage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].inputDisabled
                                    }, void 0, false, {
                                        fileName: "[project]/app/(site)/mypage/page.tsx",
                                        lineNumber: 164,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(site)/mypage/page.tsx",
                                lineNumber: 162,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$site$292f$mypage$2f$mypage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].row,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        children: "닉네임"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(site)/mypage/page.tsx",
                                        lineNumber: 169,
                                        columnNumber: 17
                                    }, this),
                                    editMode ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        value: formData.nickName,
                                        onChange: (e)=>setFormData({
                                                ...formData,
                                                nickName: e.target.value
                                            }),
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$site$292f$mypage$2f$mypage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].input
                                    }, void 0, false, {
                                        fileName: "[project]/app/(site)/mypage/page.tsx",
                                        lineNumber: 171,
                                        columnNumber: 21
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$site$292f$mypage$2f$mypage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].textValue,
                                        children: member.nickName
                                    }, void 0, false, {
                                        fileName: "[project]/app/(site)/mypage/page.tsx",
                                        lineNumber: 177,
                                        columnNumber: 21
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(site)/mypage/page.tsx",
                                lineNumber: 168,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$site$292f$mypage$2f$mypage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].row,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        children: "주소"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(site)/mypage/page.tsx",
                                        lineNumber: 183,
                                        columnNumber: 17
                                    }, this),
                                    editMode ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        value: formData.address,
                                        onChange: (e)=>setFormData({
                                                ...formData,
                                                address: e.target.value
                                            }),
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$site$292f$mypage$2f$mypage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].input
                                    }, void 0, false, {
                                        fileName: "[project]/app/(site)/mypage/page.tsx",
                                        lineNumber: 185,
                                        columnNumber: 21
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$site$292f$mypage$2f$mypage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].textValue,
                                        children: member.address || "주소 없음"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(site)/mypage/page.tsx",
                                        lineNumber: 191,
                                        columnNumber: 21
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(site)/mypage/page.tsx",
                                lineNumber: 182,
                                columnNumber: 13
                            }, this),
                            editMode && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$site$292f$mypage$2f$mypage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].passwordSection,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$site$292f$mypage$2f$mypage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].subTitle,
                                        children: "🔒 비밀번호 변경 (선택)"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(site)/mypage/page.tsx",
                                        lineNumber: 198,
                                        columnNumber: 21
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$site$292f$mypage$2f$mypage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].row,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                children: "현재 비밀번호"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(site)/mypage/page.tsx",
                                                lineNumber: 201,
                                                columnNumber: 25
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "password",
                                                placeholder: "변경하려면 현재 비밀번호 입력",
                                                value: formData.currentPassword,
                                                onChange: (e)=>setFormData({
                                                        ...formData,
                                                        currentPassword: e.target.value
                                                    }),
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$site$292f$mypage$2f$mypage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].input
                                            }, void 0, false, {
                                                fileName: "[project]/app/(site)/mypage/page.tsx",
                                                lineNumber: 202,
                                                columnNumber: 25
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(site)/mypage/page.tsx",
                                        lineNumber: 200,
                                        columnNumber: 21
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$site$292f$mypage$2f$mypage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].row,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                children: "새 비밀번호"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(site)/mypage/page.tsx",
                                                lineNumber: 212,
                                                columnNumber: 25
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "password",
                                                placeholder: "새 비밀번호 입력",
                                                value: formData.newPassword,
                                                onChange: (e)=>setFormData({
                                                        ...formData,
                                                        newPassword: e.target.value
                                                    }),
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$site$292f$mypage$2f$mypage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].input
                                            }, void 0, false, {
                                                fileName: "[project]/app/(site)/mypage/page.tsx",
                                                lineNumber: 213,
                                                columnNumber: 25
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(site)/mypage/page.tsx",
                                        lineNumber: 211,
                                        columnNumber: 21
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(site)/mypage/page.tsx",
                                lineNumber: 197,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$site$292f$mypage$2f$mypage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].btnArea,
                                children: editMode ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: handleUpdate,
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$site$292f$mypage$2f$mypage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].saveBtn,
                                            children: "저장하기"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(site)/mypage/page.tsx",
                                            lineNumber: 228,
                                            columnNumber: 25
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>{
                                                setEditMode(false);
                                                // 취소 시 입력값 원상복구
                                                setFormData({
                                                    ...formData,
                                                    nickName: member.nickName,
                                                    address: member.address,
                                                    currentPassword: '',
                                                    newPassword: ''
                                                });
                                            },
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$site$292f$mypage$2f$mypage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].cancelBtn,
                                            children: "취소"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(site)/mypage/page.tsx",
                                            lineNumber: 229,
                                            columnNumber: 25
                                        }, this)
                                    ]
                                }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setEditMode(true),
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$site$292f$mypage$2f$mypage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].editBtn,
                                    children: "수정하기"
                                }, void 0, false, {
                                    fileName: "[project]/app/(site)/mypage/page.tsx",
                                    lineNumber: 242,
                                    columnNumber: 21
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/(site)/mypage/page.tsx",
                                lineNumber: 225,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(site)/mypage/page.tsx",
                        lineNumber: 153,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(site)/mypage/page.tsx",
                lineNumber: 128,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/(site)/mypage/page.tsx",
        lineNumber: 125,
        columnNumber: 5
    }, this);
}
_s(MyPage, "26xXnjc999VhhPy0/DRwqKFHra8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = MyPage;
var _c;
__turbopack_context__.k.register(_c, "MyPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_4f402b23._.js.map