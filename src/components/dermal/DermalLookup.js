let dermalLookup = [
  {
    Classification: 'Category 1',
    'Point Estimate': 5,
    'Limit Dose': '≤ 50',
    min: 0,
    max: 50,
  },
  {
    Classification: 'Category 2',
    'Point Estimate': 50,
    'Limit Dose': '> 50 - ≤ 200',
    min: 50,
    max: 200,
  },
  {
    Classification: 'Category 3',
    'Point Estimate': 300,
    'Limit Dose': '> 200 - ≤ 1,000',
    min: 200,
    max: 1000,
  },
  {
    Classification: 'Category 4',
    'Point Estimate': 1100,
    'Limit Dose': '> 1,000 - ≤ 2,000',
    min: 1000,
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
    'Limit Dose': '> 2,000 (No signs of toxicigty)',
    min: 5000,
  },
];

export const dermalPointEstimate = (key, val) => {
  return dermalLookup
    .filter((item) => item[key] === val)
    .map((item) => item['Point Estimate']);
};

export const dermalCategory = (val) => {
  if (val < 5000) {
    return dermalLookup
      .filter((item) => val >= item.min && val <= item.max)
      .map((item) => item['Classification']);
  } else {
    return dermalLookup
      .filter((item) => val >= item.min)
      .map((item) => item['Classification']);
  }
};
