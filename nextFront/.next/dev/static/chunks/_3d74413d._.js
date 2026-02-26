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
    ()=>updateReply
]);
const BASE_URL = "http://localhost:8080/api";
// 공통 헤더 (토큰 포함)
const getHeaders = (token)=>{
    const headers = {
        "Content-Type": "application/json"
    };
    if (token) headers["Authorization"] = `Bearer ${token}`;
    return headers;
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
    return res.text(); // 🚀 JSON 대신 text()로 받기
};
const updateBoard = async (token, id, data)=>{
    const res = await fetch(`${BASE_URL}/board/${id}`, {
        method: "PUT",
        headers: getHeaders(token),
        body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error("수정 실패");
    return res.text(); // 🚀
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
    if (!response.ok) {
        throw new Error("댓글 수정에 실패했습니다.");
    }
    // 🚀 서버에서 "댓글이 수정되었습니다."라는 문자열이 오므로 text()를 사용합니다.
    return response.text();
};
const getAdminUserList = async (token, page = 0)=>{
    const res = await fetch(`${BASE_URL}/admin/users?page=${page}&size=10`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
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
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    });
    if (!res.ok) {
        throw new Error("삭제 처리 중 오류가 발생했습니다.");
    }
    // 백엔드에서 String을 리턴하면 res.text(), JSON이면 res.json()
    return res;
};
const getAdminBoardList = async (token, page = 0)=>{
    const res = await fetch(`${BASE_URL}/admin/boards?page=${page}&size=10`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
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
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    });
    // 삭제 성공 여부만 확인하면 되므로 res를 그대로 반환하거나 ok 여부를 확인합니다.
    if (!res.ok) {
        throw new Error("게시글 삭제 중 오류가 발생했습니다.");
    }
    return res;
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/CommentSection.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CommentSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$util$2f$boardApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/util/boardApi.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function CommentSection({ boardId, myId }) {
    _s();
    const [replies, setReplies] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [text, setText] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    // 수정 기능을 위한 상태
    const [editingId, setEditingId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [editText, setEditText] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const IMAGE_BASE_URL = ("TURBOPACK compile-time value", "http://localhost:8080/images/");
    const load = ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$util$2f$boardApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getReplyList"])(boardId, 0).then((d)=>setReplies(d.content));
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CommentSection.useEffect": ()=>{
            load();
        }
    }["CommentSection.useEffect"], [
        boardId
    ]);
    // 댓글 등록
    const add = async ()=>{
        const token = localStorage.getItem("token");
        if (!token) return alert("로그인이 필요한 서비스입니다.");
        if (!text.trim()) return alert("내용을 입력해주세요.");
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$util$2f$boardApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createReply"])(token, boardId, text).then(()=>{
            setText("");
            load();
        });
    };
    // 댓글 삭제
    const remove = async (rid)=>{
        const token = localStorage.getItem("token");
        if (token && confirm("댓글을 삭제하시겠습니까?")) {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$util$2f$boardApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deleteReply"])(token, rid).then(()=>load());
        }
    };
    // 수정 모드 진입
    const startEdit = (reply)=>{
        setEditingId(reply.id);
        setEditText(reply.content);
    };
    // 댓글 수정 저장
    const saveEdit = async (rid)=>{
        const token = localStorage.getItem("token");
        if (!token) return;
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$util$2f$boardApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateReply"])(token, rid, editText).then(()=>{
            setEditingId(null);
            load();
        });
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "comment-section",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "comment-count-header",
                children: [
                    "댓글 ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: replies.length
                    }, void 0, false, {
                        fileName: "[project]/components/CommentSection.tsx",
                        lineNumber: 58,
                        columnNumber: 12
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/CommentSection.tsx",
                lineNumber: 57,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "comment-form",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                        className: "comment-input",
                        value: text,
                        onChange: (e)=>setText(e.target.value),
                        placeholder: "따뜻한 댓글을 남겨주세요.",
                        rows: 3
                    }, void 0, false, {
                        fileName: "[project]/components/CommentSection.tsx",
                        lineNumber: 62,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "form-actions",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: add,
                            className: "btn-submit",
                            children: "등록"
                        }, void 0, false, {
                            fileName: "[project]/components/CommentSection.tsx",
                            lineNumber: 70,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/CommentSection.tsx",
                        lineNumber: 69,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/CommentSection.tsx",
                lineNumber: 61,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "comment-list",
                children: replies.map((r)=>{
                    // 🚀 작성자 본인 확인을 위해 타입을 숫자로 통일 (중요)
                    const isAuthor = Number(myId) === Number(r.userId);
                    console.log("--- 권한 체크 로그 ---");
                    console.log("부모에게 받은 내 아이디 (myId):", myId, "타입:", typeof myId);
                    console.log("댓글 객체의 작성자 ID (r.userId):", r.userId, "타입:", typeof r.userId);
                    console.log("비교 결과:", Number(myId) === Number(r.userId));
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "comment-item",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "comment-item-header",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "comment-user-info",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                src: r.userProfileImage ? `${IMAGE_BASE_URL}${r.userProfileImage}` : "/default-profile.png",
                                                alt: "프로필",
                                                className: "comment-profile-img",
                                                onError: (e)=>{
                                                    e.currentTarget.src = "/default-profile.png";
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/components/CommentSection.tsx",
                                                lineNumber: 89,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "comment-author-meta",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "comment-author",
                                                        children: r.userNickname
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/CommentSection.tsx",
                                                        lineNumber: 96,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "comment-date",
                                                        children: new Date(r.createdAt).toLocaleDateString()
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/CommentSection.tsx",
                                                        lineNumber: 97,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/CommentSection.tsx",
                                                lineNumber: 95,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/CommentSection.tsx",
                                        lineNumber: 88,
                                        columnNumber: 17
                                    }, this),
                                    isAuthor && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "comment-actions",
                                        children: editingId === r.id ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>saveEdit(r.id),
                                                    className: "action-btn save",
                                                    children: "저장"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/CommentSection.tsx",
                                                    lineNumber: 106,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>setEditingId(null),
                                                    className: "action-btn cancel",
                                                    children: "취소"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/CommentSection.tsx",
                                                    lineNumber: 107,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>startEdit(r),
                                                    className: "action-btn edit",
                                                    children: "수정"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/CommentSection.tsx",
                                                    lineNumber: 111,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>remove(r.id),
                                                    className: "action-btn delete",
                                                    children: "삭제"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/CommentSection.tsx",
                                                    lineNumber: 112,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true)
                                    }, void 0, false, {
                                        fileName: "[project]/components/CommentSection.tsx",
                                        lineNumber: 103,
                                        columnNumber: 11
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/CommentSection.tsx",
                                lineNumber: 87,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "comment-content",
                                children: editingId === r.id ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                    className: "edit-input",
                                    value: editText,
                                    onChange: (e)=>setEditText(e.target.value),
                                    autoFocus: true
                                }, void 0, false, {
                                    fileName: "[project]/components/CommentSection.tsx",
                                    lineNumber: 121,
                                    columnNumber: 19
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: r.content
                                }, void 0, false, {
                                    fileName: "[project]/components/CommentSection.tsx",
                                    lineNumber: 128,
                                    columnNumber: 19
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/CommentSection.tsx",
                                lineNumber: 119,
                                columnNumber: 15
                            }, this)
                        ]
                    }, r.id, true, {
                        fileName: "[project]/components/CommentSection.tsx",
                        lineNumber: 86,
                        columnNumber: 13
                    }, this); // 👈 map 함수 내부에 반드시 return이 있어야 에러가 안 납니다.
                })
            }, void 0, false, {
                fileName: "[project]/components/CommentSection.tsx",
                lineNumber: 74,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/CommentSection.tsx",
        lineNumber: 56,
        columnNumber: 5
    }, this);
}
_s(CommentSection, "8x+SADYzD7D5GBl9XboH2FLrtDU=");
_c = CommentSection;
var _c;
__turbopack_context__.k.register(_c, "CommentSection");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/(site)/board/[id]/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>BoardDetailPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$util$2f$boardApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/util/boardApi.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$CommentSection$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/CommentSection.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
function BoardDetailPage({ params }) {
    _s();
    const { id } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    // 상태 관리
    const [board, setBoard] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [myId, setMyId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0); // 🚀 내 아이디 상태 (초기값 0)
    const hasAlerted = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const IMAGE_BASE_URL = ("TURBOPACK compile-time value", "http://localhost:8080/images/");
    // 1. 초기 로드 시 내 정보(ID) 및 게시글 데이터 가져오기
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BoardDetailPage.useEffect": ()=>{
            const token = localStorage.getItem("token");
            const savedId = localStorage.getItem("userId");
            // 로그인 체크
            if (!token) {
                if (!hasAlerted.current) {
                    hasAlerted.current = true;
                    alert("로그인이 필요한 페이지입니다.");
                    router.replace("/authLogin");
                }
                return;
            }
            // 내 ID 설정 (localStorage에서 가져와 숫자로 변환)
            if (savedId) {
                setMyId(Number(savedId));
            }
            // 게시글 상세 정보 불러오기
            if (id) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$util$2f$boardApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getBoardDetail"])(id).then({
                    "BoardDetailPage.useEffect": (data)=>{
                        setBoard(data);
                        setIsLoading(false);
                    }
                }["BoardDetailPage.useEffect"]).catch({
                    "BoardDetailPage.useEffect": (err)=>{
                        console.error("데이터 로딩 실패:", err);
                        setIsLoading(false);
                    }
                }["BoardDetailPage.useEffect"]);
            }
        }
    }["BoardDetailPage.useEffect"], [
        id,
        router
    ]);
    // 게시글 삭제 핸들러
    const handleDelete = async ()=>{
        if (confirm("정말 삭제하시겠습니까?")) {
            const token = localStorage.getItem("token");
            if (token && id) {
                try {
                    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$util$2f$boardApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deleteBoard"])(token, id);
                    router.push("/board");
                } catch (error) {
                    alert("삭제에 실패했습니다.");
                }
            }
        }
    };
    // 로딩 처리
    if (isLoading || !board) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "board-container",
            children: "로딩중..."
        }, void 0, false, {
            fileName: "[project]/app/(site)/board/[id]/page.tsx",
            lineNumber: 72,
            columnNumber: 12
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "board-container",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "board-header",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "board-title",
                        children: board.title
                    }, void 0, false, {
                        fileName: "[project]/app/(site)/board/[id]/page.tsx",
                        lineNumber: 79,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "detail-meta",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "detail-user",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                        src: board.userProfileImage ? `${IMAGE_BASE_URL}${board.userProfileImage}` : "/default-profile.png",
                                        className: "detail-profile",
                                        alt: "프로필",
                                        onError: (e)=>{
                                            e.currentTarget.src = "/default-profile.png";
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/app/(site)/board/[id]/page.tsx",
                                        lineNumber: 83,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "detail-user-info",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "detail-nickname",
                                                children: board.userNickname
                                            }, void 0, false, {
                                                fileName: "[project]/app/(site)/board/[id]/page.tsx",
                                                lineNumber: 90,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "detail-sub-info",
                                                children: [
                                                    new Date(board.createdAt).toLocaleDateString(),
                                                    " · 조회 ",
                                                    board.viewCount
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(site)/board/[id]/page.tsx",
                                                lineNumber: 91,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(site)/board/[id]/page.tsx",
                                        lineNumber: 89,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(site)/board/[id]/page.tsx",
                                lineNumber: 82,
                                columnNumber: 11
                            }, this),
                            myId === Number(board.userId) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "detail-actions",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>router.push(`/board/update/${id}`),
                                        className: "btn btn-secondary",
                                        children: "수정"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(site)/board/[id]/page.tsx",
                                        lineNumber: 100,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handleDelete,
                                        className: "btn btn-danger",
                                        children: "삭제"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(site)/board/[id]/page.tsx",
                                        lineNumber: 101,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(site)/board/[id]/page.tsx",
                                lineNumber: 99,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(site)/board/[id]/page.tsx",
                        lineNumber: 81,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(site)/board/[id]/page.tsx",
                lineNumber: 78,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "detail-content",
                dangerouslySetInnerHTML: {
                    __html: board.content
                }
            }, void 0, false, {
                fileName: "[project]/app/(site)/board/[id]/page.tsx",
                lineNumber: 108,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("hr", {
                className: "divider"
            }, void 0, false, {
                fileName: "[project]/app/(site)/board/[id]/page.tsx",
                lineNumber: 110,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$CommentSection$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                boardId: id,
                myId: myId
            }, void 0, false, {
                fileName: "[project]/app/(site)/board/[id]/page.tsx",
                lineNumber: 113,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/(site)/board/[id]/page.tsx",
        lineNumber: 76,
        columnNumber: 5
    }, this);
}
_s(BoardDetailPage, "Tp9GbHc4iJ9YTVA84gO1nP7MYWs=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = BoardDetailPage;
var _c;
__turbopack_context__.k.register(_c, "BoardDetailPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_3d74413d._.js.map