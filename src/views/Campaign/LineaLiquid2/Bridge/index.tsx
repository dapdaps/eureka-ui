import { useSetChain } from '@web3-onboard/react';
import { useDebounceFn } from 'ahooks';
import Big from 'big.js';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import {
  execute,
  getAllToken,
  getBridgeMsg,
  getBridgeTokens,
  getChainScan,
  getIcon,
  getQuote,
  getStatus,
  init
} from 'super-bridge-sdk';

import BridgeX from '@/components/BridgeX/Index';
import chainCofig from '@/config/chains';
import MendiFinanceConfig from '@/config/lending/dapps/mendi-finance';
import useAccount from '@/hooks/useAccount';
import useAddAction from '@/hooks/useAddAction';
import useToast from '@/hooks/useToast';
import { usePriceStore } from '@/stores/price';
import { get } from '@/utils/http';
import position from '@/views/Pool/abi/position';

import { StyledAction, StyledContainer, StyledSummary, StyledTokenList } from './styles';

const chainListSort = [
  1, 42161, 10, 8453, 81457, 5000, 324, 59144, 169, 34443, 1088, 534352, 1101, 137, 56, 43114, 100
];

const chainList = Object.values(chainCofig);

chainList.sort((a, b) => chainListSort.indexOf(a.chainId) - chainListSort.indexOf(b.chainId));

const tool = 'across';

const Mendi = (props: Props) => {
  const {} = props;

  const toast = useToast();
  const { addAction } = useAddAction('dapp');
  const { account } = useAccount();

  const prices = usePriceStore((store) => store.price);

  const [icon, setIcon] = useState('');
  const [name, setName] = useState('');
  const [color, setColor] = useState('');
  const [template, setTemplate] = useState('');
  const [dappDetail, setDappDetail] = useState<any>({});
  const [updateDetail, setUpdateDetail] = useState<boolean>(false);
  const [{ settingChain, connectedChain }, setChain] = useSetChain();

  useEffect(() => {
    if (tool) {
      const { icon, name, color } = getBridgeMsg(tool);
      setIcon(icon);
      setName(name);
      setColor(color);
      get(`/api/dapp?route=bridge-x/${tool}`).then((res) => {
        if (res.code === 0) {
          // console.log(res);
          setTemplate(res.data.name);
          setName(res.data.name);
          setIcon(res.data.logo);
          // setChainConfig(res.data)
          // 🔔 for use in the new dApp detail page
          setDappDetail(res.data || {});
        }
      });
    }
  }, []);

  return (
    <StyledContainer>
      <BridgeX
        style={{ minHeight: 0, margin: 0, padding: 0, width: 'auto', position: 'relative', zIndex: 9999 }}
        card={true}
        // disabledChain={true}
        disabledToChain={true}
        addAction={addAction}
        prices={prices}
        account={account}
        icon={''}
        name={name}
        dapp={dappDetail}
        color={color}
        tool={tool}
        template={template}
        chainList={chainList}
        getQuote={getQuote}
        getAllToken={getAllToken}
        getBridgeToken={getBridgeTokens}
        getChainScan={getChainScan}
        getStatus={getStatus}
        execute={execute}
        currentChainId={connectedChain?.id ? parseInt(connectedChain.id, 16) : 1}
        toChainId={'59144'}
        fromChainId={'1'}
        setChain={setChain}
        onSuccess={() => {
          // setUpdateDetail(true);
          // const timer = setTimeout(() => {
          //   clearTimeout(timer);
          //   setUpdateDetail(false);
          // }, 0);
        }}
      />

      <div className="btm-tip">
        View history on <Link href="/bridge-x/across">Across</Link>
      </div>
    </StyledContainer>
  );
};

export default Mendi;

interface Props {}
