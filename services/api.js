"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userApi = exports.authApi = exports.blogApi = void 0;
const axios_1 = __importDefault(require("axios"));
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://blogger-wph-api-production.up.railway.app';
// Create axios instance with timeout and error handling
const api = axios_1.default.create({
    baseURL: API_BASE_URL,
    timeout: 10000, // 10 second timeout
    headers: {
        'Content-Type': 'application/json',
    },
});
// Add response interceptor for error handling
api.interceptors.response.use((response) => response, (error) => {
    console.warn('API Error:', error.message);
    throw error;
});
// Mock data fallbacks - updated to match new interface
const mockPosts = Array.from({ length: 5 }, (_, i) => ({
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
const mockMostLiked = Array.from({ length: 3 }, (_, i) => ({
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
exports.blogApi = {
    // Get recommended posts (main feed)
    getPosts() {
        return __awaiter(this, arguments, void 0, function* (page = 1, limit = 10) {
            try {
                const response = yield api.get(`/posts/recommended?page=${page}&limit=${limit}`);
                return response.data.data || response.data;
            }
            catch (error) {
                console.warn('Falling back to mock data for posts');
                return mockPosts;
            }
        });
    },
    // Get most liked posts
    getMostLikedPosts() {
        return __awaiter(this, arguments, void 0, function* (page = 1, limit = 10) {
            try {
                const response = yield api.get(`/posts/most-liked?page=${page}&limit=${limit}`);
                return response.data.data || response.data;
            }
            catch (error) {
                console.warn('Falling back to mock data for most liked posts');
                return mockMostLiked;
            }
        });
    },
    // Get single post
    getPost(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield api.get(`/posts/${id}`);
                return response.data;
            }
            catch (error) {
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
        });
    },
    // Search posts - updated to use 'query' parameter
    searchPosts(query_1) {
        return __awaiter(this, arguments, void 0, function* (query, page = 1, limit = 10) {
            try {
                const response = yield api.get(`/posts/search?query=${encodeURIComponent(query)}&page=${page}&limit=${limit}`);
                return response.data.data || response.data;
            }
            catch (error) {
                console.warn('Falling back to mock data for search');
                // Simple mock search logic
                return query.toLowerCase().includes('frontend') ? [mockPosts[0]] : [];
            }
        });
    },
    // Like a post
    likePost(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield api.post(`/posts/${id}/like`);
                return { success: true, likes: response.data.likes || 0 };
            }
            catch (error) {
                console.warn('Like action failed, using fallback');
                return { success: true, likes: Math.floor(Math.random() * 50) + 10 };
            }
        });
    },
    // Create a new post
    createPost(postData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const formData = new FormData();
                formData.append('title', postData.title);
                formData.append('content', postData.content);
                formData.append('tags', JSON.stringify(postData.tags));
                if (postData.image) {
                    formData.append('image', postData.image);
                }
                const response = yield api.post('/posts', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                return response.data;
            }
            catch (error) {
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
                };
            }
        });
    },
    // Get posts by user
    getPostsByUser(userId_1) {
        return __awaiter(this, arguments, void 0, function* (userId, page = 1, limit = 10) {
            try {
                const response = yield api.get(`/posts/by-user/${userId}?page=${page}&limit=${limit}`);
                return response.data.data || response.data;
            }
            catch (error) {
                console.warn('Falling back to mock data for user posts');
                return mockPosts.slice(0, 2); // Return subset for user posts
            }
        });
    },
    // Get current user's posts
    getMyPosts() {
        return __awaiter(this, arguments, void 0, function* (page = 1, limit = 10) {
            try {
                const response = yield api.get(`/posts/my-posts?page=${page}&limit=${limit}`);
                return response.data.data || response.data;
            }
            catch (error) {
                console.warn('Falling back to mock data for my posts');
                return mockPosts.slice(0, 1); // Return single post for "my posts"
            }
        });
    },
    // Get post likes (users who liked the post)
    getPostLikes(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield api.get(`/posts/${id}/likes`);
                return response.data || [];
            }
            catch (error) {
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
        });
    },
    // Get post comments
    getPostComments(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield api.get(`/posts/${id}/comments`);
                return response.data || [];
            }
            catch (error) {
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
        });
    },
    // Create comment
    createComment(postId, content) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield api.post(`/comments/${postId}`, { content });
                return response.data;
            }
            catch (error) {
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
        });
    }
};
// Authentication API
exports.authApi = {
    // Register user
    register(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield api.post('/auth/register', userData);
                return response.data;
            }
            catch (error) {
                console.warn('Registration failed, using fallback');
                throw new Error('Registration failed. Please try again.');
            }
        });
    },
    // Login user
    login(credentials) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield api.post('/auth/login', credentials);
                return response.data;
            }
            catch (error) {
                console.warn('Login failed, using fallback');
                throw new Error('Login failed. Please check your credentials.');
            }
        });
    }
};
// User API
exports.userApi = {
    // Get user by email
    getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield api.get(`/users/by-email/${email}`);
                return response.data;
            }
            catch (error) {
                console.warn('Get user by email failed, using fallback');
                return {
                    id: 1,
                    name: "John Doe",
                    email: email,
                    headline: "Frontend Developer",
                    avatarUrl: "/uploads/avatar.jpg"
                };
            }
        });
    },
    // Get user by ID
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield api.get(`/users/${id}`);
                return response.data;
            }
            catch (error) {
                console.warn('Get user by ID failed, using fallback');
                return {
                    id: typeof id === 'string' ? parseInt(id) : id,
                    name: "John Doe",
                    email: "john@example.com",
                    headline: "Frontend Developer",
                    avatarUrl: "/uploads/avatar.jpg"
                };
            }
        });
    },
    // Update user profile
    updateProfile(profileData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const formData = new FormData();
                if (profileData.name)
                    formData.append('name', profileData.name);
                if (profileData.headline)
                    formData.append('headline', profileData.headline);
                if (profileData.avatar)
                    formData.append('avatar', profileData.avatar);
                const response = yield api.patch('/users/profile', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                return response.data;
            }
            catch (error) {
                console.warn('Update profile failed, using fallback');
                throw new Error('Profile update failed. Please try again.');
            }
        });
    },
    // Change password
    changePassword(passwordData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield api.patch('/users/password', passwordData);
                return { success: true };
            }
            catch (error) {
                console.warn('Change password failed');
                throw new Error('Password change failed. Please try again.');
            }
        });
    }
};
exports.default = api;
