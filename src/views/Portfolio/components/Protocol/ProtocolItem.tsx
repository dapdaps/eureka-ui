import { AnimatePresence, motion } from 'framer-motion';
import { memo, useEffect, useMemo, useState } from 'react';

import chains from '@/config/chains';
import {
  formateValue,
  formateValueWithThousandSeparator,
  formateValueWithThousandSeparatorAndFont,
} from '@/utils/formate';

import { getChainLogo, getDappLogo } from '../../helpers';
import Position from './Position';
import ProtocolTableGenerator from './ProtocolTableGenerator';
import { ProtocolArrowWrapper, ProtocolCard, ProtocolTableRow } from './styles';

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

  const chain = useMemo(() => {
    return chains[protocol.chain_id];
  }, [protocol.chain_id]);
  useEffect(() => {
    setThisCardExpand(isExpand);
  }, [isExpand]);

  const checkHideValue = (value: number) => {
    return isHide && value < 0.01;
  };

  return (
    <ProtocolCard>
      <motion.header className="protocol-title" initial={false}>
        <div className="title-filed">
          <div className="icon-filed">
            <img className="protocol-icon" src={getDappLogo(protocol.name)} />
            <img className="chain-icon " src={getChainLogo(chain?.chainName)} />
          </div>

          <div>
            <div className="protocol-name">{protocol.show_name}</div>
            <div className="chain-name">{chain?.chainName}</div>
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
            $isExpand={thisCardExpand}
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
            {protocol.assets.map((item: any, i: number) => {
              if (checkHideValue(item.usd)) return <div key={Math.random()} />;
              return (
                <ProtocolTableGenerator
                  key={item.type + Math.random()}
                  type={item.type}
                  name={item.type}
                  showTitle={false}
                  columns={Columns}
                  rows={item.assets.map((record: any, i: number) => {
                    return (
                      <ProtocolTableRow key={i}>
                        <td>
                          <Position lists={record.assets} type={i} />
                        </td>
                        <td>
                          {record.assets.map((slip: any) => (
                            <div key={slip.symbol}>
                              {formateValue(slip.amount, 4)} {slip.symbol}
                            </div>
                          ))}
                        </td>
                        <td>{formateValueWithThousandSeparator(record.usd, 4)}</td>
                      </ProtocolTableRow>
                    );
                  })}
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
