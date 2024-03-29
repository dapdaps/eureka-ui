import { memo, useEffect, useState, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  formateValue,
  formateValueWithThousandSeparator,
  formateValueWithThousandSeparatorAndFont,
} from '@/utils/formate';
import { useChainsStore } from '@/stores/chains';
import ProtocolTableGenerator from './ProtocolTableGenerator';
import Position from './Position';
import { ProtocolCard, ProtocolArrowWrapper, ProtocolTableRow } from './styles';
import Big from 'big.js';

const Columns = [
  { name: 'Position', width: '40%' },
  { name: 'Balance', width: '30%' },
  { name: 'USD Value', width: '30%' },
];

export const ProtocolArrowDown = (
  <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0.231804 0.359841C0.585368 -0.0644363 1.21593 -0.12176 1.64021 0.231804L7.00003 4.69832L12.3598 0.231804C12.7841 -0.12176 13.4147 -0.0644363 13.7682 0.359841C14.1218 0.784118 14.0645 1.41468 13.6402 1.76825L7.00003 7.30173L0.359841 1.76825C-0.0644363 1.41468 -0.12176 0.784118 0.231804 0.359841Z"
      fill="#C7CDFF"
    />
  </svg>
);

const ProtocolItem = ({ isExpand, protocol, isHide }: any) => {
  const [thisCardExpand, setThisCardExpand] = useState<boolean>(false);
  const chains = useChainsStore((store: any) => store.chains);
  const chain = useMemo(() => {
    return chains.find((chain: any) => chain.chain_id === protocol.chain_id);
  }, [protocol.chain_id]);
  useEffect(() => {
    setThisCardExpand(isExpand);
  }, [isExpand]);

  const [protocols, totalBalances] = useMemo(() => {
    const _protocols: any = {};
    const _totalBalances: any = {};
    protocol.assets.forEach((asset: any, i: number) => {
      asset.forEach((item: any) => {
        const _key = protocol.type === 'Liquidity' ? i : item.type;
        if (_protocols[_key]) {
          _protocols[_key].list.push(item);
          _totalBalances[_key] = _totalBalances[_key].add(item.usd);
        } else {
          _protocols[_key] = { list: [item], type: item.type, key: _key };
          _totalBalances[_key] = new Big(item.usd);
        }
      });
    });

    return [_protocols, _totalBalances];
  }, [protocol.assets]);

  const checkHideValue = (value: number) => {
    return isHide && value < 0.01;
  };

  return (
    <ProtocolCard>
      <motion.header className="protocol-title" initial={false}>
        <div className="title-filed">
          <div className="icon-filed">
            <img className="protocol-icon" src={protocol.logo || ''} />
            <img className="chain-icon " src={chain.logo} />
          </div>

          <div>
            <div className="protocol-name">{protocol.show_name}</div>
            <div className="chain-name">{chain.name}</div>
          </div>
        </div>

        <div className="value-filed">
          <span className="format-decimals">
            <span
              className="integer-part"
              style={{
                fontSize: '24px',
              }}
            >
              ${formateValueWithThousandSeparatorAndFont(protocol.usd, 4).integer}
            </span>
            <span
              className="decimal-part"
              style={{
                fontSize: '18px',
              }}
            >
              {formateValueWithThousandSeparatorAndFont(protocol.usd, 4).decimal}
            </span>
          </span>

          <ProtocolArrowWrapper
            onClick={() => {
              setThisCardExpand((b) => !b);
            }}
            isExpand={thisCardExpand}
          >
            {ProtocolArrowDown}
          </ProtocolArrowWrapper>
        </div>
      </motion.header>
      <AnimatePresence initial={false}>
        {thisCardExpand && (
          <motion.section
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: 'auto' },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            {protocol.type === 'Liquidity' && (
              <ProtocolTableGenerator
                type={protocol.type}
                name={protocol.type}
                showTitle={false}
                columns={Columns}
                rows={Object.values(protocols).map((record: any, i: number) => {
                  return (
                    <ProtocolTableRow key={i}>
                      <td>
                        <Position lists={record.list} type={i} />
                      </td>
                      <td>
                        {record.list.map((item: any) => (
                          <div key={item.symbol}>
                            {formateValue(item.amount, 4)} {item.symbol}
                          </div>
                        ))}
                      </td>
                      <td>${formateValueWithThousandSeparator(totalBalances[i], 4)}</td>
                    </ProtocolTableRow>
                  );
                })}
              />
            )}
            {protocol.type !== 'Liquidity' &&
              Object.values(protocols).map((value: any) => {
                if (checkHideValue(totalBalances[value.type])) return <div />;
                console.log(value);
                return (
                  <ProtocolTableGenerator
                    key={value.type}
                    type={protocol.type}
                    name={value.type}
                    showTitle={false}
                    columns={Columns}
                    rows={[
                      <ProtocolTableRow>
                        <td>
                          <Position lists={value.list} type={name} />
                        </td>
                        <td>
                          {value.list.map((item: any) => (
                            <div key={item.symbol}>
                              {formateValue(item.amount, 4)} {item.symbol}
                            </div>
                          ))}
                        </td>
                        <td>${formateValueWithThousandSeparator(totalBalances[value.type], 4)}</td>
                      </ProtocolTableRow>,
                    ]}
                  />
                );
              })}
          </motion.section>
        )}
      </AnimatePresence>
    </ProtocolCard>
  );
};

export default memo(ProtocolItem);
