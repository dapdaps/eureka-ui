import { useEffect, useMemo, useState } from 'react';

import useDappOpen from '@/hooks/useDappOpen';
import { useAllInOneTabCachedStore } from '@/stores/all-in-one';
import { useLayoutStore } from '@/stores/layout';
import { DAPP_STATUS, ODYSSEY_GAME_DAPPS } from '@/views/OdysseyV2-1/config';
import Big from 'big.js';

export function useGame(props: any) {
  const { gameMatrixConfig, questsList } = props;

  const { open } = useDappOpen();

  const [dappSplit, setDappSplit] = useState<number>(0);
  const [dappList, setDappList] = useState<any[]>([]);
  const [lines, setLines] = useState<any>({ cols: {}, rows: {} });

  const handleDappRedirect = (dapp: any) => {
    dapp.route && open({ dapp: { ...dapp, route: `/${dapp.route}` }, from: 'quest', isCurrentTab: false });
  };

  const setLayout = useLayoutStore((store?: any) => store.set);
  const setCachedTab = useAllInOneTabCachedStore((store: any) => store.setCachedTab);

  const handleDapp = (dapp: any, index: number) => {
    // not dapp task
    if (dapp.category_id === 0) {
      return;
    }
    // dapp task, click to open tab
    if (dapp.operators?.length) {
      handleDappRedirect(dapp.operators[0]);
      return;
    }
    if (dapp.source === 'wallet/bridge') {
      setLayout({
        showAccountSider: true,
        defaultTab: 'bridge',
      });
      return;
    }
    if (dapp.category_name === 'Bridge' && dapp.name === 'Stargate') {
      setCachedTab(dapp.category_name, 59144);
    }
    if (!dapp.source) return;
    window.open(dapp.source, '_blank');
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
    const cols = dappSplit;
    const rows = Math.ceil(dappList.length / cols);
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

  useEffect(() => {
    // break null
    if (
      !gameMatrixConfig ||
      !gameMatrixConfig.quests ||
      !gameMatrixConfig.quests.length ||
      !questsList ||
      !questsList.length
    ) {
      return;
    }
    // read matrix config
    const { quests } = gameMatrixConfig;
    const cols = quests[0].length;
    const _dappList: any[] = [];
    setDappSplit(cols);
    let index = -1;
    quests.forEach((quest: number[]) => {
      quest.forEach((dappId) => {
        // config will return social tasks
        // we should match dapp first
        // then match social tasks
        for (const task of questsList) {
          // category_id=1: bridge
          // category_id=2: swap
          // category_id=3: lending
          // category_id=3: lending
          // category_id=5: staking
          if (task.id === dappId) {
            index += 1;
            const conf = ODYSSEY_GAME_DAPPS.find((conf) => conf.id === dappId);
            const _dapp: any = {
              ...task,
              card: conf?.card,
              icon: conf?.icon,
              link: conf?.link,
              status: Big(task.total_spins).div(task.spins).gte(task.times) ? DAPP_STATUS.FINISHED :  DAPP_STATUS.UNFINISHED,
              row: Math.ceil((index + 1) / cols),
              col: index % cols + 1,
            };
            if (task.operators && task.operators[0]) {
              _dapp.dapp_id = task.operators[0].dapp_id;
              _dapp.icon = task.operators[0].dapp_logo;
              _dapp.link = task.operators[0].route;
            }
            _dappList.push(_dapp);
            break;
          }
        }
      });
    });
    setDappList(_dappList);
  }, [gameMatrixConfig, questsList]);

  return {
    dappList,
    handleDapp,
    calcClaim,
    claimedDapps,
    lines,
    claimedDappsLines,
    dappSplit,
  };
}
