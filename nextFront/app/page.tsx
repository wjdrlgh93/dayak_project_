"use client"; 

import Spline from '@splinetool/react-spline'; 
import Link from "next/link";



export default function Home() {
  return (
    <main style={{ 
      width: '100vw', 
      height: '100vh', 
      margin: 0, 
      padding: 0, 
      overflow: 'hidden',
      backgroundColor: 'black' 
    }}>
      {}
      <style jsx global>{`
        html, body {
          margin: 0 !important;
          padding: 0 !important;
          width: 100%;
          height: 100%;
          overflow: hidden;
          background-color: black;
        }
      `}</style>

      {}
      <Link href="/main" style={{ 
        display: 'block', 
        width: '100%', 
        height: '100%',
        textDecoration: 'none'
      }}>
        <Spline
          scene="https://prod.spline.design/gdJr7skAp6CW9RuL/scene.splinecode" 
          style={{
            width: '100%',
            height: '100%',
            display: 'block'
          }}
        />
      </Link>
    </main>
  );
}