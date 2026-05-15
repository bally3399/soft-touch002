// Currency mapping by country
const currencyMap: { [key: string]: { symbol: string; code: string } } = {
  NG: { symbol: '₦', code: 'NGN' }, // Nigeria
  US: { symbol: '$', code: 'USD' }, // USA
  GB: { symbol: '£', code: 'GBP' }, // UK
  CA: { symbol: 'C$', code: 'CAD' }, // Canada
  AU: { symbol: 'A$', code: 'AUD' }, // Australia
  ZA: { symbol: 'R', code: 'ZAR' }, // South Africa
  KE: { symbol: 'KSh', code: 'KES' }, // Kenya
  GH: { symbol: '₵', code: 'GHS' }, // Ghana
  CM: { symbol: 'FCFA', code: 'XAF' }, // Cameroon
  SN: { symbol: 'CFA', code: 'XOF' }, // Senegal
  EG: { symbol: 'E£', code: 'EGP' }, // Egypt
  MA: { symbol: 'د.م.', code: 'MAD' }, // Morocco
  TZ: { symbol: 'TSh', code: 'TZS' }, // Tanzania
  UG: { symbol: 'USh', code: 'UGX' }, // Uganda
  RW: { symbol: 'FRw', code: 'RWF' }, // Rwanda
  ET: { symbol: 'Br', code: 'ETB' }, // Ethiopia
  SD: { symbol: 'SDG', code: 'SDG' }, // Sudan
  LY: { symbol: 'LD', code: 'LYD' }, // Libya
  TN: { symbol: 'د.ت', code: 'TND' }, // Tunisia
  DZ: { symbol: 'د.ج', code: 'DZD' }, // Algeria
};

export const getCurrencySymbol = (countryCode: string = 'NG'): string => {
  return currencyMap[countryCode.toUpperCase()]?.symbol || '₦';
};

export const getCurrencyCode = (countryCode: string = 'NG'): string => {
  return currencyMap[countryCode.toUpperCase()]?.code || 'NGN';
};

export const formatPrice = (price: number, countryCode: string = 'NG'): string => {
  const symbol = getCurrencySymbol(countryCode);
  return `${symbol}${price.toFixed(2)}`;
};
