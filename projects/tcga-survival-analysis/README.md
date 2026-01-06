# TCGA Breast Cancer Survival Analysis

Survival analysis examining associations between genomic alterations (TP53, BRCA1/2) and patient outcomes in breast cancer using simulated TCGA-BRCA data.

## Overview

This project analyzes survival outcomes for breast cancer patients stratified by mutation status in key cancer-associated genes. Using Kaplan-Meier curves and Cox proportional hazards regression, we assess whether specific genomic alterations are associated with differential survival outcomes.

**Key Findings:**
- TP53 mutations show significant association with survival outcomes after adjusting for age
- BRCA1/2 mutations demonstrate complex prognostic effects consistent with their role in DNA repair
- Age-adjusted Cox models confirm independent prognostic value of genomic profiling

## Methods

- **Statistical Approach:** Kaplan-Meier survival curves with log-rank tests, Cox proportional hazards regression
- **Sample Size:** 1,050 patients with complete clinical and genomic data
- **Genes Analyzed:** TP53 (tumor suppressor), BRCA1/2 (DNA repair)
- **Software:** R (survival, survminer, tidyverse packages)
- **Adjustments:** Age-adjusted hazard ratios to control for confounding

## Repository Structure

```
├── tcgasurvivalanalysis.Rmd    # Main R Markdown analysis file
├── tcgasurvivalanalysis.html   # Rendered HTML file
├── data/
│   └── clinical_raw.txt    # filtered clinical data, containing survival data used for figures/analyses
│   └── mutation_raw.txt    # mutation data, identifying which mutations have occurred
├── results/
│   └── summary_statistics.csv    # Descriptive statistics table
└── README.md
```

## Requirements

```r
# Install required R packages
install.packages(c("survival", "survminer", "tidyverse", "ggplot2"))
```

## Usage

1. Open `tcga_survival_analysis.html` in desired web browser

Alternatively:
1. Open `tcga_survival_analysis.Rmd` in RStudio
2. Click **Knit** to generate the HTML report
3. The script will automatically:
   - Generate simulated TCGA-style data
   - Perform survival analyses
   - Create publication-quality visualizations
   - Output results to `results/` folder

## Results

### TP53 Mutation Analysis

![TP53 Survival Curve](results/figures/tp53_survival_curve.png)

**Figure 1:** Kaplan-Meier survival curves comparing breast cancer patients with vs. without TP53 mutations. The curves show survival probability over time with 95% confidence intervals. P-value from log-rank test indicates statistical significance of survival differences.

### BRCA1/2 Mutation Analysis

![BRCA1/2 Survival Curve](results/figures/brca_survival_curve.png)

**Figure 2:** Survival analysis stratified by BRCA1/2 mutation status. Risk tables below plots show number of patients at risk at each time point.

## Data Note

This analysis uses simulated data with characteristics matching published TCGA-BRCA cohort statistics:

- **TP53 mutation frequency:** ~36% (published range: 30-40%)
- **BRCA1/2 mutation frequency:** ~6% (published range: 5-7%)
- **Overall mortality rate:** ~27%
- **Median follow-up:** ~85 months
- **Age distribution:** Mean 58 years (SD 13 years)

The simulation illustrates survival analysis methodology while maintaining realistic biological relationships between genomic alterations and clinical outcomes based on published hazard ratios from the literature.

## Technical Details

**Statistical Methods:**
- Non-parametric survival estimation using Kaplan-Meier method
- Semi-parametric Cox proportional hazards regression
- Log-rank tests for comparing survival distributions
- Age adjustment to control for confounding

**Biological Context:**
- TP53: Most commonly mutated gene in human cancers, critical tumor suppressor
- BRCA1/2: Key DNA repair genes associated with hereditary breast cancer and therapeutic response

## Author

**Joshua Moses**  

[LinkedIn](https://linkedin.com/in/joshmos) | [GitHub](https://github.com/josh-moses) | [Email](mailto:josh.7.moses@gmail.com)

## Acknowledgments

Data characteristics based on The Cancer Genome Atlas Research Network: https://www.cancer.gov/tcga

Statistical methods follow guidelines from:
- Therneau, T. M., & Grambsch, P. M. (2000). *Modeling Survival Data: Extending the Cox Model*
- Kassambara, A., et al. (2021). *survminer: Drawing Survival Curves using 'ggplot2'*
