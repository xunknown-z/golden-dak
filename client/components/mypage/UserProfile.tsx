import type { UserProfile as UserProfileType } from '@/types';

interface UserProfileProps {
  user: UserProfileType;
}

export default function UserProfile({ user }: UserProfileProps) {
  return (
    <div className="px-4 py-5 bg-surface">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
          <span className="text-2xl text-gray-400">{user.name.charAt(0)}</span>
        </div>
        <div>
          <h2 className="text-lg font-bold text-text-primary">{user.name}</h2>
          <p className="text-sm text-text-secondary">{user.email}</p>
          <span className="inline-block mt-1 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">
            {user.grade} 회원
          </span>
        </div>
      </div>

      <div className="flex items-center justify-around mt-5 py-4 bg-gray-50 rounded-lg">
        <div className="text-center">
          <p className="text-lg font-bold text-text-primary">{user.point.toLocaleString()}</p>
          <p className="text-xs text-text-muted mt-0.5">적립금</p>
        </div>
        <div className="w-px h-8 bg-border" />
        <div className="text-center">
          <p className="text-lg font-bold text-text-primary">{user.couponCount}</p>
          <p className="text-xs text-text-muted mt-0.5">쿠폰</p>
        </div>
      </div>
    </div>
  );
}
