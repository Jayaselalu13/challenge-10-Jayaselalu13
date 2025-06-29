"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MainContentSection;
const lucide_react_1 = require("lucide-react");
const link_1 = __importDefault(require("next/link"));
const section_title_1 = __importDefault(require("./section-title"));
function MainContentSection({ posts, onLike, currentPage, totalPages, onPageChange, }) {
    return (<div className="w-[807px] flex flex-col items-center justify-center gap-6">
      <section_title_1.default>Recommend For You</section_title_1.default>

      {/* Blog Posts */}
        {posts.map((post, index) => (<div key={post.id}>
            <div className="self-stretch bg-white flex flex-row items-center justify-start gap-6">
                <img className="w-[340px] relative rounded-md h-[258px] object-cover" alt="" src={post.image || "/image-5.png"}/>
              <div className="flex-1 flex flex-col items-start justify-start gap-4">
              <div className="self-stretch flex flex-col items-start justify-start gap-3">
                  <link_1.default href={`/post/${post.id}`}>
                  <h2 className="self-stretch relative text-xl tracking-[-0.03em] leading-[34px] font-bold text-[#181D27] cursor-pointer hover:text-[#0093DD] transition-colors">
                      {post.title}
                    </h2>
                  </link_1.default>
                <div className="flex flex-row items-start justify-start gap-2">
                    {post.tags.map((tag) => (<div key={tag} className="rounded-lg bg-white border-[#D5D7DA] border-solid border-[1px] box-border h-7 flex flex-row items-center justify-center p-2">
                      <div className="relative text-xs tracking-[-0.03em] leading-6 text-[#181D27] [display:-webkit-inline-box] overflow-hidden text-ellipsis [-webkit-line-clamp:2] [-webkit-box-orient:vertical]">{tag}</div>
                      </div>))}
                  </div>
                <div className="self-stretch relative text-sm tracking-[-0.03em] leading-7 text-[#181D27] [display:-webkit-inline-box] overflow-hidden text-ellipsis [-webkit-line-clamp:2] [-webkit-box-orient:vertical]">
                    {post.content}
                </div>
                </div>
                <div className="self-stretch flex flex-row items-center justify-start gap-3">
                  <div className="flex flex-row items-center justify-start gap-2">
                  <img className="w-10 relative rounded-[50%] max-h-full object-cover" alt="" src={post.author.avatar || "/image-6.png"}/>
                  <div className="relative tracking-[-0.03em] leading-7 font-medium text-sm text-[#181D27] [display:-webkit-inline-box] overflow-hidden text-ellipsis [-webkit-line-clamp:2] [-webkit-box-orient:vertical]">
                      {post.author.name}
                  </div>
                </div>
                <div className="w-1 relative rounded-[50%] bg-[#535862] h-1"/>
                <div className="relative tracking-[-0.03em] leading-7 text-[#535862] text-sm [display:-webkit-inline-box] overflow-hidden text-ellipsis [-webkit-line-clamp:2] [-webkit-box-orient:vertical]">
                  {new Date(post.createdAt).toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
            })}
                </div>
              </div>
              <div className="flex flex-row items-center justify-start gap-5 text-[#535862]">
                  <button onClick={() => onLike(post.id)} className="flex flex-row items-center justify-start gap-1.5 hover:text-red-500 transition-colors">
                    <lucide_react_1.ThumbsUp className={`w-5 relative h-5 ${post.isLiked ? "fill-red-500 text-red-500" : ""}`}/>
                  <div className="relative tracking-[-0.03em] leading-7 text-sm">{post.likes}</div>
                  </button>
                                    <div className="flex flex-row items-center justify-start gap-1.5">
                    <lucide_react_1.MessageSquare className="w-5 relative h-5 overflow-hidden shrink-0"/>
                    <div className="relative tracking-[-0.03em] leading-7 text-sm">{post.comments}</div>
                  </div>
                <div className="flex flex-row items-center justify-start gap-1.5 opacity-0">
                  <lucide_react_1.MessageSquare className="w-5 relative h-5 overflow-hidden shrink-0"/>
                  <div className="relative tracking-[-0.03em] leading-7 text-sm">20</div>
                  </div>
                </div>
              </div>
            </div>
            {index < posts.length - 1 && (<div className="self-stretch relative border-[#D5D7DA] border-solid border-t-[1px] box-border h-px"/>)}
          </div>))}

      {/* Pagination */}
      <div className="w-[368px] bg-white flex flex-row items-center justify-start gap-4">
        <button onClick={() => onPageChange(Math.max(1, currentPage - 1))} disabled={currentPage === 1} className="flex flex-row items-center justify-start gap-1.5 text-[#535862]">
          <lucide_react_1.ChevronLeft className="w-6 relative h-6 overflow-hidden shrink-0"/>
          <div className="relative tracking-[-0.03em] leading-7">Previous</div>
        </button>
        <div className="flex flex-row items-center justify-start text-center">
          {Array.from({ length: Math.min(totalPages, 4) }, (_, i) => {
            const pageNum = i + 1;
            const isActive = pageNum === currentPage;
            return (<button key={pageNum} onClick={() => onPageChange(pageNum)} className={`w-12 h-12 flex flex-col items-center justify-center p-2 box-border ${isActive
                    ? "rounded-[9999px] bg-[#0093DD] text-white"
                    : "text-[#535862]"}`}>
                <div className="self-stretch relative tracking-[-0.03em] leading-7">
                  {pageNum}
          </div>
              </button>);
        })}
          {totalPages > 4 && (<div className="w-12 h-12 flex flex-col items-center justify-center p-2 box-border">
              <div className="self-stretch relative tracking-[-0.03em] leading-7 text-[#535862]">...</div>
          </div>)}
        </div>
        <button onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages} className="flex flex-row items-center justify-start gap-1.5 text-[#535862]">
          <div className="relative tracking-[-0.03em] leading-7">Next</div>
          <lucide_react_1.ChevronRight className="w-6 relative h-6 overflow-hidden shrink-0"/>
        </button>
      </div>
    </div>);
}
