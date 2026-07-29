"use client";

import React from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

interface AccessData {
  name: string;
  visitors: number;
}

interface CategoryData {
  name: string;
  count: number;
}

interface GroupData {
  name: string;
  groups: number;
}

const accessData: AccessData[] = [
  { name: "T2", visitors: 400 },
  { name: "T3", visitors: 300 },
  { name: "T4", visitors: 550 },
  { name: "T5", visitors: 450 },
  { name: "T6", visitors: 700 },
  { name: "T7", visitors: 800 },
  { name: "CN", visitors: 950 },
];

const categoryData: CategoryData[] = [
  { name: "IT", count: 120 },
  { name: "Marketing", count: 98 },
  { name: "Thiết kế", count: 86 },
  { name: "Giáo dục", count: 65 },
  { name: "Kinh doanh", count: 54 },
];

const groupData: GroupData[] = [
  { name: "Tuần 1", groups: 12 },
  { name: "Tuần 2", groups: 19 },
  { name: "Tuần 3", groups: 15 },
  { name: "Tuần 4", groups: 22 },
];

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'];

export function DashboardCharts() {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 w-full animate-pulse h-[300px] bg-zinc-100 dark:bg-zinc-900 rounded-xl"></div>;
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 w-full">
      {/* Biểu đồ số lượng người truy cập (Line Chart) */}
      <div className="bg-white dark:bg-zinc-950 p-6 rounded-xl border shadow-sm">
        <h3 className="font-semibold text-lg mb-4 text-zinc-800 dark:text-zinc-100">
          Lượt truy cập trong tuần
        </h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={accessData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
              <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
              />
              <Line type="monotone" dataKey="visitors" name="Lượt truy cập" stroke="#2563eb" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Biểu đồ ngành nghề (Bar Chart) */}
      <div className="bg-white dark:bg-zinc-950 p-6 rounded-xl border shadow-sm">
        <h3 className="font-semibold text-lg mb-4 text-zinc-800 dark:text-zinc-100">
          Phân bố top 5 ngành nghề
        </h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={categoryData} layout="vertical" margin={{ top: 5, right: 20, bottom: 5, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" horizontal={true} vertical={false} />
              <XAxis type="number" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis dataKey="name" type="category" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} width={80} />
              <Tooltip
                cursor={{ fill: "rgba(0,0,0,0.05)" }}
                contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
              />
              <Bar dataKey="count" name="Số lượng người dùng" fill="#10b981" radius={[0, 4, 4, 0]} barSize={24} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Biểu đồ tròn cơ cấu ngành nghề (Pie Chart) */}
      <div className="bg-white dark:bg-zinc-950 p-6 rounded-xl border shadow-sm xl:col-span-1">
        <h3 className="font-semibold text-lg mb-4 text-zinc-800 dark:text-zinc-100">
          Tỷ lệ ngành nghề
        </h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="count"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
              />
              <Legend verticalAlign="bottom" height={36}/>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Biểu đồ hội nhóm (Bar Chart) */}
      <div className="bg-white dark:bg-zinc-950 p-6 rounded-xl border shadow-sm xl:col-span-1">
        <h3 className="font-semibold text-lg mb-4 text-zinc-800 dark:text-zinc-100">
          Số lượng hội nhóm mới tạo trong tháng
        </h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={groupData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
              <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip
                cursor={{ fill: "rgba(0,0,0,0.05)" }}
                contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
              />
              <Bar dataKey="groups" name="Nhóm mới" fill="#8b5cf6" radius={[4, 4, 0, 0]} barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
