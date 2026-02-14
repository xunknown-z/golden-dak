'use client';

import { QRCodeSVG } from 'qrcode.react';

const QR_URL = 'https://golden-dak.vercel.app/app-download';

export default function DesktopSidebar() {

  return (
    <aside className="hidden lg:flex fixed top-0 left-[calc(50%-240px-280px)] flex-col items-center justify-center w-[280px] h-screen py-10">
      <div className="flex flex-col items-center">
        {/* 로고 */}
        <h2 className="text-3xl font-bold text-primary mb-3">골든닭</h2>
        <p className="text-sm text-text-secondary text-center leading-relaxed mb-6">
          NO.1 닭가슴살<br />
          골든닭 리뉴얼 오픈!
        </p>

        {/* QR 코드 */}
        <div className="bg-white p-3 rounded-lg shadow-sm mb-3">
          <QRCodeSVG
            value={QR_URL}
            size={140}
            level="M"
            bgColor="#ffffff"
            fgColor="#1a1a1a"
          />
        </div>

        <p className="text-xs text-text-muted mb-5">
          QR 촬영하고 공식 앱 설치하기
        </p>

        {/* 스토어 배지 */}
        <div className="flex gap-2">
          <span className="flex items-center gap-1.5 px-3 py-1.5 bg-black text-white text-[11px] rounded-md">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.302 2.302a1 1 0 010 1.38l-1.996 1.156-2.61-2.61 2.304-2.228zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z"/>
            </svg>
            Google Play
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1.5 bg-black text-white text-[11px] rounded-md">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
            </svg>
            App Store
          </span>
        </div>
      </div>
    </aside>
  );
}
