import {
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from 'recharts';
import { CHART_COLORS } from '@/utils/constants';
import InfoCard from './InfoCard';
import { BarChart3, PieChart as PieChartIcon, Activity } from 'lucide-react';

const PIE_COLORS = [CHART_COLORS.emerald, CHART_COLORS.slate, CHART_COLORS.red];

/**
 * Custom tooltip for charts.
 */
function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white px-3 py-2 rounded-lg border border-slate-200 shadow-lg text-xs">
      <p className="font-semibold text-slate-900">{label || payload[0].name}</p>
      <p className="text-slate-600">{payload[0].value}</p>
    </div>
  );
}

/**
 * Renders all chart visualizations for the research results.
 */
export default function ChartSection({ chartData }) {
  if (!chartData) return null;

  const { investmentScoreBreakdown, riskDistribution, sentimentBreakdown } = chartData;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Investment Score Radar */}
      {investmentScoreBreakdown && (
        <InfoCard title="Investment Score Breakdown" icon={Activity} delay={100}>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={investmentScoreBreakdown} cx="50%" cy="50%" outerRadius="75%">
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis
                  dataKey="category"
                  tick={{ fill: '#64748b', fontSize: 11 }}
                />
                <PolarRadiusAxis
                  angle={30}
                  domain={[0, 100]}
                  tick={{ fill: '#94a3b8', fontSize: 10 }}
                />
                <Radar
                  name="Score"
                  dataKey="score"
                  stroke={CHART_COLORS.emerald}
                  fill={CHART_COLORS.emerald}
                  fillOpacity={0.2}
                  strokeWidth={2}
                />
                <Tooltip content={<CustomTooltip />} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </InfoCard>
      )}

      {/* Risk Distribution Bar Chart */}
      {riskDistribution && (
        <InfoCard title="Risk Distribution" icon={BarChart3} delay={200}>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={riskDistribution} layout="vertical" margin={{ left: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis type="number" domain={[0, 100]} tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <YAxis
                  type="category"
                  dataKey="category"
                  width={100}
                  tick={{ fill: '#64748b', fontSize: 11 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="level" radius={[0, 6, 6, 0]} maxBarSize={24}>
                  {riskDistribution.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={
                        entry.level >= 70
                          ? CHART_COLORS.red
                          : entry.level >= 40
                            ? CHART_COLORS.amber
                            : CHART_COLORS.emerald
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </InfoCard>
      )}

      {/* Sentiment Pie Chart */}
      {sentimentBreakdown && (
        <InfoCard title="Market Sentiment" icon={PieChartIcon} delay={300}>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sentimentBreakdown}
                  cx="50%"
                  cy="45%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={4}
                  dataKey="value"
                  strokeWidth={0}
                >
                  {sentimentBreakdown.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={PIE_COLORS[index % PIE_COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  formatter={(value) => (
                    <span className="text-xs text-slate-600">{value}</span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </InfoCard>
      )}
    </div>
  );
}
