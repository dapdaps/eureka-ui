import { ethers } from 'ethers';
import { use, useEffect, useState } from 'react';

import useAccount from '@/hooks/useAccount';
import useAuthCheck from '@/hooks/useAuthCheck';
import useSwitchChain from '@/hooks/useSwitchChain';
import { get, post } from '@/utils/http';

const LINEA_CHAIN_ID = 59144;

export const useBonus = () => {
  const [bonus, setBonus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openBalanceModal, setCheckBalanceModal] = useState(false);
  const [croakModal, setCroakModal] = useState(false);
  const { account, provider, chainId } = useAccount();
  const { check } = useAuthCheck({ isNeedAk: true, isQuiet: false });
  const { switching, switchChain } = useSwitchChain();

  const isLinea = chainId === LINEA_CHAIN_ID;

  const fetchData = async () => {
    try {
      const res = await get('/api/campaign/bonus', { category: 'linea-marsh' });
      if (res.code !== 0) throw new Error(res.msg);
      setBonus(res.data.bonus);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (account && provider) {
      check(fetchData);
    }
  }, [account, provider]);

  const checkBalance = async (provider: any, address: string) => {
    const balance = await provider.getBalance(address);
    return Number(ethers.utils.formatEther(balance));
  };

  const handleSwitchChain = async () => {
    if (switching) return;
    await switchChain({ chainId: LINEA_CHAIN_ID });
  };

  const handleBonus = async () => {
    if (!account) return check();

    if (chainId !== LINEA_CHAIN_ID) {
      return handleSwitchChain();
    }

    try {
      const address1 = '0x194395587d7b169e63eaf251e86b1892fa8f1960';
      const address2 = '0xa9651e1f89535d5b6ede0b818d07712d826e5dc8';

      const balance1 = await checkBalance(provider, address1);
      const balance2 = await checkBalance(provider, address2);

      if (balance1 === 0 && balance2 === 0) {
        return setCheckBalanceModal(true);
      }

      setLoading(true);
      const res = await post('/api/campaign/bonus?category=linea-marsh', { category: 'linea-marsh' });
      if (res.code !== 0) throw new Error(res.msg);
      setBonus(true);
      setCroakModal(true);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    status: bonus,
    setCheckBalanceModal,
    openBalanceModal,
    croakModal,
    setCroakModal,
    loading,
    isLinea,
    handleSwitchChain,
    handleBonus
  };
};
