"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MostLikedSection;
const lucide_react_1 = require("lucide-react");
const section_title_1 = __importDefault(require("./section-title"));
function MostLikedSection({ posts, onLike }) {
    return (<div className="flex-1 w-full relative flex flex-col items-start justify-start gap-5 text-left text-base text-[#374151] font-inter">
      <section_title_1.default variant="sidebar">Most Liked</section_title_1.default>
      <div className="self-stretch bg-white flex flex-col items-start justify-start gap-4">
        {posts.map((post, index) => (<div key={post.id}>
            <div className="flex-1 flex flex-col items-start justify-start gap-4">
              <div className="self-stretch flex flex-col items-start justify-start gap-1">
                <h3 className="self-stretch relative tracking-[-0.03em] leading-[30px] font-bold">{post.title}</h3>
                <p className="self-stretch relative text-sm tracking-[-0.03em] leading-7 [display:-webkit-inline-box] overflow-hidden text-ellipsis [-webkit-line-clamp:2] [-webkit-box-orient:vertical]">
                  {post.content}
                </p>
              </div>
              <div className="flex flex-row items-center justify-start gap-5 text-sm text-[#9CA3AF]">
                <button onClick={() => onLike(post.id)} className="flex flex-row items-center justify-start gap-1.5 hover:text-red-500 transition-colors">
                  <lucide_react_1.ThumbsUp className={`w-5 relative h-5 ${post.isLiked ? "fill-red-500 text-red-500" : ""}`}/>
                  <span className="relative tracking-[-0.03em] leading-7">{post.likes}</span>
                </button>
                <div className="flex flex-row items-center justify-start gap-1.5">
                  <lucide_react_1.MessageSquare className="w-5 relative h-5 overflow-hidden shrink-0"/>
                  <span className="relative tracking-[-0.03em] leading-7">{post.comments}</span>
                </div>
              </div>
            </div>
            {index < posts.length - 1 && (<div className="self-stretch relative border-[#E5E7EB] border-solid border-t-[1px] box-border h-px my-4"/>)}
          </div>))}
      </div>
    </div>);
}
