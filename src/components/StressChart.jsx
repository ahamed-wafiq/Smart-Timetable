import React from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { STRESS_THRESHOLDS } from '../utils/constants';
import '../styles/charts.css';

const StressChart = ({ data, type = 'bar' }) => {
  if (!data || data.length === 0) {
    return (
      <div className="chart-container">
        <p className="chart-empty">No data available</p>
      </div>
    );
  }

  const getStressColor = (score) => {
    if (score <= STRESS_THRESHOLDS.LOW.max) return STRESS_THRESHOLDS.LOW.color;
    if (score <= STRESS_THRESHOLDS.MEDIUM.max) return STRESS_THRESHOLDS.MEDIUM.color;
    if (score <= STRESS_THRESHOLDS.HIGH.max) return STRESS_THRESHOLDS.HIGH.color;
    return STRESS_THRESHOLDS.CRITICAL.color;
  };

  const chartData = data.map((item) => ({
    ...item,
    fill: getStressColor(item.value || item.stressScore),
  }));

  return (
    <div className="chart-container">
      <ResponsiveContainer width="100%" height={300}>
        {type === 'bar' ? (
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
            <XAxis dataKey="name" />
            <YAxis domain={[0, 100]} />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'var(--bg-primary)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
              }}
            />
            <Bar dataKey="value" fill="var(--primary-color)" radius={[8, 8, 0, 0]} />
          </BarChart>
        ) : (
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
            <XAxis dataKey="name" />
            <YAxis domain={[0, 100]} />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'var(--bg-primary)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
              }}
            />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="var(--primary-color)" 
              strokeWidth={2}
              dot={{ fill: 'var(--primary-color)', r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        )}
      </ResponsiveContainer>
    </div>
  );
};

export const StressDistributionPie = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="chart-container">
        <p className="chart-empty">No data available</p>
      </div>
    );
  }

  const COLORS = [
    STRESS_THRESHOLDS.LOW.color,
    STRESS_THRESHOLDS.MEDIUM.color,
    STRESS_THRESHOLDS.HIGH.color,
    STRESS_THRESHOLDS.CRITICAL.color,
  ];

  return (
    <div className="chart-container">
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, value }) => `${name}: ${value}`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{
              backgroundColor: 'var(--bg-primary)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StressChart;
