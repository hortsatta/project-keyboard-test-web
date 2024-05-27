const wpmScoring = [
  { min: 0, max: 29, score: 1.5 },
  { min: 30, max: 39, score: 2.5 },
  { min: 40, max: 49, score: 3.5 },
  { min: 50, max: 59, score: 4.5 },
  { min: 60, max: 79, score: 5.5 },
  { min: 80, max: 99, score: 6.5 },
  { min: 100, max: 119, score: 7.5 },
  { min: 120, max: 139, score: 8.5 },
];

function clampValue(value: number, minInput: number, maxInput: number) {
  const minOutput = 0;
  const maxOutput = 0.3;
  const normalized = (value - minInput) / (maxInput - minInput);
  const scaled = normalized * (maxOutput - minOutput) + minOutput;
  const clamped = Math.max(minOutput, Math.min(scaled, maxOutput));
  return Math.round(clamped * 10) / 10;
}

function getScoreByIndex(index: number, wpm: number) {
  const bonus = clampValue(wpm, wpmScoring[index].min, wpmScoring[index].max);
  return wpmScoring[index].score + bonus;
}

function getWPMScore(wpm: number) {
  const transformedWPM = Math.floor(wpm);

  if (
    transformedWPM >= wpmScoring[0].min &&
    transformedWPM <= wpmScoring[0].max
  ) {
    return getScoreByIndex(0, wpm);
  } else if (
    transformedWPM >= wpmScoring[1].min &&
    transformedWPM <= wpmScoring[1].max
  ) {
    return getScoreByIndex(1, wpm);
  } else if (
    transformedWPM >= wpmScoring[2].min &&
    transformedWPM <= wpmScoring[2].max
  ) {
    return getScoreByIndex(2, wpm);
  } else if (
    transformedWPM >= wpmScoring[3].min &&
    transformedWPM <= wpmScoring[3].max
  ) {
    return getScoreByIndex(3, wpm);
  } else if (
    transformedWPM >= wpmScoring[4].min &&
    transformedWPM <= wpmScoring[4].max
  ) {
    return getScoreByIndex(4, wpm);
  } else if (
    transformedWPM >= wpmScoring[5].min &&
    transformedWPM <= wpmScoring[5].max
  ) {
    return getScoreByIndex(5, wpm);
  } else if (
    transformedWPM >= wpmScoring[6].min &&
    transformedWPM <= wpmScoring[6].max
  ) {
    return getScoreByIndex(6, wpm);
  } else if (
    transformedWPM >= wpmScoring[7].min &&
    transformedWPM <= wpmScoring[7].max
  ) {
    return getScoreByIndex(7, wpm);
  } else {
    return 10;
  }
}

function getComboScore(wpm: number, timeSec: number, comboCounts: number[]) {
  const wps = wpm / 60;
  const highestComboCount = Math.floor(wps * timeSec);
  const totalComboCount = comboCounts
    .slice(0, 3)
    .reduce((total, current) => total + current, 0);

  const score =
    highestComboCount <= 0 ? 0 : (totalComboCount / highestComboCount) * 0.5;

  return Math.round(score * 10) / 10;
}

function getWeightedScore(wpm: number, timeSec: number, comboCounts: number[]) {
  const wpmScore = getWPMScore(wpm);
  const comboScore = getComboScore(wpm, timeSec, comboCounts);
  return Math.floor(wpmScore + (comboScore || 0));
}

export function generateRating(
  wpm: number,
  timeSec: number,
  comboCounts: number[],
) {
  const score = getWeightedScore(wpm, timeSec, comboCounts);

  if (score <= 3) {
    return 'e';
  } else if (score === 4) {
    return 'd';
  } else if (score === 5 || score === 6) {
    return 'c';
  } else if (score === 7) {
    return 'b';
  } else if (score === 8) {
    return 'a';
  } else if (score === 9) {
    return 's';
  } else {
    return 'sss';
  }
}
