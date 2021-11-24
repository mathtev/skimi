export const shuffleArray = (array: Array<any>) => {
  const copy = [...array];
  let i = copy.length;
  while (i--) {
    const ri = Math.floor(Math.random() * i);
    [copy[i], copy[ri]] = [copy[ri], copy[i]];
  }
  return copy;
};

export const compareStrings = (s1?: string, s2?: string): boolean => {
  if (!s1 || !s2) {
    return false;
  }
  return s1.toLowerCase() === s2.toLowerCase();
};

export const getRandom = (array: any[]) => {
  return array[Math.floor(Math.random() * array.length)];
};

export const weightedRandom = (array: any[]) => {
  let random;
  let index = 0;
  const weights = array.map((x) => x.weight);

  for (let i = 0; i < array.length; i++) {
    weights[i] += weights[i - 1] || 0;
  }

  random = Math.random() * weights[weights.length - 1];

  for (let i = 0; i < weights.length; i++) {
    if (weights[i] > random) {
      index = i;
      break;
    }
  }

  return array[index];
};
