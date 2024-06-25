/**
 * 千分位分割
 * @param num
 * @returns
 */
export function thousandSplitter(num: number): string {
  const str = num.toString();
  const result: string[] = [];

  let count = 0;
  let subStr = '';
  for (let i = str.length - 1; i >= 0; i--) {
    subStr = str[i] + subStr;
    count++;

    if (count === 3) {
      result.unshift(subStr);
      count = 0;
      subStr = '';
    }
  }

  if (count !== 0) {
    result.unshift(subStr);
    subStr = '';
    count = 0;
  }

  return result.join(',');
}
