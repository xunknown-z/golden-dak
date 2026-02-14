'use client';

interface SortFilterProps {
  currentSort: string;
  onSortChange: (sort: string) => void;
}

const sortOptions = [
  { value: 'popular', label: '인기순' },
  { value: 'price-asc', label: '낮은가격순' },
  { value: 'price-desc', label: '높은가격순' },
  { value: 'discount', label: '할인율순' },
];

export default function SortFilter({ currentSort, onSortChange }: SortFilterProps) {
  return (
    <div className="flex items-center gap-2 px-4 py-3 overflow-x-auto scrollbar-hide" role="radiogroup" aria-label="정렬 기준">
      {sortOptions.map(({ value, label }) => (
        <button
          key={value}
          type="button"
          onClick={() => onSortChange(value)}
          className={`shrink-0 px-3 py-1.5 text-sm rounded-full border transition-colors ${
            currentSort === value
              ? 'bg-primary text-white border-primary'
              : 'bg-surface text-text-secondary border-border hover:border-text-secondary'
          }`}
          role="radio"
          aria-checked={currentSort === value}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
