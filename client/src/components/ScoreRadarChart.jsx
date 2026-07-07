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
    { subject: 'Investment Score', value: Number(investmentScore) || 0 },
    { subject: 'Financial Health', value: Number(financialScore) || 0 },
    { subject: 'AI Confidence', value: Number(confidence) || 0 },
  ];

  return (
    <div className="bg-dark-card border border-dark-border rounded-xl p-6 card-hover flex flex-col justify-between h-full">
      <h3 className="text-xs font-bold text-dark-text-muted uppercase tracking-wider mb-4">
        Metrics Comparison
      </h3>
      
      <div className="h-56 w-full flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
            <PolarGrid stroke="#232326" />
            <PolarAngleAxis 
              dataKey="subject" 
              tick={{ fill: '#A1A1AA', fontSize: 10, fontWeight: 500 }} 
            />
            <PolarRadiusAxis 
              angle={90} 
              domain={[0, 100]} 
              tick={{ fill: '#71717A', fontSize: 8 }} 
              stroke="#232326"
            />
            <Radar 
              name="Scores" 
              dataKey="value" 
              stroke="#4F46E5" 
              fill="#4F46E5" 
              fillOpacity={0.2} 
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
