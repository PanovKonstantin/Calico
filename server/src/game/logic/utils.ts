export function popAtRandom<T>(array: Array<T>) {
  const id = getRandomId(array);
  return popAt(array, id);
}

export function getAtRandom<T>(array: Array<T>): T {
  const id = getRandomId(array);
  return array[id];
}

export function popAt<T>(array: Array<T>, id: number): T {
  return array.splice(id, 1)[0];
}

export function popReplace<T>(
  array: Array<T>,
  id: number,
  replacement: T | null = null,
): T {
  return array.splice(id, 1, replacement)[0];
}

export function getRandomId(array: any[]): number {
  return Math.floor(Math.random() * array.length);
}

export function repeat(times: number, value: any = null) {
  return Array(times).fill(value);
}

export function every<T>(anEnum: T): Array<number> {
  return Object.values(anEnum).filter(
    (v) => !isNaN(Number(v)),
  );
}
