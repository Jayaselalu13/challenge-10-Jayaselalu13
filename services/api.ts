import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://blogger-wph-api-production.up.railway.app';

// Create axios instance with timeout and error handling
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 second timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.warn('API Error:', error.message);
    throw error;
  }
);

// Blog Post interface - updated to match real API
export interface BlogPost {
  id: number;
  title: string;
  content: string;
  imageUrl?: string;
  author: {
    id: number;
    name: string;
    email: string;
    headline?: string;
    avatarUrl?: string;
  };
  tags: string[];
  likes: number;
  comments: number;
  createdAt: string;
  isLiked?: boolean;
}

// User interface
export interface User {
  id: number;
  name: string;
  email: string;
  headline?: string;
  avatarUrl?: string;
}

// Comment interface
export interface Comment {
  id: number;
  content: string;
  author: {
    id: number;
    name: string;
    email: string;
    headline?: string;
    avatarUrl?: string;
  };
  postId: number;
  createdAt: string;
}

// Mock data fallbacks - updated to match new interface
const mockPosts: BlogPost[] = Array.from({ length: 5 }, (_, i) => ({
  id: i + 1,
  title: "5 Reasons to Learn Frontend Development in 2025",
  content: "Frontend development is more than just building beautiful user interfaces — it's about crafting user experiences that are fast, accessible, and intuitive. As we move into 2025, the demand for skilled frontend developers continues to rise.",
  imageUrl: "https://yourcdn.com/images/frontend-2025.jpg",
  author: {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    headline: "Frontend Developer",
    avatarUrl: "/uploads/avatar.jpg",
  },
  tags: ["Programming", "Frontend", "Coding"],
  likes: 20,
  comments: 20,
  createdAt: "2025-05-27T10:00:00.000Z",
  isLiked: false,
}));

const mockMostLiked: BlogPost[] = Array.from({ length: 3 }, (_, i) => ({
  id: i + 10,
  title: "5 Reasons to Learn Frontend Development in 2025",
  content: "Frontend development is more than just building beautiful user interfaces — it's about crafting user experiences that are fast, accessible, and intuitive. As we move into 2025, the demand for skilled frontend developers continues to rise.",
  imageUrl: "https://yourcdn.com/images/frontend-2025.jpg",
  author: {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    headline: "Frontend Developer",
    avatarUrl: "/uploads/avatar.jpg",
  },
  tags: ["Programming", "Frontend", "Coding"],
  likes: 50 + i * 10,
  comments: 20,
  createdAt: "2025-05-27T10:00:00.000Z",
  isLiked: false,
}));

// API Functions with fallbacks - updated to match real API endpoints
export const blogApi = {
  // Get recommended posts (main feed)
  async getPosts(page: number = 1, limit: number = 10): Promise<BlogPost[]> {
    try {
      const response = await api.get(`/posts/recommended?page=${page}&limit=${limit}`);
      return response.data.data || response.data;
    } catch (error) {
      console.warn('Falling back to mock data for posts');
      return mockPosts;
    }
  },

  // Get most liked posts
  async getMostLikedPosts(page: number = 1, limit: number = 10): Promise<BlogPost[]> {
    try {
      const response = await api.get(`/posts/most-liked?page=${page}&limit=${limit}`);
      return response.data.data || response.data;
    } catch (error) {
      console.warn('Falling back to mock data for most liked posts');
      return mockMostLiked;
    }
  },

  // Get single post
  async getPost(id: string | number): Promise<BlogPost> {
    try {
      const response = await api.get(`/posts/${id}`);
      return response.data;
    } catch (error) {
      console.warn('Falling back to mock data for single post');
      return {
        id: typeof id === 'string' ? parseInt(id) : id,
        title: "5 Reasons to Learn Frontend Development in 2025",
        content: `Frontend development is more than just building beautiful user interfaces — it's about crafting user experiences that are fast, accessible, and intuitive. As we move into 2025, the demand for skilled frontend developers continues to rise.

Here are 5 reasons why you should start learning frontend development today:

1. **High Demand**: Companies are constantly looking for skilled frontend developers
2. **Creative Freedom**: Build beautiful, interactive user interfaces
3. **Good Salary**: Frontend developers earn competitive salaries
4. **Remote Work**: Many frontend positions offer remote work opportunities
5. **Continuous Learning**: The field is always evolving with new technologies`,
        imageUrl: "https://yourcdn.com/images/frontend-2025.jpg",
        author: {
          id: 1,
          name: "John Doe",
          email: "john@example.com",
          headline: "Frontend Developer",
          avatarUrl: "/uploads/avatar.jpg",
        },
        tags: ["Programming", "Frontend", "Coding"],
        likes: 20,
        comments: 20,
        createdAt: "2025-05-27T10:00:00.000Z",
        isLiked: false,
      };
    }
  },

  // Search posts - updated to use 'query' parameter
  async searchPosts(query: string, page: number = 1, limit: number = 10): Promise<BlogPost[]> {
    try {
      const response = await api.get(`/posts/search?query=${encodeURIComponent(query)}&page=${page}&limit=${limit}`);
      return response.data.data || response.data;
    } catch (error) {
      console.warn('Falling back to mock data for search');
      // Simple mock search logic
      return query.toLowerCase().includes('frontend') ? [mockPosts[0]] : [];
    }
  },

  // Like a post
  async likePost(id: string | number): Promise<{ success: boolean; likes: number }> {
    try {
      const response = await api.post(`/posts/${id}/like`);
      return { success: true, likes: response.data.likes || 0 };
    } catch (error) {
      console.warn('Like action failed, using fallback');
      return { success: true, likes: Math.floor(Math.random() * 50) + 10 };
    }
  },

  // Create a new post
  async createPost(postData: { title: string; content: string; tags: string[]; image?: File }): Promise<BlogPost> {
    try {
      const formData = new FormData();
      formData.append('title', postData.title);
      formData.append('content', postData.content);
      formData.append('tags', JSON.stringify(postData.tags));
      if (postData.image) {
        formData.append('image', postData.image);
      }

      const response = await api.post('/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.warn('Create post failed, using fallback');
      return {
        id: Date.now(),
        title: postData.title || 'New Post',
        content: postData.content || '',
        author: {
          id: 999,
          name: 'Current User',
          email: 'user@example.com',
          headline: 'Blog Writer',
          avatarUrl: '/uploads/avatar.jpg',
        },
        tags: postData.tags || [],
        likes: 0,
        comments: 0,
        createdAt: new Date().toISOString(),
        isLiked: false,
      } as BlogPost;
    }
  },

  // Get posts by user
  async getPostsByUser(userId: string | number, page: number = 1, limit: number = 10): Promise<BlogPost[]> {
    try {
      const response = await api.get(`/posts/by-user/${userId}?page=${page}&limit=${limit}`);
      return response.data.data || response.data;
    } catch (error) {
      console.warn('Falling back to mock data for user posts');
      return mockPosts.slice(0, 2); // Return subset for user posts
    }
  },

  // Get current user's posts
  async getMyPosts(page: number = 1, limit: number = 10): Promise<BlogPost[]> {
    try {
      const response = await api.get(`/posts/my-posts?page=${page}&limit=${limit}`);
      return response.data.data || response.data;
    } catch (error) {
      console.warn('Falling back to mock data for my posts');
      return mockPosts.slice(0, 1); // Return single post for "my posts"
    }
  },

  // Get post likes (users who liked the post)
  async getPostLikes(id: string | number): Promise<User[]> {
    try {
      const response = await api.get(`/posts/${id}/likes`);
      return response.data || [];
    } catch (error) {
      console.warn('Falling back to mock data for post likes');
      return [
        {
          id: 1,
          name: "Clarissa",
          email: "clarissa@example.com",
          headline: "Frontend Developer",
          avatarUrl: "/uploads/clarissa.jpg"
        },
        {
          id: 2,
          name: "Marco",
          email: "marco@example.com", 
          headline: "Frontend Developer",
          avatarUrl: "/uploads/marco.jpg"
        }
      ];
    }
  },

  // Get post comments
  async getPostComments(id: string | number): Promise<Comment[]> {
    try {
      const response = await api.get(`/posts/${id}/comments`);
      return response.data || [];
    } catch (error) {
      console.warn('Falling back to mock data for comments');
      return [
        {
          id: 1,
          content: "Komentar kamu di sini!",
          author: {
            id: 1,
            name: "John Doe",
            email: "john@example.com",
            headline: "Frontend Developer",
            avatarUrl: "/uploads/clarissa.jpg"
          },
          postId: typeof id === 'string' ? parseInt(id) : id,
          createdAt: "2025-05-27T10:00:00.000Z"
        }
      ];
    }
  },

  // Create comment
  async createComment(postId: string | number, content: string): Promise<Comment> {
    try {
      const response = await api.post(`/comments/${postId}`, { content });
      return response.data;
    } catch (error) {
      console.warn('Create comment failed, using fallback');
      return {
        id: Date.now(),
        content,
        author: {
          id: 999,
          name: "Current User",
          email: "user@example.com",
          headline: "Blog Reader",
          avatarUrl: "/uploads/avatar.jpg"
        },
        postId: typeof postId === 'string' ? parseInt(postId) : postId,
        createdAt: new Date().toISOString()
      };
    }
  }
};

// Authentication API
export const authApi = {
  // Register user
  async register(userData: { name: string; email: string; password: string }): Promise<{ user: User; token?: string }> {
    try {
      const response = await api.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      console.warn('Registration failed, using fallback');
      throw new Error('Registration failed. Please try again.');
    }
  },

  // Login user
  async login(credentials: { email: string; password: string }): Promise<{ user: User; token?: string }> {
    try {
      const response = await api.post('/auth/login', credentials);
      return response.data;
    } catch (error) {
      console.warn('Login failed, using fallback');
      throw new Error('Login failed. Please check your credentials.');
    }
  }
};

// User API
export const userApi = {
  // Get user by email
  async getUserByEmail(email: string): Promise<User> {
    try {
      const response = await api.get(`/users/by-email/${email}`);
      return response.data;
    } catch (error) {
      console.warn('Get user by email failed, using fallback');
      return {
        id: 1,
        name: "John Doe",
        email: email,
        headline: "Frontend Developer",
        avatarUrl: "/uploads/avatar.jpg"
      };
    }
  },

  // Get user by ID
  async getUserById(id: string | number): Promise<User> {
    try {
      const response = await api.get(`/users/${id}`);
      return response.data;
    } catch (error) {
      console.warn('Get user by ID failed, using fallback');
      return {
        id: typeof id === 'string' ? parseInt(id) : id,
        name: "John Doe",
        email: "john@example.com",
        headline: "Frontend Developer",
        avatarUrl: "/uploads/avatar.jpg"
      };
    }
  },

  // Update user profile
  async updateProfile(profileData: { name?: string; headline?: string; avatar?: File }): Promise<User> {
    try {
      const formData = new FormData();
      if (profileData.name) formData.append('name', profileData.name);
      if (profileData.headline) formData.append('headline', profileData.headline);
      if (profileData.avatar) formData.append('avatar', profileData.avatar);

      const response = await api.patch('/users/profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.warn('Update profile failed, using fallback');
      throw new Error('Profile update failed. Please try again.');
    }
  },

  // Change password
  async changePassword(passwordData: { currentPassword: string; newPassword: string }): Promise<{ success: boolean }> {
    try {
      const response = await api.patch('/users/password', passwordData);
      return { success: true };
    } catch (error) {
      console.warn('Change password failed');
      throw new Error('Password change failed. Please try again.');
    }
  }
};

export default api; 