export const shuffleArray = (array: Array<any>) => {
  const copy = [...array]
  let i = copy.length;
  while (i--) {
    const ri = Math.floor(Math.random() * i);
    [copy[i], copy[ri]] = [copy[ri], copy[i]];
  }
  return copy;
}
