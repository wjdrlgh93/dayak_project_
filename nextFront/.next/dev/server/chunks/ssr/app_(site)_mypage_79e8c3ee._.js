module.exports = [
"[project]/app/(site)/mypage/mypage.module.css [app-ssr] (css module)", ((__turbopack_context__) => {

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
"[project]/app/(site)/mypage/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MyPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$site$292f$mypage$2f$mypage$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/app/(site)/mypage/mypage.module.css [app-ssr] (css module)");
"use client";
;
;
;
;
function MyPage() {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const fileInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [member, setMember] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [editMode, setEditMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    // 수정 입력값 (닉네임, 주소, 비밀번호)
    const [formData, setFormData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        nickName: '',
        address: '',
        currentPassword: '',
        newPassword: '' // 새 비번 (변경용)
    });
    // 1. 내 정보 불러오기
    const fetchMember = async ()=>{
        const token = localStorage.getItem('token');
        // 토큰 자체가 없으면 로그인 페이지로 보내는 게 맞음
        if (!token) {
            alert("로그인이 필요합니다.");
            router.push('/authLogin');
            return;
        }
        try {
            const res = await fetch('http://localhost:8080/api/member/detail', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (res.ok) {
                // 성공 시 데이터 설정
                const data = await res.json();
                setMember(data);
                setFormData({
                    nickName: data.nickName,
                    address: data.address || '',
                    currentPassword: '',
                    newPassword: ''
                });
            } else {
                // ⭐️ 에러 상태 코드별 처리 (여기가 핵심!)
                if (res.status === 401 || res.status === 403) {
                    // 인증 실패(토큰 만료 등) -> 이때만 로그인 페이지로 이동
                    alert("로그인 세션이 만료되었습니다. 다시 로그인해주세요.");
                    localStorage.removeItem('token'); // 만료된 토큰 삭제
                    router.push('/authLogin');
                } else if (res.status === 404) {
                    // 주소 잘못됨 -> 로그인 문제는 아님
                    alert("서버 연결 오류: 정보를 찾을 수 없습니다. (404)");
                    router.push('/'); // 메인으로 이동하거나 그대로 유지
                } else {
                    // 그 외 서버 에러(500 등)
                    alert(`서버 오류가 발생했습니다. (코드: ${res.status})`);
                    router.push('/'); // 메인으로 안전하게 이동
                }
            }
        } catch (e) {
            // 아예 서버가 꺼져있거나 네트워크 문제인 경우
            console.error(e);
            alert("서버와 통신할 수 없습니다. 잠시 후 다시 시도해주세요.");
        // 로그인 페이지로 튕기지 않음
        } finally{
            setLoading(false);
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        fetchMember();
    }, []);
    // 2. 정보 수정 요청 (비밀번호 포함)
    const handleUpdate = async ()=>{
        const token = localStorage.getItem('token');
        // 새 비밀번호를 입력했는데 현재 비밀번호가 없다면 막기
        if (formData.newPassword && !formData.currentPassword) {
            alert("비밀번호를 변경하려면 현재 비밀번호를 입력해야 합니다.");
            return;
        }
        try {
            const res = await fetch('http://localhost:8080/api/member/update', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData) // 닉네임, 주소, 비번들 전송
            });
            if (res.ok) {
                alert("성공적으로 수정되었습니다.");
                setEditMode(false);
                fetchMember(); // 최신 정보 갱신
            } else {
                // 백엔드에서 보낸 에러 메시지 (예: "현재 비밀번호가 일치하지 않습니다")
                const errorMsg = await res.text();
                alert("수정 실패: " + errorMsg);
            }
        } catch (e) {
            console.error(e);
            alert("서버 통신 오류");
        }
    };
    // 3. 이미지 파일 변경 (선택 즉시 업로드)
    const handleFileChange = async (e)=>{
        if (!e.target.files || e.target.files.length === 0) return;
        const file = e.target.files[0];
        const uploadData = new FormData();
        uploadData.append('file', file);
        const token = localStorage.getItem('token');
        try {
            const res = await fetch('http://localhost:8080/api/member/profileImg', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: uploadData
            });
            if (res.ok) {
                alert("프로필 사진이 변경되었습니다.");
                fetchMember(); // 이미지 갱신
            } else {
                alert("이미지 업로드 실패");
            }
        } catch (e) {
            console.error(e);
        }
    };
    if (loading) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$site$292f$mypage$2f$mypage$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].loading,
        children: "로딩중..."
    }, void 0, false, {
        fileName: "[project]/app/(site)/mypage/page.tsx",
        lineNumber: 152,
        columnNumber: 23
    }, this);
    if (!member) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$site$292f$mypage$2f$mypage$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].loading,
        children: "회원 정보가 없습니다."
    }, void 0, false, {
        fileName: "[project]/app/(site)/mypage/page.tsx",
        lineNumber: 153,
        columnNumber: 23
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$site$292f$mypage$2f$mypage$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].container,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$site$292f$mypage$2f$mypage$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].title,
                children: "마이페이지"
            }, void 0, false, {
                fileName: "[project]/app/(site)/mypage/page.tsx",
                lineNumber: 157,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$site$292f$mypage$2f$mypage$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].card,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$site$292f$mypage$2f$mypage$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].profileSection,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$site$292f$mypage$2f$mypage$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].imgWrapper,
                                onClick: ()=>fileInputRef.current?.click(),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                        src: member.fileUrl || "/img/default_profile.png",
                                        alt: "프로필",
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$site$292f$mypage$2f$mypage$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].profileImg,
                                        onError: (e)=>{
                                            e.currentTarget.src = "/img/default_profile.png";
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/app/(site)/mypage/page.tsx",
                                        lineNumber: 166,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$site$292f$mypage$2f$mypage$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].overlay,
                                        children: "📷 변경"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(site)/mypage/page.tsx",
                                        lineNumber: 172,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(site)/mypage/page.tsx",
                                lineNumber: 162,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "file",
                                ref: fileInputRef,
                                style: {
                                    display: 'none'
                                },
                                accept: "image/*",
                                onChange: handleFileChange
                            }, void 0, false, {
                                fileName: "[project]/app/(site)/mypage/page.tsx",
                                lineNumber: 174,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(site)/mypage/page.tsx",
                        lineNumber: 161,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$site$292f$mypage$2f$mypage$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].infoSection,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$site$292f$mypage$2f$mypage$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].row,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        children: "이메일"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(site)/mypage/page.tsx",
                                        lineNumber: 188,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        value: member.email,
                                        disabled: true,
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$site$292f$mypage$2f$mypage$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].inputDisabled
                                    }, void 0, false, {
                                        fileName: "[project]/app/(site)/mypage/page.tsx",
                                        lineNumber: 189,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(site)/mypage/page.tsx",
                                lineNumber: 187,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$site$292f$mypage$2f$mypage$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].row,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        children: "이름"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(site)/mypage/page.tsx",
                                        lineNumber: 194,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        value: member.name,
                                        disabled: true,
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$site$292f$mypage$2f$mypage$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].inputDisabled
                                    }, void 0, false, {
                                        fileName: "[project]/app/(site)/mypage/page.tsx",
                                        lineNumber: 195,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(site)/mypage/page.tsx",
                                lineNumber: 193,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$site$292f$mypage$2f$mypage$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].row,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        children: "닉네임"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(site)/mypage/page.tsx",
                                        lineNumber: 200,
                                        columnNumber: 17
                                    }, this),
                                    editMode ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        value: formData.nickName,
                                        onChange: (e)=>setFormData({
                                                ...formData,
                                                nickName: e.target.value
                                            }),
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$site$292f$mypage$2f$mypage$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].input
                                    }, void 0, false, {
                                        fileName: "[project]/app/(site)/mypage/page.tsx",
                                        lineNumber: 202,
                                        columnNumber: 21
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$site$292f$mypage$2f$mypage$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].textValue,
                                        children: member.nickName
                                    }, void 0, false, {
                                        fileName: "[project]/app/(site)/mypage/page.tsx",
                                        lineNumber: 208,
                                        columnNumber: 21
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(site)/mypage/page.tsx",
                                lineNumber: 199,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$site$292f$mypage$2f$mypage$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].row,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        children: "주소"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(site)/mypage/page.tsx",
                                        lineNumber: 214,
                                        columnNumber: 17
                                    }, this),
                                    editMode ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        value: formData.address,
                                        onChange: (e)=>setFormData({
                                                ...formData,
                                                address: e.target.value
                                            }),
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$site$292f$mypage$2f$mypage$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].input
                                    }, void 0, false, {
                                        fileName: "[project]/app/(site)/mypage/page.tsx",
                                        lineNumber: 216,
                                        columnNumber: 21
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$site$292f$mypage$2f$mypage$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].textValue,
                                        children: member.address || "주소 없음"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(site)/mypage/page.tsx",
                                        lineNumber: 222,
                                        columnNumber: 21
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(site)/mypage/page.tsx",
                                lineNumber: 213,
                                columnNumber: 13
                            }, this),
                            editMode && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$site$292f$mypage$2f$mypage$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].passwordSection,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$site$292f$mypage$2f$mypage$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].subTitle,
                                        children: "🔒 비밀번호 변경 (선택)"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(site)/mypage/page.tsx",
                                        lineNumber: 229,
                                        columnNumber: 21
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$site$292f$mypage$2f$mypage$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].row,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                children: "현재 비밀번호"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(site)/mypage/page.tsx",
                                                lineNumber: 232,
                                                columnNumber: 25
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "password",
                                                placeholder: "변경하려면 현재 비밀번호 입력",
                                                value: formData.currentPassword,
                                                onChange: (e)=>setFormData({
                                                        ...formData,
                                                        currentPassword: e.target.value
                                                    }),
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$site$292f$mypage$2f$mypage$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].input
                                            }, void 0, false, {
                                                fileName: "[project]/app/(site)/mypage/page.tsx",
                                                lineNumber: 233,
                                                columnNumber: 25
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(site)/mypage/page.tsx",
                                        lineNumber: 231,
                                        columnNumber: 21
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$site$292f$mypage$2f$mypage$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].row,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                children: "새 비밀번호"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(site)/mypage/page.tsx",
                                                lineNumber: 243,
                                                columnNumber: 25
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "password",
                                                placeholder: "새 비밀번호 입력",
                                                value: formData.newPassword,
                                                onChange: (e)=>setFormData({
                                                        ...formData,
                                                        newPassword: e.target.value
                                                    }),
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$site$292f$mypage$2f$mypage$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].input
                                            }, void 0, false, {
                                                fileName: "[project]/app/(site)/mypage/page.tsx",
                                                lineNumber: 244,
                                                columnNumber: 25
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(site)/mypage/page.tsx",
                                        lineNumber: 242,
                                        columnNumber: 21
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(site)/mypage/page.tsx",
                                lineNumber: 228,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$site$292f$mypage$2f$mypage$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].btnArea,
                                children: editMode ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: handleUpdate,
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$site$292f$mypage$2f$mypage$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].saveBtn,
                                            children: "저장하기"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(site)/mypage/page.tsx",
                                            lineNumber: 259,
                                            columnNumber: 25
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$site$292f$mypage$2f$mypage$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].cancelBtn,
                                            children: "취소"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(site)/mypage/page.tsx",
                                            lineNumber: 260,
                                            columnNumber: 25
                                        }, this)
                                    ]
                                }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setEditMode(true),
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$site$292f$mypage$2f$mypage$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].editBtn,
                                    children: "수정하기"
                                }, void 0, false, {
                                    fileName: "[project]/app/(site)/mypage/page.tsx",
                                    lineNumber: 273,
                                    columnNumber: 21
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/(site)/mypage/page.tsx",
                                lineNumber: 256,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(site)/mypage/page.tsx",
                        lineNumber: 184,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(site)/mypage/page.tsx",
                lineNumber: 159,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/(site)/mypage/page.tsx",
        lineNumber: 156,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=app_%28site%29_mypage_79e8c3ee._.js.map