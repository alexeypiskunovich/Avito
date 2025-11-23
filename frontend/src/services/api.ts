import axios from 'axios';
import type {
  ApiAdvertisement,
  StatsSummary,
  ActivityResponse,
  DecisionsData,
  CategoriesData,
  GetAdsParams,
  AdsResponse
} from './types';

const API_BASE_URL = '/api';

export const api = {
  
  async getAds(params: GetAdsParams = {}): Promise<AdsResponse> {
    const response = await axios.get(`${API_BASE_URL}/ads`, { params });
    return response.data;
  },

  async getAdById(id: string | number): Promise<ApiAdvertisement> {
    const response = await axios.get(`${API_BASE_URL}/ads/${id}`);
    return response.data;
  },

  async approveAd(id: number): Promise<void> {
    await axios.post(`${API_BASE_URL}/ads/${id}/approve`);
  },

  async rejectAd(id: number, data: { reason: string; comment?: string }): Promise<void> {
    await axios.post(`${API_BASE_URL}/ads/${id}/reject`, data);
  },

  async requestChangesAd(id: number, data: { reason: string; comment?: string }): Promise<void> {
    await axios.post(`${API_BASE_URL}/ads/${id}/request-changes`, data);
  },

 
  async getStatsSummary(period: 'today' | 'week' | 'month'): Promise<StatsSummary> {
    const response = await axios.get(`${API_BASE_URL}/stats/summary`, { 
      params: { period } 
    });
    return response.data;
  },

  async getActivityStats(period: 'today' | 'week' | 'month'): Promise<ActivityResponse[]> {
    const response = await axios.get(`${API_BASE_URL}/stats/chart/activity`, { 
      params: { period } 
    });
    return response.data;
  },

  async getDecisionsStats(period: 'today' | 'week' | 'month'): Promise<DecisionsData> {
    const response = await axios.get(`${API_BASE_URL}/stats/chart/decisions`, { 
      params: { period } 
    });
    return response.data;
  },

  async getCategoriesStats(period: 'today' | 'week' | 'month'): Promise<CategoriesData> {
    const response = await axios.get(`${API_BASE_URL}/stats/chart/categories`, { 
      params: { period } 
    });
    return response.data;
  },
};


axios.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    throw error;
  }
);

export default api;