import { upperFirst } from 'lodash';
import { styled } from 'styled-components';

import { formateValue, formateValueWithThousandSeparator } from '@/utils/formate';
import Big from 'big.js';

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

  // // 0:- 1:sub 2:sub 3:sub 4:sub 5:-
  // const types = ['swap', 'liquidity', 'lending', 'farming', 'yield', 'bridge'];
  // // 0:+ 1:- 2:+ 3:+ 4:- 5:+ 6:-
  // const subTypes = ['withdraw', 'repayborrow', 'supply', 'add', 'remove', 'borrow', 'deposit'];
  //
  // let diff = 0;
  // if ([types[0], types[5]].includes(record.type.toLowerCase())) {
  //   diff = Big(-record.token_in.amount).toNumber();
  //   if (record.token_out) {
  //     diff = Big(diff).plus(record.token_out.amount).toNumber();
  //   }
  // }
  // else {
  //   // remove
  //   if ([subTypes[4]].includes(record.sub_type.toLowerCase())) {
  //
  //   }
  //   if ([subTypes[1], subTypes[4], subTypes[6]].includes(record.sub_type.toLowerCase())) {
  //     diff = Big(-record.token_in.amount).toNumber();
  //   } else {
  //
  //   }
  // }

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
      <span className={`token-value`}>
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
        <span className={`token-value`}>
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

export const defaultIcon = '/images/tokens/default_icon.png';

export const getChainLogo = (name: string) => {
  name = name.toLowerCase();
  if (name) {
    return `https://s3.amazonaws.com/db3.app/chain/${name}.png`;
  }
  return defaultIcon;
}

export const getDappLogo = (name: string) => {
  name = name.toLowerCase();
  if (name) {
    return `https://s3.amazonaws.com/db3.app/dapp/${name}.png`;
  }
  return defaultIcon;
}

export const getTokenLogo = (name: string) => {
  name = name.toLowerCase();
  if (name) {
    return `https://s3.amazonaws.com/db3.app/token/${name}.png`;
  }
  return defaultIcon;
}

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

export const formatPercentNumber = (
  val: string | number,
  div: string | number,
  isSimply?: boolean
) => {
  if (!val || val == 0) {
    return Big(0).toFixed(isSimply ? 0 : 2);
  }

  const result = Big(val).div(div).times(100);
  if (isSimply) {
    const decimal = result.toString().split('.')?.[1]?.length ?? 0;
    return Big(result.toFixed(decimal > 2 ? 2 : 0)).toString();
  }
  return Big(result.toFixed(2)).toString();
};
