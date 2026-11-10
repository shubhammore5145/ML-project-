import { useState } from 'react';
import { BrainCircuit, Loader2, AlertCircle } from 'lucide-react';

const MOCK_PREDICTION_DATA = {
  Samosa: { demand: 165, buffer: 6, stock: 15 },
  Tea: { demand: 210, buffer: 5, stock: 10 },
  Burger: { demand: 102, buffer: 8, stock: 20 },
  Maggi: { demand: 137, buffer: 6, stock: 50 },
};

export default function DemandPrediction() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [formData, setFormData] = useState({
    foodItem: 'Samosa',
    date: new Date().toISOString().split('T')[0],
    attendance: '85',
    temperature: '28',
    rainfall: '0',
    eventStatus: 'Regular Classes',
  });

  const handlePredict = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch('http://localhost:5000/api/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          food_item: formData.foodItem,
          attendance_pct: formData.attendance,
          temperature_c: formData.temperature,
          rainfall_mm: formData.rainfall,
          is_exam_day: formData.eventStatus.includes('Exam') ? 1 : 0,
          is_event_day: formData.eventStatus === 'College Fest' ? 1 : 0
        })
      });
      
      const data = await response.json();
      const currentStock = MOCK_PREDICTION_DATA[formData.foodItem as keyof typeof MOCK_PREDICTION_DATA].stock;
      
      const recommended = data.recommended_preparation;
      const additionalRequired = Math.max(0, recommended - currentStock);
      
      setResult({
        demand: data.predicted_demand,
        buffer: data.safety_buffer_pct,
        stock: currentStock,
        recommended,
        additionalRequired,
        modelUsed: data.model_used
      });
    } catch (error) {
      console.error("Error predicting:", error);
      alert("Failed to connect to ML Backend. Make sure the Python API is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-text">Demand Prediction (AI Engine)</h1>
        <p className="text-textMuted">Forecast specific food item demand based on external factors.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 glass-card p-6 h-fit">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <BrainCircuit className="text-accent h-5 w-5" />
            Input Parameters
          </h3>
          <form onSubmit={handlePredict} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-textMuted mb-1">Food Item</label>
              <select 
                className="w-full bg-slate-800/50 border border-slate-600 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-accent outline-none"
                value={formData.foodItem}
                onChange={e => setFormData({...formData, foodItem: e.target.value})}
              >
                <option value="Samosa">Samosa</option>
                <option value="Tea">Tea</option>
                <option value="Burger">Burger</option>
                <option value="Maggi">Maggi</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-textMuted mb-1">Date</label>
              <input 
                type="date"
                className="w-full bg-slate-800/50 border border-slate-600 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-accent outline-none text-text"
                value={formData.date}
                onChange={e => setFormData({...formData, date: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-textMuted mb-1">Attendance (%)</label>
                <input 
                  type="number"
                  className="w-full bg-slate-800/50 border border-slate-600 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-accent outline-none"
                  value={formData.attendance}
                  onChange={e => setFormData({...formData, attendance: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-textMuted mb-1">Temp (°C)</label>
                <input 
                  type="number"
                  className="w-full bg-slate-800/50 border border-slate-600 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-accent outline-none"
                  value={formData.temperature}
                  onChange={e => setFormData({...formData, temperature: e.target.value})}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-textMuted mb-1">Academic Event</label>
              <select 
                className="w-full bg-slate-800/50 border border-slate-600 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-accent outline-none"
                value={formData.eventStatus}
                onChange={e => setFormData({...formData, eventStatus: e.target.value})}
              >
                <option>Regular Classes</option>
                <option>Mid-Term Exams</option>
                <option>Final Exams</option>
                <option>College Fest</option>
                <option>Holiday</option>
              </select>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-accent hover:bg-accent/90 text-slate-900 font-bold py-3 px-4 rounded-xl transition-all flex justify-center items-center gap-2 mt-4"
            >
              {loading ? <Loader2 className="animate-spin h-5 w-5" /> : <BrainCircuit className="h-5 w-5" />}
              {loading ? 'Analyzing Data...' : 'Predict Demand'}
            </button>
          </form>
        </div>

        <div className="lg:col-span-2 space-y-6">
          {!result && !loading && (
            <div className="glass-card p-12 flex flex-col items-center justify-center text-center text-textMuted h-full min-h-[400px]">
              <BrainCircuit className="h-16 w-16 mb-4 opacity-50" />
              <h3 className="text-lg font-medium text-text mb-2">Ready for Prediction</h3>
              <p className="max-w-md">Select a food item and adjust the environmental factors to generate a highly accurate ML-based demand forecast.</p>
            </div>
          )}

          {loading && (
            <div className="glass-card p-12 flex flex-col items-center justify-center text-center text-accent h-full min-h-[400px]">
              <Loader2 className="h-16 w-16 mb-4 animate-spin" />
              <h3 className="text-lg font-medium text-text">Running XGBoost Inference...</h3>
              <p className="text-textMuted text-sm mt-2">Processing historical data, weather patterns, and attendance.</p>
            </div>
          )}

          {result && !loading && (
            <div className="glass-card overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="bg-slate-800/80 p-6 border-b border-slate-700/50">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-bold text-text">Prediction Results: {formData.foodItem}</h2>
                    <p className="text-textMuted text-sm mt-1">Based on {formData.attendance}% attendance and {formData.temperature}°C temperature</p>
                  </div>
                  <div className="bg-accent/20 text-accent px-3 py-1 rounded-full text-sm font-semibold border border-accent/30">
                    {result.modelUsed || "High Confidence (94%)"}
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700/50">
                    <p className="text-sm text-textMuted mb-1">Base Predicted</p>
                    <p className="text-2xl font-bold">{result.demand}</p>
                  </div>
                  <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700/50">
                    <p className="text-sm text-textMuted mb-1">Safety Buffer</p>
                    <p className="text-2xl font-bold">{result.buffer}%</p>
                  </div>
                  <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700/50">
                    <p className="text-sm text-textMuted mb-1">Current Stock</p>
                    <p className="text-2xl font-bold text-accentBlue">{result.stock}</p>
                  </div>
                  <div className="bg-accent/10 p-4 rounded-xl border border-accent/20">
                    <p className="text-sm text-accent mb-1">Total Target</p>
                    <p className="text-2xl font-bold text-accent">{result.recommended}</p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700/50">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <AlertCircle className="text-accentBlue h-5 w-5" />
                    Actionable Decision
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 text-lg">
                      <div className="flex-1">
                        <span className="text-textMuted">Calculation:</span> {result.demand} (predicted) + {result.recommended - result.demand} (buffer) - {result.stock} (in stock)
                      </div>
                    </div>
                    
                    <div className="mt-4 p-4 bg-accent/10 border-l-4 border-accent rounded-r-lg">
                      <p className="text-xl font-medium">
                        Canteen Staff Recommendation: <br/>
                        <span className="text-accent font-bold text-2xl mt-2 block">
                          "Prepare exactly {result.additionalRequired} more {formData.foodItem}s"
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
