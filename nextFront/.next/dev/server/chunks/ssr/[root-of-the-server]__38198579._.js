module.exports = [
"[project]/app/favicon.ico.mjs { IMAGE => \"[project]/app/favicon.ico (static in ecmascript, tag client)\" } [app-rsc] (structured image object, ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/favicon.ico.mjs { IMAGE => \"[project]/app/favicon.ico (static in ecmascript, tag client)\" } [app-rsc] (structured image object, ecmascript)"));
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/app/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/layout.tsx [app-rsc] (ecmascript)"));
}),
"[project]/app/(site)/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/(site)/layout.tsx [app-rsc] (ecmascript)"));
}),
"[project]/app/(site)/night24/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// ... 기존 import 유지
// KakaoMap 컴포넌트는 지도 표시용으로만 사용 (마커는 DB 데이터로 찍어야 함)
__turbopack_context__.s([
    "default",
    ()=>PharmacyPage
]);
function PharmacyPage() {
    const [pharmacies, setPharmacies] = useState([]);
    // ...
    // ✅ 변경점: 컴포넌트 마운트 시 백엔드 DB에서 데이터 조회
    useEffect(()=>{
        const fetchFromDB = async ()=>{
            try {
                setIsLoading(true);
                // 우리 백엔드 API 호출
                const res = await fetch("http://localhost:8080/api/pharmacies");
                const data = await res.json();
                // 백엔드 필드명을 프론트 인터페이스에 맞게 매핑 (필요시)
                const mappedData = data.map((item)=>({
                        id: item.id,
                        place_name: item.placeName,
                        road_address_name: item.roadAddressName,
                        address_name: item.addressName,
                        phone: item.phone,
                        x: item.x,
                        y: item.y,
                        place_url: item.placeUrl,
                        QT: item.qt,
                        category_name: "의료,건강 > 약국",
                        distance: "0"
                    }));
                setPharmacies(mappedData);
            } catch (err) {
                console.error("DB 조회 실패:", err);
            } finally{
                setIsLoading(false);
            }
        };
        fetchFromDB();
    }, []);
// ... 나머지 렌더링 로직은 그대로 유지 ...
}
}),
"[project]/app/(site)/night24/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/(site)/night24/page.tsx [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__38198579._.js.map