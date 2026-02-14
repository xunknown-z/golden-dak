'use client';

import { useRouter } from 'next/navigation';

export default function AppDownloadPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center">
      <div className="text-5xl mb-6">🐔</div>
      <h1 className="text-xl font-bold text-text-primary mb-2">앱 준비중</h1>
      <p className="text-sm text-text-secondary mb-8 leading-relaxed">
        골든닭 공식 앱을 준비하고 있습니다.<br />
        조금만 기다려 주세요!
      </p>
      <button
        type="button"
        onClick={() => router.push('/')}
        className="px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors"
      >
        홈으로 돌아가기
      </button>
    </div>
  );
}
