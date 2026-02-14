'use client';

import { BeakerIcon } from '@heroicons/react/24/outline';

export default function AiDietPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 px-6 text-center">
      <BeakerIcon className="w-16 h-16 text-primary" />
      <h1 className="text-xl font-bold text-text-primary">AI 식단 추천</h1>
      <p className="text-sm text-text-secondary leading-relaxed">
        AI가 회원님의 목표와 체형에 맞는<br />
        맞춤 식단을 추천해 드립니다.
      </p>
      <div className="w-full max-w-xs bg-gray-50 rounded-lg p-4 mt-2">
        <p className="text-xs text-text-muted">서비스 준비 중입니다. 곧 만나보실 수 있습니다.</p>
      </div>
    </div>
  );
}
