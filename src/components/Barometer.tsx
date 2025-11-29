import React from "react";
import { useTheme } from "../context/ThemeContext";

interface Props {
  value: number;
  size?: number;
}

// SVG Gauge 0..100 mit farbigen Zonen
const Barometer = function Barometer({ value, size = 160 }: Props) {
  const v = Math.max(0, Math.min(100, value));
  const angle = (-180 + (v / 100) * 180) * (Math.PI / 180);
  const r = size / 2 - 10;
  const cx = size / 2;
  const cy = size / 2;
  const needleX = cx + r * Math.cos(angle);
  const needleY = cy + r * Math.sin(angle);
  const { theme, setTheme } = useTheme();

  return (
    <svg
      width={size}
      height={size / 1.2}
      viewBox={`0 0 ${size} ${size / 1.2}`}
      className="overflow-visible"
    >
      <path
        d={`M 10 ${cy} A ${r} ${r} 0 0 1 ${cx} ${10}`}
        stroke="#ef4444"
        strokeWidth={14}
        fill="none"
      />
      <path
        d={`M ${cx} 10 A ${r} ${r} 0 0 1 ${size - 10} ${cy}`}
        stroke="#22c55e"
        strokeWidth={14}
        fill="none"
      />
      <path
        d={`M 10 ${cy} A ${r} ${r} 0 0 1 ${size - 10} ${cy}`}
        stroke="#f59e0b33"
        strokeWidth={14}
        fill="none"
      />
      <line
        x1={cx}
        y1={cy}
        x2={needleX}
        y2={needleY}
        stroke={theme === "dark" ? "white" : "black"}
        strokeWidth={3}
      />
      <circle cx={cx} cy={cy} r={4} fill={theme === "dark" ? "white" : "black"} />
      <text
        x={cx}
        y={cy + 28}
        textAnchor="middle"
        className="fill-zinc-700 dark:fill-zinc-200 text-sm"
      >
        {v}
      </text>
      <text
        x={cx}
        y={cy + 44}
        textAnchor="middle"
        className="fill-zinc-600 dark:fill-zinc-400 text-xs"
      >
        {v < 34 ? "Fear" : v > 66 ? "Greed" : "Neutral"}
      </text>
    </svg>
  );
};

export default React.memo(
  Barometer,
  (prevProps, nextProps) => {
    return Math.abs(prevProps.value - nextProps.value) < 1;
  }
);
