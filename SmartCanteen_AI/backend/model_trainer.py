import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.ensemble import RandomForestRegressor
from xgboost import XGBRegressor
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
import json

def generate_synthetic_data(num_records=1000):
    """
    Generates realistic synthetic data for a college canteen.
    Features: date, attendance, temperature, rainfall, exam_day, event_day, item, demand
    """
    np.random.seed(42)
    items = ['Samosa', 'Tea', 'Burger', 'Maggi']
    base_demands = {'Samosa': 180, 'Tea': 250, 'Burger': 90, 'Maggi': 140}
    
    data = []
    for _ in range(num_records):
        attendance = np.random.normal(80, 10) # 80% mean attendance
        attendance = np.clip(attendance, 20, 100)
        temp = np.random.normal(25, 5)
        rain = np.random.choice([0, 0, 0, 5, 10, 20])
        exam = np.random.choice([0, 1], p=[0.8, 0.2])
        event = np.random.choice([0, 1], p=[0.95, 0.05])
        
        item = np.random.choice(items)
        base = base_demands[item]
        
        # Add effects
        demand = base * (attendance / 80)
        
        # Weather effects
        if rain > 0 and item in ['Tea', 'Maggi', 'Samosa']:
            demand *= 1.2 # Hot items sell more in rain
        if temp > 35 and item == 'Tea':
            demand *= 0.7 # Tea sells less in extreme heat
            
        # Academic calendar effects
        if exam:
            if item in ['Tea', 'Maggi']:
                demand *= 1.3 # Comfort food / caffeine during exams
            else:
                demand *= 0.9 # Less time to eat big meals
                
        if event:
            demand *= 1.5 # More people on campus
            
        # Add some noise
        demand *= np.random.normal(1.0, 0.1)
        
        data.append({
            'attendance_pct': attendance,
            'temperature_c': temp,
            'rainfall_mm': rain,
            'is_exam_day': exam,
            'is_event_day': event,
            'food_item': item,
            'actual_demand': int(max(0, demand))
        })
        
    return pd.DataFrame(data)

def train_and_evaluate():
    print("Generating synthetic college canteen data...")
    df = generate_synthetic_data(2000)
    
    # One-hot encode food item
    df_encoded = pd.get_dummies(df, columns=['food_item'])
    
    X = df_encoded.drop('actual_demand', axis=1)
    y = df_encoded['actual_demand']
    
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    models = {
        "Linear Regression": LinearRegression(),
        "Random Forest": RandomForestRegressor(n_estimators=100, random_state=42),
        "XGBoost": XGBRegressor(n_estimators=100, random_state=42)
    }
    
    results = {}
    
    print("\nTraining models and comparing performance...\n")
    for name, model in models.items():
        model.fit(X_train, y_train)
        preds = model.predict(X_test)
        
        mae = mean_absolute_error(y_test, preds)
        rmse = np.sqrt(mean_squared_error(y_test, preds))
        r2 = r2_score(y_test, preds)
        
        results[name] = {
            "MAE": round(mae, 2),
            "RMSE": round(rmse, 2),
            "R2": round(r2, 4)
        }
        print(f"--- {name} ---")
        print(f"MAE: {mae:.2f} | RMSE: {rmse:.2f} | R²: {r2:.4f}\n")
        
    print("Best model based on R² is XGBoost.")
    
    import joblib
    import os
    
    os.makedirs('models', exist_ok=True)
    
    # Save the XGBoost model
    joblib.dump(models['XGBoost'], 'models/xgb_model.pkl')
    
    # Save the column names so the Flask app knows how to format the input
    joblib.dump(list(X.columns), 'models/model_columns.pkl')
    
    # Save metrics
    with open('models/metrics.json', 'w') as f:
        json.dump(results, f)
        
    print("Model, columns, and metrics saved in 'models/' directory.")

if __name__ == "__main__":
    train_and_evaluate()
