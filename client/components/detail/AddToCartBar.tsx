'use client';

import { useState, useEffect } from 'react';
import { ChevronDownIcon, ChevronUpIcon, XMarkIcon, MinusIcon, PlusIcon, HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid';
import type { Product, ProductOption } from '@/types';
import { useCartStore } from '@/stores/cartStore';
import { formatPrice } from '@/lib/format';

interface SelectedItem {
  option: ProductOption;
  quantity: number;
}

interface AddToCartBarProps {
  product: Product;
}

export default function AddToCartBar({ product }: AddToCartBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [optionListOpen, setOptionListOpen] = useState(true);
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(128);
  const [showConfirm, setShowConfirm] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleSelectOption = (option: ProductOption) => {
    const exists = selectedItems.find((item) => item.option.id === option.id);
    if (exists) return;
    setSelectedItems((prev) => [...prev, { option, quantity: 1 }]);
  };

  const handleQuantityChange = (optionId: number, delta: number) => {
    setSelectedItems((prev) =>
      prev.map((item) =>
        item.option.id === optionId
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const handleRemoveItem = (optionId: number) => {
    setSelectedItems((prev) => prev.filter((item) => item.option.id !== optionId));
  };

  const handleClose = () => {
    setIsOpen(false);
    setSelectedItems([]);
    setOptionListOpen(true);
  };

  const handleAddToCart = () => {
    if (selectedItems.length === 0) return;
    for (const item of selectedItems) {
      addItem(product, item.option, item.quantity);
    }
    setIsOpen(false);
    setSelectedItems([]);
    setOptionListOpen(true);
    setShowConfirm(true);
    setTimeout(() => setShowConfirm(false), 2000);
  };

  const totalPrice = selectedItems.reduce(
    (sum, item) => sum + item.option.price * item.quantity,
    0
  );

  return (
    <>
      {/* 하단 고정 버튼 바 */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] bg-surface border-t border-border px-4 py-3 z-50 flex items-center gap-3">
        <button
          type="button"
          onClick={() => {
            setLiked(!liked);
            setLikeCount((prev) => liked ? prev - 1 : prev + 1);
          }}
          className="flex flex-col items-center justify-center w-12 h-12 flex-shrink-0"
          aria-label={liked ? '찜 해제' : '찜하기'}
          aria-pressed={liked}
        >
          {liked ? (
            <HeartSolid className="w-6 h-6 text-primary" />
          ) : (
            <HeartIcon className="w-6 h-6 text-text-muted" />
          )}
          <span className="text-[10px] text-text-muted mt-0.5">{likeCount.toLocaleString()}</span>
        </button>
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="flex-1 h-12 border border-text-primary text-text-primary font-semibold rounded-lg hover:bg-gray-50 transition-colors"
        >
          장바구니
        </button>
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="flex-1 h-12 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors"
        >
          바로구매
        </button>
      </div>

      {/* 바텀 시트 오버레이 */}
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={handleClose}
          />

          <div className="relative w-full max-w-[480px] bg-surface rounded-t-2xl z-10 max-h-[80vh] flex flex-col animate-slide-up">
            {/* 닫기 핸들 */}
            <button
              type="button"
              onClick={handleClose}
              className="flex justify-center py-3"
              aria-label="닫기"
            >
              <ChevronDownIcon className="w-6 h-6 text-text-muted" />
            </button>

            {/* 스크롤 영역 */}
            <div className="flex-1 overflow-y-auto px-4 pb-4">
              {/* 옵션 드롭다운 */}
              <div className="border border-border rounded-lg mb-3">
                <button
                  type="button"
                  onClick={() => setOptionListOpen(!optionListOpen)}
                  className="flex items-center justify-between w-full px-4 py-3"
                >
                  <span className="text-sm text-text-secondary">상품옵션선택</span>
                  {optionListOpen ? (
                    <ChevronUpIcon className="w-4 h-4 text-text-muted" />
                  ) : (
                    <ChevronDownIcon className="w-4 h-4 text-text-muted" />
                  )}
                </button>
                {optionListOpen && (
                  <ul className="border-t border-border">
                    {product.options.map((option) => {
                      const isAdded = selectedItems.some((item) => item.option.id === option.id);
                      return (
                        <li key={option.id} className="border-b border-border last:border-b-0">
                          <button
                            type="button"
                            onClick={() => handleSelectOption(option)}
                            disabled={isAdded}
                            className={`w-full text-left px-4 py-3.5 transition-colors ${
                              isAdded
                                ? 'bg-gray-50 text-text-muted'
                                : 'hover:bg-gray-50 text-text-primary'
                            }`}
                          >
                            <p className="text-sm">
                              {option.name}
                            </p>
                            <p className={`text-sm font-bold mt-0.5 ${isAdded ? 'text-text-muted' : ''}`}>
                              {formatPrice(option.price)}원
                            </p>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>

              {/* 선택된 옵션 목록 */}
              {selectedItems.map((item) => (
                <div
                  key={item.option.id}
                  className="border border-border rounded-lg px-4 py-3 mb-2"
                >
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-sm text-text-primary flex-1 pr-2">
                      {item.option.name}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(item.option.id)}
                      className="p-0.5 text-text-muted hover:text-text-primary flex-shrink-0"
                      aria-label={`${item.option.name} 삭제`}
                    >
                      <XMarkIcon className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center border border-border rounded">
                      <button
                        type="button"
                        onClick={() => handleQuantityChange(item.option.id, -1)}
                        className="w-8 h-8 flex items-center justify-center text-text-secondary hover:text-text-primary"
                        aria-label="수량 감소"
                      >
                        <MinusIcon className="w-4 h-4" />
                      </button>
                      <span className="w-8 h-8 flex items-center justify-center text-sm font-medium border-x border-border">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleQuantityChange(item.option.id, 1)}
                        className="w-8 h-8 flex items-center justify-center text-text-secondary hover:text-text-primary"
                        aria-label="수량 증가"
                      >
                        <PlusIcon className="w-4 h-4" />
                      </button>
                    </div>
                    <span className="text-sm font-bold text-text-primary">
                      {formatPrice(item.option.price * item.quantity)}원
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* 총 금액 + 버튼 */}
            <div className="border-t border-border px-4 pt-3 pb-4">
              <div className="flex items-center justify-end mb-3">
                <span className="text-sm text-text-secondary mr-2">총</span>
                <span className="text-xl font-bold text-text-primary">
                  {formatPrice(totalPrice)}원
                </span>
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  disabled={selectedItems.length === 0}
                  className="flex-1 h-12 border border-text-primary text-text-primary font-semibold rounded-lg hover:bg-gray-50 disabled:border-gray-300 disabled:text-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  장바구니
                </button>
                <button
                  type="button"
                  disabled={selectedItems.length === 0}
                  className="flex-1 h-12 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  바로구매
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showConfirm && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/80 text-white px-6 py-3 rounded-lg z-[100] text-sm">
          장바구니에 담았습니다!
        </div>
      )}
    </>
  );
}
