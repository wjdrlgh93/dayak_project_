(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/util/boardApi.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createBoard",
    ()=>createBoard,
    "createReply",
    ()=>createReply,
    "deleteAdminBoard",
    ()=>deleteAdminBoard,
    "deleteAdminUser",
    ()=>deleteAdminUser,
    "deleteBoard",
    ()=>deleteBoard,
    "deleteReply",
    ()=>deleteReply,
    "getAdminBoardList",
    ()=>getAdminBoardList,
    "getAdminUserList",
    ()=>getAdminUserList,
    "getBoardDetail",
    ()=>getBoardDetail,
    "getBoardList",
    ()=>getBoardList,
    "getReplyList",
    ()=>getReplyList,
    "updateBoard",
    ()=>updateBoard,
    "updateReply",
    ()=>updateReply,
    "uploadBoardImage",
    ()=>uploadBoardImage
]);
// 1. 배포 환경을 고려하여 BASE_URL 수정 [cite: 2026-02-18, 2026-02-19]
// Nginx 설정 덕분에 /api만 적어도 서버가 알아서 백엔드(8080)로 배달합니다. [cite: 2026-02-18]
const BASE_URL = "/api";
// 공통 헤더 (토큰 포함)
const getHeaders = (token)=>{
    const headers = {
        "Content-Type": "application/json"
    };
    if (token) headers["Authorization"] = `Bearer ${token}`;
    return headers;
};
const uploadBoardImage = async (token, file)=>{
    const formData = new FormData();
    formData.append("file", file); // 백엔드 @RequestParam("file")과 일치해야 함 [cite: 2026-02-18]
    const res = await fetch(`${BASE_URL}/board/upload`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}` // JSON이 아니므로 Content-Type은 생략 (자동 설정) [cite: 2026-02-19]
        },
        body: formData
    });
    if (!res.ok) throw new Error("이미지 업로드 실패");
    return res.text(); // 서버가 리턴한 https://objectstorage... 주소 [cite: 2026-02-18, 2026-02-19]
};
const getBoardList = async (page = 0, size = 9)=>{
    const res = await fetch(`${BASE_URL}/board/list?page=${page}&size=${size}`, {
        cache: "no-store"
    });
    return res.json();
};
const getBoardDetail = async (id)=>{
    const res = await fetch(`${BASE_URL}/board/${id}`, {
        cache: "no-store"
    });
    return res.json();
};
const createBoard = async (token, data)=>{
    const res = await fetch(`${BASE_URL}/board`, {
        method: "POST",
        headers: getHeaders(token),
        body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error("작성 실패");
    return res.text();
};
const updateBoard = async (token, id, data)=>{
    const res = await fetch(`${BASE_URL}/board/${id}`, {
        method: "PUT",
        headers: getHeaders(token),
        body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error("수정 실패");
    return res.text();
};
const deleteBoard = async (token, id)=>{
    const res = await fetch(`${BASE_URL}/board/${id}`, {
        method: "DELETE",
        headers: getHeaders(token)
    });
    if (!res.ok) throw new Error("삭제 실패");
    return res.text();
};
const getReplyList = async (boardId, page = 0)=>{
    const res = await fetch(`${BASE_URL}/reply/list/${boardId}?page=${page}`, {
        cache: "no-store"
    });
    return res.json();
};
const createReply = async (token, boardId, content)=>{
    const res = await fetch(`${BASE_URL}/reply/${boardId}`, {
        method: "POST",
        headers: getHeaders(token),
        body: JSON.stringify({
            content
        })
    });
    if (!res.ok) throw new Error("댓글 작성 실패");
    return res.text();
};
const deleteReply = async (token, replyId)=>{
    const res = await fetch(`${BASE_URL}/reply/${replyId}`, {
        method: "DELETE",
        headers: getHeaders(token)
    });
    if (!res.ok) throw new Error("댓글 삭제 실패");
    return res.text();
};
const updateReply = async (token, replyId, content)=>{
    const response = await fetch(`${BASE_URL}/reply/${replyId}`, {
        method: "PATCH",
        headers: getHeaders(token),
        body: JSON.stringify({
            content
        })
    });
    if (!response.ok) throw new Error("댓글 수정에 실패했습니다.");
    return response.text();
};
const getAdminUserList = async (token, page = 0)=>{
    const res = await fetch(`${BASE_URL}/admin/users?page=${page}&size=10`, {
        method: "GET",
        headers: getHeaders(token),
        cache: "no-store"
    });
    if (!res.ok) {
        if (res.status === 403) throw new Error("관리자 권한이 없습니다.");
        throw new Error("목록을 불러오는 데 실패했습니다.");
    }
    return res.json();
};
const deleteAdminUser = async (token, id)=>{
    const res = await fetch(`${BASE_URL}/admin/users/${id}`, {
        method: "DELETE",
        headers: getHeaders(token)
    });
    if (!res.ok) throw new Error("삭제 처리 중 오류가 발생했습니다.");
    return res;
};
const getAdminBoardList = async (token, page = 0)=>{
    const res = await fetch(`${BASE_URL}/admin/boards?page=${page}&size=10`, {
        method: "GET",
        headers: getHeaders(token),
        cache: "no-store"
    });
    if (!res.ok) {
        if (res.status === 403) throw new Error("관리자 권한이 없습니다.");
        throw new Error("게시글 목록을 불러오는 데 실패했습니다.");
    }
    return res.json();
};
const deleteAdminBoard = async (token, id)=>{
    const res = await fetch(`${BASE_URL}/admin/boards/${id}`, {
        method: "DELETE",
        headers: getHeaders(token)
    });
    if (!res.ok) throw new Error("게시글 삭제 중 오류가 발생했습니다.");
    return res;
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
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
"[project]/app/(site)/board/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>BoardListPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$util$2f$boardApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/util/boardApi.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$util$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/util/api.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
function BoardListContent() {
    _s();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const page = parseInt(searchParams.get("page") || "0");
    const [boardData, setBoardData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [noticeData, setNoticeData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BoardListContent.useEffect": ()=>{
            // 공지와 게시글을 병렬로 호출
            Promise.all([
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$util$2f$boardApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getBoardList"])(page),
                __TURBOPACK__imported__module__$5b$project$5d2f$util$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`/api/notice/list?page=0&size=5`)
            ]).then({
                "BoardListContent.useEffect": ([boardRes, noticeRes])=>{
                    setBoardData(boardRes);
                    setNoticeData(noticeRes.data.content || []);
                }
            }["BoardListContent.useEffect"]);
        }
    }["BoardListContent.useEffect"], [
        page
    ]);
    // 🚀 통합 리스트 생성: 공지는 상단에, 일반글은 그 아래에 배치
    const unifiedList = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "BoardListContent.useMemo[unifiedList]": ()=>{
            if (!boardData) return [];
            const pinnedNotices = noticeData.filter({
                "BoardListContent.useMemo[unifiedList].pinnedNotices": (n)=>n.isPinned
            }["BoardListContent.useMemo[unifiedList].pinnedNotices"]).map({
                "BoardListContent.useMemo[unifiedList].pinnedNotices": (n)=>({
                        ...n,
                        isNotice: true
                    })
            }["BoardListContent.useMemo[unifiedList].pinnedNotices"]);
            const regularPosts = boardData.content || [];
            return [
                ...pinnedNotices,
                ...regularPosts
            ];
        }
    }["BoardListContent.useMemo[unifiedList]"], [
        boardData,
        noticeData
    ]);
    if (!boardData) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "loading-state",
        children: "로딩 중..."
    }, void 0, false, {
        fileName: "[project]/app/(site)/board/page.tsx",
        lineNumber: 42,
        columnNumber: 26
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "board-container",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "board-header",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "header-text",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "board-title",
                                children: "커뮤니티"
                            }, void 0, false, {
                                fileName: "[project]/app/(site)/board/page.tsx",
                                lineNumber: 48,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "board-subtitle",
                                children: "새로운 소식과 다양한 이야기를 만나보세요."
                            }, void 0, false, {
                                fileName: "[project]/app/(site)/board/page.tsx",
                                lineNumber: 49,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(site)/board/page.tsx",
                        lineNumber: 47,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: "/board/write",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "btn-write-main",
                            children: "글쓰기"
                        }, void 0, false, {
                            fileName: "[project]/app/(site)/board/page.tsx",
                            lineNumber: 52,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/(site)/board/page.tsx",
                        lineNumber: 51,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(site)/board/page.tsx",
                lineNumber: 46,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "board-list-wrapper",
                children: unifiedList.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: item.isNotice ? `/board/notice/${item.id}` : `/board/${item.id}`,
                        className: `list-item ${item.isNotice ? "notice-row" : ""}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `item-id-badge ${item.isNotice ? "badge-notice" : ""}`,
                                children: item.isNotice ? "NOTICE" : item.id
                            }, void 0, false, {
                                fileName: "[project]/app/(site)/board/page.tsx",
                                lineNumber: 63,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "item-content-wrap",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: `item-title-text ${item.isNotice ? "text-notice" : ""}`,
                                        children: item.title
                                    }, void 0, false, {
                                        fileName: "[project]/app/(site)/board/page.tsx",
                                        lineNumber: 68,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "item-info-row",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "item-author",
                                                children: item.isNotice ? "관리자" : item.userNickname
                                            }, void 0, false, {
                                                fileName: "[project]/app/(site)/board/page.tsx",
                                                lineNumber: 72,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "divider",
                                                children: "|"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(site)/board/page.tsx",
                                                lineNumber: 73,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "item-date",
                                                children: new Date(item.createdAt).toLocaleDateString()
                                            }, void 0, false, {
                                                fileName: "[project]/app/(site)/board/page.tsx",
                                                lineNumber: 74,
                                                columnNumber: 17
                                            }, this),
                                            !item.isNotice && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "divider",
                                                        children: "|"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(site)/board/page.tsx",
                                                        lineNumber: 77,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: [
                                                            "조회 ",
                                                            item.viewCount
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/(site)/board/page.tsx",
                                                        lineNumber: 78,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(site)/board/page.tsx",
                                        lineNumber: 71,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(site)/board/page.tsx",
                                lineNumber: 67,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "item-arrow",
                                style: {
                                    opacity: 0.3
                                },
                                children: item.isNotice ? "📌" : "→"
                            }, void 0, false, {
                                fileName: "[project]/app/(site)/board/page.tsx",
                                lineNumber: 84,
                                columnNumber: 13
                            }, this)
                        ]
                    }, item.isNotice ? `notice-${item.id}` : `post-${item.id}`, true, {
                        fileName: "[project]/app/(site)/board/page.tsx",
                        lineNumber: 58,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/app/(site)/board/page.tsx",
                lineNumber: 56,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "pagination-container",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "page-nav-btn",
                        disabled: boardData.first,
                        onClick: ()=>router.push(`/board?page=${page - 1}`),
                        children: "이전"
                    }, void 0, false, {
                        fileName: "[project]/app/(site)/board/page.tsx",
                        lineNumber: 93,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "page-numbers",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "current-page",
                                children: page + 1
                            }, void 0, false, {
                                fileName: "[project]/app/(site)/board/page.tsx",
                                lineNumber: 95,
                                columnNumber: 11
                            }, this),
                            " / ",
                            boardData.totalPages
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(site)/board/page.tsx",
                        lineNumber: 94,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "page-nav-btn",
                        disabled: boardData.last,
                        onClick: ()=>router.push(`/board?page=${page + 1}`),
                        children: "다음"
                    }, void 0, false, {
                        fileName: "[project]/app/(site)/board/page.tsx",
                        lineNumber: 97,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(site)/board/page.tsx",
                lineNumber: 92,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/(site)/board/page.tsx",
        lineNumber: 45,
        columnNumber: 5
    }, this);
}
_s(BoardListContent, "tSJh0X72p9kj04pcn3YtAE2NSyw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = BoardListContent;
function BoardListPage() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Suspense"], {
        fallback: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            children: "불러오는 중..."
        }, void 0, false, {
            fileName: "[project]/app/(site)/board/page.tsx",
            lineNumber: 105,
            columnNumber: 25
        }, void 0),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(BoardListContent, {}, void 0, false, {
            fileName: "[project]/app/(site)/board/page.tsx",
            lineNumber: 106,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/(site)/board/page.tsx",
        lineNumber: 105,
        columnNumber: 5
    }, this);
}
_c1 = BoardListPage;
var _c, _c1;
__turbopack_context__.k.register(_c, "BoardListContent");
__turbopack_context__.k.register(_c1, "BoardListPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_89e0e7ac._.js.map