import { cloneDeep, floor, random } from "lodash";

import popupsData from '@/config/all-in-one/chains';

// create demo table data
export function getListData() {
  return Object.values(popupsData).map((it, idx) => {
    return {
      ...cloneDeep(it),
      poolRate: '0.05%',
      amm: {
        name: 'Thena',
        icon: '',
        iconBg: '#9a21a2',
      },
      strategy: idx % 2 === 0 ? 'Dynamic' : 'Stable',
      tvl: `$${floor(random(999, 0.01, true), 2)}K`,
      totalApr: `${floor(random(100, 0.01, true), 2)}%`,
      yours: '-',
    };
  }).slice(0, 3);
}
