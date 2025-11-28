import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { IndexPoint } from "../types";
import { useTranslation } from "react-i18next";

interface Props {
  data: IndexPoint[];
  height?: number;
}

export default function IndexChart({ data, height = 220 }: Props) {
  const { i18n } = useTranslation();

  const formatDate = React.useCallback((dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(i18n.language, {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }, [i18n.language]);

  const CustomTooltip = React.useCallback(({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const point = payload[0].payload as IndexPoint;
      return (
        <div style={{
          background: "#18181b",
          border: "1px solid #27272a",
          padding: "8px 12px",
          borderRadius: "6px",
          color: "#fafafa"
        }}>
          <div style={{ fontSize: "12px", marginBottom: "4px" }}>
            {formatDate(point.date)}
          </div>
          <div style={{ fontSize: "14px", fontWeight: "bold" }}>
            {point.value}
          </div>
        </div>
      );
    }
    return null;
  }, [formatDate]);

  return (
    <div className="w-full h-full" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 10, right: 16, bottom: 0, left: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" opacity={0.2} strokeWidth={2} />
          <XAxis dataKey="date" hide tick={{ fontSize: 12 }} />
          <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} width={30} />
          <Tooltip content={<CustomTooltip />} />
          <Line type="monotone" dataKey="value" dot={false} strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
