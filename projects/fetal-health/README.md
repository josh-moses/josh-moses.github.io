# Fetal Health Classification using Machine Learning

A machine learning model that predicts fetal health status from cardiotocography (CTG) data to assist in early identification of at-risk pregnancies.

## Project Overview

This project uses Random Forest classification to categorize fetal health into three classes based on cardiotocography exam data:
- **Normal (1.0)**: Healthy fetal condition
- **Suspect (2.0)**: Requires further monitoring  
- **Pathological (3.0)**: Indicates potential complications

**Model Performance: 92.72% Accuracy**

## Dataset

The dataset contains 2,126 fetal cardiotocogram records with 21 features extracted from CTG exams:

**Cardiotocography Features:**
- Baseline fetal heart rate
- Accelerations and decelerations (light, severe, prolonged)
- Fetal movement patterns
- Uterine contractions
- Short-term and long-term variability metrics
- Histogram-based features (width, min, max, peaks, mode, mean, median, variance)

**Target Distribution:**
- Normal: 1,655 cases (77.8%)
- Suspect: 295 cases (13.9%)
- Pathological: 176 cases (8.3%)

## Technical Implementation

**Technology Stack:**
- `pandas` & `numpy`: Data manipulation and numerical operations
- `scikit-learn`: Model training, preprocessing, and evaluation
- `matplotlib`: Data visualization and result plotting

**Model Architecture:**
- **Algorithm**: Random Forest Classifier
- **Estimators**: 100 decision trees
- **Max Depth**: 20 levels
- **Train/Test Split**: 80/20 with stratification
- **Feature Scaling**: StandardScaler (mean=0, std=1)
- **Random State**: 42 for reproducibility

**Key Features:**
- Stratified train-test split to maintain class balance
- Feature standardization for improved model performance
- Parallel processing (n_jobs=-1) for faster training
- Automated visualization generation

## Results

### Classification Performance

| Class | Precision | Recall | F1-Score | Support |
|-------|-----------|--------|----------|---------|
| Normal | 0.96 | 0.98 | 0.97 | 333 |
| Suspect | 0.91 | 0.77 | 0.83 | 64 |
| Pathological | 0.93 | 0.93 | 0.93 | 29 |
| **Overall Accuracy** | | | **92.72%** | **426** |

### Confusion Matrix
```
              Predicted
           Normal  Suspect  Pathological
Actual
Normal       328      4         1
Suspect       14     49         1  
Pathological   1      1        27
```

**Key Insights:**
- Excellent performance on normal cases (98% recall)
- Strong precision in detecting pathological cases (93%)
- Moderate recall for suspect cases (77%) - some confused with normal
- Very low false negative rate for pathological cases

## Visualizations

The script automatically generates two visualizations:

1. **confusion_matrix.png**: Heatmap showing prediction accuracy across all classes
2. **feature_importance.png**: Bar chart of the top 10 most influential features

## Usage

### Prerequisites
```bash
pip install pandas numpy scikit-learn matplotlib
```

### Running the Model

**Option 1: Run the Python script**
```bash
python fetal-health-notebook.py
```

**Option 2: Use the Jupyter notebook**
```bash
jupyter notebook FetalHealthMLModel.ipynb
```

### File Structure
```
fetal-health/
├── fetal-health-notebook.py    # Main Python script
├── FetalHealthMLModel.ipynb    # Jupyter notebook version
├── fetal_health.csv            # Dataset (must be in same directory)
├── README.md                   # This file
├── confusion_matrix.png        # Generated visualization
└── feature_importance.png      # Generated visualization
```

## Clinical Relevance

Cardiotocography (CTG) is a standard screening tool used during pregnancy to monitor fetal heart rate and uterine contractions. This model could:

- **Assist Healthcare Providers**: Provide second opinions on CTG interpretation
- **Enable Early Intervention**: Flag at-risk pregnancies for closer monitoring
- **Reduce False Negatives**: High recall ensures pathological cases are not missed
- **Standardize Assessment**: Reduce variability in CTG interpretation across providers

**Important Note**: This is a research and educational project. Clinical deployment would require extensive validation, regulatory approval, and integration with existing clinical workflows.

## Model Insights

The Random Forest algorithm provides feature importance rankings, revealing which CTG measurements are most predictive of fetal health status. Common important features include:
- Abnormal short-term variability
- Histogram-based metrics
- Baseline fetal heart rate
- Acceleration patterns

## Future Improvements

- **Class Imbalance Handling**: Implement SMOTE or class weights for better suspect classification
- **Model Comparison**: Test other algorithms (XGBoost, Neural Networks, SVM)
- **Cross-Validation**: Implement k-fold CV for more robust performance estimates
- **Hyperparameter Tuning**: Grid search for optimal Random Forest parameters
- **Explainability**: Add SHAP values for individual prediction explanations
- **Real-time Deployment**: Create API endpoint for clinical integration

## Author

**Josh Moses**  

[GitHub](https://github.com/josh-moses) | [Portfolio](https://josh-moses.github.io) | [LinkedIn](https://linkedin.com/in/joshmos)

## License

This project is open source and available for educational and research purposes.

## Acknowledgments

Dataset sourced from Kaggle: [Fetal Health Classification Dataset](https://www.kaggle.com/datasets/andrewmvd/fetal-health-classification). This project was developed as part of ongoing research into machine learning applications in maternal-fetal medicine.

---

*Last Updated: January 2026*
