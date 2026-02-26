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
"[project]/components/map/KakaoMap.tsx [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

const e = new Error("Could not parse module '[project]/components/map/KakaoMap.tsx'\n\nExpected ';', '}' or <eof>");
e.code = 'MODULE_UNPARSABLE';
throw e;
}),
"[project]/app/(site)/store/location/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PharmacyPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$map$2f$KakaoMap$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/map/KakaoMap.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function PharmacyPage() {
    _s();
    const [pharmacies, setPharmacies] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [page, setPage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [totalPages, setTotalPages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [totalElements, setTotalElements] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [userLocation, setUserLocation] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isLocationChecked, setIsLocationChecked] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // 1. 내 위치 파악
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PharmacyPage.useEffect": ()=>{
            if (!navigator.geolocation) {
                setIsLocationChecked(true);
                return;
            }
            navigator.geolocation.getCurrentPosition({
                "PharmacyPage.useEffect": (pos)=>{
                    setUserLocation({
                        lat: pos.coords.latitude,
                        lon: pos.coords.longitude
                    });
                    setIsLocationChecked(true);
                }
            }["PharmacyPage.useEffect"], {
                "PharmacyPage.useEffect": (err)=>{
                    console.warn("위치 파악 실패:", err);
                    setIsLocationChecked(true);
                }
            }["PharmacyPage.useEffect"]);
        }
    }["PharmacyPage.useEffect"], []);
    // 2. DB 조회 함수
    const fetchPharmacies = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "PharmacyPage.useCallback[fetchPharmacies]": async (pageNum, location)=>{
            try {
                setIsLoading(true);
                const url = new URL("api/pharmacy/list");
                url.searchParams.append("page", pageNum.toString());
                url.searchParams.append("size", "20");
                if (location) {
                    url.searchParams.append("lat", location.lat.toString());
                    url.searchParams.append("lon", location.lon.toString());
                }
                const response = await fetch(url.toString());
                if (!response.ok) throw new Error("서버 응답 에러");
                const data = await response.json();
                setPharmacies(data.content);
                setTotalPages(data.totalPages);
                setTotalElements(data.totalElements);
            } catch (error) {
                console.error("로딩 실패:", error);
            } finally{
                setIsLoading(false);
            }
        }
    }["PharmacyPage.useCallback[fetchPharmacies]"], []);
    // 초기 로딩 (위치 파악 후)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PharmacyPage.useEffect": ()=>{
            if (isLocationChecked) {
                fetchPharmacies(page, userLocation);
            }
        }
    }["PharmacyPage.useEffect"], [
        page,
        isLocationChecked,
        userLocation,
        fetchPharmacies
    ]);
    // 3. 🚀 [추가] 지도가 데이터를 저장했다고 알리면 실행되는 함수
    // 🚀 수정: 데이터 저장 시 전달받은 새 좌표로 목록을 갱신함
    const handleDataSaved = (newLat, newLon)=>{
        console.log("새 지역 데이터 저장 완료. 목록을 갱신합니다.");
        // 1. 현재 검색 위치 상태 업데이트 (리스트가 이 좌표를 기준으로 불러와짐)
        setUserLocation({
            lat: newLat,
            lon: newLon
        });
        // 2. 페이지를 0으로 초기화하고 새 데이터를 불러옴
        setPage(0);
        fetchPharmacies(0, {
            lat: newLat,
            lon: newLon
        });
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "pharmacy-container",
        style: {
            maxWidth: '1200px',
            margin: '0 auto',
            backgroundColor: 'var(--ph-bg)',
            minHeight: '100vh',
            fontFamily: 'Pretendard, -apple-system, sans-serif'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "pharmacy-header",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "pharmacy-title",
                        children: "전국 약국 지도 🏥"
                    }, void 0, false, {
                        fileName: "[project]/app/(site)/store/location/page.tsx",
                        lineNumber: 106,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "pharmacy-desc",
                        children: [
                            "우리 DB에서 관리하는 ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: totalElements.toLocaleString()
                            }, void 0, false, {
                                fileName: "[project]/app/(site)/store/location/page.tsx",
                                lineNumber: 108,
                                columnNumber: 24
                            }, this),
                            "개의 약국 정보를 확인하세요."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(site)/store/location/page.tsx",
                        lineNumber: 107,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(site)/store/location/page.tsx",
                lineNumber: 105,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "map-section",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$map$2f$KakaoMap$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    // DB 데이터를 지도에 전달 (마커 표시)
                    pharmacies: pharmacies.map((p)=>({
                            id: p.hpid,
                            place_name: p.dutyName,
                            x: p.wgs84Lon,
                            y: p.wgs84Lat
                        })),
                    // 👇 이 콜백 함수를 전달해서 지도가 저장 완료하면 목록을 갱신하게 함
                    onDataSaved: handleDataSaved
                }, void 0, false, {
                    fileName: "[project]/app/(site)/store/location/page.tsx",
                    lineNumber: 113,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/(site)/store/location/page.tsx",
                lineNumber: 112,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "pharmacy-list-section",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "list-header",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                children: [
                                    "검색 결과 ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "count",
                                        children: pharmacies.length
                                    }, void 0, false, {
                                        fileName: "[project]/app/(site)/store/location/page.tsx",
                                        lineNumber: 130,
                                        columnNumber: 22
                                    }, this),
                                    "건"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(site)/store/location/page.tsx",
                                lineNumber: 130,
                                columnNumber: 12
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "page-info",
                                children: [
                                    "(",
                                    page + 1,
                                    " / ",
                                    totalPages,
                                    " 페이지)"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(site)/store/location/page.tsx",
                                lineNumber: 131,
                                columnNumber: 12
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(site)/store/location/page.tsx",
                        lineNumber: 129,
                        columnNumber: 10
                    }, this),
                    isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "loading-msg",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "spinner"
                            }, void 0, false, {
                                fileName: "[project]/app/(site)/store/location/page.tsx",
                                lineNumber: 135,
                                columnNumber: 41
                            }, this),
                            "데이터 로드 중..."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(site)/store/location/page.tsx",
                        lineNumber: 135,
                        columnNumber: 12
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "pharmacy-grid",
                                children: pharmacies.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "pharmacy-card",
                                        onClick: ()=>window.open(`https://map.kakao.com/link/to/${item.dutyName},${item.wgs84Lat},${item.wgs84Lon}`),
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "card-body",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                    className: "place-name",
                                                    children: item.dutyName
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(site)/store/location/page.tsx",
                                                    lineNumber: 142,
                                                    columnNumber: 22
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "info-row",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "label",
                                                            children: "주소"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(site)/store/location/page.tsx",
                                                            lineNumber: 143,
                                                            columnNumber: 48
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "value",
                                                            children: item.dutyAddr
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(site)/store/location/page.tsx",
                                                            lineNumber: 143,
                                                            columnNumber: 81
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/(site)/store/location/page.tsx",
                                                    lineNumber: 143,
                                                    columnNumber: 22
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "info-row",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "label",
                                                            children: "전화"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(site)/store/location/page.tsx",
                                                            lineNumber: 144,
                                                            columnNumber: 48
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "value",
                                                            children: item.dutyTel1 || "번호 없음"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(site)/store/location/page.tsx",
                                                            lineNumber: 144,
                                                            columnNumber: 81
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/(site)/store/location/page.tsx",
                                                    lineNumber: 144,
                                                    columnNumber: 22
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(site)/store/location/page.tsx",
                                            lineNumber: 141,
                                            columnNumber: 20
                                        }, this)
                                    }, item.hpid, false, {
                                        fileName: "[project]/app/(site)/store/location/page.tsx",
                                        lineNumber: 140,
                                        columnNumber: 18
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/(site)/store/location/page.tsx",
                                lineNumber: 138,
                                columnNumber: 14
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "pagination",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "page-btn",
                                        onClick: ()=>setPage((p)=>Math.max(0, p - 1)),
                                        disabled: page === 0,
                                        children: "이전"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(site)/store/location/page.tsx",
                                        lineNumber: 150,
                                        columnNumber: 16
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "page-numbers",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                children: page + 1
                                            }, void 0, false, {
                                                fileName: "[project]/app/(site)/store/location/page.tsx",
                                                lineNumber: 151,
                                                columnNumber: 46
                                            }, this),
                                            " / ",
                                            totalPages
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(site)/store/location/page.tsx",
                                        lineNumber: 151,
                                        columnNumber: 16
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "page-btn",
                                        onClick: ()=>setPage((p)=>Math.min(totalPages - 1, p + 1)),
                                        disabled: page >= totalPages - 1,
                                        children: "다음"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(site)/store/location/page.tsx",
                                        lineNumber: 152,
                                        columnNumber: 16
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(site)/store/location/page.tsx",
                                lineNumber: 149,
                                columnNumber: 14
                            }, this)
                        ]
                    }, void 0, true)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(site)/store/location/page.tsx",
                lineNumber: 126,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/(site)/store/location/page.tsx",
        lineNumber: 98,
        columnNumber: 5
    }, this);
}
_s(PharmacyPage, "HlFQmkUed8LionF6axOBMmPbeUU=");
_c = PharmacyPage;
var _c;
__turbopack_context__.k.register(_c, "PharmacyPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_8636b29e._.js.map