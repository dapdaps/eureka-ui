import { useEffect, useMemo, useState } from 'react';

import { DAPP_SPLIT, DAPP_STATUS, ODYSSEY_GAME_DAPPS } from '@/views/OdysseyV2-1/config';

export function useGame() {
  const [dappList, setDappList] = useState<any[]>([]);
  const [lines, setLines] = useState<any>({ cols: {}, rows: {} });

  const getDappList = () => {
    const _dappList = ODYSSEY_GAME_DAPPS.sort((a, b) => a.sort - b.sort).map((item, idx) => {
      return {
        ...item,
        status: DAPP_STATUS.UNFINISHED,
        row: Math.ceil((idx + 1) / DAPP_SPLIT),
        col: idx % DAPP_SPLIT + 1,
      };
    });
    setDappList(_dappList);
  };

  const handleDapp = (dapp: any, index: number) => {
    const _dappList = dappList.slice();
    if ([DAPP_STATUS.FINISHED, DAPP_STATUS.PENDING].includes(dapp.status)) {
      return;
    }
    const curr = _dappList[index];
    curr.status = DAPP_STATUS.FINISHED;
    setDappList(_dappList);
  };

  const calcClaim = (type: 'rows' | 'cols', idx: number) => {
    return lines[type][idx]?.finished >= lines[type][idx]?.total;
  };

  const claimedDapps = useMemo(() => {
    return dappList.filter((it) => it.status === DAPP_STATUS.FINISHED).length;
  }, [dappList]);

  const claimedDappsLines = useMemo(() => {
    let finishedLines = 0;
    for (const line in lines) {
      for (const idx in lines[line]) {
        if (lines[line][idx]?.finished >= lines[line][idx]?.total) {
          finishedLines += 1;
        }
      }
    }
    return finishedLines;
  }, [lines]);

  useEffect(() => {
    getDappList();
  }, []);

  useEffect(() => {
    const cols = DAPP_SPLIT;
    const rows = Math.ceil(dappList.length / DAPP_SPLIT);
    const _lines: any = { cols: {}, rows: {} };
    for (let i = 1; i <= cols; i++) {
      _lines.cols[i] = { total: 0, finished: 0 };
      _lines.cols[i].total = dappList.filter((it) => it.col === i).length;
    }
    for (let j = 1; j <= rows; j++) {
      _lines.rows[j] = { total: 0, finished: 0 };
      _lines.rows[j].total = dappList.filter((it) => it.row === j).length;
    }
    for (const dapp of dappList) {
      if (dapp.status !== DAPP_STATUS.FINISHED) continue;
      for (const col in _lines.cols) {
        if (dapp.col === +col) {
          if (_lines.cols[col].finished) _lines.cols[col].finished += 1;
          else _lines.cols[col].finished = 1;
          break;
        }
      }
      for (const row in _lines.rows) {
        if (dapp.row === +row) {
          if (_lines.rows[row].finished) _lines.rows[row].finished += 1;
          else _lines.rows[row].finished = 1;
          break;
        }
      }
    }
    setLines(_lines);
  }, [dappList]);

  return {
    dappList,
    handleDapp,
    calcClaim,
    claimedDapps,
    lines,
    claimedDappsLines,
  };
}
