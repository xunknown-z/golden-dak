import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/layout/Header';
import BottomNav from '@/components/layout/BottomNav';
import MainContent from '@/components/layout/MainContent';
import MobileContainer from '@/components/layout/MobileContainer';
import DesktopSidebar from '@/components/layout/DesktopSidebar';

export const metadata: Metadata = {
  title: '골든닭 - 닭가슴살 전문 쇼핑몰',
  description: '신선한 닭가슴살, 소시지, 스테이크를 최저가로 만나보세요. 무료배송 혜택까지!',
  openGraph: {
    title: '골든닭 - 닭가슴살 전문 쇼핑몰',
    description: '신선한 닭가슴살, 소시지, 스테이크를 최저가로 만나보세요.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">
        <div className="relative min-h-screen">
          <DesktopSidebar />
          <MobileContainer>
            <Header />
            <MainContent>{children}</MainContent>
            <BottomNav />
          </MobileContainer>
        </div>
      </body>
    </html>
  );
}
