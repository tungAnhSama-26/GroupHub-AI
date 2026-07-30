"use client";

import { useState } from "react";
import { 
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
  Legend
} from "recharts";
import { type AnalyticsData } from "@/app/analytics/actions";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

interface Props {
  data: AnalyticsData;
}

export function AnalyticsCharts({ data }: Props) {
  const [activeTab, setActiveTab] = useState<'platform' | 'domain'>('platform');

  return (
    <div className="w-full bg-white border border-neutral-200 rounded-3xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-xl font-bold text-neutral-900">Biểu đồ Phân bố</h3>
        <div className="flex bg-neutral-100 p-1 rounded-lg">
          <button
            onClick={() => setActiveTab('platform')}
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
              activeTab === 'platform' ? 'bg-white text-neutral-900 shadow-sm' : 'text-neutral-500 hover:text-neutral-700'
            }`}
          >
            Nền tảng
          </button>
          <button
            onClick={() => setActiveTab('domain')}
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
              activeTab === 'domain' ? 'bg-white text-neutral-900 shadow-sm' : 'text-neutral-500 hover:text-neutral-700'
            }`}
          >
            Lĩnh vực
          </button>
        </div>
      </div>

      <div className="h-[400px] w-full">
        {activeTab === 'platform' ? (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data.platformStats}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={150}
                innerRadius={80}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
                label={({ name, percent }: any) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
              >
                {data.platformStats.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: any) => [`${value} cộng đồng`, 'Số lượng']}
                contentStyle={{ borderRadius: '12px', border: '1px solid #e5e5e5', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Legend verticalAlign="bottom" height={36}/>
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data.domainStats}
              margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e5e5" />
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 12, fill: '#737373' }} 
                axisLine={false}
                tickLine={false}
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis 
                tick={{ fontSize: 12, fill: '#737373' }}
                axisLine={false}
                tickLine={false}
                allowDecimals={false}
              />
              <Tooltip
                cursor={{ fill: '#f5f5f5' }}
                contentStyle={{ borderRadius: '12px', border: '1px solid #e5e5e5', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                formatter={(value: any) => [`${value} cộng đồng`, 'Số lượng']}
              />
              <Bar dataKey="value" fill="#3b82f6" radius={[6, 6, 0, 0]}>
                {data.domainStats.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
