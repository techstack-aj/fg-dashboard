import React from "react";
import {
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";

interface Props {
  value: number;
  height?: number;
}

// Recharts Radial Gauge 0..100
export default function GaugeRadial({ value, height = 160 }: Props) {
  const v = Math.max(0, Math.min(100, value));
  const data = [
    {
      name: "FGI",
      value: v,
      fill: v < 34 ? "#ef4444" : v > 66 ? "#22c55e" : "#f59e0b",
    },
  ];
  return (
    <div style={{ height }} className="w-[160px]">
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          innerRadius="70%"
          outerRadius="100%"
          data={data}
          startAngle={180}
          endAngle={0}
        >
          <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
          <RadialBar dataKey="value" cornerRadius={10} />
        </RadialBarChart>
      </ResponsiveContainer>
      <div className="-mt-10 text-center">
        <div className="text-sm text-zinc-200">{v}</div>
        <div className="text-xs text-zinc-400">
          {v < 34 ? "Fear" : v > 66 ? "Greed" : "Neutral"}
        </div>
      </div>
    </div>
  );
}
