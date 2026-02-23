import { Resource, Review, User } from '@/types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

class ApiService {
    private token: string | null = null;

    setToken(token: string | null) {
        this.token = token;
        if (token) {
            localStorage.setItem('token', token);
        } else {
            localStorage.removeItem('token');
        }
    }

    getToken(): string | null {
        if (!this.token) {
            this.token = localStorage.getItem('token');
        }
        return this.token;
    }

    private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            ...options.headers,
        };

        const token = this.getToken();
        if (token) {
            (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            ...options,
            headers,
        });

        if (!response.ok) {
            const error = await response.json().catch(() => ({ message: 'An error occurred' }));
            throw new Error(error.message || `HTTP error! status: ${response.status}`);
        }

        return response.json();
    }

    // Auth endpoints
    async login(email: string, password: string, role: string) {
        const data = await this.request<{ token: string; user: User }>('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password, role }),
        });
        this.setToken(data.token);
        return data;
    }

    async register(name: string, email: string, password: string, role: string) {
        const data = await this.request<{ token: string; user: User }>('/auth/register', {
            method: 'POST',
            body: JSON.stringify({ name, email, password, role }),
        });
        this.setToken(data.token);
        return data;
    }

    async getCurrentUser() {
        return this.request<User>('/auth/me');
    }

    logout() {
        this.setToken(null);
    }

    // Resource endpoints
    async getResources(params?: {
        subject?: string;
        type?: string;
        gradeLevel?: string;
        search?: string;
        sortBy?: string;
        sortOrder?: string;
        page?: number;
        limit?: number;
    }) {
        const queryParams = new URLSearchParams();
        if (params) {
            Object.entries(params).forEach(([key, value]) => {
                if (value !== undefined) {
                    queryParams.append(key, String(value));
                }
            });
        }
        const query = queryParams.toString();
        return this.request<{ resources: Resource[]; pagination: { page: number; limit: number; total: number; pages: number } }>(
            `/resources${query ? `?${query}` : ''}`
        );
    }

    async getResource(id: string) {
        return this.request<Resource>(`/resources/${id}`);
    }

    async getPopularResources() {
        return this.request<Resource[]>('/resources/featured/popular');
    }

    async getTopRatedResources() {
        return this.request<Resource[]>('/resources/featured/top-rated');
    }

    async getSubjects() {
        return this.request<string[]>('/resources/meta/subjects');
    }

    // User endpoints
    async getUserBookmarks() {
        return this.request<Resource[]>('/users/bookmarks');
    }

    async addBookmark(resourceId: string) {
        return this.request<{ message: string; bookmarks: string[] }>(`/users/bookmarks/${resourceId}`, {
            method: 'POST',
        });
    }

    async removeBookmark(resourceId: string) {
        return this.request<{ message: string; bookmarks: string[] }>(`/users/bookmarks/${resourceId}`, {
            method: 'DELETE',
        });
    }

    async getDownloadHistory() {
        return this.request<Resource[]>('/users/downloads');
    }

    async addToDownloadHistory(resourceId: string) {
        return this.request<{ message: string; downloadHistory: string[] }>(
            `/users/downloads/${resourceId}`,
            {
                method: 'POST',
            }
        );
    }

    async updateProfile(data: { name?: string; avatar?: string }) {
        return this.request<User>('/users/profile', {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    }

    async changePassword(currentPassword: string, newPassword: string) {
        return this.request<{ message: string }>('/users/password', {
            method: 'PUT',
            body: JSON.stringify({ currentPassword, newPassword }),
        });
    }

    // Review endpoints
    async getResourceReviews(resourceId: string) {
        return this.request<Review[]>(`/reviews/resource/${resourceId}`);
    }

    async createReview(resourceId: string, rating: number, comment: string) {
        return this.request<Review>('/reviews', {
            method: 'POST',
            body: JSON.stringify({ resourceId, rating, comment }),
        });
    }

    async updateReview(reviewId: string, rating: number, comment: string) {
        return this.request<Review>(`/reviews/${reviewId}`, {
            method: 'PUT',
            body: JSON.stringify({ rating, comment }),
        });
    }

    async deleteReview(reviewId: string) {
        return this.request<{ message: string }>(`/reviews/${reviewId}`, {
            method: 'DELETE',
        });
    }

    async markReviewHelpful(reviewId: string, helpful: boolean) {
        return this.request<Review>(`/reviews/${reviewId}/helpful`, {
            method: 'POST',
            body: JSON.stringify({ helpful }),
        });
    }
}

export const api = new ApiService();
export default api;
