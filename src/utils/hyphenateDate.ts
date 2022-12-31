export const hyphenateDate = (date: Date) => {
  return [date.getFullYear(), date.getMonth() + 1, date.getDate()]
    .map((num, index) => (index === 0 ? '' + num : ('00' + num).slice(-2)))
    .join('-');
};
