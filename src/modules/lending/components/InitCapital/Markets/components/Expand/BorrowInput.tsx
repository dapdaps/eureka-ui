import Big from 'big.js';
import { ethers } from 'ethers';
import { useEffect, useMemo, useState } from 'react';

import useAccount from '@/hooks/useAccount';

import LendingMarketInput from '../Input';
const INIT_ORACLE_ABI = [
  {
    inputs: [
      {
        internalType: 'address',
        name: '_token',
        type: 'address'
      }
    ],
    name: 'getPrice_e36',
    outputs: [
      {
        internalType: 'uint256',
        name: 'price_e36',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  }
];
const LendingMarketExpandBorrowInput = (props: Props) => {
  const { data, state, updateState } = props;

  const { underlyingToken, underlyingPrice, collateralFactor, borrowFactor, localConfig: dexConfig } = data;

  const { INIT_ORACLE, NARROW_DECIMALS } = dexConfig;

  const borrowToken = state.currentBorrowToken;

  const { provider } = useAccount();
  const [borrowPrice, setBorrowPrice] = useState(1);

  const tokenList = useMemo(() => {
    const _tokenList = [];
    Object.keys(dexConfig.markets).forEach((key) => {
      _tokenList.push({
        underlyingAddress: key,
        ...dexConfig?.markets[key]?.underlyingToken
      });
    });
    return _tokenList;
  }, [dexConfig?.markets]);
  const balance = useMemo(() => {
    if (state?.amount) {
      const HealthFactor = 1.02;
      const CollateralCredit = Big(state?.amount).times(underlyingPrice).times(collateralFactor);
      return CollateralCredit.div(Big(HealthFactor).times(borrowPrice).times(borrowFactor)).toFixed();
    } else {
      return '0';
    }
  }, [state?.amount, underlyingPrice, borrowPrice]);

  const onAmountChange = (_amount: string) => {
    if (isNaN(Number(_amount))) return;
    if (_amount.split('.')[1]?.length > 18) return;
    const params: any = {
      borrowAmount: _amount ?? '',
      isBigerThanBalance: false,
      isOverSize: Big(_amount ? _amount : 0).gt(balance || 0)
    };
    updateState(params);
    state.debouncedGetTrade();
  };

  const getBorrowPrice = async (token: any) => {
    const contract = new ethers.Contract(INIT_ORACLE, INIT_ORACLE_ABI, provider.getSigner());
    const res: any = await contract.getPrice_e36(token?.address);
    setBorrowPrice(ethers.utils.formatUnits(res?._hex ?? 1, NARROW_DECIMALS[token?.symbol]));
  };

  useEffect(() => {
    borrowToken && getBorrowPrice(borrowToken);
  }, [borrowToken]);

  return (
    <LendingMarketInput
      icon={borrowToken?.icon}
      symbol={borrowToken?.symbol}
      decimals={borrowToken?.decimals}
      balance={balance}
      price={borrowToken?.price}
      amount={state.borrowAmount}
      onChange={onAmountChange}
      tokenList={tokenList}
      onTokenChange={(token) => {
        updateState({
          currentBorrowToken: token
        });
      }}
    />
  );
};

export default LendingMarketExpandBorrowInput;

interface Props {
  data: any;
  state: any;
  updateState(state: any): void;
}
