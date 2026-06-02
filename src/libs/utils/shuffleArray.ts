export const shuffleArray = <T>(array: T[]): T[] => {
  for (let i = 0; i < array.length; i++) {
    const target = Math.floor(Math.random() * array.length);

    const a = array[i];
    const b = array[target];

    array[i] = b;
    array[target] = a;
  }
  return array;
};
