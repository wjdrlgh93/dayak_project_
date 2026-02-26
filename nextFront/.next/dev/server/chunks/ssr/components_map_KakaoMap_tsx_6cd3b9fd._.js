module.exports = [
"[project]/components/map/KakaoMap.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>KakaoMap
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
;
const KAKAO_KEY = ("TURBOPACK compile-time value", "454ebd09b90c527f1da4544bf2ea90d7");
function KakaoMap() {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        const script = document.createElement("script");
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_KEY}&autoload=false&libraries=services`;
        script.async = true;
        document.head.appendChild(script);
        script.onload = ()=>{
            window.kakao.maps.load(()=>{
                initialzeMap();
            });
        };
        return ()=>{
            // watch this 
            document.head.removeChild(script);
        };
    }, []);
    const initialzeMap = ()=>{
        const container = document.getElementById('map');
        if (!container) return;
        const defaultCenter = new window.kakao.maps.LatLng(37.566826, 126.9786567);
        const options = {
            center: defaultCenter,
            level: 4
        };
        const map = new window.kakao.maps.Map(container, options);
        // Bring My Position
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((pos)=>{
                const lat = pos.coords.latitude;
                const lon = pos.coords.longitude;
                const userPosition = new window.kakao.map.LatLng(lat, lon);
                map.setCenter(userPosition);
                displayUserMarker(map, userPosition);
                searchPharmacies(map, userPosition);
            }, (err)=>{
                console.error("위치 권한 거부됨", err);
                searchPharmacies(map, defaultCenter);
            });
        } else {
            searchPharmacies(map, defaultCenter);
        }
    };
    const displayUserMarker = (map, position)=>{
        const imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png";
        const imageSize = new window.kakao.maps.Size(64, 69);
        const imageOption = {
            offset: new window.kakao.maps.Point(27, 69)
        };
        const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);
        new window.kakao.maps.Marker({
            position: position,
            image: markerImage,
            map: map
        });
    };
    const searchPharmacies = (map, centerPosition)=>{
        const ps = new window.kakao.maps.services.Places();
        ps.categorySearch('PM9', (data, status)=>{
            if (status === window.kakao.maps.services.Status.OK) {
                displayPlaces(data, map);
            }
        }, {
            location: centerPosition,
            radius: 2000,
            useMapBounds: true
        });
    };
    // marker 
    const displayPlaces = (places, map)=>{
        const infowindow = new window.kakao.maps.InfoWindow({
            zIndex: 1
        });
        for(let i = 0; i < places.length; i++){
            const place = places[i];
            const marker = new window.kakao.maps.Marker({
                map: map,
                position: new window.kakao.maps.LatLng(place.y, place.x)
            });
            // 마커 클릭 이벤트
            window.kakao.maps.event.addListener(marker, 'click', function() {
                const content = `
          <div class="custom-infowindow">
            <strong>${place.place_name}</strong>
            <p>${place.phone || '전화번호 없음'}</p>
            <a href="${place.place_url}" target="_blank">상세보기</a>
          </div>
        `;
                infowindow.setContent(content);
                infowindow.open(map, marker);
            });
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "map-wrap",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "kakao-map"
        }, void 0, false, {
            fileName: "[project]/components/map/KakaoMap.tsx",
            lineNumber: 127,
            columnNumber: 11
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/map/KakaoMap.tsx",
        lineNumber: 126,
        columnNumber: 7
    }, this);
}
}),
];

//# sourceMappingURL=components_map_KakaoMap_tsx_6cd3b9fd._.js.map