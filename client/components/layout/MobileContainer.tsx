'use client';

export default function MobileContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-[480px] min-h-screen bg-surface relative shadow-lg">
      {children}
    </div>
  );
}
