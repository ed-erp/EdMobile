import { API_ENDPOINTS, BASE_API_URL } from '../../../constants/api.constant';
import { apiService} from '../../../services/api/apiClient';
import { HomeItem } from '../models/homePage.model';


export const homeService = {
  fetchHomeItems: async (): Promise<HomeItem[]> => {
    return apiService.get<HomeItem[]>(`${BASE_API_URL}${API_ENDPOINTS.HOME_ITEMS}`);
  },

  createHomeItem: async (item: Omit<HomeItem, 'id'>): Promise<HomeItem> => {
    return apiService.post<HomeItem>(`${BASE_API_URL}${API_ENDPOINTS.HOME_ITEMS}`, item);
  },

  updateHomeItem: async (id: string, item: Partial<HomeItem>): Promise<HomeItem> => {
    return apiService.put<HomeItem>(`${BASE_API_URL}${API_ENDPOINTS.HOME_ITEMS}/${id}`, item);
  },

  deleteHomeItem: async (id: string): Promise<{ success: boolean }> => {
    return apiService.delete<{ success: boolean }>(`${BASE_API_URL}${API_ENDPOINTS.HOME_ITEMS}/${id}`);
  },
};
