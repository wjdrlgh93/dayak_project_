"use client";

import React, { useEffect, useState } from 'react';
import '../../../css/home/main.css';
import Link from 'next/link';
import api from '@/util/api'; 
import { getBoardList } from "@/util/boardApi";

const Page = () => {
  
  const [boardPosts, setBoardPosts] = useState<any[]>([]);
  
  const [noticePosts, setNoticePosts] = useState<any[]>([]);

  useEffect(() => {
    
    getBoardList(0).then((data) => {
      if (data && data.content) {
        setBoardPosts(data.content.slice(0, 3));
      }
    });

    
    
    api.get('/api/notice/list?page=0&size=3')
      .then((res) => {
        if (res.data && res.data.content) {
          setNoticePosts(res.data.content);
        }
      })
      .catch((err) => {
        console.error("공지사항 로드 실패:", err);
      });
  }, []);

  return (
    <div className="pharmacy-container">
      {}
      <section className="hero-section">
        <div className="container hero-content">
          <div className="hero-text">
            <h1>
              당신의 건강을 위한 <br /> 
              <span className="highlight">가장 빠른 처방전</span>
            </h1>
            <p>
              최신 의약품 정보부터 내 주변 24시 약국까지, <br />
              다약과 함께 똑똑하게 건강을 관리하세요.
            </p>
            <div className="hero-buttons">
               <Link href="/store/location">
                <button className="primary-btn">약국 찾기</button>
               </Link>
            </div>
          </div>
          <div className="hero-image"></div>
        </div>
      </section>

      {}
      <section className="quick-menu-section">
        <div className="container">
          <h2 className="section-title">빠른 메뉴</h2>
          <div className="quick-grid">
            <Link href="/store/location" className="quick-item">
              <img src="img/home/h2.png" alt="약국 찾기" />
              <div className="quick-overlay">
                <h3>약국 찾기</h3>
                <p>내 주변 가까운 약국</p>
              </div>
            </Link>
            <Link href="/drug" className="quick-item">
              <img src="img/home/h1.png" alt="통합검색" />
              <div className="quick-overlay">
                <h3>일반 의약품검색</h3>
                <p>일반의약품 검색</p>
              </div>
            </Link>
            <Link href="/pill" className="quick-item">
              <img src="img/home/h3.png" alt="상세검색" />
              <div className="quick-overlay">
                <h3>식별검색</h3>
                <p>의약품 식별검색</p>
              </div>
            </Link>
            <Link href="/board" className="quick-item">
              <img src="img/home/h4.png" alt="자유게시판" />
              <div className="quick-overlay">
                <h3>자유게시판</h3>
                <p>자유게시판</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {}
      <section className="services-section">
        <div className="container">
          <h2 className="section-title">제공 서비스</h2>
          <div className="services-grid">
            <Link href={'/medication/calender'}>
              <div className="service-card">
                <div className="icon-box bg-blue">💪</div>
                <h3>복약 달력</h3>
                <p>복약 체크 달력</p>
              </div>
            </Link>
            <Link href={'/medication/list'}>
              <div className="service-card">
                <div className="icon-box bg-yellow">⏰</div>
                <h3>복약 리스트</h3>
                <p>복용 시간 체크</p>
              </div>
            </Link>
            <Link href={'/medication/add'}>
              <div className="service-card">
                <div className="icon-box bg-red">🏥</div>
                <h3>복약 리스트 추가</h3>
                <p>복용 약 알람추가</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {}
      <section className="info-section">
        <div className="container info-grid">
          
          {}
          <div className="info-box">
            <Link href="/board" style={{ textDecoration: 'none', color: 'inherit' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                    <h3 style={{ margin: 0 }}>📢 공지사항</h3>
                    <span style={{ fontSize: '0.8rem', color: '#888' }}>더보기 &gt;</span>
                </div>
            </Link>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {noticePosts.length > 0 ? (
                noticePosts.map((notice) => (
                  <li key={notice.id} style={{ padding: '8px 0', borderBottom: '1px solid #f0f0f0' }}>
                    <Link href={`/board/notice/${notice.id}`} style={{ textDecoration: 'none', color: '#333', display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '70%' }}>
                        {}
                        {notice.isPinned && <span style={{ color: '#e11d48', marginRight: '5px' }}>[공지]</span>}
                        {notice.title}
                      </span>
                      <span style={{ fontSize: '0.85rem', color: '#999' }}>
                        {new Date(notice.createdAt).toLocaleDateString()}
                      </span>
                    </Link>
                  </li>
                ))
              ) : (
                <li style={{ padding: '10px 0', color: '#999', textAlign: 'center' }}>등록된 공지사항이 없습니다.</li>
              )}
            </ul>
          </div>

          {}
          <div className="info-box">
            <Link href="/board" style={{ textDecoration: 'none', color: 'inherit' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                    <h3 style={{ margin: 0 }}>💬 자유게시판</h3>
                    <span style={{ fontSize: '0.8rem', color: '#888' }}>더보기 &gt;</span>
                </div>
            </Link>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {boardPosts.length > 0 ? (
                boardPosts.map((post) => (
                  <li key={post.id} style={{ padding: '8px 0', borderBottom: '1px solid #f0f0f0' }}>
                    <Link href={`/board/${post.id}`} style={{ textDecoration: 'none', color: '#333', display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '70%' }}>
                        {post.title}
                      </span>
                      <span style={{ fontSize: '0.85rem', color: '#999' }}>
                        {new Date(post.createdAt).toLocaleDateString()}
                      </span>
                    </Link>
                  </li>
                ))
              ) : (
                <li style={{ padding: '10px 0', color: '#999', textAlign: 'center' }}>등록된 게시글이 없습니다.</li>
              )}
            </ul>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Page;