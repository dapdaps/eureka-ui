import { upperFirst } from 'lodash';

import { formateValue, formateValueWithThousandSeparator } from '@/utils/formate';
import { styled } from 'styled-components';

const StyledRecord = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;
  
  .token-name,
  .token-value {
  }
  .token-icon {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
  }
  .token-value {
    &.plus {
      color: #2FC18C;
    }
  }
`;

export const formatQuest = (record: any) => {
  if (!record) return '';

  let method = record.sub_type;

  if (record.type) {
    method += (method && ' ') + record.type;
  }

  if (record.type === 'yield') {
    method = record.method;
  }

  // const name = record.dapp ? 'on ' + record.dapp : '';
  const key = record.sub_type === 'remove' ? 'token_out' : 'token_in';

  const formatUsd = (usdValue: any) => {
    const usd = formateValueWithThousandSeparator(usdValue, 2);
    if (/^</.test(usd)) {
      return usd.replace(/\s/, ' $');
    }
    return `$${usd}`;
  };

  let amount: any = (
    <>
      <span className="token-name">{record[key].symbol}</span>
      <img className="token-icon" src={getTokenLogo(record[key].symbol)} alt="" />
      <span className={`token-value ${record[key].amount > 0 ? 'plus' : 'sub'}`}>
        {record[key].amount > 0 ? '+' : '-'}
        {formateValue(record[key].amount, 4)}({formatUsd(record[key].usd)})
      </span>
    </>
  );

  if (record[`${key}_1`]) {
    amount = (
      <>
        {amount}/
        <span className="token-name">{record[`${key}_1`].symbol}</span>
        <img className="token-icon" src={getTokenLogo(record[`${key}_1`].symbol)} alt="" />
        <span className={`token-value ${record[key].amount > 0 ? 'plus' : 'sub'}`}>
          {record[key].amount > 0 ? '+' : '-'}
          {formateValue(record[`${key}_1`].amount, 4)}({formatUsd(record[key].usd)})
        </span>
      </>
    );
  }

  return (
    <StyledRecord>
      <span className="token-action">{upperFirst(method)}</span>
      {amount}
    </StyledRecord>
  );
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

export function getTime(timeStr: number) {
  const date = new Date(timeStr * 1000);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hour = String(date.getHours()).padStart(2, '0');
  const minute = String(date.getMinutes()).padStart(2, '0');
  const second = String(date.getSeconds()).padStart(2, '0');
  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}