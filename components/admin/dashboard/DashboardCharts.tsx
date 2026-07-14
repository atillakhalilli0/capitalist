"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { day: "B.e", views: 4200 },
  { day: "Ç.a", views: 5100 },
  { day: "Ç", views: 4800 },
  { day: "C.a", views: 7200 },
  { day: "C", views: 6800 },
  { day: "Ş", views: 9300 },
  { day: "B", views: 8100 },
];

export default function DashboardCharts() {
  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold">
          Son 7 günün baxış statistikası
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Məqalələrin gündəlik oxunma sayı
        </p>
      </div>

      <div className="h-[340px]">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <AreaChart data={data}>
            <defs>
              <linearGradient
                id="views"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor="currentColor"
                  stopOpacity={0.35}
                />
                <stop
                  offset="95%"
                  stopColor="currentColor"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="4 4" />

            <XAxis dataKey="day" />

            <YAxis />

            <Tooltip />

            <Area
              type="monotone"
              dataKey="views"
              stroke="currentColor"
              fill="url(#views)"
              strokeWidth={3}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}