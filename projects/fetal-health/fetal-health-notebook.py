# Fetal Health Classification using Machine Learning
# Predicts fetal health status (Normal, Suspect, Pathological) from cardiotocography data

import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
import matplotlib.pyplot as plt
import os

# ============================================================================
# 1. LOAD AND EXPLORE DATA
# ============================================================================

# Get the directory where this script is located
script_dir = os.path.dirname(os.path.abspath(__file__))
csv_path = os.path.join(script_dir, 'fetal_health.csv')

df = pd.read_csv(csv_path)

print("="*70)
print("DATASET OVERVIEW")
print("="*70)
print(f"Dataset shape: {df.shape[0]} samples, {df.shape[1]} features")
print(f"\nTarget variable distribution:")
print(df['fetal_health'].value_counts())
print(f"\nMissing values: {df.isnull().sum().sum()}")

# ============================================================================
# 2. DATA PREPROCESSING
# ============================================================================

# Separate features from target
X = df.drop('fetal_health', axis=1)
y = df['fetal_health']

# Split into training (80%) and testing (20%)
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

# Standardize features (mean=0, std=1)
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# ============================================================================
# 3. TRAIN MODEL
# ============================================================================

print("\n" + "="*70)
print("TRAINING RANDOM FOREST CLASSIFIER")
print("="*70)

model = RandomForestClassifier(
    n_estimators=100,
    max_depth=20,
    random_state=42,
    n_jobs=-1
)
model.fit(X_train_scaled, y_train)

# ============================================================================
# 4. EVALUATE MODEL
# ============================================================================

y_pred = model.predict(X_test_scaled)
accuracy = accuracy_score(y_test, y_pred)

print(f"\nModel Accuracy: {accuracy * 100:.2f}%\n")
print("Classification Report:")
print(classification_report(
    y_test, y_pred,
    target_names=['Normal', 'Suspect', 'Pathological'],
    digits=3
))

# ============================================================================
# 5. VISUALIZE RESULTS
# ============================================================================

# Confusion Matrix
cm = confusion_matrix(y_test, y_pred)
plt.figure(figsize=(8, 6))
plt.imshow(cm, interpolation='nearest', cmap='Blues')
plt.title('Confusion Matrix - Fetal Health Classification', fontsize=14, pad=20)
plt.colorbar()
tick_marks = np.arange(3)
plt.xticks(tick_marks, ['Normal', 'Suspect', 'Pathological'], rotation=45)
plt.yticks(tick_marks, ['Normal', 'Suspect', 'Pathological'])

# Add text annotations
thresh = cm.max() / 2
for i in range(cm.shape[0]):
    for j in range(cm.shape[1]):
        plt.text(j, i, format(cm[i, j], 'd'),
                ha="center", va="center",
                color="white" if cm[i, j] > thresh else "black",
                fontsize=12)

plt.ylabel('True Label', fontsize=12)
plt.xlabel('Predicted Label', fontsize=12)
plt.tight_layout()
plt.savefig('confusion_matrix.png', dpi=300, bbox_inches='tight')
plt.show()

# Feature Importance
feature_importance = pd.DataFrame({
    'feature': X.columns,
    'importance': model.feature_importances_
}).sort_values('importance', ascending=False).head(10)

plt.figure(figsize=(10, 6))
plt.barh(range(len(feature_importance)), feature_importance['importance'])
plt.yticks(range(len(feature_importance)), feature_importance['feature'])
plt.xlabel('Importance Score', fontsize=12)
plt.title('Top 10 Most Important Features', fontsize=14, pad=20)
plt.gca().invert_yaxis()
plt.tight_layout()
plt.savefig('feature_importance.png', dpi=300, bbox_inches='tight')
plt.show()

print("\n" + "="*70)
print("MODEL TRAINING COMPLETE")
print("="*70)
print(f"✓ Accuracy: {accuracy * 100:.2f}%")
print(f"✓ Visualizations saved: confusion_matrix.png, feature_importance.png")
