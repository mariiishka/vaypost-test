const getInitisls = (value: string): string => {
  return value
    .trim()
    .split(' ')
    .map((name: string) => name[0])
    .join('');
};

export default getInitisls;
