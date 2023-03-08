let oralLookup = [
  {
    Classification: 'Category 1',
    'Point Estimate': 0.5,
    'Limit Dose': '≤ 5',
    min: 0,
    max: 5,
  },
  {
    Classification: 'Category 2',
    'Point Estimate': 5,
    'Limit Dose': '> 5 - ≤ 50',
    min: 5,
    max: 50,
  },
  {
    Classification: 'Category 3',
    'Point Estimate': 100,
    'Limit Dose': '> 50 - ≤ 300',
    min: 50,
    max: 300,
  },
  {
    Classification: 'Category 4',
    'Point Estimate': 500,
    'Limit Dose': '> 300 - ≤ 2,000',
    min: 300,
    max: 2000,
  },
  {
    Classification: 'Category 5',
    'Point Estimate': 2500,
    'Limit Dose': '> 2,000 - ≤ 5,000',
    min: 2000,
    max: 5000,
  },
  {
    Classification: 'Not Classified (LD50 > 5,000)',
    'Point Estimate': null,
    'Limit Dose': '> 2,000 (No signs of toxicity)',
    min: 5000,
  },
];

export const OralPointEstimate = (key, val) => {
  return oralLookup
    .filter((item) => item[key] === val)
    .map((item) => item['Point Estimate']);
};

export const OralCategory = (val) => {
  if (val > 5000) {
    return 'Not Classified (LD50 > 5,000)';
  } else {
    return oralLookup.find((o) => val >= o.min && val < o.max).Classification;
  }
};
