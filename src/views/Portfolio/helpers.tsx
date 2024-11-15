import Big from 'big.js';
import { upperFirst } from 'lodash';
import { styled } from 'styled-components';

import { formateValue, formateValueWithThousandSeparatorAndFont } from '@/utils/formate';
import ImageFallback from '@/views/Portfolio/components/ImageFallback';

const StyledRecord = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;
  color: #fff;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  word-break: break-all;
  white-space: wrap;

  .token-amount {
    display: flex;
    justify-content: flex-start;
    gap: 4px;
  }

  .token-icon {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
    border-radius: 50%;
  }
`;

export const executionTokenWay = (record: any) => {
  if (!record)
    return {
      tokenKey: 'tokens_in',
      method: ''
    };
  let method = record.sub_type;

  if (record.type) {
    method += (method && ' ') + record.type;
  }

  if (record.type === 'yield') {
    method = record.method;
  }

  return {
    tokenKey: ['borrow', 'remove'].includes(record.sub_type?.toLowerCase()) ? 'tokens_out' : 'tokens_in',
    method
  };
};

export const formatExecution = (record: any) => {
  if (!record) return '';

  const { tokenKey: key, method } = executionTokenWay(record);

  const formatUsd = (usdValue: any) => {
    const usd = formateValueWithThousandSeparatorAndFont(usdValue, 2, true, { prefix: '$' });
    return `${usd}`;
  };

  let amount: any;
  if (record[key]) {
    amount = (
      <>
        {record[key].map((it: any, idx: number) => (
          <div className="token-amount" key={idx}>
            <ImageFallback className="token-icon" src={getTokenLogo(it.symbol)} alt="" width={20} height={20} />
            <span
              className="token-value"
              style={{
                color: key === 'tokens_out' ? '' : '#06C17E'
              }}
            >
              {`${key === 'tokens_out' ? '- ' : '+ '}${formateValueWithThousandSeparatorAndFont(it.amount, 4, true)} ${bridgedTokenSymbol(it)} (${formatUsd(it.usd)})`}
            </span>
          </div>
        ))}
      </>
    );
  }

  return (
    <StyledRecord>
      <span>{upperFirst(method)}</span>
      {amount}
    </StyledRecord>
  );
};

export const formatGas = (record: any) => {
  if (!record || !record.gas) return '-';
  return `${formateValue(record.gas.amount, 4)} ${record.gas.symbol}($${formateValue(record.gas.usd, 2)})`;
};

export const defaultIcon = '/assets/tokens/default_icon.png';

export const getChainLogo = (name: string) => {
  name = name.toLowerCase();
  if (name === 'arbitrum one') {
    name = 'arbitrum';
  }
  if (name === 'bnb smart chain') {
    name = 'bsc';
  }
  if (name) {
    return `https://assets.db3.app/chain/${name}.png`;
  }
  return defaultIcon;
};

export const getDappLogo = (name: string) => {
  name = name.toLowerCase();
  if (name) {
    return `https://assets.db3.app/dapp/${name}.png`;
  }
  return defaultIcon;
};

export const getTokenLogo = (name: string) => {
  name = name.toLowerCase();
  if (name) {
    return `https://assets.db3.app/token/${name}.png`;
  }
  return defaultIcon;
};

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

export const formatPercentNumber = (val: string | number, div: string | number, isSimply?: boolean) => {
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

export const bridgedTokenSymbol = (token: { address: string; symbol: string }) => {
  const bridgedList = [
    '0xff970a61a04b1ca14834a43f5de4533ebddb5cc8',
    '0x37eaa0ef3549a5bb7d431be78a3d99bd360d19e5',
    '0x7f5c764cbc14f9669b88837ca1490cca17c31607',
    '0x2791bca1f2de4661ed88a30c99a7a9449aa84174',
    '0x543672E9CBEC728CBBa9C3Ccd99ed80aC3607FA8'
  ];
  if (token.address && bridgedList.some((it) => it.toLowerCase() === token.address.toLowerCase())) {
    return `${token.symbol}(Bridged)`;
  }
  return token.symbol;
};

export const formatDAppNameWithVersion = (dapp: { show_name: string; version?: string }) => {
  if (!dapp?.show_name) return '';
  let name = dapp.show_name;
  if (/v\d+$/i.test(name)) {
    return name;
  }
  name = `${name} ${dapp.version}`;
  return name;
};
