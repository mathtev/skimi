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

export function getHash(input: string){
  var hash = 0, len = input.length;
  for (var i = 0; i < len; i++) {
    hash  = ((hash << 5) - hash) + input.charCodeAt(i);
    hash |= 0; // to 32bit integer
  }
  return hash;
}