const priceMap: any = {
  WPOL: 'WMATIC'
};

export const getPrice = (symbol: string, prices: any): number => {
  const fallbackSymbol = priceMap[symbol];
  const price = prices[symbol] || (fallbackSymbol && prices[fallbackSymbol]);

  if (!price) {
    return 1;
  }

  return price;
};
