import { upperFirst } from 'lodash';
import { formateValue } from '@/utils/formate';

export const formatQuest = (record: any) => {
  if (!record) return '';
  const method = upperFirst(record.method);
  const amount = formateValue(record.token_in.amount, 4);
  return `${method} ${amount} ${record.token_in.symbol} on ${record.dapp.show_name}`;
};

export const formatGas = (record: any) => {
  if (!record || !record.gas) return '-';
  return `${formateValue(record.gas.amount, 4)} ${record.gas.symbol}($${formateValue(record.gas.usd, 2)})`;
};

export const getChainLogo = (name: string) => `https://s3.amazonaws.com/db3.app/chain/${name.toLowerCase()}.png`;

export const getDappLogo = (name: string) => `https://s3.amazonaws.com/db3.app/dapp/${name.toLowerCase()}.png`;

export const getTokenLogo = (name: string) => `https://s3.amazonaws.com/db3.app/token/${name.toLowerCase()}.png`;
