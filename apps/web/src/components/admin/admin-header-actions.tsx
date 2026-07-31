"use client";

import { Bell, Home, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSession, signOut } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { getRecentActivities } from "@/app/admin/actions";

const ACTION_MAP: Record<string, string> = {
  VERIFY_COMMUNITY: "Kiểm duyệt hội nhóm",
  CREATE_COMMUNITY: "Tạo hội nhóm",
  APPROVE_USER: "Duyệt thành viên",
  REJECT_USER: "Từ chối thành viên",
  TOGGLE_USER_ROLE: "Đổi quyền quản trị",
  UPDATE_USER_ROLE: "Cập nhật quyền",
  TOGGLE_USER_BAN: "Khóa tài khoản",
  LOGIN: "Đăng nhập",
  REGISTER: "Đăng ký mới",
  CHAT_AI: "Trò chuyện AI",
};

export function AdminHeaderActions() {
  const { data: session } = useSession();
  const router = useRouter();
  const [activities, setActivities] = useState<any[]>([]);

  useEffect(() => {
    if (session?.user?.role === "ADMIN") {
      getRecentActivities().then(setActivities);
    }
  }, [session?.user?.id, session?.user?.role]);

  return (
    <div className="flex items-center gap-4">
      <ThemeToggle />

      <DropdownMenu>
        <DropdownMenuTrigger className="relative flex items-center justify-center rounded-md text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 h-10 w-10 outline-none">
          <Bell className="h-5 w-5" />
          {activities.length > 0 ? <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500 border-2 border-white dark:border-zinc-900"></span> : null}
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-80 max-h-[400px] overflow-y-auto">
          <DropdownMenuLabel>Thông báo (Hoạt động gần đây)</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {activities.length === 0 ? (
            <DropdownMenuItem disabled className="justify-center p-4 text-zinc-500">
              Chưa có thông báo nào
            </DropdownMenuItem>
          ) : (
            activities.map((activity) => (
              <DropdownMenuItem key={activity.id} className="flex flex-col items-start p-3 gap-1 cursor-default">
                <div className="flex items-center gap-2 w-full">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={activity.user?.image || ""} />
                    <AvatarFallback>{activity.user?.name?.charAt(0) || "U"}</AvatarFallback>
                  </Avatar>
                  <span className="font-semibold text-sm line-clamp-1">{activity.user?.name || "Hệ thống"}</span>
                  <span className="text-xs text-zinc-500 ml-auto whitespace-nowrap">
                    {new Date(activity.createdAt).toLocaleDateString('vi-VN')}
                  </span>
                </div>
                <div className="text-sm">
                  <span className="text-blue-600 font-medium">{ACTION_MAP[activity.action] || activity.action}</span>
                  {activity.details && <span className="text-zinc-600 dark:text-zinc-400 text-xs block mt-0.5 line-clamp-2">{activity.details.replace(/[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}/gi, "").trim()}</span>}
                </div>
              </DropdownMenuItem>
            ))
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => router.push('/admin/users/history')} className="justify-center cursor-pointer text-blue-600 font-medium">
            Xem tất cả lịch sử
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {session?.user && (
        <DropdownMenu>
          <DropdownMenuTrigger className="outline-none">
            <div className="flex items-center gap-3 pl-4 border-l border-zinc-200 dark:border-zinc-800 cursor-pointer hover:opacity-80 transition-opacity">
              <div className="hidden md:flex flex-col items-end">
                <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{session.user.name}</span>
                <span className="text-xs text-zinc-500 dark:text-zinc-400">Admin</span>
              </div>
              <Avatar className="h-10 w-10 border shadow-sm hover:ring-2 hover:ring-blue-100 transition-all">
                <AvatarImage src={session.user.image || ""} alt={session.user.name || ""} />
                <AvatarFallback className="bg-blue-100 text-blue-700 font-medium">
                  {session.user.name?.charAt(0)?.toUpperCase() || "A"}
                </AvatarFallback>
              </Avatar>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-72">
            <DropdownMenuGroup>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{session.user.name}</p>
                  <p className="text-xs leading-none text-muted-foreground">{session.user.email}</p>
                </div>
              </DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => router.push('/')} className="cursor-pointer font-medium text-blue-600 flex items-center">
              <Home className="mr-2 h-4 w-4" />
              Về trang chủ
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={async () => {
              await signOut();
              router.push('/');
            }} className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50 flex items-center">
              <LogOut className="mr-2 h-4 w-4" />
              Đăng xuất
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
}
