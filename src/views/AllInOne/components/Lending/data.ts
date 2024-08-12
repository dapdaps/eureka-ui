import { cloneDeep } from "lodash";

import popupsData from '@/config/all-in-one/chains';

// create demo table data
export function getListData() {
  return Object.values(popupsData).map((it, idx) => {
    return {
      ...cloneDeep(it),
      deposit: '$33.53K',
      depositApy: '0.01%',
      borrowed: '$100.32K',
      borrowedApy: '2.79%',
      marketSize: '$43.65M',
    };
  }).slice(0, 3);
}
