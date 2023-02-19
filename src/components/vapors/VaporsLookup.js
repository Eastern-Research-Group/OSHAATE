let vaporsLookup = [
  {
    Classification: 'Category 1',
    'Point Estimate': 0.05,
    'Limit Dose': '≤ 0.5',
    min: 0,
    max: 0.5,
  },
  {
    Classification: 'Category 2',
    'Point Estimate': 0.5,
    'Limit Dose': '> 0.5 - ≤ 2.0',
    min: 0.5,
    max: 2.0,
  },
  {
    Classification: 'Category 3',
    'Point Estimate': 3,
    'Limit Dose': '> 2.0 - ≤ 10.0',
    min: 2.0,
    max: 10.0,
  },
  {
    Classification: 'Category 4',
    'Point Estimate': 11,
    'Limit Dose': '> 10.0 - ≤ 20.0',
    min: 10.0,
    max: 20.0,
  },
  {
    Classification: 'Not Classified (LC50 > 20.0)',
    'Point Estimate': null,
    'Limit Dose': '> 20.0 (No signs of toxicity)',
    min: 20.0,
  },
];

export const VaporsPointEstimate = (key, val) => {
  return vaporsLookup
    .filter((item) => item[key] === val)
    .map((item) => item['Point Estimate']);
};

export const VaporsCategory = (val) => {
  if (val > 20) {
    return 'Not Classified (LC50 > 20.0)';
  } else {
    return vaporsLookup.find((o) => val >= o.min && val <= o.max)
      .Classification;
  }
};
