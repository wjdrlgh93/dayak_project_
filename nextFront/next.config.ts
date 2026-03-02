import type { NextConfig } from "next";

const nextConfig: NextConfig = {
// async rewrites() {
//     return [
//       {
//         // 프론트에서 /img/파일명 으로 요청하면
//         source: "/img/:path*",
//         // 백엔드의 실제 경로로 몰래 연결해줍니다.
//         destination: "https://objectstorage.ap-chuncheon-1.oraclecloud.com/n/axvzobmiym3y/b/medifull-images/o/:path*",
//       },
//     ];
//   },
};

export default nextConfig;
