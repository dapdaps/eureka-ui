import { memo, useEffect, useMemo, useState } from 'react';
import Big from 'big.js';
import {
  formateValue,
  formateValueWithThousandSeparator,
  formateValueWithThousandSeparatorAndFont,
} from '@/utils/formate';
import { StyledLoadingWrapper } from '@/styled/styles';
import Loading from '@/components/Icons/Loading';
import { container } from '@/components/animation';
import { AnimatePresence, motion } from 'framer-motion';
import { NoDataLayout } from '../NoDataLayout';
import Network from './Network';
import NetworkWithName from './NetworkWithName';
import Percent from './Percent';
import Type from './Type';
import Switcher from '@/components/Switcher';
import { DefaultIcon } from '../../config';
import { HoldingTitle, ProtocolSelectBox, HoldingTableWrapper, HoldingTable, SortArrowDownWrapper } from './styles';

export const sortArrowDown = (
  <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M5.26545 7.20482C5.66137 7.63342 6.33863 7.63342 6.73455 7.20482L11.3776 2.17855C11.9693 1.53807 11.515 0.5 10.6431 0.5H1.35693C0.484997 0.5 0.0307255 1.53807 0.622376 2.17855L5.26545 7.20482Z"
      fill="currentColor"
    />
  </svg>
);

const Wallet = ({ tokens, totalBalance, filterFunc, loading }: any) => {
  const [sortBy, setSortBy] = useState('');
  const [type, setType] = useState('Default');

  const typedList = useMemo(() => {
    if (!tokens) return [];
    if (type === 'Default') return tokens;
    const _list: any = {};
    tokens.forEach((token: any) => {
      if (_list[token.symbol]) {
        _list[token.symbol].chain_ids.push(token.chain_id);
        _list[token.symbol].usd = new Big(_list[token.symbol].usd).plus(token.usd).toString();
      } else {
        _list[token.symbol] = { ...token, chain_ids: [token.chain_id] };
      }
    });
    return Object.values(_list);
  }, [tokens, type]);

  const filteredList = useMemo(() => {
    if (!typedList) return [];
    return typedList.filter(filterFunc);
  }, [typedList, filterFunc]);

  const displayedList = useMemo(() => {
    if (!sortBy) return filteredList;
    return filteredList.sort((a: any, b: any) => (new Big(a[sortBy]).gt(b[sortBy]) ? -1 : 1));
  }, [filteredList, sortBy]);

  const [openOptions, setOpenOptions] = useState<boolean>(false);

  const [isHide, setIsHide] = useState<boolean>(true);
  useEffect(() => {
    const hideOptions = () => {
      setOpenOptions(false);
    };
    document.addEventListener('click', hideOptions);
    return () => {
      document.removeEventListener('click', hideOptions);
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.div {...container}>
        <HoldingTitle>
          <div className="frcs">
            <div className="holding-text">Holding</div>
            <Type
              current={type}
              onChange={(_type: string) => {
                setType(_type);
              }}
            />
          </div>
          <div className="frcs">
            <div className="holding-value">
              <span className="format-decimals">
                $
                <span className="integer-part">
                  {formateValueWithThousandSeparatorAndFont(totalBalance, 4).integer}
                </span>
                <span className="decimal-part">
                  {formateValueWithThousandSeparatorAndFont(totalBalance, 4).decimal}
                </span>
              </span>
            </div>

            <div
              className="asset-function-button"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                setOpenOptions((b) => !b);
              }}
            >
              <div className="dot" />
              <div className="dot" />
              <div className="dot" />

              {openOptions && (
                <ProtocolSelectBox
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <div className="function-item">
                    <div>Hide</div>
                    <div className="minimum-value-box">{'< $0.1'}</div>

                    <Switcher
                      active={isHide}
                      onChange={() => {
                        setIsHide((h) => !h);
                      }}
                    />
                  </div>
                </ProtocolSelectBox>
              )}
            </div>
          </div>
        </HoldingTitle>
        <HoldingTableWrapper>
          <HoldingTable>
            <thead>
              <tr>
                <th style={{ width: type === 'Default' ? '25%' : '20%' }}>Token</th>
                <th style={{ width: type === 'Default' ? '25%' : '15%' }}>
                  <div
                    className="frcs-gm"
                    onClick={() => {
                      setSortBy('price');
                    }}
                  >
                    <span>Price</span>{' '}
                    <SortArrowDownWrapper active={sortBy === 'price'}> {sortArrowDown} </SortArrowDownWrapper>{' '}
                  </div>{' '}
                </th>
                {type === 'Summary' && <th style={{ width: '20%' }}>Network</th>}
                <th style={{ width: type === 'Default' ? '25%' : '15%' }}>
                  <div
                    className="frcs-gm"
                    onClick={() => {
                      setSortBy('amount');
                    }}
                  >
                    <span>{type === 'Default' ? 'Amount' : 'Total Amount'}</span>
                    <SortArrowDownWrapper active={sortBy === 'amount'}> {sortArrowDown} </SortArrowDownWrapper>{' '}
                  </div>{' '}
                </th>

                <th style={{ width: type === 'Default' ? '25%' : '15%' }}>
                  <div
                    className="frcs-gm"
                    onClick={() => {
                      setSortBy('usd');
                    }}
                  >
                    <span>USD value</span>{' '}
                    <SortArrowDownWrapper active={sortBy === 'usd'}> {sortArrowDown} </SortArrowDownWrapper>{' '}
                  </div>{' '}
                </th>
                {type === 'Summary' && (
                  <th style={{ width: '15%' }}>
                    <div
                      className="frcs-gm"
                      onClick={() => {
                        setSortBy('percent');
                      }}
                    >
                      <span>Percent</span>
                      <SortArrowDownWrapper active={sortBy === 'percent'}>{sortArrowDown}</SortArrowDownWrapper>{' '}
                    </div>{' '}
                  </th>
                )}
              </tr>
            </thead>

            <tbody>
              {displayedList.map((token: any, i: number) => {
                if (isHide && token.usd < 0.1) return <></>;
                return (
                  <tr key={token.address + token.chain_id}>
                    <td>
                      <div className="frcs token-info">
                        <img src={token.logo_url || DefaultIcon} className="token-icon" />

                        <div>
                          <div className="token-symbol">{token.symbol}</div>
                          {type === 'Default' && <NetworkWithName chainId={token.chain_id} />}
                        </div>
                      </div>
                    </td>
                    <td>{formateValue(token.price, 2)}</td>
                    {type === 'Summary' && (
                      <td>
                        <Network chainIds={token.chain_ids} />
                      </td>
                    )}
                    <td>{formateValue(token.amount, 4)}</td>
                    <td>${formateValueWithThousandSeparator(token.usd, 4)}</td>
                    {type === 'Summary' && (
                      <td>
                        <Percent percent={token.percent} />
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </HoldingTable>
          {loading && (
            <StyledLoadingWrapper $h="100px">
              <Loading size={22} />
            </StyledLoadingWrapper>
          )}
          {!loading && !displayedList.length && <NoDataLayout />}
        </HoldingTableWrapper>
      </motion.div>
    </AnimatePresence>
  );
};

export default memo(Wallet);
