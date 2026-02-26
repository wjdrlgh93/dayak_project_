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
;
var _s = __turbopack_context__.k.signature();
"use client";
;
const KAKAO_KEY = ("TURBOPACK compile-time value", "454ebd09b90c527f1da4544bf2ea90d7");
function KakaoMap({ pharmacies, onDataSaved }) {
    _s();
    const mapContainer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [mapInstance, setMapInstance] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [showSearchBtn, setShowSearchBtn] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const markersRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    const infoWindowRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const isSearchStarted = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "KakaoMap.useEffect": ()=>{
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            const script = document.createElement("script");
            script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_KEY}&autoload=false&libraries=services`;
            script.async = true;
            document.head.appendChild(script);
            script.onload = ({
                "KakaoMap.useEffect": ()=>{
                    window.kakao.maps.load({
                        "KakaoMap.useEffect": ()=>{
                            if (!mapContainer.current) return;
                            const options = {
                                center: new window.kakao.maps.LatLng(37.566826, 126.9786567),
                                level: 4
                            };
                            const map = new window.kakao.maps.Map(mapContainer.current, options);
                            infoWindowRef.current = new window.kakao.maps.InfoWindow({
                                zIndex: 1
                            });
                            setMapInstance(map);
                            // 🚀 지도를 움직이면 "현 위치에서 재검색" 버튼 표시
                            window.kakao.maps.event.addListener(map, 'dragend', {
                                "KakaoMap.useEffect": ()=>setShowSearchBtn(true)
                            }["KakaoMap.useEffect"]);
                        }
                    }["KakaoMap.useEffect"]);
                }
            })["KakaoMap.useEffect"];
        }
    }["KakaoMap.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "KakaoMap.useEffect": ()=>{
            if (!mapInstance || isSearchStarted.current) return;
            if (navigator.geolocation) {
                isSearchStarted.current = true;
                navigator.geolocation.getCurrentPosition({
                    "KakaoMap.useEffect": (pos)=>{
                        const lat = pos.coords.latitude;
                        const lon = pos.coords.longitude;
                        const locPosition = new window.kakao.maps.LatLng(lat, lon);
                        mapInstance.setCenter(locPosition);
                        searchAndSavePharmacies(mapInstance, locPosition);
                    }
                }["KakaoMap.useEffect"]);
            }
        }
    }["KakaoMap.useEffect"], [
        mapInstance
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "KakaoMap.useEffect": ()=>{
            if (!mapInstance || !pharmacies) return;
            removeMarkers();
            pharmacies.forEach({
                "KakaoMap.useEffect": (place)=>{
                    const marker = new window.kakao.maps.Marker({
                        position: new window.kakao.maps.LatLng(place.y, place.x),
                        map: mapInstance
                    });
                    markersRef.current.push(marker);
                    window.kakao.maps.event.addListener(marker, 'click', {
                        "KakaoMap.useEffect": ()=>{
                            const content = `<div style="padding:10px; font-size:12px;"><strong>${place.place_name}</strong><br/><a href="https://map.kakao.com/link/to/${place.place_name},${place.x},${place.y}" style="color:blue">상세보기</a></div>`;
                            infoWindowRef.current.setContent(content);
                            infoWindowRef.current.open(mapInstance, marker);
                        }
                    }["KakaoMap.useEffect"]);
                }
            }["KakaoMap.useEffect"]);
        }
    }["KakaoMap.useEffect"], [
        pharmacies,
        mapInstance
    ]);
    // 🚀 버튼 클릭 시 실행될 재검색 함수
    const handleReSearch = ()=>{
        if (!mapInstance) return;
        const center = mapInstance.getCenter();
        searchAndSavePharmacies(mapInstance, center);
        setShowSearchBtn(false); // 버튼 숨기기
    };
    const searchAndSavePharmacies = (map, locPosition)=>{
        const ps = new window.kakao.maps.services.Places();
        ps.categorySearch('PM9', async (data, status)=>{
            if (status === window.kakao.maps.services.Status.OK) {
                try {
                    const response = await fetch('http://localhost:8080/api/pharmacy/save-kakao-data', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(data)
                    });
                    if (response.ok && onDataSaved) {
                        // 🚀 부모에게 현재 지도의 중심 좌표를 넘겨줌
                        onDataSaved(locPosition.getLat(), locPosition.getLng());
                    }
                } catch (error) {
                    console.error("서버 통신 오류:", error);
                }
            }
        }, {
            location: locPosition,
            radius: 2000
        });
    };
    const removeMarkers = ()=>{
        markersRef.current.forEach((m)=>m.setMap(null));
        markersRef.current = [];
        if (infoWindowRef.current) infoWindowRef.current.close();
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            position: 'relative',
            width: '100%',
            height: '100%'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: mapContainer,
                style: {
                    width: '100%',
                    height: '100%',
                    backgroundColor: '#eee'
                }
            }, void 0, false, {
                fileName: "[project]/components/map/KakaoMap.tsx",
                lineNumber: 124,
                columnNumber: 7
            }, this),
            showSearchBtn && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: handleReSearch,
                style: {
                    position: 'absolute',
                    bottom: '20px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 10,
                    padding: '10px 20px',
                    backgroundColor: '#3b82f6',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                },
                children: "🔄 이 지역에서 재검색"
            }, void 0, false, {
                fileName: "[project]/components/map/KakaoMap.tsx",
                lineNumber: 127,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/map/KakaoMap.tsx",
        lineNumber: 123,
        columnNumber: 5
    }, this);
}
_s(KakaoMap, "kowf0xmGcylc+inboFWuHEH8owo=");
_c = KakaoMap;
var _c;
__turbopack_context__.k.register(_c, "KakaoMap");
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
                const url = new URL("http://localhost:8080/api/pharmacy/list");
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
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "pharmacy-header",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "pharmacy-title",
                        children: "전국 약국 지도 🏥"
                    }, void 0, false, {
                        fileName: "[project]/app/(site)/store/location/page.tsx",
                        lineNumber: 100,
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
                                lineNumber: 102,
                                columnNumber: 24
                            }, this),
                            "개의 약국 정보를 확인하세요."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(site)/store/location/page.tsx",
                        lineNumber: 101,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(site)/store/location/page.tsx",
                lineNumber: 99,
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
                    lineNumber: 107,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/(site)/store/location/page.tsx",
                lineNumber: 106,
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
                                        lineNumber: 124,
                                        columnNumber: 22
                                    }, this),
                                    "건"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(site)/store/location/page.tsx",
                                lineNumber: 124,
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
                                lineNumber: 125,
                                columnNumber: 12
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(site)/store/location/page.tsx",
                        lineNumber: 123,
                        columnNumber: 10
                    }, this),
                    isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "loading-msg",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "spinner"
                            }, void 0, false, {
                                fileName: "[project]/app/(site)/store/location/page.tsx",
                                lineNumber: 129,
                                columnNumber: 41
                            }, this),
                            "데이터 로드 중..."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(site)/store/location/page.tsx",
                        lineNumber: 129,
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
                                                    lineNumber: 136,
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
                                                            lineNumber: 137,
                                                            columnNumber: 48
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "value",
                                                            children: item.dutyAddr
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(site)/store/location/page.tsx",
                                                            lineNumber: 137,
                                                            columnNumber: 81
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/(site)/store/location/page.tsx",
                                                    lineNumber: 137,
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
                                                            lineNumber: 138,
                                                            columnNumber: 48
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "value",
                                                            children: item.dutyTel1 || "번호 없음"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(site)/store/location/page.tsx",
                                                            lineNumber: 138,
                                                            columnNumber: 81
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/(site)/store/location/page.tsx",
                                                    lineNumber: 138,
                                                    columnNumber: 22
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(site)/store/location/page.tsx",
                                            lineNumber: 135,
                                            columnNumber: 20
                                        }, this)
                                    }, item.hpid, false, {
                                        fileName: "[project]/app/(site)/store/location/page.tsx",
                                        lineNumber: 134,
                                        columnNumber: 18
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/(site)/store/location/page.tsx",
                                lineNumber: 132,
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
                                        lineNumber: 144,
                                        columnNumber: 16
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "page-numbers",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                children: page + 1
                                            }, void 0, false, {
                                                fileName: "[project]/app/(site)/store/location/page.tsx",
                                                lineNumber: 145,
                                                columnNumber: 46
                                            }, this),
                                            " / ",
                                            totalPages
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(site)/store/location/page.tsx",
                                        lineNumber: 145,
                                        columnNumber: 16
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "page-btn",
                                        onClick: ()=>setPage((p)=>Math.min(totalPages - 1, p + 1)),
                                        disabled: page >= totalPages - 1,
                                        children: "다음"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(site)/store/location/page.tsx",
                                        lineNumber: 146,
                                        columnNumber: 16
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(site)/store/location/page.tsx",
                                lineNumber: 143,
                                columnNumber: 14
                            }, this)
                        ]
                    }, void 0, true)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(site)/store/location/page.tsx",
                lineNumber: 120,
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

//# sourceMappingURL=_5638db67._.js.map