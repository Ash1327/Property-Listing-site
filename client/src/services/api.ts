const API_BASE_URL = 'https://property-listing-site-lw5g.onrender.com/api';

export interface ApiProperty {
  id: string;
  name: string;
  type: string;
  price: number | string;
  location: string;
  description: string;
  image: string;
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
  createdAt: string;
}

export interface CreatePropertyData {
  name: string;
  type: string;
  price: number | string;
  location: string;
  description: string;
  image?: string;
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
}

export interface UpdatePropertyData extends CreatePropertyData {
  id: string;
}

class ApiService {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Get all properties with optional filtering
  async getProperties(type?: string, search?: string): Promise<ApiProperty[]> {
    const params = new URLSearchParams();
    if (type && type !== 'All') params.append('type', type);
    if (search) params.append('search', search);
    
    const queryString = params.toString();
    const endpoint = queryString ? `/properties?${queryString}` : '/properties';
    
    return this.request<ApiProperty[]>(endpoint);
  }

  // Get a specific property by ID
  async getProperty(id: string): Promise<ApiProperty> {
    return this.request<ApiProperty>(`/properties/${id}`);
  }

  // Create a new property
  async createProperty(data: CreatePropertyData): Promise<ApiProperty> {
    return this.request<ApiProperty>('/properties', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Update an existing property
  async updateProperty(id: string, data: CreatePropertyData): Promise<ApiProperty> {
    return this.request<ApiProperty>(`/properties/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // Delete a property
  async deleteProperty(id: string): Promise<{ message: string; property: ApiProperty }> {
    return this.request<{ message: string; property: ApiProperty }>(`/properties/${id}`, {
      method: 'DELETE',
    });
  }

  // Health check
  async healthCheck(): Promise<{ status: string; message: string }> {
    return this.request<{ status: string; message: string }>('/health');
  }
}

export const apiService = new ApiService(); 