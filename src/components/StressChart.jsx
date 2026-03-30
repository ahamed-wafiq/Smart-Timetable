import React from 'react';
import {
  BarChart,
  Bar,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Area,
  AreaChart,
} from 'recharts';
import { STRESS_THRESHOLDS } from '../utils/constants';
import '../styles/charts.css';

const getStressColor = (score) => {
  if (score <= STRESS_THRESHOLDS.LOW.max) return STRESS_THRESHOLDS.LOW.color;
  if (score <= STRESS_THRESHOLDS.MEDIUM.max) return STRESS_THRESHOLDS.MEDIUM.color;
  if (score <= STRESS_THRESHOLDS.HIGH.max) return STRESS_THRESHOLDS.HIGH.color;
  return STRESS_THRESHOLDS.CRITICAL.color;
};

const getStressLabel = (score) => {
  if (score <= STRESS_THRESHOLDS.LOW.max) return 'Low';
  if (score <= STRESS_THRESHOLDS.MEDIUM.max) return 'Medium';
  if (score <= STRESS_THRESHOLDS.HIGH.max) return 'High';
  return 'Critical';
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const val = payload[0].value;
    const color = getStressColor(val);
    const stressLabel = getStressLabel(val);
    return (
      <div className="chart-tooltip">
        <p className="chart-tooltip-day">{label}</p>
        <p className="chart-tooltip-score" style={{ color }}>
          {val}/100
        </p>
        <p className="chart-tooltip-level" style={{ color }}>
          {stressLabel} Stress
        </p>
      </div>
    );
  }
  return null;
};

const StressChart = ({ data, type = 'bar' }) => {
  if (!data || data.length === 0) {
    return (
      <div className="chart-container chart-empty-wrapper">
        <p className="chart-empty">⚠️ No stress data available.<br />Generate a timetable first.</p>
      </div>
    );
  }

  const tickStyle = { fill: 'var(--dark-text-secondary)', fontSize: 12 };

  return (
    <div className="chart-container">
      <ResponsiveContainer width="100%" height={300} minWidth={100}>
        {type === 'bar' ? (
          <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(163,230,53,0.1)" vertical={false} />
            <XAxis dataKey="name" tick={tickStyle} tickLine={false} axisLine={{ stroke: 'rgba(163,230,53,0.2)' }} />
            <YAxis domain={[0, 100]} tick={tickStyle} tickLine={false} axisLine={false} width={35} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(163,230,53,0.05)' }} />
            <ReferenceLine y={30} stroke="#10b981" strokeDasharray="4 2" strokeWidth={1} label={{ value: 'Low', fill: '#10b981', fontSize: 10, position: 'right' }} />
            <ReferenceLine y={60} stroke="#f59e0b" strokeDasharray="4 2" strokeWidth={1} label={{ value: 'Med', fill: '#f59e0b', fontSize: 10, position: 'right' }} />
            <ReferenceLine y={85} stroke="#ef4444" strokeDasharray="4 2" strokeWidth={1} label={{ value: 'High', fill: '#ef4444', fontSize: 10, position: 'right' }} />
            
            <Bar dataKey="value" radius={[8, 8, 0, 0]} maxBarSize={55}>
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={getStressColor(entry.value)}
                  fillOpacity={0.85}
                />
              ))}
            </Bar>
          </BarChart>
        ) : (
          <AreaChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
            <defs>
              <linearGradient id="stressGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--primary-color)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="var(--primary-color)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(163,230,53,0.1)" vertical={false} />
            <XAxis dataKey="name" tick={tickStyle} tickLine={false} axisLine={{ stroke: 'rgba(163,230,53,0.2)' }} />
            <YAxis domain={[0, 100]} tick={tickStyle} tickLine={false} axisLine={false} width={35} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(163,230,53,0.05)' }} />
            <ReferenceLine y={30} stroke="#10b981" strokeDasharray="4 2" strokeWidth={1} label={{ value: 'Low', fill: '#10b981', fontSize: 10, position: 'right' }} />
            <ReferenceLine y={60} stroke="#f59e0b" strokeDasharray="4 2" strokeWidth={1} label={{ value: 'Med', fill: '#f59e0b', fontSize: 10, position: 'right' }} />
            <ReferenceLine y={85} stroke="#ef4444" strokeDasharray="4 2" strokeWidth={1} label={{ value: 'High', fill: '#ef4444', fontSize: 10, position: 'right' }} />
            
            <Area
              type="monotone"
              dataKey="value"
              stroke="var(--primary-color)"
              strokeWidth={2.5}
              fill="url(#stressGradient)"
              dot={(props) => {
                const { cx, cy, payload } = props;
                const color = getStressColor(payload.value);
                return (
                  <circle
                    key={`dot-${props.index}`}
                    cx={cx}
                    cy={cy}
                    r={5}
                    fill={color}
                    stroke="#0d1117"
                    strokeWidth={2}
                  />
                );
              }}
              activeDot={{ r: 7, strokeWidth: 2, stroke: '#0d1117' }}
            />
          </AreaChart>
        )}
      </ResponsiveContainer>
    </div>
  );
};

export default StressChart;
