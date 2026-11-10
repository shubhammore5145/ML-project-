import { Plus, Edit2, Trash2 } from 'lucide-react';

const mockFoodItems = [
  { id: 1, name: 'Samosa', category: 'Snacks', price: 15, avgDemand: 180, buffer: 6, stock: 15 },
  { id: 2, name: 'Tea', category: 'Beverages', price: 10, avgDemand: 250, buffer: 5, stock: 10 },
  { id: 3, name: 'Burger', category: 'Fast Food', price: 45, avgDemand: 80, buffer: 8, stock: 20 },
  { id: 4, name: 'Maggi', category: 'Meals', price: 30, avgDemand: 120, buffer: 6, stock: 50 },
  { id: 5, name: 'Coffee', category: 'Beverages', price: 20, avgDemand: 150, buffer: 5, stock: 5 },
];

export default function FoodItems() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text">Food Item Management</h1>
          <p className="text-textMuted">Manage inventory items, pricing, and AI safety buffers.</p>
        </div>
        <button className="bg-accent hover:bg-accent/90 text-slate-900 font-bold py-2 px-4 rounded-lg flex items-center gap-2 transition-colors">
          <Plus className="h-5 w-5" />
          Add Item
        </button>
      </div>

      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-textMuted">
            <thead className="bg-slate-800/50 text-xs uppercase text-text border-b border-slate-700/50">
              <tr>
                <th className="px-6 py-4 rounded-tl-xl">Item Name</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Price (₹)</th>
                <th className="px-6 py-4">Historical Avg Demand</th>
                <th className="px-6 py-4">AI Safety Buffer (%)</th>
                <th className="px-6 py-4">Current Stock</th>
                <th className="px-6 py-4 text-right rounded-tr-xl">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockFoodItems.map((item, idx) => (
                <tr key={item.id} className={`border-b border-slate-700/50 hover:bg-slate-800/30 transition-colors ${idx === mockFoodItems.length - 1 ? 'border-b-0' : ''}`}>
                  <td className="px-6 py-4 font-medium text-text whitespace-nowrap">{item.name}</td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-slate-700/50 text-text">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">₹{item.price}</td>
                  <td className="px-6 py-4">{item.avgDemand}</td>
                  <td className="px-6 py-4 text-accent font-semibold">{item.buffer}%</td>
                  <td className="px-6 py-4">{item.stock}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-slate-400 hover:text-accentBlue p-1.5 transition-colors mr-2">
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button className="text-slate-400 hover:text-red-400 p-1.5 transition-colors">
                      <Trash2 className="h-4 w-4" />
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
