export const dermalPointEstimate = (type, val) => {
  let result = '';
  let lookup = [
    {
      Classification: 'Category 1',
      'Point Estimate': 5,
      'Limit Dose': '≤ 50',
      Range: ' -50', //max
    },
    {
      Classification: 'Category 2',
      'Point Estimate': 50,
      'Limit Dose': '> 50 - ≤ 200',
      Range: '50-200',
    },
    {
      Classification: 'Category 3',
      'Point Estimate': 300,
      'Limit Dose': '> 200 - ≤ 1,000',
      Range: '200-1000',
    },
    {
      Classification: 'Category 4',
      'Point Estimate': 1100,
      'Limit Dose': '> 1,000 - ≤ 2,000',
      Range: '1000-2000',
    },
    {
      Classification: 'Category 5',
      'Point Estimate': 2500,
      'Limit Dose': '> 2,000 - ≤ 5,000',
      Range: '2000-5000',
    },
    {
      Classification: 'Not Classified (LD50 > 5,000)',
      'Point Estimate': null,
      'Limit Dose': '> 2,000 (No signs of toxicigty)',
      Range: '5000- ', //min
    },
  ];

  result = lookup
    .filter((item) => item[type] === val)
    .map((item) => item['Point Estimate']);
  return result;
};
