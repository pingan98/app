export const PRICEREG1 = /^[1-9]\d*(.\d{1,2})?$/ // 数字1-9打头的，小数点后面最多两位
export const PRICEREG2 = /^0(.\d{1,2})?$/ // 数字0打头的，小数点后面最多两位
export const POSITIVENUMBER = /^(?!(0[0-9]{0,}$))[0-9]{1,}[.]{0,}[0-9]{0,}$/ // /大于0的正数（包括小数）
export const POSITIVEINT = /^[1-9][0-9]*$/ // 正整数
export const NUMBERREG = /^[0-9]*$/ // 数字
export const NUMRANGE_10 = /^([0-9]|10)$/ // 0-10之间的整数
export const NUMRANGE_1000 = /^([0-9][0-9]{0,2}|1000)$/ // 0-1000之间的整数
export const ID_CARD = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/ // 身份证号
export const NONNEGATIVE_INTEGER = /^([1-9][0-9]*|0)$/ // 非负整数 0，1，2..
