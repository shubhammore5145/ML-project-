from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
import joblib
import os
import json

app = Flask(__name__)
CORS(app)

# Load model and columns globally if they exist
xgb_model = None
model_columns = None
metrics = None

try:
    if os.path.exists('models/xgb_model.pkl'):
        xgb_model = joblib.load('models/xgb_model.pkl')
    if os.path.exists('models/model_columns.pkl'):
        model_columns = joblib.load('models/model_columns.pkl')
    if os.path.exists('models/metrics.json'):
        with open('models/metrics.json', 'r') as f:
            metrics = json.load(f)
except Exception as e:
    print(f"Failed to load models: {e}")

@app.route('/api/predict', methods=['POST'])
def predict_demand():
    """
    Endpoint to predict food demand based on input factors using the actual ML model.
    """
    try:
        data = request.json
        
        item = data.get('food_item', 'Samosa')
        
        # Buffer mappings
        buffers = {"Samosa": 0.06, "Tea": 0.05, "Burger": 0.08, "Maggi": 0.06}
        buffer_pct = buffers.get(item, 0.05)
        
        if xgb_model is None or model_columns is None:
            # Fallback to mock if model isn't trained yet
            base_demand = {"Samosa": 150, "Tea": 200, "Burger": 100, "Maggi": 120}
            attendance = float(data.get('attendance_pct', 80)) / 100.0
            predicted_value = int(base_demand.get(item, 100) * attendance)
            recommended_prep = int(predicted_value * (1 + buffer_pct))
            return jsonify({
                "status": "success",
                "model_used": "XGBoost (Mock)",
                "food_item": item,
                "predicted_demand": predicted_value,
                "safety_buffer_pct": int(buffer_pct * 100),
                "recommended_preparation": recommended_prep
            })
            
        # Parse inputs for ML Model
        input_data = {
            'attendance_pct': float(data.get('attendance_pct', 80)),
            'temperature_c': float(data.get('temperature_c', 25)),
            'rainfall_mm': float(data.get('rainfall_mm', 0)),
            'is_exam_day': 1 if data.get('is_exam_day') else 0,
            'is_event_day': 1 if data.get('is_event_day') else 0,
        }
        
        # Set all food_item_X columns to 0 or False
        for col in model_columns:
            if col.startswith('food_item_'):
                input_data[col] = False
                
        # Set the specific item to True
        item_col = f"food_item_{item}"
        if item_col in input_data:
            input_data[item_col] = True
            
        # Create DataFrame ensuring columns match exactly
        df = pd.DataFrame([input_data])[model_columns]
        
        # Predict
        prediction = xgb_model.predict(df)[0]
        predicted_value = int(max(0, prediction))
        
        recommended_prep = int(predicted_value * (1 + buffer_pct))
        
        return jsonify({
            "status": "success",
            "model_used": "XGBoost (Real ML)",
            "food_item": item,
            "predicted_demand": predicted_value,
            "safety_buffer_pct": int(buffer_pct * 100),
            "recommended_preparation": recommended_prep
        })
        
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 400

@app.route('/api/model/metrics', methods=['GET'])
def get_model_metrics():
    """Returns actual metrics from training."""
    if metrics:
        return jsonify({
            "status": "success",
            "selected_model": "XGBoost",
            "metrics": metrics
        })
    else:
        # Fallback
        mock_metrics = {
            "Linear Regression": {"MAE": 18.4, "RMSE": 22.1, "R2": 0.72},
            "Random Forest": {"MAE": 12.1, "RMSE": 15.3, "R2": 0.88},
            "XGBoost": {"MAE": 8.5, "RMSE": 11.2, "R2": 0.94}
        }
        return jsonify({
            "status": "success",
            "selected_model": "XGBoost (Mock)",
            "metrics": mock_metrics
        })

if __name__ == '__main__':
    app.run(debug=True, port=5000)
