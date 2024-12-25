export const keyFrequency = (n: number) => Math.pow(2, (n - 49) / 12) * 440;

export const frequencyKey = (f: number) =>
  Math.round(12 * Math.log2(f / 440)) + 49;

export const scientificPitchName = (n: number) => [
  'GAABCCDDEFFG'[n % 12],
  '# #  # #  # '[n % 12].trim(),
  Math.floor((n + 8) / 12),
];
