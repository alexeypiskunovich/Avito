export interface Listing {
  id: number;
  title: string;
  price: number;
  category: string;
  categoryId: number;
  createdAt: string;
  status: 'pending' | 'approved' | 'rejected' | 'draft';
  priority: 'normal' | 'urgent';
  images?: string[];
}

export interface ApiAdvertisement {
  id: number;
  title: string;
  description: string;
  images: string[];
  characteristics: Record<string, string>;
  seller: {
    name: string;
    totalAds: number;
    registeredAt: string;
    rating: string; 
  };
  moderationHistory: {
    moderatorName: string;
    timestamp: string;
    action: string;
  }[];
}

export interface StatsSummary {
  totalReviewed: number;
  approvedPercentage: number;
  rejectedPercentage: number;
  requestChangesPercentage: number;
  averageReviewTime: number;
}

export interface ActivityResponse {
  date: string;
  approved: number;
  rejected: number;
  requestChanges: number;
}

export interface DecisionsData {
  approved: number;
  rejected: number;
  requestChanges: number;
}

export interface CategoriesData {
  [category: string]: number;
}

export interface GetAdsParams {
  page?: number;
  limit?: number;
  search?: string;
  categoryId?: number;
  status?: string[];
  minPrice?: number;
  maxPrice?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface AdsResponse {
  ads: Listing[];
  pagination?: {
    totalItems: number;
    totalPages: number;
    currentPage: number;
  };
}


