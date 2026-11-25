export function debounce<Args extends unknown[]>(
  callback: (...args: Args) => void,
  delayMs: number,
): (...args: Args) => void {
  let timer: ReturnType<typeof setTimeout> | undefined;

  return (...args: Args): void => {
    if (timer !== undefined) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      callback(...args);
    }, delayMs);
  };
}

// Runnable example: after completion, only "Search: react, page: 2" should print.
const search = debounce((query: string, page: number) => {
  console.log(`Search: ${query}, page: ${page}`);
}, 200);

search("r", 1);
search("re", 1);
setTimeout(() => search("react", 2), 100);
