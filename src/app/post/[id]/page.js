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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = PostDetailPage;
const react_1 = require("react");
const navigation_1 = require("next/navigation");
const lucide_react_1 = require("lucide-react");
const avatar_1 = require("@/components/ui/avatar");
const button_1 = require("@/components/ui/button");
const textarea_1 = require("@/components/ui/textarea");
const comments_modal_1 = require("@/components/comments-modal");
const search_header_1 = require("@/components/search-header");
const api_1 = require("@/services/api");
function PostDetailPage() {
    const params = (0, navigation_1.useParams)();
    const [post, setPost] = (0, react_1.useState)(null);
    const [comments, setComments] = (0, react_1.useState)([]);
    const [loading, setLoading] = (0, react_1.useState)(true);
    const [newComment, setNewComment] = (0, react_1.useState)("");
    const [showCommentsModal, setShowCommentsModal] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        fetchPost();
        fetchComments();
    }, [params.id]);
    const fetchPost = () => __awaiter(this, void 0, void 0, function* () {
        try {
            setLoading(true);
            const fetchedPost = yield api_1.blogApi.getPost(params.id);
            setPost(fetchedPost);
        }
        catch (error) {
            console.error("Error fetching post:", error);
        }
        finally {
            setLoading(false);
        }
    });
    const fetchComments = () => __awaiter(this, void 0, void 0, function* () {
        try {
            const fetchedComments = yield api_1.blogApi.getPostComments(params.id);
            setComments(fetchedComments);
        }
        catch (error) {
            console.error("Error fetching comments:", error);
        }
    });
    const handleLike = () => __awaiter(this, void 0, void 0, function* () {
        if (!post)
            return;
        try {
            yield api_1.blogApi.likePost(post.id);
            setPost(Object.assign(Object.assign({}, post), { isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 }));
        }
        catch (error) {
            console.error("Error liking post:", error);
        }
    });
    const handleComment = (e) => __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        if (!newComment.trim() || !post)
            return;
        try {
            const comment = yield api_1.blogApi.createComment(post.id, newComment.trim());
            setComments([...comments, comment]);
            setNewComment("");
        }
        catch (error) {
            console.error("Error creating comment:", error);
        }
    });
    const handleAddComment = (content) => __awaiter(this, void 0, void 0, function* () {
        if (!post)
            return;
        try {
            const comment = yield api_1.blogApi.createComment(post.id, content);
            setComments([...comments, comment]);
        }
        catch (error) {
            console.error("Error creating comment:", error);
        }
    });
    // Helper to get image URL with fallback
    const getImageUrl = (imageUrl) => {
        return imageUrl || "/image-5.png";
    };
    // Helper to get avatar URL with fallback
    const getAvatarUrl = (avatarUrl) => {
        return avatarUrl || "/image-6.png";
    };
    if (loading) {
        return (<div className="min-h-screen bg-white">
        {/* Desktop Header */}
        <div className="hidden md:block">
          <search_header_1.SearchHeaderDesktop />
        </div>
        {/* Mobile Header */}
        <div className="block md:hidden">
          <search_header_1.SearchHeaderMobile />
        </div>

        <main className="max-w-[800px] mx-auto px-4 md:px-0 py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        </main>
      </div>);
    }
    if (!post) {
        return (<div className="min-h-screen bg-white">
        {/* Desktop Header */}
        <div className="hidden md:block">
          <search_header_1.SearchHeaderDesktop />
        </div>
        {/* Mobile Header */}
        <div className="block md:hidden">
          <search_header_1.SearchHeaderMobile />
        </div>

        <main className="max-w-[800px] mx-auto px-4 md:px-0 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-[#181D27] mb-4 tracking-[-0.03em]">Post not found</h1>
            <p className="text-[#535862] tracking-[-0.03em]">The post you're looking for doesn't exist.</p>
          </div>
        </main>
      </div>);
    }
    return (<div className="min-h-screen bg-white">
      {/* Desktop Header */}
      <div className="hidden md:block">
        <search_header_1.SearchHeaderDesktop />
      </div>
      {/* Mobile Header */}
      <div className="block md:hidden">
        <search_header_1.SearchHeaderMobile />
      </div>

      <main className="max-w-[800px] mx-auto px-4 md:px-0 py-8">
        <article className="space-y-8">
          {/* Post Header */}
          <header className="space-y-6">
            <h1 className="text-[#181D27] font-bold text-[clamp(28px,6vw,36px)] leading-[clamp(38px,8vw,44px)] tracking-[-0.02em] max-w-[800px]">
              {post.title}
            </h1>

            {/* Author and Date */}
            <div className="flex items-center gap-4">
              <avatar_1.Avatar className="h-12 w-12">
                <avatar_1.AvatarImage src={getAvatarUrl(post.author.avatarUrl)} alt={post.author.name}/>
                <avatar_1.AvatarFallback>{post.author.name.charAt(0)}</avatar_1.AvatarFallback>
              </avatar_1.Avatar>
              <div>
                <p className="font-semibold text-[#181D27]">{post.author.name}</p>
                <p className="text-sm text-[#535862]">
                  {new Date(post.createdAt).toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        })}
                </p>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (<div key={tag} className="rounded-lg bg-white border-[#D5D7DA] border-solid border-[1px] box-border h-7 flex flex-row items-center justify-center px-2">
                  <div className="text-xs tracking-[-0.03em] leading-6 text-[#181D27]">{tag}</div>
                </div>))}
            </div>

            {/* Engagement Stats */}
            <div className="flex items-center gap-6 py-4 border-y border-[#E5E7EB]">
              <button onClick={handleLike} className="flex items-center gap-2 text-[#535862] hover:text-red-500 transition-colors">
                <lucide_react_1.ThumbsUp className={`h-5 w-5 ${post.isLiked ? "fill-red-500 text-red-500" : ""}`}/>
                <span className="text-sm tracking-[-0.03em] leading-7">{post.likes}</span>
              </button>
              <button onClick={() => setShowCommentsModal(true)} className="flex items-center gap-2 text-[#535862] hover:text-blue-500 transition-colors">
                <lucide_react_1.MessageSquare className="h-5 w-5"/>
                <span className="text-sm tracking-[-0.03em] leading-7">{comments.length}</span>
              </button>
            </div>
          </header>

          {/* Featured Image */}
          {post.imageUrl && (<div className="relative aspect-video rounded-lg overflow-hidden">
              <img src={getImageUrl(post.imageUrl)} alt={post.title} className="w-full h-full object-cover"/>
            </div>)}

          {/* Post Content */}
          <div className="prose prose-lg max-w-none">
            <div className="whitespace-pre-wrap text-[#181D27] leading-relaxed text-base tracking-[-0.03em]">
              {post.content}
            </div>
          </div>

          {/* Comments Section */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-[#181D27] tracking-[-0.03em]">
              Comments ({comments.length})
            </h2>

            {/* Add Comment Form */}
            <form onSubmit={handleComment} className="space-y-4">
              <textarea_1.Textarea placeholder="Write a comment..." value={newComment} onChange={(e) => setNewComment(e.target.value)} className="min-h-[100px] border-[#D5D7DA] focus:border-[#0093DD] text-[#181D27]"/>
              <button_1.Button type="submit" disabled={!newComment.trim()} className="bg-[#0093DD] hover:bg-[#007BB8] text-white font-semibold tracking-[-0.03em] rounded-full px-6">
                Post Comment
              </button_1.Button>
            </form>

            {/* Comments List */}
            <div className="space-y-6">
              {comments.map((comment) => (<div key={comment.id} className="flex gap-4">
                  <avatar_1.Avatar className="h-10 w-10 flex-shrink-0">
                    <avatar_1.AvatarImage src={getAvatarUrl(comment.author.avatarUrl)} alt={comment.author.name}/>
                    <avatar_1.AvatarFallback>{comment.author.name.charAt(0)}</avatar_1.AvatarFallback>
                  </avatar_1.Avatar>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-[#181D27] tracking-[-0.03em]">{comment.author.name}</span>
                      <span className="text-sm text-[#535862] tracking-[-0.03em]">
                        {new Date(comment.createdAt).toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
            })}
                      </span>
                    </div>
                    <p className="text-[#181D27] tracking-[-0.03em] leading-relaxed">{comment.content}</p>
                  </div>
                </div>))}
            </div>

            {comments.length === 0 && (<p className="text-center text-[#535862] py-8 tracking-[-0.03em]">
                No comments yet. Be the first to comment!
              </p>)}
          </section>
        </article>
      </main>

      {/* Comments Modal */}
      <comments_modal_1.CommentsModal isOpen={showCommentsModal} onClose={() => setShowCommentsModal(false)} comments={comments.map(comment => ({
            id: comment.id.toString(),
            author: {
                name: comment.author.name,
                avatar: getAvatarUrl(comment.author.avatarUrl)
            },
            content: comment.content,
            date: new Date(comment.createdAt).toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
            })
        }))} onAddComment={handleAddComment}/>
    </div>);
}
