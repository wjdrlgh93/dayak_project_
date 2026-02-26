"use client";

import { useState, useEffect } from "react";
import "../../css/common/header.css"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode"; 

export default function Header() {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userInfo, setUserInfo] = useState<string>(""); 
    
    const [userRole, setUserRole] = useState<string>("");

    const checkLoginStatus = () => {
        const token = localStorage.getItem('token');
        
        if (token) {
            try {
                const decoded: any = jwtDecode(token);
                const currentTime = Date.now();
                
                if (decoded.exp * 1000 < currentTime) {
                    console.log("토큰이 만료되었습니다.");
                    handleLogout(); 
                } else {
                    setIsLoggedIn(true);
                    setUserInfo(decoded.sub || ""); 
                    
                    
                    setUserRole(decoded.auth || ""); 
                }
            } catch (error) {
                console.error("유효하지 않은 토큰입니다.", error);
                handleLogout();
            }
        } else {
            setIsLoggedIn(false);
            setUserRole(""); 
        }
    };

    useEffect(() => {
        checkLoginStatus();
    }, [isOpen]); 

    
    const isAdmin = ["MASTER", "ADMIN", "MANAGER"].includes(userRole);

    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = () => setIsOpen(false);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        setUserInfo("");
        setUserRole(""); 
        setIsOpen(false); 
        router.push('/');
    };

    return (
        <>
            <div className="header">
                {}
                <Link href="/main">
                    <img src='/img/home/logo.png' alt="로고" />
                </Link>
                <div className="nav">
                    {}
                    {isLoggedIn ? (
                        <div style={{ textAlign: 'center' }}>
                           <Link href='/mypage'>
                            <p style={{ marginTop:'0.8rem',marginRight:'1rem' , fontWeight: 'bold', fontSize: '1rem' }}>
                                {userInfo}님
                            </p> 
                            </Link>
                        </div>
                    ) : ( 
                        <Link href={'/authLogin'}>
                            <p style={{ marginTop:'0.8rem',marginRight:'1rem' , fontWeight: 'bold', fontSize: '1rem' }}>로그인하세요</p> 
                        </Link>
                    )}
                    <button className="ham-btn" onClick={toggleMenu}>☰</button>
                </div>
            </div>

            <div className={`drawer-overlay ${isOpen ? 'open' : ''}`} onClick={closeMenu}></div>

            <div className={`drawer-menu ${isOpen ? 'open' : ''}`}>
                <button className="close-btn" onClick={closeMenu}>X</button>
                
                {}
                <div style={{ padding: '20px', borderBottom: '1px solid #eee', marginBottom: '10px' }}>
                    {}
                    {isLoggedIn ? (
        
        <div>
            <div style={{ marginBottom: '15px' }}>
                <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: '4px' }}>접속 계정</p>
                <p style={{ fontWeight: 'bold', color: '#333' }}>{userInfo}</p>
                <p style={{ fontSize: '0.75rem', color: '#e11d48', marginTop: '4px' }}>
                    권한: {userRole}
                </p>
            </div>
            <button 
                onClick={handleLogout}
                style={{
                    width: '100%',
                    padding: '12px',
                    backgroundColor: '#f3f4f6',
                    color: '#374151',
                    border: 'none',
                    borderRadius: '8px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e5e7eb'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
            >
                로그아웃
            </button>
        </div>
    ) : (
        
        <Link href="/authLogin" style={{ textDecoration: 'none' }}>
            <button 
                onClick={closeMenu}
                style={{
                    width: '100%',
                    padding: '12px',
                    backgroundColor: '#3b82f6',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    boxShadow: '0 2px 4px rgba(59, 130, 246, 0.3)'
                }}
            >
                로그인 / 회원가입
            </button>
        </Link>
    )}
                </div>

                <ul>
                    <Link href={`/drug`}><li onClick={closeMenu}>일반의약품 검색</li></Link>
                    <Link href={`/pill`}><li onClick={closeMenu}>식별검색</li></Link>
                    <Link href='/board'><li onClick={closeMenu}>게시판</li></Link>
                    <Link href='/store/location'><li onClick={closeMenu}>약국찾기</li></Link>
                    

                    {}
                    {isAdmin && (
                        <>
                            <div style={{ margin: '15px 20px', borderTop: '1px solid #eee' }}></div>
                            <Link href='/admin'>
                                <li 
                                    onClick={closeMenu} 
                                    style={{ color: '#e11d48', fontWeight: 'bold' }}
                                >
                                    관리자 페이지 ⚙️
                                </li>
                            </Link>
                        </>
                    )}
                </ul>
            </div>
        </>
    );
}