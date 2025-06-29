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
exports.default = VisitProfilePage;
const react_1 = require("react");
const navigation_1 = require("next/navigation");
const header_1 = __importDefault(require("@/components/header"));
const avatar_1 = require("@/components/ui/avatar");
const auth_context_1 = require("@/contexts/auth-context");
function VisitProfilePage() {
    const params = (0, navigation_1.useParams)();
    const userId = params.userId;
    const { user: currentUser } = (0, auth_context_1.useAuth)();
    const [profile, setProfile] = (0, react_1.useState)(null);
    const [posts, setPosts] = (0, react_1.useState)([]);
    const [loading, setLoading] = (0, react_1.useState)(true);
    (0, react_1.useEffect)(() => {
        fetchUserProfile();
        fetchUserPosts();
    }, [userId]);
    const fetchUserProfile = () => __awaiter(this, void 0, void 0, function* () {
        try {
            // Mock user profile
            const mockProfile = {
                id: userId,
                name: "John Doe",
                email: "john@example.com",
                avatar: "/image-6.png",
                bio: "Frontend Developer",
                postsCount: 5,
            };
            setProfile(mockProfile);
        }
        catch (error) {
            console.error("Error fetching user profile:", error);
        }
    });
    const fetchUserPosts = () => __awaiter(this, void 0, void 0, function* () {
        try {
            setLoading(true);
            // Mock posts - sometimes return empty array to show empty state
            const shouldShowPosts = Math.random() > 0.3; // 70% chance to show posts
            if (shouldShowPosts) {
                const mockPosts = Array.from({ length: 5 }, (_, i) => ({
                    id: `post-${i + 1}`,
                    title: "5 Reasons to Learn Frontend Development in 2025",
                    content: "Frontend development is more than just building beautiful user interfaces — it's about crafting user experiences that are fast, accessible, and intuitive. As we move into 2025, the demand for skilled frontend developers continues to rise.",
                    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image%20%285%29-bCPn7nMtvrEyzHHVlA5TguCex4yQqy.png",
                    author: {
                        id: userId,
                        name: "John Doe",
                        avatar: "/image-6.png",
                    },
                    tags: ["Programming", "Frontend", "Coding"],
                    likes: 20,
                    comments: 20,
                    createdAt: "2025-05-27T00:00:00Z",
                    isLiked: false,
                }));
                setPosts(mockPosts);
            }
            else {
                setPosts([]);
            }
        }
        catch (error) {
            console.error("Error fetching user posts:", error);
        }
        finally {
            setLoading(false);
        }
    });
    const handleLike = (postId) => __awaiter(this, void 0, void 0, function* () {
        setPosts(posts.map((post) => post.id === postId
            ? Object.assign(Object.assign({}, post), { isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 }) : post));
    });
    if (loading || !profile) {
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
    return (<div className="min-h-screen bg-gray-50">
      <header_1.default />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Desktop Layout */}
        <div className="hidden md:block">
          {/* Profile Header */}
          <div className="flex items-center gap-3 mb-6 text-lg text-gray-700">
            <avatar_1.Avatar className="h-20 w-20">
              <avatar_1.AvatarImage src={profile.avatar || "/placeholder.svg"} alt={profile.name}/>
              <avatar_1.AvatarFallback className="text-2xl">{profile.name.charAt(0).toUpperCase()}</avatar_1.AvatarFallback>
            </avatar_1.Avatar>
            <div className="flex flex-col">
              <h1 className="font-bold tracking-[-0.03em] leading-8">{profile.name}</h1>
              <p className="text-base tracking-[-0.03em] leading-[30px]">{profile.bio}</p>
            </div>
          </div>

          <div className="border-t border-gray-200 mb-6"></div>

          <h2 className="text-2xl font-bold tracking-[-0.03em] leading-9 text-gray-700 mb-6">
            {profile.postsCount} Post{profile.postsCount !== 1 ? "s" : ""}
          </h2>

          {/* Posts */}
          {posts.length > 0 ? (<div className="space-y-6">
              {posts.map((post) => (<div key={post.id} className="bg-white flex gap-6">
                  <div className="relative rounded-md overflow-hidden hover:opacity-90 transition-opacity cursor-pointer" style={{
                    width: 'clamp(280px, 25vw, 340px)',
                    height: 'clamp(200px, 18vw, 258px)',
                    aspectRatio: '4/3'
                }}>
                  <img src={post.image || "/placeholder.svg"} alt={post.title} className="w-full h-full object-cover"/>
                  </div>
                  <div className="flex-1 flex flex-col gap-4">
                    <div className="flex flex-col gap-3">
                      <h3 className="text-xl font-bold tracking-[-0.03em] leading-[34px]">{post.title}</h3>
                      <div className="flex gap-2">
                        {post.tags.map((tag) => (<span key={tag} className="rounded-lg bg-white border border-gray-200 h-7 flex items-center justify-center px-2 text-xs tracking-[-0.03em] leading-6">
                            {tag}
                          </span>))}
                      </div>
                      <p className="text-sm tracking-[-0.03em] leading-7 line-clamp-2">{post.content}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <avatar_1.Avatar className="h-10 w-10">
                          <avatar_1.AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name}/>
                          <avatar_1.AvatarFallback>{post.author.name.charAt(0)}</avatar_1.AvatarFallback>
                        </avatar_1.Avatar>
                        <span className="text-sm tracking-[-0.03em] leading-7 font-medium">{post.author.name}</span>
                      </div>
                      <div className="w-1 h-1 rounded-full bg-gray-600"></div>
                      <span className="text-sm tracking-[-0.03em] leading-7 text-gray-500">27 May 2025</span>
                    </div>
                    <div className="flex items-center gap-5 text-gray-500">
                      <button onClick={() => handleLike(post.id)} className="flex items-center gap-1.5 hover:text-red-500 transition-colors">
                        <svg className="w-5 h-5" fill={post.isLiked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                        </svg>
                        <span className="text-sm tracking-[-0.03em] leading-7">{post.likes}</span>
                      </button>
                      <div className="flex items-center gap-1.5">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                        </svg>
                        <span className="text-sm tracking-[-0.03em] leading-7">{post.comments}</span>
                      </div>
                    </div>
                  </div>
                </div>))}
            </div>) : (<div className="flex flex-col items-center justify-center py-12">
              <img src="/fd12acbc29.png" alt="No posts" className="w-[118.1px] h-[135px] object-contain mb-6"/>
              <div className="text-center">
                <p className="text-sm tracking-[-0.03em] leading-7 font-semibold mb-1">No posts from this user yet</p>
                <p className="text-sm tracking-[-0.03em] leading-7">Stay tuned for future posts</p>
              </div>
            </div>)}
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden">
          <div className="flex flex-col gap-4 p-4">
            {/* Profile Header */}
            <div className="flex items-center gap-2">
              <avatar_1.Avatar className="h-10 w-10">
                <avatar_1.AvatarImage src={profile.avatar || "/placeholder.svg"} alt={profile.name}/>
                <avatar_1.AvatarFallback>{profile.name.charAt(0).toUpperCase()}</avatar_1.AvatarFallback>
              </avatar_1.Avatar>
              <div className="flex flex-col">
                <h1 className="text-sm font-bold tracking-[-0.03em] leading-7">{profile.name}</h1>
                <p className="text-xs tracking-[-0.03em] leading-6 text-gray-500 -mt-1">{profile.bio}</p>
              </div>
            </div>

            <div className="border-t border-gray-200"></div>

            <h2 className="text-lg font-bold tracking-[-0.03em] leading-8">
              {profile.postsCount} Post{profile.postsCount !== 1 ? "s" : ""}
            </h2>

            {/* Posts */}
            {posts.length > 0 ? (<div className="space-y-4">
                {posts.map((post, index) => (<div key={post.id}>
                    <div className="bg-white flex flex-col gap-3">
                      <div className="flex flex-col gap-2">
                        <h3 className="text-base font-bold tracking-[-0.03em] leading-[30px]">{post.title}</h3>
                        <div className="flex gap-2">
                          {post.tags.map((tag) => (<span key={tag} className="rounded-lg bg-white border border-gray-200 h-7 flex items-center justify-center px-2 text-xs tracking-[-0.03em] leading-6">
                              {tag}
                            </span>))}
                        </div>
                        <p className="text-xs tracking-[-0.03em] leading-6 line-clamp-2">{post.content}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          <avatar_1.Avatar className="h-[30px] w-[30px]">
                            <avatar_1.AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name}/>
                            <avatar_1.AvatarFallback className="text-xs">{post.author.name.charAt(0)}</avatar_1.AvatarFallback>
                          </avatar_1.Avatar>
                          <span className="text-xs tracking-[-0.03em] leading-6">{post.author.name}</span>
                        </div>
                        <div className="w-1 h-1 rounded-full bg-gray-600"></div>
                        <span className="text-xs tracking-[-0.03em] leading-6 text-gray-500">27 May 2025</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-500">
                        <button onClick={() => handleLike(post.id)} className="flex items-center gap-1.5 hover:text-red-500 transition-colors">
                          <svg className="w-5 h-5" fill={post.isLiked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                          </svg>
                          <span className="text-xs tracking-[-0.03em] leading-6">{post.likes}</span>
                        </button>
                        <div className="flex items-center gap-1.5">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                          </svg>
                          <span className="text-xs tracking-[-0.03em] leading-6">{post.comments}</span>
                        </div>
                      </div>
                    </div>
                    {index < posts.length - 1 && <div className="border-t border-gray-200"></div>}
                  </div>))}
              </div>) : (<div className="flex flex-col items-center justify-center py-12">
                <img src="/fd12acbc29.png" alt="No posts" className="w-[118.1px] h-[135px] object-contain mb-6"/>
                <div className="text-center">
                  <p className="text-sm tracking-[-0.03em] leading-7 font-semibold mb-1">No posts from this user yet</p>
                  <p className="text-sm tracking-[-0.03em] leading-7">Stay tuned for future posts</p>
                </div>
              </div>)}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 h-20 flex items-center justify-center p-2 text-gray-500">
        <p className="text-sm tracking-[-0.03em] leading-7">© 2025 Web Programming Hack Blog All rights reserved.</p>
      </footer>
    </div>);
}
