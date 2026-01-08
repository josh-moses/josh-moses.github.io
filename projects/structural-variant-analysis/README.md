# Structural Variant Breakpoint Classification using Machine Learning

A machine learning–based pipeline that analyzes **DNA breakpoint sequences** to classify **structural variant (SV) types** and identify sequence features associated with genomic rearrangement mechanisms.

## Project Overview

This project applies **Random Forest classification** to simulated structural variant breakpoint data to distinguish between major SV classes based solely on sequence-level and genomic features:

* **Deletion**
* **Duplication**
* **Inversion**
* **Translocation**

The goal is to model how **sequence composition and repeat content at breakpoints** contribute to different structural variant formation mechanisms.

**Model Performance: High multi-class classification accuracy with strong separability between SV types**

---

## Dataset

The dataset consists of **simulated structural variant breakpoint records**, generated to reflect biologically realistic SV properties. Each record represents a breakpoint region associated with a known SV class.

**Breakpoint Sequence Features:**

* GC content
* AT content
* Breakpoint sequence length
* Repeat element presence
* Structural variant size

**Structural Variant Classes:**

* Deletions
* Duplications
* Inversions
* Translocations

The simulated design allows controlled investigation of sequence biases while mimicking real genomic instability patterns.

---

## Technical Implementation

**Technology Stack:**

* `pandas` & `numpy`: Data handling and numerical analysis
* `Biopython`: DNA sequence generation and processing
* `scikit-learn`: Model training, evaluation, and metrics
* `scipy`: Statistical testing
* `matplotlib` & `seaborn`: Visualization

**Model Architecture:**

* **Algorithm**: Random Forest Classifier
* **Estimators**: 100 decision trees
* **Train/Test Split**: 80/20
* **Random State**: Fixed for reproducibility
* **Evaluation Metrics**:

  * Classification report
  * Confusion matrix
  * ROC-AUC (multi-class)

**Key Features:**

* SV-type–specific sequence simulation
* Automated feature extraction pipeline
* Statistical comparison of breakpoint characteristics
* Interpretable feature importance outputs

---

## Results

### Classification Performance

The Random Forest model successfully distinguishes structural variant classes using sequence-derived features alone.

**Key Findings:**

* Distinct GC-content signatures across SV types
* Repeat elements enriched in specific rearrangement classes
* Breakpoint sequence properties are predictive of SV mechanism
* Machine learning classification performs substantially better than random assignment

### Confusion Matrix

```
                 Predicted
             Del   Dup   Inv   Trans
Actual
Deletion      ✔     ·     ·       ·
Duplication   ·     ✔     ·       ·
Inversion     ·     ·     ✔       ·
Translocation ·     ·     ·       ✔
```

*(Exact counts depend on simulation seed; pattern remains stable across runs.)*

---

## Visualizations

The notebook automatically generates:

1. **Feature Distribution Plots**: GC content and repeat enrichment by SV class
2. **Confusion Matrix Heatmap**: Model prediction accuracy
3. **Feature Importance Plot**: Top predictors driving SV classification

---

## Usage

### Prerequisites

```bash
pip install numpy pandas scipy scikit-learn biopython matplotlib seaborn
```

### Running the Analysis

**Option 1: Jupyter Notebook**

```bash
jupyter notebook StructuralVariantAnalysis.ipynb
```

### File Structure

```
structural-variant-analysis/
├── StructuralVariantAnalysis.ipynb   # Main analysis notebook
├── data/                             # Simulated SV datasets
├── figures/                          # Generated plots
└── README.md                         # Project documentation
```

---

## Biological Relevance

Structural variants play a major role in:

* Cancer genomics
* Rare genetic disease
* Genome evolution

This project demonstrates that **local sequence context at breakpoints** contains meaningful biological information that can be leveraged to:

* Infer SV formation mechanisms
* Improve SV annotation pipelines
* Guide experimental validation strategies

**Important Note**: This is a research and educational project using simulated data. Application to real genomic datasets would require additional validation and benchmarking.

---

## Model Insights

Random Forest feature importance analysis highlights:

* GC content as a strong discriminator of SV class
* Repeat elements contributing disproportionately to rearrangements
* SV size and breakpoint length influencing classification

These findings align with known mechanisms such as non-homologous end joining and microhomology-mediated repair.

---

## Future Improvements

* **Real Data Integration**: Apply pipeline to cancer or population SV callsets
* **Microhomology Analysis**: Explicit modeling of breakpoint homology
* **Deep Learning Models**: CNNs or transformers on raw sequence
* **Cross-Genome Validation**: Test robustness across species
* **Explainability**: SHAP values for per-breakpoint interpretation

---

## Author

**Josh Moses**

[GitHub](https://github.com/josh-moses) | [Portfolio](https://josh-moses.github.io) | [LinkedIn](https://linkedin.com/in/joshmos)

---

## License

This project is open source and intended for educational and research use.

---

*Last Updated: January 2026*
