# Iris field notes

A measurement explorer for 150 flowers across setosa, versicolor, and virginica. Change the chart axes, filter a species, select a specimen, and browse the observations. The summary reports the mean of each measurement in the current selection.

[Open the website](https://ashishoutlier.github.io/Iris_Analysis/).

Georgia headings and Public Sans body text give the page the feel of a field notebook. Forest green, muted ochre, and violet identify the species. Measurements and specimen controls remain available in the table below the chart.

## Data

`lib/iris.csv` is a saved copy of [the Seaborn Iris dataset](https://github.com/mwaskom/seaborn-data/blob/master/iris.csv), retrieved on September 9, 2026. This is the dataset loaded by the original notebook. `scripts/prepare-data.py` converts it to `lib/records.json` and adds a display ID without changing the measurements. Lengths and widths are in centimetres.

This page explores the data. It does not serve a classifier or reproduce the notebook's model evaluation. Chart axes retain the full dataset range when a species is selected.

## Run locally

Use Node 22.13 or newer and run these commands from `website`:

```sh
npm ci
npm run dev
```

Regenerate the display records with:

```sh
python3 scripts/prepare-data.py
```

## Validate and publish

```sh
npm test
npx tsc --noEmit
NEXT_PUBLIC_BASE_PATH=/Iris_Analysis npm run build
node scripts/prepare-pages.mjs Iris_Analysis
```

GitHub Pages serves `dist/pages` from the `gh-pages` branch. The export preparation preserves the repository prefix for scripts, styles, and fonts.

Tests cover species filtering, selected means, missing values, empty selections, and exported asset locations. Static rendering and referenced assets were checked. Visual browser review was unavailable in the working environment.

Public Sans is included locally with its OFL notice in `public/fonts`. The application uses React, TypeScript, Vinext, and the retained Sites component library. GitHub Pages provides the public deployment because the Sites hosting service returned a deployment error during this work.
