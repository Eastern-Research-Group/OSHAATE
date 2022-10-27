export const dermalPointEstimateLookup = (type, val) => {
  var result = '';
  var lookup = [
    {
      classification: 'Category 1',
      'Limit Dose': '≤ 50',
      'Point Estimate': 5,
    },
    {
      Classification: 'Category 2',
      'Limit Dose': '> 50 - ≤ 200',
      'Point Estimate': 50,
    },
    {
      Classification: 'Category 3',
      'Limit Dose': '> 200 - ≤ 1,000',
      'Point Estimate': 300,
    },
    {
      Classification: 'Category 4',
      'Limit Dose': '> 1,000 - ≤ 2,000',
      'Point Estimate': 1100,
    },
    {
      Classification: 'Category 5',
      'Limit Dose': '> 2,000 - ≤ 5,000',
      'Point Estimate': 2500,
    },
    {
      Classification: 'Not Classified (LD50 > 5,000)',
      'Limit Dose': '> 2,000 (No signs of toxicigty)',
      'Point Estimate': null,
    },
  ];

  result = lookup
    .filter((item) => item[type] === val)
    .map((item) => item['Point Estimate']);
  return result;
};
