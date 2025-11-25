/**
 * [파일 역할]
 * - Next.js 애플리케이션의 메인 페이지(홈) 컴포넌트입니다.
 * - 사용자가 루트 주소(/)로 접속했을 때 보여지는 화면을 정의합니다.
 */
"use client"; // 클라이언트 컴포넌트 선언13+에서 브라우저 기능(useState, fetch)을 쓰려면 필수!

import { useState } from 'react';

export default function Home() {
  // 1. AI 응답을 저장할 상태 변수 생성
  const [aiResponse, setAiResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // 2. 버튼 클릭 시 실행될 함수
  const handleTestClick = async () => {
    setIsLoading(true); // 로딩 시작
    setAiResponse(''); // 이전 응답 초기화

    try {
      // 3. 백엔드 API 호출 (http://localhost:8000/api/test-coaching/)
      const response = await fetch('http://localhost:8000/api/test-coaching/');
      const data = await response.json();

      // 4. AI가 보낸 메시지를 상태 변수에 저장
      setAiResponse(data.message);

    } catch (error) {
      console.error('AI 코칭 테스트 중 오류 발생:', error);
      setAiResponse('오류가 발생했습니다. 백엔드 서버 로그를 확인해주세요.');
    } finally {
      setIsLoading(false); // 로딩 끝
    }
  };

  return (
    <main style={{ padding: '40px', fontFamily: 'sans-serif' }}>
      <h1>Duduk AI 코칭 기능 테스트</h1>
      <p>아래 버튼을 누르면, 백엔드 DB의 데이터를 기반으로 AI가 분석을 시작합니다.</p>

      <button onClick={handleTestClick} disabled={isLoading} style={{ padding: '10px 15px', fontSize: '16px' }}>
        {isLoading ? '분석 중...' : 'AI 분석 테스트하기'}
      </button>

      {/* 5. AI 응답 결과 표시 */}
      {aiResponse && (
        <div style={{ marginTop: '20px', padding: '15px', border: '1px solid #ccc', borderRadius: '5px', backgroundColor: '#f9f9f9' }}>
          <h3>AI 코칭 결과:</h3>
          <p style={{ whiteSpace: 'pre-wrap' }}>{aiResponse}</p>
        </div>
      )}
    </main>
  );
}