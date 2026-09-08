"""Convert the saved Seaborn Iris CSV into the website's measurement records."""
from pathlib import Path
import csv
import json

root = Path(__file__).resolve().parents[1]
with (root / 'lib/iris.csv').open() as file:
    records = [dict(id=i + 1, **{key: value if key == 'species' else float(value)
                               for key, value in row.items()})
               for i, row in enumerate(csv.DictReader(file))]
(root / 'lib/records.json').write_text(json.dumps(records, separators=(',', ':')))
print(f'Prepared {len(records)} flower measurements.')
