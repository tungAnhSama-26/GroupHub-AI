import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

import Providers from "@/components/providers";
import { ChatBubble } from "@/components/chat-bubble";

export const metadata: Metadata = {
  title: "GroupHub AI - Kết Nối Nhóm - Chia Sẻ Tri Thức - AI Hỗ Trợ",
  description: "GroupHub AI - Nền tảng kết nối nhóm, chia sẻ tri thức với sự hỗ trợ của trí tuệ nhân tạo.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} min-h-full flex flex-col font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Providers>
            {children}
            <ChatBubble />
          </Providers>
          <Toaster richColors position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
