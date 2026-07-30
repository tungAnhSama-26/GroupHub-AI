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

/**
 * Extracts community data and cleans AI message text.
 * Returns clean text (no JSON visible) + extracted communities for card rendering.
 * Handles: code blocks, raw JSON, <function=...> hallucinations, and incomplete streaming.
 */
function extractAndCleanMessage(text: string, isStreaming: boolean): {
  cleanText: string;
  communities: any[];
} {
  let cleaned = text;
  const communities: any[] = [];

  // 1. Remove ALL variations of function call hallucinations
  // Catches: <function=tool>, /function=tool>, function=tool>, etc.
  // Once the AI starts hallucinating tool calls, strip from first match to end
  cleaned = cleaned.replace(/[<\/]*function=\w+>[\s\S]*/g, '');

  // 2. Remove orphaned </function> closing tags (no matching open tag)
  cleaned = cleaned.replace(/<\/function>/g, '');

  // 3. During streaming, detect and hide incomplete content
  if (isStreaming) {
    // Hide incomplete code blocks (odd number of ```)
    const codeBlockMarkers = [...cleaned.matchAll(/```/g)];
    if (codeBlockMarkers.length % 2 !== 0 && codeBlockMarkers.length > 0) {
      const lastOpenIndex = codeBlockMarkers[codeBlockMarkers.length - 1].index!;
      cleaned = cleaned.substring(0, lastOpenIndex) + '\n\n⏳ *Đang tải dữ liệu...*';
      return { cleanText: cleaned.trim(), communities };
    }

    // Hide incomplete raw JSON (starts with [ or { containing "name" but not properly closed)
    const rawJsonStart = cleaned.search(/\[\s*\{?\s*"?name"?\s*:?/);
    if (rawJsonStart !== -1) {
      const afterJson = cleaned.substring(rawJsonStart);
      try {
        JSON.parse(afterJson);
      } catch {
        cleaned = cleaned.substring(0, rawJsonStart) + '\n\n⏳ *Đang tải dữ liệu...*';
        return { cleanText: cleaned.trim(), communities };
      }
    }

    // Also check for single object raw JSON
    const singleObjStart = cleaned.search(/\{\s*\n?\s*"name"\s*:/);
    if (singleObjStart !== -1 && rawJsonStart === -1) {
      const afterJson = cleaned.substring(singleObjStart);
      try {
        JSON.parse(afterJson);
      } catch {
        cleaned = cleaned.substring(0, singleObjStart) + '\n\n⏳ *Đang tải dữ liệu...*';
        return { cleanText: cleaned.trim(), communities };
      }
    }
  }

  // 4. Extract community JSON from ```community_card or ```json code blocks
  cleaned = cleaned.replace(/```(?:community_card|json)\s*([\s\S]*?)```/g, (_match, jsonStr) => {
    try {
      const parsed = JSON.parse(jsonStr.trim());
      const arr = Array.isArray(parsed) ? parsed : [parsed];
      if (arr.length > 0 && arr[0].name) {
        communities.push(...arr);
        return '';
      }
    } catch { /* not valid JSON, keep original */ }
    return _match;
  });

  // 5. Extract raw JSON arrays containing community objects (not in code blocks)
  cleaned = cleaned.replace(/\[\s*\{[\s\S]*?\}\s*\]/g, (match) => {
    try {
      const parsed = JSON.parse(match);
      const arr = Array.isArray(parsed) ? parsed : [parsed];
      if (arr.length > 0 && arr[0].name && (arr[0].url || arr[0].platform || arr[0].memberCount)) {
        communities.push(...arr);
        return '';
      }
    } catch { /* not valid JSON, keep original */ }
    return match;
  });

  // 6. Extract single raw JSON objects that look like community data
  cleaned = cleaned.replace(/\{\s*"name"\s*:[\s\S]*?"(?:platform|url|memberCount)"\s*:[\s\S]*?\}/g, (match) => {
    try {
      const parsed = JSON.parse(match);
      if (parsed.name && (parsed.url || parsed.platform || parsed.memberCount)) {
        communities.push(parsed);
        return '';
      }
    } catch { /* not valid JSON, keep original */ }
    return match;
  });

  // 7. Clean up orphaned JSON characters and extra whitespace left after removals
  // Remove lines that are just JSON punctuation: [ ] { } ,
  cleaned = cleaned.replace(/^\s*[[\]{}]\s*$/gm, '');
  cleaned = cleaned.replace(/^\s*,\s*$/gm, '');
  cleaned = cleaned.replace(/\n{3,}/g, '\n\n').trim();

  return { cleanText: cleaned, communities };
}

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

              {messages.map((msg, msgIndex) => {
                const msgText = (msg as any).content || ((msg as any).parts as { text?: string, type?: string }[] | undefined)?.map(p => p.text || "").join("") || (msg as any).text || "";
                const hasTools = (msg as any).toolInvocations && (msg as any).toolInvocations.length > 0;
                
                // Detect if this specific message is currently being streamed
                const isCurrentlyStreaming = isLoading && msg.role === 'assistant' && msgIndex === messages.length - 1;
                
                // Extract communities + clean text (strip JSON, hallucinations, incomplete blocks)
                const { cleanText: displayText, communities: extractedCommunities } = 
                  msg.role === 'user' 
                    ? { cleanText: msgText, communities: [] } 
                    : extractAndCleanMessage(msgText, isCurrentlyStreaming);
                
                return (
                  <div key={msg.id} className={`flex flex-col gap-2 w-full ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                    {(displayText.trim().length > 0 || (!hasTools && msg.role !== 'user' && extractedCommunities.length === 0)) && (
                      <div className={`max-w-[85%] p-3 rounded-2xl break-words whitespace-pre-wrap text-sm ${
                        msg.role === 'user' 
                          ? 'bg-blue-600 text-white rounded-tr-sm' 
                          : 'bg-white dark:bg-zinc-800 border text-zinc-800 dark:text-zinc-200 rounded-tl-sm shadow-sm'
                      }`}>
                        {msg.role === "user" ? (
                          msgText
                        ) : displayText ? (
                          <div className="prose prose-sm dark:prose-invert prose-p:leading-relaxed prose-pre:p-0 max-w-none">
                            <ReactMarkdown 
                              remarkPlugins={[remarkGfm]}
                              components={{
                                a: ({ node, ...props }) => <a {...props} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer" />,
                                pre({ children, ...props }: any) {
                                  return <>{children}</>;
                                },
                                code({ node, inline, className, children, ...props }: any) {
                                  return <code className={className} {...props}>{children}</code>;
                                }
                              }}
                            >
                              {displayText}
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
                    
                    {/* Render extracted communities as cards */}
                    {extractedCommunities.length > 0 && (
                      <div className="w-full flex flex-col gap-2 mt-1">
                        {extractedCommunities.map((group: any, idx: number) => {
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
                          );
                        })}
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
