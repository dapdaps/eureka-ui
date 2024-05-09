import { upperFirst } from 'lodash';
import { formateValue } from '@/utils/formate';

export const formatQuest = (record: any) => {
  if (!record) return '';

  let method = record.sub_type;

  if (record.type) {
    method += (method && ' ') + record.type;
  }

  if (record.type === 'yield') {
    method = record.method;
  }

  const name = record.dapp ? 'on ' + record.dapp.show_name : '';
  const key = record.sub_type === 'remove' ? 'token_out' : 'token_in';

  let amount = `${formateValue(record[key].amount, 4)} ${record[key].symbol}`;

  if (record[`${key}_1`]) {
    amount += ` and ${formateValue(record[`${key}_1`].amount, 4)} ${record[`${key}_1`].symbol}`;
  }

  return `${upperFirst(method)} ${amount} ${name}`;
};

export const formatGas = (record: any) => {
  if (!record || !record.gas) return '-';
  return `${formateValue(record.gas.amount, 4)} ${record.gas.symbol}($${formateValue(record.gas.usd, 2)})`;
};

export const getChainLogo = (name: string) =>
  name ? `https://s3.amazonaws.com/db3.app/chain/${name.toLowerCase()}.png` : '/images/tokens/default_icon.png';

export const getDappLogo = (name: string) =>
  name ? `https://s3.amazonaws.com/db3.app/dapp/${name.toLowerCase()}.png` : '/images/tokens/default_icon.png';

export const getTokenLogo = (name: string) =>
  name ? `https://s3.amazonaws.com/db3.app/token/${name.toLowerCase()}.png` : '/images/tokens/default_icon.png';
