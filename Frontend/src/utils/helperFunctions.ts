export const shuffleArray = (array: Array<any>) => {
  const copy = [...array]
  let i = copy.length;
  while (i--) {
    const ri = Math.floor(Math.random() * i);
    [copy[i], copy[ri]] = [copy[ri], copy[i]];
  }
  return copy;
}

export const compareStrings = (s1?: string, s2?: string): boolean => {
  if (!s1 || !s2) {
    return false;
  }
  return s1.toLowerCase() === s2.toLowerCase();
};