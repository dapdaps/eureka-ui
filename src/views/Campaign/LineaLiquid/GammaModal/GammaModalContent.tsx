import type { BigNumberish } from '@ethersproject/bignumber';
import Big from 'big.js';
import { ethers } from 'ethers';
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect } from 'react';
import styled from 'styled-components';

import { useMultiState } from '@/modules/hooks';
import { StyledContainer, StyledFlex, StyledFont } from '@/styled/styles';

import ButtonList from './ButtonList';

const StyledInputContainer = styled.div`
  width: 100%;
  height: 72px;
  border-radius: 12px;
  border: 1px solid #373a53;
  background: #2e3142;
  padding: 12px 14px;
`;
const StyledInputContainerTop = styled.div`
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const StyledInputContent = styled.input`
  flex: 1;
  color: #fff;
  font-family: 'Montserrat';
  font-size: 20px;
  font-weight: 500;
  line-height: 24px;
  background: transparent;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;
const StyledInputContainerBottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
interface IGammaModalContentProps {
  pool: any;
  toast: any;
  prices: any;
  updater: number;
  account: string | undefined;
  chainId: number | undefined;
  provider: any;
  addresses: any;
  ICON_VAULT_MAP: any;
  PROXY_ADDRESS: string;
  addAction: (params: any) => void;
  onSuccess: () => void;
}

const GammaModalContent: React.FC<IGammaModalContentProps> = ({
  pool,
  toast,
  prices,
  updater,
  account,
  chainId,
  provider,
  addresses,
  ICON_VAULT_MAP,
  PROXY_ADDRESS,
  addAction,
  onSuccess
}) => {
  const router = useRouter();
  const { token0, token1, decimals0, decimals1, id } = pool;

  const sender = account;

  const [state, updateState] = useMultiState({
    toastId: null,
    lpBalance: '',
    balances: [],
    amount0: '',
    amount1: '',
    lpAmount: '',
    isError: false,
    isLoading: false,
    isToken0Approved: true,
    isToken1Approved: true,
    isToken0Approving: false,
    isToken1Approving: false,
    loadingMsg: '',
    isPostTx: false,
    showPairs: false,
    focusedSymbol: '',
    lpPercent: 0
  });
  const sourceBalances: any = {};
  const {
    balances,
    amount0,
    amount1,
    isLoading,
    isError,
    isToken0Approved,
    isToken1Approved,
    isToken0Approving,
    isToken1Approving,
    loadingMsg,
    lpBalance,
    lpAmount,
    isPostTx
  } = state;

  const vaultAddress = addresses[id];
  const tokensPrice = prices;
  const isInSufficient = Number(amount0) > Number(balances[token0]) || Number(amount1) > Number(balances[token1]);
  const balance0 =
    !amount0 || !tokensPrice?.[token0] ? '-' : parseFloat(Big(amount0).times(tokensPrice[token0]).toFixed(4));
  const balance1 =
    !amount1 || !tokensPrice?.[token1] ? '-' : parseFloat(Big(amount1).times(tokensPrice[token1]).toFixed(4));

  const getTotalValue = useCallback(
    function () {
      const value = Big(balance0 === '-' ? 0 : balance0).plus(balance1 === '-' ? 0 : balance1);

      return Big(value).eq(0) ? '-' : Big(value).toFixed(2);
    },
    [balance0, balance1]
  );

  const getFromDepositAmount = (depositAmount: any, tokenDecimal: number) => {
    const a = new Big(depositAmount[0].toString());
    const b = new Big(depositAmount[1].toString());

    if (a.eq(0) && b.eq(0)) return '0';

    let diff;
    let midpoint;
    if (a.gt(b)) {
      diff = a.minus(b);
      midpoint = diff.div(new Big(2)).plus(b);
    } else {
      diff = b.minus(a);
      midpoint = diff.div(new Big(2)).plus(a);
    }

    for (let i = tokenDecimal; i > 0; i--) {
      const midpointFixed = midpoint.div(new Big(10).pow(tokenDecimal)).toFixed(i);
      if (a.div(Big(10).pow(tokenDecimal)).lte(midpointFixed) && b.div(Big(10).pow(tokenDecimal)).gte(midpointFixed)) {
        return midpointFixed;
      }
    }

    return '0';
  };
  const updateBalance = (token: any) => {
    const { address, decimals, symbol } = token;
    const abi = ['function balanceOf(address) view returns (uint256)'];
    const contract = new ethers.Contract(address, abi, provider?.getSigner());
    contract
      .balanceOf(sender)
      .then((balanceBig: BigNumberish) => {
        const adjustedBalance = Big(ethers.utils.formatUnits(balanceBig, decimals)).toFixed();
        sourceBalances[symbol] = adjustedBalance;
        updateState({
          balances: sourceBalances
        });
      })
      .catch((error: Error) => {
        console.log('error: ', error);
        setTimeout(() => {
          updateBalance(token);
        }, 1500);
      });
  };

  const handleMax = (isToken0: boolean) => {
    if (isToken0) handleTokenChange(balances[token0], token0);
    else handleTokenChange(balances[token1], token1);
  };
  const handleTokenChange = (amount: string, symbol: string, callback?: any) => {
    updateState({ [symbol === token0 ? 'amount0' : 'amount1']: amount });
    if (Number(amount) === 0) {
      updateState({
        [symbol === token0 ? 'amount1' : 'amount0']: '',
        isToken0Approved: true,
        isToken1Approved: true
      });
      return;
    }

    updateState({
      isLoading: true,
      isError: false,
      loadingMsg: 'Computing deposit amount...'
    });
    const decimals = symbol === token0 ? decimals0 : decimals1;
    const otherDecimals = symbol === token0 ? decimals1 : decimals0;

    const tokenWei = ethers.utils.parseUnits(Big(amount).toFixed(decimals), decimals);

    const abi = ['function getDepositAmount(address, address, uint256) public view returns (uint256, uint256)'];
    const proxyContract = new ethers.Contract(PROXY_ADDRESS, abi, provider);

    proxyContract
      .getDepositAmount(vaultAddress, addresses[symbol], tokenWei)
      .then((depositAmount: any) => {
        // console.log('===depositAmount', JSON.stringify(depositAmount) , '=====otherDecimals', otherDecimals)
        console.log('depositAmount[0].toString()', depositAmount[0].toString());
        console.log('depositAmount[1].toString()', depositAmount[1].toString());
        const otherAmount = getFromDepositAmount(depositAmount, otherDecimals);

        console.log('===callback', callback);
        updateState({
          [symbol === token0 ? 'amount1' : 'amount0']: otherAmount,
          focusedSymbol: symbol,
          isLoading: callback ? true : false
        });
        checkApproval(amount, otherAmount, symbol, callback);
      })
      .catch((e: Error) => {
        console.log('===e', e);
        updateState({
          isLoading: true,
          isError: true,
          loadingMsg: 'Something went wrong. Please try again.'
        });
      });
  };
  const handleCheckApproval = (symbol: string, amount: string, decimals: number) => {
    const wei: any = ethers.utils.parseUnits(Big(amount).toFixed(decimals), decimals);
    const abi = ['function allowance(address, address) external view returns (uint256)'];

    const contract = new ethers.Contract(addresses[symbol], abi, provider.getSigner());
    return new Promise((resolve) => {
      contract
        .allowance(sender, vaultAddress)
        .then((allowance: any) => {
          const approved = !new Big(allowance.toString()).lt(wei);
          updateState({
            [symbol === token0 ? 'isToken0Approved' : 'isToken1Approved']: approved
          });
          resolve(approved);
        })
        .catch((e: Error) => console.log(e));
    });
  };
  const checkApproval = (amount: string, otherAmount: string, symbol: string, callback: any) => {
    const otherSymbol = symbol === token0 ? token1 : token0;
    const decimals = symbol === token0 ? decimals0 : decimals1;
    const otherDecimals = symbol === token0 ? decimals1 : decimals0;
    const promiseArray = [
      handleCheckApproval(symbol, amount, decimals),
      handleCheckApproval(otherSymbol, otherAmount, otherDecimals)
    ];
    Promise.all(promiseArray).then((result) => {
      const [firstApproved, secondApproved] = result;
      if (callback) {
        if (firstApproved && secondApproved) {
          symbol === token0 ? callback(amount, otherAmount) : callback(otherAmount, amount);
        } else {
          toast?.dismiss(state.toastId);
          updateState({
            isLoading: false
          });
        }
      }
    });
  };
  const handleApprove = (isToken0: boolean) => {
    const _token = isToken0 ? token0 : token1;
    const payload = isToken0 ? { isToken0Approving: true } : { isToken1Approving: true };

    const amount = isToken0 ? Big(amount0).toFixed(decimals0) : Big(amount1).toFixed(decimals1);

    const toastId = toast?.loading({
      title: `Approve ${_token}`
    });

    updateState({
      ...payload,
      isLoading: true,
      loadingMsg: `Approving ${_token}...`
    });

    const tokenWei = ethers.utils.parseUnits(amount, isToken0 ? decimals0 : decimals1);

    const abi = ['function approve(address, uint) public'];

    const tokenContract = new ethers.Contract(addresses[_token], abi, provider.getSigner());

    tokenContract
      .approve(vaultAddress, tokenWei)
      .then((tx: any) => tx.wait())
      .then((receipt: any) => {
        const payload = isToken0
          ? { isToken0Approved: true, isToken0Approving: false }
          : { isToken1Approved: true, isToken1Approving: false };

        updateState({ ...payload, isLoading: false, loadingMsg: '' });
        toast?.dismiss(toastId);
        toast?.success({
          title: 'Approve Successfully!',
          tx: receipt.transactionHash,
          chainId
        });
      })
      .catch((error: Error) => {
        console.log('error: ', error);
        updateState({
          isError: true,
          isLoading: false,
          loadingMsg: error?.message,
          isToken0Approving: false,
          isToken1Approving: false
        });
        toast?.dismiss(toastId);
        toast?.fail({
          title: 'Approve Failed!',
          text: error?.message?.includes('user rejected transaction') ? 'User rejected transaction' : null
        });
      });
  };
  const handleDeposit = () => {
    const toastId = toast?.loading({
      title: `Depositing...`
    });
    updateState({
      toastId,
      isLoading: true,
      isError: false,
      loadingMsg: 'Depositing...'
    });
    handleTokenChange(
      state.focusedSymbol === token0 ? amount0 : amount1,
      state.focusedSymbol === token0 ? token0 : token1,
      (amount: string, otherAmount: string) => {
        const tokenWei = ethers.utils.parseUnits(Big(amount).toFixed(decimals0), decimals0);
        const otherTokenWei = ethers.utils.parseUnits(Big(otherAmount).toFixed(decimals1), decimals1);
        const proxyAbi = [
          'function deposit(uint256, uint256,address,address,uint256[4] memory)  external returns (uint256)'
        ];
        const proxyContract = new ethers.Contract(PROXY_ADDRESS, proxyAbi, provider.getSigner());
        proxyContract
          .deposit(tokenWei, otherTokenWei, sender, ethers.utils.getAddress(vaultAddress), [0, 0, 0, 0])
          .then((tx: any) => {
            return tx.wait();
          })
          .then((receipt: any) => {
            const { status, transactionHash } = receipt;

            addAction?.({
              type: 'Liquidity',
              action: 'Deposit',
              token0,
              token1,
              amount: amount0,
              template: 'Gamma',
              status: status,
              add: 1,
              transactionHash,
              chain_id: chainId,
              sub_type: 'Add',
              extra_data: JSON.stringify({
                action: 'Deposit',
                amount0,
                amount1
              })
            });

            updateState({
              isLoading: false,
              isPostTx: true
            });

            setTimeout(() => updateState({ isPostTx: false }), 10_000);

            onSuccess && onSuccess();

            toast?.dismiss(toastId);
            toast?.success({
              title: 'Deposit Successfully!'
            });
          })
          .catch((error: Error) => {
            console.log('error: ', error);
            updateState({
              isError: true,
              isLoading: false,
              loadingMsg: error?.message
            });
            toast?.dismiss(toastId);
            toast?.fail({
              title: 'Deposit Failed!',
              text: error?.message?.includes('user rejected transaction')
                ? 'User rejected transaction'
                : (error?.message ?? '')
            });
          });
      }
    );
  };

  useEffect(() => {
    console.log('====sender', sender, '====token0', token0, '====token1', token1);
    if (!sender || !token0 || !token1) return;
    [
      { symbol: token0, address: addresses[token0], decimals: decimals0 },
      { symbol: token1, address: addresses[token1], decimals: decimals1 }
    ].map(updateBalance);
  }, [sender, token0, token1]);
  return (
    <StyledContainer style={{ padding: '25px 20px 20px' }}>
      <StyledFlex>
        <StyledFont color="#FFF" fontSize="16px" fontWeight="500">
          Amount
        </StyledFont>
      </StyledFlex>
      <StyledFlex flexDirection="column" gap="10px" style={{ marginTop: 11, marginBottom: 28 }}>
        <StyledInputContainer>
          <StyledInputContainerTop>
            <StyledInputContent
              placeholder="0.0"
              value={amount0}
              type="number"
              onChange={(e) => handleTokenChange(e.target.value, token0)}
            />
            <StyledFlex alignItems="center" gap="4px">
              <img src={ICON_VAULT_MAP[token0]} alt={token0} />
              <StyledFont color="#FFF" fontSize="16px" fontWeight="500">
                {token0}
              </StyledFont>
            </StyledFlex>
          </StyledInputContainerTop>
          <StyledInputContainerBottom>
            <StyledFont color="#979ABE" fontSize="12px">
              ${balance0}
            </StyledFont>
            <StyledFlex gap="4px">
              <StyledFont color="#979ABE" fontSize="12px">
                Balance:{' '}
              </StyledFont>
              <StyledFont
                color="#979ABE"
                fontSize="12px"
                style={{ textDecoration: 'underline' }}
                onClick={() => handleMax(true)}
              >
                {Big(balances[token0] ?? 0).toFixed(6)}
              </StyledFont>
            </StyledFlex>
          </StyledInputContainerBottom>
        </StyledInputContainer>
        <StyledInputContainer>
          <StyledInputContainerTop>
            <StyledInputContent
              placeholder="0.0"
              value={amount1}
              type="number"
              onChange={(e) => handleTokenChange(e.target.value, token1)}
            />
            <StyledFlex alignItems="center" gap="4px">
              <img src={ICON_VAULT_MAP[token1]} alt={token1} />
              <StyledFont color="#FFF" fontSize="16px" fontWeight="500">
                {token1}
              </StyledFont>
            </StyledFlex>
          </StyledInputContainerTop>
          <StyledInputContainerBottom>
            <StyledFont color="#979ABE" fontSize="12px">
              ${balance1}
            </StyledFont>
            <StyledFlex gap="4px">
              <StyledFont color="#979ABE" fontSize="12px">
                Balance:{' '}
              </StyledFont>
              <StyledFont
                color="#979ABE"
                fontSize="12px"
                style={{ textDecoration: 'underline' }}
                onClick={() => handleMax(false)}
              >
                {Big(balances[token1] ?? 0).toFixed(6)}
              </StyledFont>
            </StyledFlex>
          </StyledInputContainerBottom>
        </StyledInputContainer>
      </StyledFlex>

      <StyledFlex flexDirection="column" gap="14px">
        <StyledFlex alignItems="center" justifyContent="space-between" style={{ width: '100%' }}>
          <StyledFont color="#FFF" fontSize="14px">
            Pool price
          </StyledFont>
          <StyledFont color="#FFF" fontSize="14px">
            1.00 {token0}={' '}
            {Big(
              getFromDepositAmount(
                [ethers.BigNumber.from('21014731588528636233'), ethers.BigNumber.from('21056782066437282034')],
                18
              )
            ).toFixed(6)}
            {token1}
          </StyledFont>
        </StyledFlex>
        <StyledFlex alignItems="center" justifyContent="space-between" style={{ width: '100%' }}>
          <StyledFont color="#FFF" fontSize="14px">
            Total value
          </StyledFont>
          <StyledFont color="#FFF" fontSize="14px">
            ~${getTotalValue()}
          </StyledFont>
        </StyledFlex>
        <StyledFlex></StyledFlex>
      </StyledFlex>

      <StyledFlex flexDirection="column" gap="16px">
        <ButtonList
          {...{
            token0,
            token1,
            amount0,
            amount1,
            isLoading,
            isInSufficient,
            isToken0Approved,
            isToken1Approved,
            isToken0Approving,
            isToken1Approving,
            handleDeposit,
            handleApprove
          }}
        >
          Add Liquidity
        </ButtonList>
        <StyledFont color="#979ABE" fontSize="14px">
          Manage exist assets on{' '}
          <span
            style={{ textDecoration: 'underline', color: '#FFF', cursor: 'pointer' }}
            onClick={() => {
              router.push('/dapp/gamma');
            }}
          >
            Gamma
          </span>
        </StyledFont>
      </StyledFlex>
    </StyledContainer>
  );
};

export default GammaModalContent;
