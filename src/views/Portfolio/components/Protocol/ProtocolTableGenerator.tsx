import { upperFirst } from 'lodash';
import { memo } from 'react';

import { ProtocolTable, ProtocolTableHeader } from './styles';

const colorConfig: { [key: string]: any } = {
  default: {
    titleColor: '#ACFCED',
    titleBg: 'rgba(172,252,237,0.3)',
  },

  Staking: {
    titleColor: '#ACFCED',
    titleBg: 'rgba(172,252,237,0.3)',
  },

  deposit: {
    titleColor: '#ACFCED',
    titleBg: 'rgba(172,252,237,0.3)',
  },

  Liquidity: {
    titleColor: '#4594FF',
    titleBg: 'rgba(86,150,236,0.3)',
  },
  Lending: {
    titleColor: '#FFBF19',
    titleBg: 'rgba(255,191,25,0.3)',
  },
};

const ProtocolTableGenerator = ({ columns, rows, name, type }: any) => {
  return (
    <ProtocolTable
      titleColor={(colorConfig[type] || colorConfig['default']).titleColor}
      $titleBg={(colorConfig[type] || colorConfig['default']).$titleBg}
    >
      <div className="type-title">{upperFirst(name)}</div>
      <table>
        <ProtocolTableHeader>
          {columns.map((column: any) => {
            return (
              <th key={column.name} style={{ width: column.width }}>
                {column.name}
              </th>
            );
          })}
        </ProtocolTableHeader>
        <tbody> {rows}</tbody>
      </table>
    </ProtocolTable>
  );
};

export default memo(ProtocolTableGenerator);
