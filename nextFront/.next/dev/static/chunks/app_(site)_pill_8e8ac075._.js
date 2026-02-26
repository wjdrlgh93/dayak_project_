(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/(site)/pill/pill.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "category": "pill-module__jhZu0q__category",
  "chart": "pill-module__jhZu0q__chart",
  "container": "pill-module__jhZu0q__container",
  "efficacyBox": "pill-module__jhZu0q__efficacyBox",
  "hr": "pill-module__jhZu0q__hr",
  "inputGroup": "pill-module__jhZu0q__inputGroup",
  "pillCard": "pill-module__jhZu0q__pillCard",
  "pillGrid": "pill-module__jhZu0q__pillGrid",
  "pillImg": "pill-module__jhZu0q__pillImg",
  "pillInfo": "pill-module__jhZu0q__pillInfo",
  "searchBtn": "pill-module__jhZu0q__searchBtn",
  "searchFilter": "pill-module__jhZu0q__searchFilter",
  "statusMsg": "pill-module__jhZu0q__statusMsg",
  "subTitle": "pill-module__jhZu0q__subTitle",
  "title": "pill-module__jhZu0q__title",
});
}),
"[project]/app/(site)/pill/constants/pillFilters [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

}),
"[project]/app/(site)/pill/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PillSearchPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$site$292f$pill$2f$pill$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/app/(site)/pill/pill.module.css [app-client] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$site$292f$pill$2f$constants$2f$pillFilters__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/(site)/pill/constants/pillFilters [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function PillSearchPage() {
    _s();
    const [printFront, setPrintFront] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [drugShape, setDrugShape] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [colorClass1, setColorClass1] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [results, setResults] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [hasSearched, setHasSearched] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const handleSearch = async ()=>{
        if (!printFront && !drugShape && !colorClass1) {
            alert("최소 한 가지 이상의 검색 조건을 선택해주세요!");
            return;
        }
        setLoading(true);
        setHasSearched(true);
        setResults([]); // 이전 검색 결과 초기화
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`http://localhost:8080/api/pill/search`, {
                params: {
                    printFront,
                    drugShape,
                    colorClass1
                }
            });
            if (Array.isArray(response.data)) {
                setResults(response.data);
            }
        } catch (error) {
            console.error("알약 식별 검색 실패:", error);
            alert("검색 중 오류가 발생했습니다. 백엔드 서버 상태를 확인해주세요.");
        } finally{
            setLoading(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$site$292f$pill$2f$pill$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].container,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$site$292f$pill$2f$pill$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].header,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$site$292f$pill$2f$pill$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].title,
                        children: "🔍 알약 식별 검색"
                    }, void 0, false, {
                        fileName: "[project]/app/(site)/pill/page.tsx",
                        lineNumber: 58,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$site$292f$pill$2f$pill$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].subTitle,
                        children: "알약의 겉모습(문자, 모양, 색상)으로 효능까지 한 번에 찾으세요."
                    }, void 0, false, {
                        fileName: "[project]/app/(site)/pill/page.tsx",
                        lineNumber: 59,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(site)/pill/page.tsx",
                lineNumber: 57,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$site$292f$pill$2f$pill$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].searchFilter,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$site$292f$pill$2f$pill$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].inputGroup,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                children: "식별문자"
                            }, void 0, false, {
                                fileName: "[project]/app/(site)/pill/page.tsx",
                                lineNumber: 64,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "text",
                                placeholder: "예: TY, 500",
                                value: printFront,
                                onChange: (e)=>setPrintFront(e.target.value)
                            }, void 0, false, {
                                fileName: "[project]/app/(site)/pill/page.tsx",
                                lineNumber: 65,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(site)/pill/page.tsx",
                        lineNumber: 63,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$site$292f$pill$2f$pill$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].inputGroup,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                children: "모양"
                            }, void 0, false, {
                                fileName: "[project]/app/(site)/pill/page.tsx",
                                lineNumber: 74,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                value: drugShape,
                                onChange: (e)=>setDrugShape(e.target.value),
                                children: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$site$292f$pill$2f$constants$2f$pillFilters__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DRUG_SHAPES"].map((shape)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: shape.value,
                                        children: shape.label
                                    }, shape.value, false, {
                                        fileName: "[project]/app/(site)/pill/page.tsx",
                                        lineNumber: 77,
                                        columnNumber: 29
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/(site)/pill/page.tsx",
                                lineNumber: 75,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(site)/pill/page.tsx",
                        lineNumber: 73,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$site$292f$pill$2f$pill$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].inputGroup,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                children: "색상"
                            }, void 0, false, {
                                fileName: "[project]/app/(site)/pill/page.tsx",
                                lineNumber: 83,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                value: colorClass1,
                                onChange: (e)=>setColorClass1(e.target.value),
                                children: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$site$292f$pill$2f$constants$2f$pillFilters__$5b$app$2d$client$5d$__$28$ecmascript$29$__["COLOR_CLASSES"].map((color)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: color.value,
                                        children: color.label
                                    }, color.value, false, {
                                        fileName: "[project]/app/(site)/pill/page.tsx",
                                        lineNumber: 86,
                                        columnNumber: 29
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/(site)/pill/page.tsx",
                                lineNumber: 84,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(site)/pill/page.tsx",
                        lineNumber: 82,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleSearch,
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$site$292f$pill$2f$pill$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].searchBtn,
                        children: "검색하기"
                    }, void 0, false, {
                        fileName: "[project]/app/(site)/pill/page.tsx",
                        lineNumber: 91,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(site)/pill/page.tsx",
                lineNumber: 62,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("hr", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$site$292f$pill$2f$pill$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].hr
            }, void 0, false, {
                fileName: "[project]/app/(site)/pill/page.tsx",
                lineNumber: 94,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$site$292f$pill$2f$pill$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].resultContainer,
                children: loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$site$292f$pill$2f$pill$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].loadingWrapper,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$site$292f$pill$2f$pill$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].statusMsg,
                        children: "알약을 식별하고 효능을 분석 중입니다... 🧪"
                    }, void 0, false, {
                        fileName: "[project]/app/(site)/pill/page.tsx",
                        lineNumber: 99,
                        columnNumber: 25
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/(site)/pill/page.tsx",
                    lineNumber: 98,
                    columnNumber: 21
                }, this) : results.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$site$292f$pill$2f$pill$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].pillGrid,
                    children: results.map((pill)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$site$292f$pill$2f$pill$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].pillCard,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$site$292f$pill$2f$pill$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].pillImg,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                        src: pill.itemImage || "/img/no_drug_img.png",
                                        alt: pill.itemName,
                                        onError: (e)=>e.currentTarget.src = "/img/no_drug_img.png"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(site)/pill/page.tsx",
                                        lineNumber: 106,
                                        columnNumber: 37
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/(site)/pill/page.tsx",
                                    lineNumber: 105,
                                    columnNumber: 33
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$site$292f$pill$2f$pill$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].pillInfo,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$site$292f$pill$2f$pill$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].entpName,
                                            children: pill.entpName
                                        }, void 0, false, {
                                            fileName: "[project]/app/(site)/pill/page.tsx",
                                            lineNumber: 113,
                                            columnNumber: 37
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$site$292f$pill$2f$pill$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].drugName,
                                            children: pill.itemName
                                        }, void 0, false, {
                                            fileName: "[project]/app/(site)/pill/page.tsx",
                                            lineNumber: 114,
                                            columnNumber: 37
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$site$292f$pill$2f$pill$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].metaInfo,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: pill.drugShape
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(site)/pill/page.tsx",
                                                    lineNumber: 117,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$site$292f$pill$2f$pill$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].divider,
                                                    children: "|"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(site)/pill/page.tsx",
                                                    lineNumber: 118,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: pill.colorClass1
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(site)/pill/page.tsx",
                                                    lineNumber: 119,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$site$292f$pill$2f$pill$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].divider,
                                                    children: "|"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(site)/pill/page.tsx",
                                                    lineNumber: 120,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: pill.printFront || '식별문자 없음'
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(site)/pill/page.tsx",
                                                    lineNumber: 121,
                                                    columnNumber: 41
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(site)/pill/page.tsx",
                                            lineNumber: 116,
                                            columnNumber: 37
                                        }, this),
                                        pill.efficacy && pill.efficacy !== "정보 없음" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$site$292f$pill$2f$pill$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].efficacyBox,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                    children: "💡 효능/효과 (네이버 지식백과 기반)"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(site)/pill/page.tsx",
                                                    lineNumber: 126,
                                                    columnNumber: 45
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    children: pill.efficacy
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(site)/pill/page.tsx",
                                                    lineNumber: 127,
                                                    columnNumber: 45
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(site)/pill/page.tsx",
                                            lineNumber: 125,
                                            columnNumber: 41
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                            href: `https://terms.naver.com/search.naver?query=${pill.itemName}`,
                                            target: "_blank",
                                            rel: "noopener noreferrer",
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$site$292f$pill$2f$pill$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].naverBtn,
                                            children: "✨ 효능 확인하기 (네이버)"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(site)/pill/page.tsx",
                                            lineNumber: 130,
                                            columnNumber: 41
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$site$292f$pill$2f$pill$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].chartDesc,
                                            children: pill.chart
                                        }, void 0, false, {
                                            fileName: "[project]/app/(site)/pill/page.tsx",
                                            lineNumber: 139,
                                            columnNumber: 37
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(site)/pill/page.tsx",
                                    lineNumber: 112,
                                    columnNumber: 33
                                }, this)
                            ]
                        }, pill.itemSeq, true, {
                            fileName: "[project]/app/(site)/pill/page.tsx",
                            lineNumber: 104,
                            columnNumber: 29
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/app/(site)/pill/page.tsx",
                    lineNumber: 102,
                    columnNumber: 21
                }, this) : hasSearched && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$site$292f$pill$2f$pill$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].statusMsg,
                    children: "검색 결과가 없습니다. 조건을 변경해 보세요."
                }, void 0, false, {
                    fileName: "[project]/app/(site)/pill/page.tsx",
                    lineNumber: 145,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/(site)/pill/page.tsx",
                lineNumber: 96,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/(site)/pill/page.tsx",
        lineNumber: 56,
        columnNumber: 9
    }, this);
}
_s(PillSearchPage, "8y0EpgxZJBu7fcb+0E6wCdzyZbg=");
_c = PillSearchPage;
var _c;
__turbopack_context__.k.register(_c, "PillSearchPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=app_%28site%29_pill_8e8ac075._.js.map