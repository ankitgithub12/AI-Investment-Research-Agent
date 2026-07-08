import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

/**
 * Radar chart component that compares the three key numerical scores:
 * 1. Overall Investment Score
 * 2. Financial Health Score
 * 3. AI Analysis Confidence
 */
export default function ScoreRadarChart({ investmentScore, financialScore, confidence }) {
  const data = [
    { subject: 'Investment', value: Number(investmentScore) || 0 },
    { subject: 'Financial', value: Number(financialScore) || 0 },
    { subject: 'Confidence', value: Number(confidence) || 0 },
  ];

  return (
    <div className="glass-card gradient-border rounded-xl p-6 card-hover flex flex-col justify-between h-full">
      <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-4">
        Metrics Comparison
      </h3>
      
      <div className="h-56 w-full flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
            <PolarGrid stroke="#E2E8F0" strokeDasharray="3 3" />
            <PolarAngleAxis 
              dataKey="subject" 
              tick={{ fill: '#475569', fontSize: 10, fontWeight: 500 }} 
            />
            <PolarRadiusAxis 
              angle={90} 
              domain={[0, 100]} 
              tick={{ fill: '#94A3B8', fontSize: 8 }} 
              stroke="#E2E8F0"
            />
            <Radar 
              name="Scores" 
              dataKey="value" 
              stroke="#818CF8" 
              fill="url(#radarGradient)" 
              fillOpacity={0.3}
              strokeWidth={2}
            />
            <defs>
              <linearGradient id="radarGradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#6366F1" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#22D3EE" stopOpacity={0.1} />
              </linearGradient>
            </defs>
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
