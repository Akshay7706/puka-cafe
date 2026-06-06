export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'breakfast' | 'tea' | 'coffee' | 'snacks' | 'meals' | 'specials' | 'desserts';
  image: string;
  isSignature: boolean;
  spicyLevel?: 0 | 1 | 2 | 3; // 0 = none, 3 = super spicy
}

export interface LocationBranch {
  id: string;
  name: string;
  slug: string;
  address: string;
  city: string;
  phone: string;
  email: string;
  timings: string;
  mapUrl: string; // Embedding URL or reference link
  image: string;
  isUpcoming: boolean;
  coords: { x: number; y: number }; // Relative position on decorative map
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  date: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  image: string;
  tags: string[];
  readTime: string;
}

export interface Testimonial {
  id: string;
  name: string;
  rating: number;
  review: string;
  date: string;
  avatar: string;
  role?: string;
  location: string;
}

export interface GalleryItem {
  id: string;
  image: string;
  title: string;
  category: string;
  likes: number;
}

export interface FranchiseEnquiry {
  id: string;
  name: string;
  phone: string;
  email: string;
  city: string;
  investmentRange: string;
  message: string;
  submittedAt: string;
}
