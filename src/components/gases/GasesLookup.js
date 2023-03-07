let gasesLookup = [
  {
    Classification: 'Category 1',
    'Point Estimate': 10,
    'Limit Dose': '≤ 100',
    min: 0,
    max: 100,
  },
  {
    Classification: 'Category 2',
    'Point Estimate': 100,
    'Limit Dose': '> 100 - ≤ 500',
    min: 100,
    max: 500,
  },
  {
    Classification: 'Category 3',
    'Point Estimate': 700,
    'Limit Dose': '> 500 - ≤ 2,500',
    min: 500,
    max: 2500,
  },
  {
    Classification: 'Category 4',
    'Point Estimate': 4500,
    'Limit Dose': '> 2,500 - ≤ 20,000',
    min: 2500,
    max: 20000,
  },
  {
    Classification: 'Not Classified (LC50 > 20,000)',
    'Point Estimate': null,
    'Limit Dose': '> 20,000 (No signs of toxicity)',
    min: 5000,
  },
];

export const GasesPointEstimate = (key, val) => {
  return gasesLookup
    .filter((item) => item[key] === val)
    .map((item) => item['Point Estimate']);
};

export const GasesCategory = (val) => {
  if (val > 20000) {
    return 'Not Classified (LC50 > 20,000)';
  } else {
    return gasesLookup.find((o) => val >= o.min && val < o.max).Classification;
  }
};
