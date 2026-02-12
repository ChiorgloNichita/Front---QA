/**
 * Russian pluralization for nouns.
 * @param count - number
 * @param one   - form for 1 (статья)
 * @param few   - form for 2-4 (статьи)
 * @param many  - form for 5+ (статей)
 */
export function pluralize(
  count: number,
  one: string,
  few: string,
  many: string
): string {
  const abs = Math.abs(count);
  const mod10 = abs % 10;
  const mod100 = abs % 100;

  if (mod100 >= 11 && mod100 <= 19) return many;
  if (mod10 === 1) return one;
  if (mod10 >= 2 && mod10 <= 4) return few;
  return many;
}
