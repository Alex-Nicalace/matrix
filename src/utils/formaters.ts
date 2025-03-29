export const formaterCurrency = (value: number) => {
  const formater = new Intl.NumberFormat('ru-RU', {
    currency: 'USD',
    minimumFractionDigits: 2,
  });
  return `$${formater.format(value)}`;
};

export const formaterPercent = (value: number) => {
  const formater = new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2, // максимум чисел в дробной части
  });
  return `${formater.format(value)}%`;
};
