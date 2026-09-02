export const kaggleAccidentSource = {
  slug: 'sehaj1104/indian-road-accident-dataset-20222025',
  file: 'indian_roads_dataset.csv',
  records: 20000,
  note: 'Kaggle city-level sample (20,000 rows, 2022–Apr 2025). Some fields are synthetically generated to simulate real patterns. Not a substitute for MoRTH official totals.',
} as const;

export const kaggleYearly = [
  { year: '2022', accidents: 6117, casualties: 10584 },
  { year: '2023', accidents: 6088, casualties: 10512 },
  { year: '2024', accidents: 6061, casualties: 10471 },
  { year: '2025*', accidents: 1734, casualties: 2962 },
];

export const kaggleSeverity = [
  { name: 'Minor', value: 11025, color: 'hsl(var(--accent))' },
  { name: 'Major', value: 5988, color: 'hsl(var(--secondary))' },
  { name: 'Fatal', value: 2987, color: 'hsl(var(--destructive))' },
];

export const kaggleWeather = [
  { name: 'Clear', value: 6690 },
  { name: 'Rain', value: 6677 },
  { name: 'Fog', value: 6633 },
];

export const kaggleRoadType = [
  { name: 'Urban', value: 6745 },
  { name: 'Rural', value: 6639 },
  { name: 'Highway', value: 6616 },
];

export const kaggleCause = [
  { name: 'Distraction', value: 4026 },
  { name: 'Overspeeding', value: 4025 },
  { name: 'Weather', value: 3997 },
  { name: 'Drunk driving', value: 3978 },
  { name: 'Poor road', value: 3974 },
];

export const kaggleCities = [
  { name: 'Chandigarh', accidents: 2577, state: 'Punjab' },
  { name: 'Chennai', accidents: 2575, state: 'Tamil Nadu' },
  { name: 'Kolkata', accidents: 2559, state: 'West Bengal' },
  { name: 'Pune', accidents: 2517, state: 'Maharashtra' },
  { name: 'Mumbai', accidents: 2492, state: 'Maharashtra' },
  { name: 'Bengaluru', accidents: 2438, state: 'Karnataka' },
  { name: 'Delhi', accidents: 2433, state: 'Delhi' },
  { name: 'Hyderabad', accidents: 2409, state: 'Telangana' },
];

export const kaggleHourly = [
  { hour: '00', n: 840 }, { hour: '01', n: 859 }, { hour: '02', n: 888 }, { hour: '03', n: 824 },
  { hour: '04', n: 805 }, { hour: '05', n: 827 }, { hour: '06', n: 856 }, { hour: '07', n: 786 },
  { hour: '08', n: 849 }, { hour: '09', n: 786 }, { hour: '10', n: 789 }, { hour: '11', n: 841 },
  { hour: '12', n: 866 }, { hour: '13', n: 878 }, { hour: '14', n: 838 }, { hour: '15', n: 811 },
  { hour: '16', n: 787 }, { hour: '17', n: 861 }, { hour: '18', n: 823 }, { hour: '19', n: 840 },
  { hour: '20', n: 838 }, { hour: '21', n: 830 }, { hour: '22', n: 853 }, { hour: '23', n: 825 },
];

export const kaggleKpis = {
  records: 20000,
  fatal: 2987,
  casualties: 34529,
  meanRisk: 0.438,
  peakHourShare: 24.7,
  weekendShare: 28.6,
};

export const kaggle5LSource = {
  slug: 'shivsharantripathi/indian-accident-dataset-5lakh',
  file: 'indian_accident_dataset_merged_5lakhs.xlsx',
  records: 500000,
  note: 'Kaggle 5-lakh merged file. Severity and year counts are nearly uniform — treat as a modelling sample, not MoRTH. Risk score is 0–100.',
} as const;

export const kaggle5LYearly = [
  { year: '2023', accidents: 125043, casualties: 312153 },
  { year: '2024', accidents: 124845, casualties: 311220 },
  { year: '2025', accidents: 125319, casualties: 312452 },
  { year: '2026', accidents: 124793, casualties: 311479 },
];

export const kaggle5LSeverity = [
  { name: 'Moderate', value: 125356, color: 'hsl(var(--chart-4))' },
  { name: 'Fatal', value: 125118, color: 'hsl(var(--destructive))' },
  { name: 'Minor', value: 125005, color: 'hsl(var(--accent))' },
  { name: 'Severe', value: 124521, color: 'hsl(var(--secondary))' },
];

export const kaggle5LCause = [
  { name: 'Drunk driving', value: 83487 },
  { name: 'Distracted driving', value: 83400 },
  { name: 'Fatigue', value: 83385 },
  { name: 'Weather', value: 83267 },
  { name: 'Mechanical failure', value: 83247 },
  { name: 'Speeding', value: 83214 },
];

export const kaggle5LStates = [
  { name: 'Andhra Pradesh', accidents: 38549 },
  { name: 'Assam', accidents: 33496 },
  { name: 'Bihar', accidents: 31852 },
  { name: 'Arunachal Pradesh', accidents: 29316 },
  { name: 'Gujarat', accidents: 24527 },
  { name: 'Chhattisgarh', accidents: 21723 },
  { name: 'Haryana', accidents: 20597 },
  { name: 'Goa', accidents: 19218 },
];

export const kaggle5LKpis = {
  records: 500000,
  casualties: 1247304,
  meanRisk: 62,
  peakHourShare: 29.1,
  weekendShare: 28.5,
};
