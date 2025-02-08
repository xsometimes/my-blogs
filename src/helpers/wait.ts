export function wait<T>(ms: number, data: T) {
  console.log(`waiting ${ms}ms`);
  return new Promise<T>((resolve) => {
    setTimeout(() => resolve(data), ms);
  });
}
