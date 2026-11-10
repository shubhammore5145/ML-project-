import { PackageSearch, AlertTriangle, CheckCircle2 } from 'lucide-react';

const inventoryData = [
  { id: 1, name: 'Samosa', current: 15, required: 175, status: 'Low', predicted: 165 },
  { id: 2, name: 'Tea (cups)', current: 10, required: 220, status: 'Critical', predicted: 210 },
  { id: 3, name: 'Burger', current: 20, required: 110, status: 'Low', predicted: 102 },
  { id: 4, name: 'Maggi (packets)', current: 50, required: 145, status: 'Adequate', predicted: 137 },
];

export default function Inventory() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text">Inventory Planning</h1>
          <p className="text-textMuted">AI-recommended stock levels and preparation requirements.</p>
        </div>
        <button className="bg-slate-800 hover:bg-slate-700 text-text font-medium py-2 px-4 rounded-lg flex items-center gap-2 transition-colors border border-slate-600">
          <PackageSearch className="h-5 w-5" />
          Update Stock
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="glass-card p-4 flex items-center gap-4">
          <div className="p-3 bg-red-500/20 rounded-lg">
            <AlertTriangle className="h-6 w-6 text-red-400" />
          </div>
          <div>
            <p className="text-sm text-textMuted">Critical Stock</p>
            <p className="text-xl font-bold text-text">1 Item</p>
          </div>
        </div>
        <div className="glass-card p-4 flex items-center gap-4">
          <div className="p-3 bg-yellow-500/20 rounded-lg">
            <AlertTriangle className="h-6 w-6 text-yellow-400" />
          </div>
          <div>
            <p className="text-sm text-textMuted">Low Stock</p>
            <p className="text-xl font-bold text-text">2 Items</p>
          </div>
        </div>
        <div className="glass-card p-4 flex items-center gap-4">
          <div className="p-3 bg-green-500/20 rounded-lg">
            <CheckCircle2 className="h-6 w-6 text-green-400" />
          </div>
          <div>
            <p className="text-sm text-textMuted">Adequate Stock</p>
            <p className="text-xl font-bold text-text">1 Item</p>
          </div>
        </div>
      </div>

      <div className="glass-card overflow-hidden">
        <div className="p-6 border-b border-slate-700/50 bg-slate-800/30">
          <h3 className="text-lg font-semibold">Today's Preparation Requirements</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-textMuted">
            <thead className="bg-slate-800/80 text-xs uppercase text-text border-b border-slate-700/50">
              <tr>
                <th className="px-6 py-4">Food Item</th>
                <th className="px-6 py-4">Current Stock</th>
                <th className="px-6 py-4 text-accentBlue">AI Predicted Demand</th>
                <th className="px-6 py-4 text-accent">Suggested Preparation</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {inventoryData.map((item, idx) => (
                <tr key={item.id} className={`border-b border-slate-700/50 hover:bg-slate-800/30 transition-colors ${idx === inventoryData.length - 1 ? 'border-b-0' : ''}`}>
                  <td className="px-6 py-4 font-medium text-text">{item.name}</td>
                  <td className="px-6 py-4">{item.current}</td>
                  <td className="px-6 py-4 text-accentBlue font-medium">{item.predicted}</td>
                  <td className="px-6 py-4 text-accent font-bold text-base">{item.required}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                      item.status === 'Critical' ? 'bg-red-500/10 text-red-400 border-red-500/20' : 
                      item.status === 'Low' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' : 
                      'bg-green-500/10 text-green-400 border-green-500/20'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-accent hover:text-accent/80 text-sm font-medium transition-colors">
                      Confirm Prep
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
