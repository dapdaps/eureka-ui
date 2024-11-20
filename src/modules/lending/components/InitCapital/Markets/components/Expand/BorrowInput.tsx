import Big from 'big.js';
import { ethers } from 'ethers';
import { useEffect, useMemo, useState } from 'react';

import useAccount from '@/hooks/useAccount';

import useFunctions from '../../../Yours/hooks/useFunctions';
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
const LendingMarketExpandBorrowInput = (props: any) => {
  const { getMode, getCollateralCredit } = useFunctions();
  const { data, markets, state, updateState, underlyingPrices } = props;
  const { underlyingToken, underlyingPrice, collateralFactor, borrowFactor, localConfig: dexConfig } = data;
  const { INIT_ORACLE, NARROW_DECIMALS, STABLE_FACTOR, NON_STABLE_FACTOR } = dexConfig;
  const borrowToken = state.currentBorrowToken;
  const { provider } = useAccount();
  const [borrowPrice, setBorrowPrice] = useState<any>(1);

  const tokenList = useMemo(() => Object.values(markets), [markets]);
  const balance = useMemo(() => {
    if (state?.amount) {
      const HealthFactor = 1.02;
      const _depositDataList = [
        {
          ...data,
          amount: state?.amount
        }
      ];
      const _borrowDataList = [
        {
          ...borrowToken
        }
      ];
      const _mode = getMode(_depositDataList, _borrowDataList);
      const CollateralCredit = getCollateralCredit(_depositDataList, _mode, underlyingPrices);
      const _borrowFactorMapping: any = {
        stable: STABLE_FACTOR?.[borrowToken?.address]?.[1],
        nonStable: NON_STABLE_FACTOR?.[borrowToken?.address]?.[1]
      };
      const _borrowFactor = _borrowFactorMapping[_mode] || borrowToken?.borrowFactor;
      const BorrowCredit = CollateralCredit.div(HealthFactor);
      return Big(BorrowCredit).div(Big(borrowPrice).times(_borrowFactor)).toFixed();
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
    const address =
      token?.underlyingToken?.address === 'native'
        ? '0x78c1b0C915c4FAA5FffA6CAbf0219DA63d7f4cb8'
        : token?.underlyingToken?.address;
    const res: any = await contract.getPrice_e36(address);
    setBorrowPrice(ethers.utils.formatUnits(res?._hex ?? 1, NARROW_DECIMALS[token?.underlyingToken?.symbol]));
  };

  useEffect(() => {
    console.log('======11111=====', borrowToken);
    borrowToken && getBorrowPrice(borrowToken);
  }, [borrowToken]);

  return (
    <LendingMarketInput
      icon={borrowToken?.underlyingToken?.icon}
      symbol={borrowToken?.underlyingToken?.symbol}
      decimals={borrowToken?.underlyingToken?.decimals}
      balance={balance}
      price={borrowToken?.price}
      amount={state.borrowAmount}
      onChange={onAmountChange}
      tokenList={tokenList}
      onTokenChange={(token: any) => {
        updateState({
          currentBorrowToken: token,
          borrowAmount: ''
        });
      }}
    />
  );
};

export default LendingMarketExpandBorrowInput;
