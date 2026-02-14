export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  discountRate: number;
  image: string;
  category: string;
  rating: number;
  reviewCount: number;
  tags: string[];
  description: string;
  options: ProductOption[];
}

export interface ProductOption {
  id: number;
  name: string;
  price: number;
}

export interface CartItem {
  product: Product;
  selectedOption: ProductOption;
  quantity: number;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  icon: string;
}

export interface Review {
  id: number;
  productId: number;
  userName: string;
  rating: number;
  content: string;
  date: string;
  images?: string[];
}

export interface Banner {
  id: number;
  image: string;
  title: string;
  link: string;
}

export interface UserProfile {
  name: string;
  email: string;
  grade: string;
  point: number;
  couponCount: number;
}

export interface Order {
  id: string;
  date: string;
  status: string;
  items: OrderItem[];
  totalPrice: number;
}

export interface OrderItem {
  productId: number;
  productName: string;
  optionName: string;
  quantity: number;
  price: number;
  image: string;
}

export interface Coupon {
  id: number;
  name: string;
  discount: number;
  discountType: 'percent' | 'amount';
  minOrderAmount: number;
  expiryDate: string;
}
