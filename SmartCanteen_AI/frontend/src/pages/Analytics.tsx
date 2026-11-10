import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const analyticsData = [
  { day: 'Mon', predicted: 240, actual: 235 },
  { day: 'Tue', predicted: 280, actual: 290 },
  { day: 'Wed', predicted: 310, actual: 305 },
  { day: 'Thu', predicted: 250, actual: 240 },
  { day: 'Fri', predicted: 380, actual: 395 },
];

const foodWiseData = [
  { name: 'Samosa', sales: 850 },
  { name: 'Tea', sales: 1200 },
  { name: 'Burger', sales: 420 },
  { name: 'Maggi', sales: 650 },
];

export default function Analytics() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text">Demand Analytics</h1>
          <p className="text-textMuted">Analyze historical patterns and model accuracy.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card p-6">
          <h3 className="text-lg font-semibold mb-2">Predicted vs Actual Demand</h3>
          <p className="text-sm text-textMuted mb-6">Model accuracy tracking over the current week</p>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={analyticsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="day" stroke="#94A3B8" />
                <YAxis stroke="#94A3B8" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1E293B', border: '1px solid #334155', borderRadius: '0.5rem' }}
                />
                <Legend />
                <Line type="monotone" dataKey="predicted" stroke="#3B82F6" strokeWidth={3} name="Predicted" />
                <Line type="monotone" dataKey="actual" stroke="#10B981" strokeWidth={3} name="Actual Sales" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-card p-6">
          <h3 className="text-lg font-semibold mb-2">Food-wise Weekly Demand</h3>
          <p className="text-sm text-textMuted mb-6">Total volume by category</p>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={foodWiseData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={false} />
                <XAxis type="number" stroke="#94A3B8" />
                <YAxis dataKey="name" type="category" stroke="#94A3B8" width={80} />
                <Tooltip 
                  cursor={{ fill: '#334155', opacity: 0.4 }}
                  contentStyle={{ backgroundColor: '#1E293B', border: '1px solid #334155', borderRadius: '0.5rem' }}
                />
                <Bar dataKey="sales" fill="#10B981" radius={[0, 4, 4, 0]} name="Total Sales" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
