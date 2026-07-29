"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "next/link";

export function ChatBubble() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const { messages, sendMessage, status, setMessages, error } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" })
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Auto-scroll to bottom
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "auto" });
    }
  }, [messages]);

  const isLoading = status === "submitted" || status === "streaming";

  const onFormSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputValue || !inputValue.trim() || isLoading) return;
    
    // reset textarea height
    const textarea = document.getElementById("chat-textarea");
    if (textarea) textarea.style.height = 'auto';

    sendMessage({ text: inputValue });
    setInputValue("");
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 p-4 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 hover:scale-105 transition-all z-40 ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
        aria-label="Open Chat"
      >
        <MessageCircle size={28} />
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9, originX: 1, originY: 1 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-6 right-6 w-80 sm:w-96 h-[500px] max-h-[80vh] bg-white dark:bg-zinc-950 border rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-blue-600 p-4 flex items-center justify-between text-white">
              <div className="flex items-center gap-2">
                <MessageCircle size={20} />
                <h3 className="font-semibold">GroupHub AI</h3>
              </div>
              <div className="flex items-center gap-1">
                {messages.length > 0 && (
                  <button 
                    onClick={() => setMessages([])}
                    title="Xóa đoạn chat"
                    className="text-white hover:bg-blue-700 p-1 rounded-md transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                )}
                <button 
                  onClick={() => setIsOpen(false)}
                  title="Đóng cửa sổ"
                  className="text-white hover:bg-blue-700 p-1 rounded-md transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-zinc-50 dark:bg-zinc-900/50">
              {/* Default Welcome Message & Suggested Prompts */}
              {messages.length === 0 && (
                <div className="flex flex-col items-center justify-center text-center mt-4 mb-4 space-y-3">
                  <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/50 text-blue-600 rounded-full flex items-center justify-center mb-1 shadow-sm">
                    <MessageCircle size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                    Xin chào! 👋
                  </h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-[260px] leading-relaxed">
                    Tôi là trợ lý AI của GroupHub. Tôi có thể hỗ trợ bạn tìm kiếm và khám phá các cộng đồng chất lượng trong nháy mắt.
                  </p>
                  
                  <div className="flex flex-col gap-2 w-full mt-4 px-2">
                    {[
                      "Giới thiệu cho tôi các cộng đồng nổi bật nhất",
                      "Có những nhóm nào đông thành viên nhất?",
                      "Giúp tôi tìm nhóm theo một lĩnh vực cụ thể",
                      "Trợ lý AI có thể giúp gì cho tôi?"
                    ].map((prompt, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          sendMessage({ text: prompt });
                        }}
                        className="text-sm text-left p-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-700 hover:border-blue-300 dark:hover:border-blue-700 transition-all text-zinc-700 dark:text-zinc-300 shadow-sm"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((msg) => {
                const msgText = (msg as any).content || ((msg as any).parts as { text?: string, type?: string }[] | undefined)?.map(p => p.text || "").join("") || (msg as any).text || "";
                const hasTools = (msg as any).toolInvocations && (msg as any).toolInvocations.length > 0;
                
                return (
                  <div key={msg.id} className={`flex flex-col gap-2 w-full ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                    {(msgText.trim().length > 0 || (!hasTools && msg.role !== 'user')) && (
                      <div className={`max-w-[85%] p-3 rounded-2xl break-words whitespace-pre-wrap text-sm ${
                        msg.role === 'user' 
                          ? 'bg-blue-600 text-white rounded-tr-sm' 
                          : 'bg-white dark:bg-zinc-800 border text-zinc-800 dark:text-zinc-200 rounded-tl-sm shadow-sm'
                      }`}>
                        {msg.role === "user" ? (
                          msgText
                        ) : msgText ? (
                          <div className="prose prose-sm dark:prose-invert prose-p:leading-relaxed prose-pre:p-0 max-w-none">
                            <ReactMarkdown 
                              remarkPlugins={[remarkGfm]}
                              components={{
                                a: ({ node, ...props }) => <a {...props} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer" />,
                                code({ node, inline, className, children, ...props }: any) {
                                  const match = /language-(\w+)/.exec(className || '');
                                  if (!inline && match && match[1] === 'community_card') {
                                    try {
                                      const groups = JSON.parse(String(children).replace(/\n$/, ''));
                                      const groupArray = Array.isArray(groups) ? groups : [groups];
                                      
                                      return (
                                        <div className="flex flex-col gap-2 my-2 w-full">
                                          {groupArray.map((group: any, idx: number) => {
                                            const slug = group.slug || group.url?.split('/').pop();
                                            return (
                                            <Link 
                                              key={idx} 
                                              href={`/community/${slug}`}
                                              className="block p-3 rounded-xl border border-zinc-200 dark:border-zinc-700 hover:border-blue-500 transition-colors bg-zinc-50 dark:bg-zinc-800/50 no-underline w-full overflow-hidden"
                                            >
                                              <div className="font-medium text-zinc-900 dark:text-zinc-100 truncate w-full">{group.name}</div>
                                              {group.description && (
                                                <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 line-clamp-2 font-normal whitespace-pre-wrap">
                                                  {group.description}
                                                </div>
                                              )}
                                              <div className="flex flex-wrap gap-2 mt-2 w-full">
                                                {group.memberCount !== undefined && (
                                                  <span className="text-xs bg-zinc-200 dark:bg-zinc-700 px-2 py-0.5 rounded-full text-zinc-700 dark:text-zinc-300 font-normal whitespace-nowrap">
                                                    {group.memberCount.toLocaleString()} thành viên
                                                  </span>
                                                )}
                                                {group.platform && (
                                                  <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-full font-normal whitespace-nowrap">
                                                    {group.platform}
                                                  </span>
                                                )}
                                              </div>
                                            </Link>
                                          )})}
                                        </div>
                                      );
                                    } catch (e) {
                                      return <code className={className} {...props}>{children}</code>;
                                    }
                                  }
                                  return <code className={className} {...props}>{children}</code>;
                                }
                              }}
                            >
                              {msgText}
                            </ReactMarkdown>
                          </div>
                        ) : (
                          <span className="italic text-zinc-400 flex items-center gap-2">
                            <div className="w-3 h-3 border-2 border-zinc-400 border-t-transparent rounded-full animate-spin" />
                            Đang xử lý...
                          </span>
                        )}
                      </div>
                    )}
                    
                    {hasTools && (
                      <div className="w-full flex flex-col gap-2 mt-1">
                        {(msg as any).toolInvocations!.map((tool: any) => (
                          <div key={tool.toolCallId} className="flex flex-col gap-2 w-full">
                            {tool.toolName === 'searchCommunitiesTool' && (
                              <>
                                <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                                  Đã tìm thấy các nhóm:
                                </span>
                                {'result' in tool && tool.result && Array.isArray(tool.result) ? (
                                  <div className="grid gap-2 w-full">
                                    {tool.result.map((group: any) => (
                                      <Link 
                                        key={group.id} 
                                        href={`/community/${group.slug}`} 
                                        className="block p-3 rounded-xl border border-zinc-200 dark:border-zinc-700 hover:border-blue-500 transition-colors bg-zinc-50 dark:bg-zinc-800/50 overflow-hidden"
                                      >
                                        <div className="font-medium text-zinc-900 dark:text-zinc-100 truncate">{group.name}</div>
                                        {group.description && (
                                          <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 line-clamp-2">
                                            {group.description}
                                          </div>
                                        )}
                                        <div className="flex flex-wrap gap-2 mt-2">
                                          {group.memberCount !== undefined && (
                                            <span className="text-xs bg-zinc-200 dark:bg-zinc-700 px-2 py-0.5 rounded-full whitespace-nowrap">
                                              {group.memberCount.toLocaleString()} thành viên
                                            </span>
                                          )}
                                          {group.platform && (
                                            <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-full whitespace-nowrap">
                                              {group.platform}
                                            </span>
                                          )}
                                        </div>
                                      </Link>
                                    ))}
                                    {tool.result.length === 0 && (
                                      <span className="text-sm text-zinc-500">Không tìm thấy nhóm nào phù hợp.</span>
                                    )}
                                  </div>
                                ) : (
                                  <span className="italic text-zinc-400 flex items-center gap-2">
                                    <div className="w-3 h-3 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                                    Đang tìm kiếm...
                                  </span>
                                )}
                              </>
                            )}
                            
                            {tool.toolName === 'getTopCommunitiesTool' && (
                              <>
                                <span className="text-sm font-medium text-purple-600 dark:text-purple-400">
                                  Cộng đồng nổi bật nhất:
                                </span>
                                {'result' in tool && tool.result && Array.isArray(tool.result) ? (
                                  <div className="grid gap-2 w-full">
                                    {tool.result.map((group: any) => (
                                      <Link 
                                        key={group.id} 
                                        href={`/community/${group.slug}`} 
                                        className="block p-3 rounded-xl border border-zinc-200 dark:border-zinc-700 hover:border-purple-500 transition-colors bg-purple-50/50 dark:bg-purple-900/10 overflow-hidden"
                                      >
                                        <div className="font-medium text-zinc-900 dark:text-zinc-100 truncate">{group.name}</div>
                                        <div className="flex flex-wrap gap-2 mt-2">
                                          {group.memberCount !== undefined && (
                                            <span className="text-xs bg-zinc-200 dark:bg-zinc-700 px-2 py-0.5 rounded-full whitespace-nowrap">
                                              {group.memberCount.toLocaleString()} thành viên
                                            </span>
                                          )}
                                          {group.platform && (
                                            <span className="text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-2 py-0.5 rounded-full whitespace-nowrap">
                                              {group.platform}
                                            </span>
                                          )}
                                        </div>
                                      </Link>
                                    ))}
                                    {tool.result.length === 0 && (
                                      <span className="text-sm text-zinc-500">Chưa có cộng đồng nào.</span>
                                    )}
                                  </div>
                                ) : (
                                  <span className="italic text-zinc-400 flex items-center gap-2">
                                    <div className="w-3 h-3 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
                                    Đang tải...
                                  </span>
                                )}
                              </>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
              
              {isLoading && messages[messages.length - 1]?.role === 'user' && (
                <div className="flex justify-start">
                  <div className="p-4 rounded-2xl bg-white dark:bg-zinc-800 border rounded-tl-sm shadow-sm">
                    <div className="flex gap-1.5 items-center">
                      <div className="w-2 h-2 rounded-full bg-zinc-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 rounded-full bg-zinc-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 rounded-full bg-zinc-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
              {error && (
                <div className="flex gap-3 justify-center text-red-500 text-sm mt-4 p-3 bg-red-50 dark:bg-red-950/20 rounded-xl">
                  <span>Có lỗi xảy ra: {error.message || "Không thể kết nối tới AI"}</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-white dark:bg-zinc-950 border-t">
              <form onSubmit={onFormSubmit} className="flex gap-2 items-end">
                <textarea
                  id="chat-textarea"
                  value={inputValue}
                  onChange={(e) => {
                    setInputValue(e.target.value);
                    e.target.style.height = 'auto';
                    e.target.style.height = `${e.target.scrollHeight}px`;
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      onFormSubmit();
                    }
                  }}
                  placeholder="Nhập tin nhắn..."
                  className="flex-1 px-4 py-3 bg-zinc-100 dark:bg-zinc-900 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 resize-none min-h-[44px] max-h-[120px] overflow-y-auto"
                  rows={1}
                />
                <Button 
                  type="submit" 
                  size="icon" 
                  disabled={isLoading || !inputValue || !inputValue.trim()}
                  className="rounded-full h-11 w-11 shrink-0 bg-blue-600 hover:bg-blue-700"
                >
                  <Send size={18} />
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
