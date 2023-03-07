let dustsLookup = [
  {
    Classification: 'Category 1',
    'Point Estimate': 0.005,
    'Limit Dose': '≤ 0.05',
    min: 0,
    max: 0.05,
  },
  {
    Classification: 'Category 2',
    'Point Estimate': 0.05,
    'Limit Dose': '> 0.05 - ≤ 0.5',
    min: 0.05,
    max: 0.5,
  },
  {
    Classification: 'Category 3',
    'Point Estimate': 0.5,
    'Limit Dose': '> 0.5 - ≤ 1.0',
    min: 0.5,
    max: 1.0,
  },
  {
    Classification: 'Category 4',
    'Point Estimate': 1.5,
    'Limit Dose': '> 1.0 - ≤ 5.0',
    min: 1.0,
    max: 5.0,
  },
  {
    Classification: 'Not Classified (LC50 > 20.0)',
    'Point Estimate': null,
    'Limit Dose': '> 5.0 (No signs of toxicity)',
    min: 5.0,
  },
];

export const DustsPointEstimate = (key, val) => {
  return dustsLookup
    .filter((item) => item[key] === val)
    .map((item) => item['Point Estimate']);
};

export const DustsCategory = (val) => {
  if (val > 5) {
    return 'Not Classified (LC50 > 5.0)';
  } else {
    return dustsLookup.find((o) => val >= o.min && val < o.max).Classification;
  }
};
