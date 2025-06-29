"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = BlogCard;
const link_1 = __importDefault(require("next/link"));
const lucide_react_1 = require("lucide-react");
function BlogCard({ post, onLike, variant = "desktop" }) {
    // Helper to get image URL with fallback
    const getImageUrl = (imageUrl) => {
        return imageUrl || "/image-5.png";
    };
    // Helper to get avatar URL with fallback
    const getAvatarUrl = (avatarUrl) => {
        return avatarUrl || "/image-6.png";
    };
    if (variant === "sidebar") {
        return (<div className="flex-1 flex flex-col items-start justify-start gap-4">
        <div className="self-stretch flex flex-col items-start justify-start gap-1">
          <link_1.default href={`/post/${post.id}`}>
            <h3 className="self-stretch relative tracking-[-0.03em] leading-[clamp(24px,5vw,30px)] font-bold text-[#374151] hover:text-[#0093DD] transition-colors cursor-pointer" style={{ fontSize: 'clamp(14px, 2.5vw, 16px)' }}>
              {post.title}
            </h3>
          </link_1.default>
          <p className="self-stretch relative tracking-[-0.03em] leading-[clamp(20px,4vw,28px)] text-[#374151] [display:-webkit-inline-box] overflow-hidden text-ellipsis [-webkit-line-clamp:2] [-webkit-box-orient:vertical]" style={{ fontSize: 'clamp(12px, 2vw, 14px)' }}>
            {post.content}
          </p>
        </div>
        <div className="flex flex-row items-center justify-start gap-5 text-[#9CA3AF]" style={{ fontSize: 'clamp(12px, 2vw, 14px)' }}>
          <button onClick={() => onLike(post.id)} className="flex flex-row items-center justify-start gap-1.5 hover:text-red-500 transition-colors">
            <lucide_react_1.ThumbsUp className="relative shrink-0" style={{ width: 'clamp(16px, 3vw, 20px)', height: 'clamp(16px, 3vw, 20px)' }} fill={post.isLiked ? "#ef4444" : "none"} color={post.isLiked ? "#ef4444" : "currentColor"}/>
            <span className="relative tracking-[-0.03em] leading-[clamp(20px,4vw,28px)]">{post.likes}</span>
          </button>
          <div className="flex flex-row items-center justify-start gap-1.5">
            <lucide_react_1.MessageSquare className="relative shrink-0 overflow-hidden" style={{ width: 'clamp(16px, 3vw, 20px)', height: 'clamp(16px, 3vw, 20px)' }}/>
            <span className="relative tracking-[-0.03em] leading-[clamp(20px,4vw,28px)]">{post.comments}</span>
          </div>
        </div>
      </div>);
    }
    if (variant === "mobile") {
        return (<div className="self-stretch bg-white flex flex-col items-start justify-center" style={{ gap: 'clamp(12px, 3vw, 16px)' }}>
        {/* Mobile Image - Responsive with proper aspect ratio */}
        <link_1.default href={`/post/${post.id}`}>
          <div className="w-full relative rounded-md overflow-hidden hover:opacity-90 transition-opacity cursor-pointer" style={{
                height: 'clamp(180px, 40vw, 240px)',
                aspectRatio: '16/9'
            }}>
            <img className="w-full h-full object-cover" alt="" src={getImageUrl(post.imageUrl)}/>
          </div>
        </link_1.default>
        
        <div className="self-stretch flex flex-col items-start justify-start" style={{ gap: 'clamp(8px, 2vw, 12px)' }}>
          <div className="self-stretch flex flex-col items-start justify-start" style={{ gap: 'clamp(6px, 1.5vw, 8px)' }}>
            <link_1.default href={`/post/${post.id}`}>
              <h2 className="self-stretch relative tracking-[-0.03em] leading-[clamp(24px,5vw,30px)] font-bold text-[#374151] hover:text-[#0093DD] transition-colors cursor-pointer" style={{ fontSize: 'clamp(14px, 3vw, 16px)' }}>
                {post.title}
              </h2>
            </link_1.default>
            <div className="flex flex-row items-start justify-start flex-wrap" style={{ gap: 'clamp(4px, 1vw, 8px)' }}>
              {post.tags.map((tag) => (<div key={tag} className="rounded-lg bg-white border-[#E5E7EB] border-solid border-[1px] box-border flex flex-row items-center justify-center" style={{
                    height: 'clamp(24px, 5vw, 28px)',
                    padding: 'clamp(4px, 1vw, 8px)'
                }}>
                  <span className="relative tracking-[-0.03em] leading-6 text-[#374151]" style={{ fontSize: 'clamp(10px, 2vw, 12px)' }}>{tag}</span>
                </div>))}
            </div>
            <p className="self-stretch relative tracking-[-0.03em] leading-[clamp(18px,4vw,24px)] text-[#374151] [display:-webkit-inline-box] overflow-hidden text-ellipsis [-webkit-line-clamp:2] [-webkit-box-orient:vertical]" style={{ fontSize: 'clamp(11px, 2.5vw, 12px)' }}>
              {post.content}
            </p>
          </div>
          <div className="self-stretch flex flex-row items-center justify-start" style={{ gap: 'clamp(8px, 2vw, 12px)' }}>
            <div className="flex flex-row items-center justify-start" style={{ gap: 'clamp(4px, 1vw, 8px)' }}>
              <img className="relative rounded-[50%] max-h-full object-cover" style={{ width: 'clamp(24px, 5vw, 30px)', height: 'clamp(24px, 5vw, 30px)' }} alt="" src={getAvatarUrl(post.author.avatarUrl)}/>
              <span className="relative tracking-[-0.03em] leading-[clamp(18px,4vw,24px)] font-medium text-[#374151]" style={{ fontSize: 'clamp(10px, 2vw, 12px)' }}>
                {post.author.name}
              </span>
            </div>
            <div className="relative rounded-[50%] bg-[#6B7280]" style={{ width: 'clamp(3px, 0.5vw, 4px)', height: 'clamp(3px, 0.5vw, 4px)' }}/>
            <span className="relative tracking-[-0.03em] leading-[clamp(18px,4vw,24px)] text-[#9CA3AF]" style={{ fontSize: 'clamp(10px, 2vw, 12px)' }}>
              {new Date(post.createdAt).toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
            })}
            </span>
          </div>
          <div className="flex flex-row items-center justify-start text-[#9CA3AF]" style={{ gap: 'clamp(8px, 2vw, 12px)', fontSize: 'clamp(10px, 2vw, 12px)' }}>
            <button onClick={() => onLike(post.id)} className="flex flex-row items-center justify-start hover:text-red-500 transition-colors" style={{ gap: 'clamp(4px, 1vw, 6px)' }}>
              <lucide_react_1.ThumbsUp className="relative shrink-0" style={{ width: 'clamp(16px, 3vw, 20px)', height: 'clamp(16px, 3vw, 20px)' }} fill={post.isLiked ? "#ef4444" : "none"} color={post.isLiked ? "#ef4444" : "currentColor"}/>
              <span className="relative tracking-[-0.03em] leading-[clamp(18px,4vw,24px)]">{post.likes}</span>
            </button>
            <div className="flex flex-row items-center justify-start" style={{ gap: 'clamp(4px, 1vw, 6px)' }}>
              <lucide_react_1.MessageSquare className="relative shrink-0 overflow-hidden" style={{ width: 'clamp(16px, 3vw, 20px)', height: 'clamp(16px, 3vw, 20px)' }}/>
              <span className="relative tracking-[-0.03em] leading-[clamp(18px,4vw,24px)]">{post.comments}</span>
            </div>
          </div>
        </div>
      </div>);
    }
    // Desktop variant - Main fix for the cropping issue
    return (<div className="self-stretch bg-white flex flex-col md:flex-row items-start md:items-center justify-start" style={{ gap: 'clamp(16px, 3vw, 24px)' }}>
      <link_1.default href={`/post/${post.id}`} className="w-full md:w-auto flex-shrink-0">
        <div className="relative rounded-md overflow-hidden hover:opacity-90 transition-opacity cursor-pointer" style={{
            width: 'clamp(280px, 25vw, 340px)',
            height: 'clamp(200px, 18vw, 258px)',
            aspectRatio: '4/3'
        }}>
          <img className="w-full h-full object-cover" alt="" src={getImageUrl(post.imageUrl)}/>
        </div>
      </link_1.default>
      <div className="flex-1 flex flex-col items-start justify-start" style={{ gap: 'clamp(12px, 2.5vw, 16px)' }}>
        <div className="self-stretch flex flex-col items-start justify-start" style={{ gap: 'clamp(8px, 2vw, 12px)' }}>
          <link_1.default href={`/post/${post.id}`}>
            <h2 className="self-stretch relative tracking-[-0.03em] leading-[clamp(28px,6vw,34px)] font-bold text-[#374151] hover:text-[#0093DD] transition-colors cursor-pointer" style={{ fontSize: 'clamp(18px, 4vw, 20px)' }}>
              {post.title}
            </h2>
          </link_1.default>
          <div className="flex flex-row items-start justify-start flex-wrap" style={{ gap: 'clamp(6px, 1.5vw, 8px)' }}>
            {post.tags.map((tag) => (<div key={tag} className="rounded-lg bg-white border-[#E5E7EB] border-solid border-[1px] box-border flex flex-row items-center justify-center" style={{
                height: 'clamp(24px, 5vw, 28px)',
                padding: 'clamp(6px, 1.5vw, 8px)'
            }}>
                <span className="relative tracking-[-0.03em] leading-6 text-[#374151]" style={{ fontSize: 'clamp(11px, 2.5vw, 12px)' }}>{tag}</span>
              </div>))}
          </div>
          <p className="self-stretch relative tracking-[-0.03em] leading-[clamp(20px,4vw,28px)] text-[#374151] [display:-webkit-inline-box] overflow-hidden text-ellipsis [-webkit-line-clamp:3] [-webkit-box-orient:vertical]" style={{ fontSize: 'clamp(12px, 2.5vw, 14px)' }}>
            {post.content}
          </p>
        </div>
        <div className="self-stretch flex flex-row items-center justify-start" style={{ gap: 'clamp(8px, 2vw, 12px)' }}>
          <div className="flex flex-row items-center justify-start" style={{ gap: 'clamp(6px, 1.5vw, 8px)' }}>
            <img className="relative rounded-[50%] max-h-full object-cover" style={{ width: 'clamp(32px, 6vw, 40px)', height: 'clamp(32px, 6vw, 40px)' }} alt="" src={getAvatarUrl(post.author.avatarUrl)}/>
            <span className="relative tracking-[-0.03em] leading-[clamp(20px,4vw,28px)] font-medium text-[#374151]" style={{ fontSize: 'clamp(12px, 2.5vw, 14px)' }}>
              {post.author.name}
            </span>
          </div>
          <div className="relative rounded-[50%] bg-[#6B7280]" style={{ width: 'clamp(4px, 0.8vw, 5px)', height: 'clamp(4px, 0.8vw, 5px)' }}/>
          <span className="relative tracking-[-0.03em] leading-[clamp(20px,4vw,28px)] text-[#9CA3AF]" style={{ fontSize: 'clamp(12px, 2.5vw, 14px)' }}>
            {new Date(post.createdAt).toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        })}
          </span>
        </div>
        <div className="flex flex-row items-center justify-start text-[#9CA3AF]" style={{ gap: 'clamp(12px, 3vw, 20px)', fontSize: 'clamp(12px, 2.5vw, 14px)' }}>
          <button onClick={() => onLike(post.id)} className="flex flex-row items-center justify-start hover:text-red-500 transition-colors" style={{ gap: 'clamp(6px, 1.5vw, 8px)' }}>
            <lucide_react_1.ThumbsUp className="relative shrink-0" style={{ width: 'clamp(20px, 4vw, 24px)', height: 'clamp(20px, 4vw, 24px)' }} fill={post.isLiked ? "#ef4444" : "none"} color={post.isLiked ? "#ef4444" : "currentColor"}/>
            <span className="relative tracking-[-0.03em] leading-[clamp(20px,4vw,28px)]">{post.likes}</span>
          </button>
          <div className="flex flex-row items-center justify-start" style={{ gap: 'clamp(6px, 1.5vw, 8px)' }}>
            <lucide_react_1.MessageSquare className="relative shrink-0 overflow-hidden" style={{ width: 'clamp(20px, 4vw, 24px)', height: 'clamp(20px, 4vw, 24px)' }}/>
            <span className="relative tracking-[-0.03em] leading-[clamp(20px,4vw,28px)]">{post.comments}</span>
          </div>
        </div>
      </div>
    </div>);
}
