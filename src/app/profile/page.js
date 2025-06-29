"use strict";
"use client";
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
exports.default = ProfilePage;
const react_1 = require("react");
const navigation_1 = require("next/navigation");
const header_1 = __importDefault(require("@/components/header"));
const blog_card_1 = __importDefault(require("@/components/blog-card"));
const avatar_1 = require("@/components/ui/avatar");
const button_1 = require("@/components/ui/button");
const card_1 = require("@/components/ui/card");
const lucide_react_1 = require("lucide-react");
const auth_context_1 = require("@/contexts/auth-context");
const link_1 = __importDefault(require("next/link"));
const profile_modals_1 = require("@/components/profile-modals");
function ProfilePage() {
    const { user, loading: authLoading, logout } = (0, auth_context_1.useAuth)();
    const router = (0, navigation_1.useRouter)();
    const [posts, setPosts] = (0, react_1.useState)([]);
    const [stats, setStats] = (0, react_1.useState)({ totalPosts: 0, totalLikes: 0, totalComments: 0 });
    const [loading, setLoading] = (0, react_1.useState)(true);
    const [showEditModal, setShowEditModal] = (0, react_1.useState)(false);
    const [showPasswordModal, setShowPasswordModal] = (0, react_1.useState)(false);
    const [showDeleteModal, setShowDeleteModal] = (0, react_1.useState)(false);
    const [showStatsModal, setShowStatsModal] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        if (!authLoading && !user) {
            router.push("/login");
            return;
        }
        if (user) {
            fetchUserPosts();
            fetchUserStats();
        }
    }, [user, authLoading, router]);
    const fetchUserPosts = () => __awaiter(this, void 0, void 0, function* () {
        try {
            setLoading(true);
            // Mock user posts
            const mockPosts = [
                {
                    id: 1,
                    title: "5 Reasons to Learn Frontend Development in 2025",
                    content: "Frontend development is more than just building beautiful user interfaces — it's about crafting user experiences that are fast, accessible, and engaging.",
                    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image%20%285%29-bCPn7nMtvrEyzHHVlA5TguCex4yQqy.png",
                    author: {
                        id: typeof user.id === 'string' ? parseInt(user.id) : user.id,
                        name: user.name,
                        email: user.email,
                        avatar: user.avatar,
                    },
                    tags: ["Programming", "Frontend", "Coding"],
                    likes: 20,
                    comments: 20,
                    createdAt: "2025-05-27T00:00:00Z",
                    isLiked: false,
                },
            ];
            setPosts(mockPosts);
        }
        catch (error) {
            console.error("Error fetching user posts:", error);
        }
        finally {
            setLoading(false);
        }
    });
    const fetchUserStats = () => __awaiter(this, void 0, void 0, function* () {
        try {
            // Mock stats
            setStats({
                totalPosts: 5,
                totalLikes: 120,
                totalComments: 45,
            });
        }
        catch (error) {
            console.error("Error fetching user stats:", error);
        }
    });
    const handleLike = (postId) => __awaiter(this, void 0, void 0, function* () {
        setPosts(posts.map((post) => post.id === postId
            ? Object.assign(Object.assign({}, post), { isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 }) : post));
    });
    const handleDeletePost = (postId) => __awaiter(this, void 0, void 0, function* () {
        if (confirm("Are you sure you want to delete this post?")) {
            setPosts(posts.filter((post) => post.id !== postId));
        }
    });
    const handleEditProfile = (data) => {
        // Update user data
        console.log("Updating profile:", data);
    };
    const handleDeleteAccount = () => {
        logout();
        router.push("/");
    };
    if (authLoading || loading) {
        return (<div className="min-h-screen bg-gray-50">
        <header_1.default />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse space-y-8">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="h-20 w-20 bg-gray-200 rounded-full mb-4"></div>
              <div className="h-6 bg-gray-200 rounded w-1/3 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            </div>
          </div>
        </main>
      </div>);
    }
    if (!user) {
        return null;
    }
    return (<div className="min-h-screen bg-gray-50">
      <header_1.default />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 md:pt-24 pb-8">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 lg:p-8 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center space-x-4 mb-6 lg:mb-0">
              <avatar_1.Avatar className="h-20 w-20">
                <avatar_1.AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name}/>
                <avatar_1.AvatarFallback className="text-2xl">{user.name.charAt(0).toUpperCase()}</avatar_1.AvatarFallback>
              </avatar_1.Avatar>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
                <p className="text-gray-600">{user.email}</p>
              </div>
            </div>

            <div className="flex space-x-3">
              <button_1.Button variant="outline" onClick={() => setShowEditModal(true)}>
                <lucide_react_1.Edit className="h-4 w-4 mr-2"/>
                Edit Profile
              </button_1.Button>
              <button_1.Button variant="outline" onClick={() => setShowPasswordModal(true)}>
                <lucide_react_1.Settings className="h-4 w-4 mr-2"/>
                Settings
              </button_1.Button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <card_1.Card>
            <card_1.CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <card_1.CardTitle className="text-sm font-medium">Total Posts</card_1.CardTitle>
              <lucide_react_1.Edit className="h-4 w-4 text-muted-foreground"/>
            </card_1.CardHeader>
            <card_1.CardContent>
              <div className="text-2xl font-bold">{stats.totalPosts}</div>
            </card_1.CardContent>
          </card_1.Card>

          <card_1.Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setShowStatsModal("likes")}>
            <card_1.CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <card_1.CardTitle className="text-sm font-medium">Total Likes</card_1.CardTitle>
              <lucide_react_1.ThumbsUp className="h-4 w-4 text-muted-foreground"/>
            </card_1.CardHeader>
            <card_1.CardContent>
              <div className="text-2xl font-bold">{stats.totalLikes}</div>
            </card_1.CardContent>
          </card_1.Card>

          <card_1.Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setShowStatsModal("comments")}>
                          <card_1.CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <card_1.CardTitle className="text-sm font-medium">Total Comments</card_1.CardTitle>
                <lucide_react_1.MessageSquare className="h-4 w-4 text-muted-foreground"/>
              </card_1.CardHeader>
            <card_1.CardContent>
              <div className="text-2xl font-bold">{stats.totalComments}</div>
            </card_1.CardContent>
          </card_1.Card>
        </div>

        {/* Posts Section */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">My Posts</h2>
          <button_1.Button asChild>
            <link_1.default href="/write">
              <lucide_react_1.Plus className="h-4 w-4 mr-2"/>
              Write New Post
            </link_1.default>
          </button_1.Button>
        </div>

        {posts.length > 0 ? (<div className="space-y-6">
            {posts.map((post) => (<div key={post.id} className="relative">
                <blog_card_1.default post={post} onLike={handleLike}/>
                <div className="absolute top-4 right-4 flex space-x-2">
                  <button_1.Button size="sm" variant="outline" asChild>
                    <link_1.default href={`/write/${post.id}`}>
                      <lucide_react_1.Edit className="h-4 w-4"/>
                    </link_1.default>
                  </button_1.Button>
                  <button_1.Button size="sm" variant="outline" onClick={() => handleDeletePost(post.id)} className="text-red-600 hover:text-red-700 hover:bg-red-50">
                    <lucide_react_1.Trash2 className="h-4 w-4"/>
                  </button_1.Button>
                </div>
              </div>))}
          </div>) : (<div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-200">
            <lucide_react_1.Edit className="mx-auto h-12 w-12 text-gray-400 mb-4"/>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No posts yet</h3>
            <p className="text-gray-600 mb-6">Start sharing your thoughts and ideas with the world.</p>
            <button_1.Button asChild>
              <link_1.default href="/write">
                <lucide_react_1.Plus className="h-4 w-4 mr-2"/>
                Write Your First Post
              </link_1.default>
            </button_1.Button>
          </div>)}
        <profile_modals_1.EditProfileModal isOpen={showEditModal} onClose={() => setShowEditModal(false)} user={user} onSave={handleEditProfile}/>

        <profile_modals_1.ChangePasswordModal isOpen={showPasswordModal} onClose={() => setShowPasswordModal(false)}/>

        <profile_modals_1.DeleteAccountModal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)} onConfirm={handleDeleteAccount}/>
      </main>
    </div>);
}
