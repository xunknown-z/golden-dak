'use client';

import type { ProductOption } from '@/types';
import { formatPrice } from '@/lib/format';

interface OptionSelectorProps {
  options: ProductOption[];
  selectedOption: ProductOption | null;
  onSelect: (option: ProductOption) => void;
}

export default function OptionSelector({ options, selectedOption, onSelect }: OptionSelectorProps) {
  return (
    <div className="px-4 py-4 border-t border-border">
      <h3 className="text-sm font-semibold text-text-primary mb-3">옵션 선택</h3>
      <div className="flex flex-col gap-2">
        {options.map((option) => {
          const isSelected = selectedOption?.id === option.id;
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onSelect(option)}
              className={`flex items-center justify-between px-4 py-3 rounded-lg border text-sm transition-colors ${
                isSelected
                  ? 'border-primary bg-primary/5 text-primary font-medium'
                  : 'border-border text-text-primary hover:border-text-secondary'
              }`}
              aria-pressed={isSelected}
            >
              <span>{option.name}</span>
              <span className="font-semibold">{formatPrice(option.price)}원</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
