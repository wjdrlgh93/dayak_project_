(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/map/KakaoMap.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>KakaoMap
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$script$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/script.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
// 🚀 1. 환경 변수 확인 (이름이 일치해야 합니다) [cite: 2026-02-19]
const KAKAO_KEY = ("TURBOPACK compile-time value", "454ebd09b90c527f1da4544bf2ea90d7");
function KakaoMap({ pharmacyList, centerPos }) {
    _s();
    const mapContainer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [mapInstance, setMapInstance] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const markersRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    // 🚀 2. 지도 초기화 (GPS 실패 시 서울시청으로 폴백) [cite: 2026-02-19]
    const initMap = ()=>{
        if (!window.kakao || !window.kakao.maps || mapInstance) return;
        window.kakao.maps.load(()=>{
            const options = {
                center: new window.kakao.maps.LatLng(centerPos?.lat || 37.5665, centerPos?.lng || 126.9780),
                level: 5
            };
            const map = new window.kakao.maps.Map(mapContainer.current, options);
            setMapInstance(map);
        });
    };
    // 🚀 3. 지역 변경 시 지도 중심 이동 [cite: 2026-02-19]
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "KakaoMap.useEffect": ()=>{
            if (mapInstance && centerPos) {
                const moveLatLon = new window.kakao.maps.LatLng(centerPos.lat, centerPos.lng);
                mapInstance.panTo(moveLatLon);
            }
        }
    }["KakaoMap.useEffect"], [
        centerPos,
        mapInstance
    ]);
    // 🚀 4. DB에서 받은 약국 리스트를 마커로 표시 [cite: 2026-02-16, 2026-02-19]
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "KakaoMap.useEffect": ()=>{
            if (!mapInstance || !pharmacyList) return;
            // 기존 마커 제거
            markersRef.current.forEach({
                "KakaoMap.useEffect": (m)=>m.setMap(null)
            }["KakaoMap.useEffect"]);
            markersRef.current = [];
            pharmacyList.forEach({
                "KakaoMap.useEffect": (pharmacy)=>{
                    const marker = new window.kakao.maps.Marker({
                        position: new window.kakao.maps.LatLng(pharmacy.wgs84lat, pharmacy.wgs84lon),
                        map: mapInstance,
                        title: pharmacy.dutyName
                    });
                    markersRef.current.push(marker);
                }
            }["KakaoMap.useEffect"]);
        }
    }["KakaoMap.useEffect"], [
        pharmacyList,
        mapInstance
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            width: '100%',
            height: '500px',
            position: 'relative'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$script$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                src: `//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_KEY}&autoload=false&libraries=services`,
                onLoad: initMap,
                strategy: "afterInteractive"
            }, void 0, false, {
                fileName: "[project]/components/map/KakaoMap.tsx",
                lineNumber: 69,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: mapContainer,
                style: {
                    width: '100%',
                    height: '100%'
                }
            }, void 0, false, {
                fileName: "[project]/components/map/KakaoMap.tsx",
                lineNumber: 74,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/map/KakaoMap.tsx",
        lineNumber: 68,
        columnNumber: 5
    }, this);
}
_s(KakaoMap, "NwmYRUFQNzVow2/+unnwOxZRY5g=");
_c = KakaoMap;
var _c;
__turbopack_context__.k.register(_c, "KakaoMap");
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
"[project]/app/(site)/store/location/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PharmacyPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$map$2f$KakaoMap$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/map/KakaoMap.tsx [app-client] (ecmascript)"); // 위에서 만든 지도 컴포넌트 [cite: 2026-02-19]
var __TURBOPACK__imported__module__$5b$project$5d2f$util$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/util/api.ts [app-client] (ecmascript)"); // axios 설정 파일 [cite: 2026-02-18]
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
// 1. 시/도 및 시/군/구 데이터 (예시입니다. 더 추가 가능합니다) [cite: 2026-02-04]
const REGION_DATA = {
    "서울특별시": [
        "강남구",
        "강동구",
        "강북구",
        "강서구",
        "관악구",
        "마포구",
        "서초구",
        "서대문구"
    ],
    "경기도": [
        "수원시",
        "성남시",
        "의정부시",
        "안양시",
        "부천시",
        "광명시"
    ],
    "경상남도": [
        "진주시",
        "창원시",
        "김해시",
        "양산시"
    ]
};
// 2. 지역별 중심 좌표 (지도를 해당 지역으로 이동시키기 위함) [cite: 2026-02-19]
const REGION_COORDS = {
    "서울특별시": {
        lat: 37.5665,
        lng: 126.9780
    },
    "마포구": {
        lat: 37.5637,
        lng: 126.9084
    },
    "강남구": {
        lat: 37.4979,
        lng: 127.0276
    },
    "진주시": {
        lat: 35.1795,
        lng: 128.1076
    }
};
function PharmacyPage() {
    _s();
    const [city, setCity] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [district, setDistrict] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [pharmacyList, setPharmacyList] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [centerPos, setCenterPos] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        lat: 37.5665,
        lng: 126.9780
    });
    // 🚀 지역 선택 시 약국 데이터 가져오기 [cite: 2026-02-16, 2026-02-18]
    const fetchPharmacies = async (selectedCity, selectedDistrict)=>{
        if (!selectedCity || !selectedDistrict) return;
        try {
            // 백엔드의 findByRegion API 호출 [cite: 2026-02-16, 2026-02-18]
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$util$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`/api/pharmacies/region`, {
                params: {
                    city: selectedCity,
                    district: selectedDistrict
                }
            });
            setPharmacyList(response.data);
            // 해당 지역의 중심 좌표로 지도 이동 설정 (좌표 데이터가 있다면) [cite: 2026-02-19]
            if (REGION_COORDS[selectedDistrict]) {
                setCenterPos(REGION_COORDS[selectedDistrict]);
            } else if (REGION_COORDS[selectedCity]) {
                setCenterPos(REGION_COORDS[selectedCity]);
            }
        } catch (error) {
            console.error("약국 정보를 가져오는데 실패했습니다.", error);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            padding: '20px'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                children: "전국 약국 찾기 (지역별 검색)"
            }, void 0, false, {
                fileName: "[project]/app/(site)/store/location/page.tsx",
                lineNumber: 52,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    marginBottom: '20px',
                    display: 'flex',
                    gap: '10px'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                        value: city,
                        onChange: (e)=>{
                            setCity(e.target.value);
                            setDistrict("");
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "",
                                children: "시/도 선택"
                            }, void 0, false, {
                                fileName: "[project]/app/(site)/store/location/page.tsx",
                                lineNumber: 57,
                                columnNumber: 11
                            }, this),
                            Object.keys(REGION_DATA).map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: c,
                                    children: c
                                }, c, false, {
                                    fileName: "[project]/app/(site)/store/location/page.tsx",
                                    lineNumber: 58,
                                    columnNumber: 46
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(site)/store/location/page.tsx",
                        lineNumber: 56,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                        value: district,
                        onChange: (e)=>{
                            setDistrict(e.target.value);
                            fetchPharmacies(city, e.target.value); // 구를 선택하면 바로 검색 [cite: 2026-02-18, 2026-02-19]
                        },
                        disabled: !city,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "",
                                children: "시/군/구 선택"
                            }, void 0, false, {
                                fileName: "[project]/app/(site)/store/location/page.tsx",
                                lineNumber: 69,
                                columnNumber: 11
                            }, this),
                            city && REGION_DATA[city].map((d)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: d,
                                    children: d
                                }, d, false, {
                                    fileName: "[project]/app/(site)/store/location/page.tsx",
                                    lineNumber: 70,
                                    columnNumber: 47
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(site)/store/location/page.tsx",
                        lineNumber: 61,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(site)/store/location/page.tsx",
                lineNumber: 55,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    width: '100%',
                    height: '600px',
                    border: '1px solid #ccc'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$map$2f$KakaoMap$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    pharmacyList: pharmacyList,
                    centerPos: centerPos
                }, void 0, false, {
                    fileName: "[project]/app/(site)/store/location/page.tsx",
                    lineNumber: 76,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/(site)/store/location/page.tsx",
                lineNumber: 75,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/(site)/store/location/page.tsx",
        lineNumber: 51,
        columnNumber: 5
    }, this);
}
_s(PharmacyPage, "pX1R6mJcJy+DWcgSm7JsWuPMRTY=");
_c = PharmacyPage;
var _c;
__turbopack_context__.k.register(_c, "PharmacyPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_25985898._.js.map