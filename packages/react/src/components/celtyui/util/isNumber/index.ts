/**
 * 是否是数字或者数字字符串
 * @param value - 待测值
 * @returns
 */
export function isNumber(value: any) {
  return parseFloat(`${value}`).toString() !== 'NaN'
}
