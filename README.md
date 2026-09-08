# Iris: Visualization and Classification Experiments

Two learning notebooks explore sepal and petal measurements, compare species visually, and introduce classification models. The extended notebook also contains an unfinished DBSCAN experiment.

## Choose a notebook

| Notebook | Contents |
| --- | --- |
| [Iris_Data_Analysis.ipynb](Iris_Data_Analysis.ipynb) | Data checks, distributions, species scatterplots, correlation analysis, and logistic regression, nearest neighbor, and decision tree experiments |
| [Iris_Analysis.ipynb](Iris_Analysis.ipynb) | The same core analysis plus a DBSCAN installation cell and clustering attempt with a saved parameter error |

Start with `Iris_Data_Analysis.ipynb` for the shorter walkthrough. Both notebooks retain their original code and saved outputs; the evaluation issues below remain open.

## Questions explored

* How do sepal and petal measurements differ across the three species?
* Which measurements are correlated?
* Are there duplicate rows or missing measurements?
* How can encoded species labels be used in introductory classification experiments?

## Data and workflow

Both notebooks load the Iris sample through `seaborn.load_dataset("iris")`. No CSV is committed. This loader may need internet access on its first use unless the dataset is already cached.

The saved outputs show **150 rows**, one exact duplicate, and no missing values. After duplicate removal, the species counts are 50 setosa, 50 versicolor, and 49 virginica. The correlation output reports approximately **0.963** between petal length and petal width on the deduplicated data.

The workflow creates boxplots, scatterplots, histograms, and a correlation heatmap; encodes species as numeric labels; and uses a 70/30 train/test split with `random_state=3`. The method used to load data is documented in the code; the repository does not contain a separate source citation or dataset license.

## Run locally

Use Python 3 from the repository root. Notebook metadata records Python 3.12.7, but package versions are not locked.

```bash
python3 -m venv .venv
source .venv/bin/activate
python -m pip install numpy pandas matplotlib seaborn scikit-learn jupyterlab
python -m jupyterlab Iris_Data_Analysis.ipynb
```

On Windows, activate the environment with `.venv\Scripts\Activate.ps1` in PowerShell. Execute cells in order to inspect the analysis. Open `Iris_Analysis.ipynb` instead to inspect the additional clustering experiment.

The extended notebook contains `!pip install dbscan`, but its clustering code imports `DBSCAN` from `scikit-learn`. The separately named `dbscan` package is not used by that code; its installation cell can be skipped in a local run.

## Current limitations

* **Classification evaluation needs correction.** The notebooks use `r2_score` on encoded class labels, and the classifier calls pass predictions as the first argument. The saved value of roughly 0.909 is not classification accuracy and should not be presented as a model benchmark.
* **The nearest neighbor prediction uses the wrong estimator.** A `KNeighborsClassifier` is fitted, but `y_pred_kn` comes from `lr.predict(xu)`. Its reported value therefore evaluates logistic regression predictions again.
* **The DBSCAN cell fails.** `Iris_Analysis.ipynb` sets `eps=0` and retains an `InvalidParameterError` saying `eps` must be greater than zero. This has not been fixed. Cluster labels also need a suitable clustering evaluation, rather than direct R² comparison with species IDs.
* The split is not stratified, feature scaling is absent, and the decision tree has no fixed random seed. These choices limit the interpretation and repeatability of comparisons.
* Saved output includes a pandas `SettingWithCopyWarning`. Neither notebook has been rerun as part of this documentation update, and the dependency command is not a verified environment specification.

## Author

Ashish.
