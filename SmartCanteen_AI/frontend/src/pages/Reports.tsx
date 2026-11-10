import { Download, Filter, FileText } from 'lucide-react';

const reportData = [
  { id: 'R-1001', date: '2026-09-29', item: 'Samosa', actual: 168, predicted: 165, prep: 175, waste: 7, model: 'XGBoost' },
  { id: 'R-1002', date: '2026-09-29', item: 'Tea', actual: 215, predicted: 210, prep: 220, waste: 5, model: 'XGBoost' },
  { id: 'R-1003', date: '2026-09-29', item: 'Burger', actual: 98, predicted: 102, prep: 110, waste: 12, model: 'Random Forest' },
  { id: 'R-1004', date: '2026-09-29', item: 'Maggi', actual: 140, predicted: 137, prep: 145, waste: 5, model: 'XGBoost' },
];

export default function Reports() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text">System Reports</h1>
          <p className="text-textMuted">Detailed logs of predictions, actuals, and model performance.</p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button className="flex-1 sm:flex-none bg-slate-800 hover:bg-slate-700 text-text font-medium py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors border border-slate-600">
            <Filter className="h-4 w-4" />
            Filter
          </button>
          <button className="flex-1 sm:flex-none bg-accent hover:bg-accent/90 text-slate-900 font-bold py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors">
            <Download className="h-4 w-4" />
            Export CSV
          </button>
        </div>
      </div>

      <div className="glass-card overflow-hidden">
        <div className="p-6 border-b border-slate-700/50 flex items-center justify-between bg-slate-800/30">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <FileText className="h-5 w-5 text-accentBlue" />
            Daily Prediction Accuracy Report
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-textMuted">
            <thead className="bg-slate-800/80 text-xs uppercase text-text border-b border-slate-700/50">
              <tr>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Food Item</th>
                <th className="px-6 py-4">Predicted</th>
                <th className="px-6 py-4">Recommended Prep</th>
                <th className="px-6 py-4">Actual Sales</th>
                <th className="px-6 py-4">Waste Generated</th>
                <th className="px-6 py-4">Model Used</th>
              </tr>
            </thead>
            <tbody>
              {reportData.map((row, idx) => (
                <tr key={row.id} className={`border-b border-slate-700/50 hover:bg-slate-800/30 transition-colors ${idx === reportData.length - 1 ? 'border-b-0' : ''}`}>
                  <td className="px-6 py-4 font-medium text-text">{row.date}</td>
                  <td className="px-6 py-4">{row.item}</td>
                  <td className="px-6 py-4 text-accentBlue font-medium">{row.predicted}</td>
                  <td className="px-6 py-4 text-accent font-medium">{row.prep}</td>
                  <td className="px-6 py-4 text-text">{row.actual}</td>
                  <td className="px-6 py-4">
                    <span className={`font-medium ${row.waste > 10 ? 'text-red-400' : 'text-green-400'}`}>
                      {row.waste} units
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 rounded-md text-xs font-medium bg-slate-700 text-text">
                      {row.model}
                    </span>
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
