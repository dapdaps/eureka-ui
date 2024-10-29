import Big from 'big.js';
import { useEffect, useMemo } from 'react';

import Loading from '@/modules/components/Loading';
import CompoundV3CheckAllowance from '@/modules/lending/components/CompoundV3/CheckAllowance';
import {
  StyledBalanceWrapper,
  StyledButton,
  StyledClose,
  StyledDialog,
  StyledDialogMain,
  StyledFlex,
  StyledFont,
  StyledInput,
  StyledMasker
} from '@/modules/lending/components/CompoundV3/Dialog/styles';
import { useMultiState } from '@/modules/lending/hooks';
import { formatAmount } from '@/utils/format-number';

const CompoundV3Dialog = (props: Props) => {
  const {
    asset,
    type,
    collaterValue,
    borrowCapacity,
    availableToBorrow,
    cometAddress,
    borrowApr,
    supplyApr,
    account,
    toast,
    onAmountChange,
    onAddAction,
    onClose,
    chainId,
    minimumBorrow
  } = props;

  const [state, updateState] = useMultiState<any>({});

  const btnDisabled = useMemo(() => {
    if (!state.amount) return true;
    if (state.loading) return true;
    if (type === 'Borrow' && minimumBorrow && Big(state.amount).lt(minimumBorrow)) {
      return true;
    }
    return false;
  }, [state.amount, state.loading, type, minimumBorrow]);

  useEffect(() => {
    const timer = setTimeout(() => {
      onAmountChange({
        amount: state.amount || 0,
        type,
        cb: (res: any) => {
          updateState({ ...res });
        }
      });
      if (!state.amount || asset.isNative) {
        updateState({ isApproved: true });
        return;
      }
      state?.checkAllowance(state.amount, (isApproved: any) => {
        updateState({ isApproved });
      });
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [state.amount]);

  return (
    <StyledDialog>
      <StyledMasker />
      <StyledDialogMain>
        <StyledFlex style={{ marginBottom: 24, justifyContent: 'space-between' }}>
          <StyledFlex style={{ gap: 6 }}>
            <StyledFont
              style={{
                fontSize: 16,
                fontWeight: 700
              }}
            >
              {type} {asset.symbol}
            </StyledFont>
            {type === 'Supply' && (
              <StyledFont
                style={{
                  fontSize: 16,
                  fontWeight: 700,
                  color: '#10FFB7'
                }}
              >
                {supplyApr}%
              </StyledFont>
            )}
            {['Borrow', 'Repay'].includes(type) && (
              <StyledFont
                style={{
                  fontSize: 16,
                  fontWeight: 700,
                  color: '#7945FF'
                }}
              >
                {borrowApr}%
              </StyledFont>
            )}
            {['Supply', 'Borrow', 'Repay'].includes(type) && (
              <StyledFont
                style={{
                  fontSize: 14,
                  color: '#979ABE'
                }}
              >
                Net APR
              </StyledFont>
            )}
          </StyledFlex>
          <StyledClose
            onClick={() => {
              onClose();
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path
                d="M7.73284 6.00004L11.7359 1.99701C12.0368 1.696 12.0882 1.2593 11.8507 1.0219L10.9779 0.14909C10.7404 -0.0884124 10.3043 -0.0363122 10.0028 0.264491L6.00013 4.26743L1.99719 0.264591C1.69619 -0.036712 1.25948 -0.0884125 1.02198 0.14939L0.149174 1.0223C-0.0882277 1.2594 -0.0368271 1.6961 0.264576 1.99711L4.26761 6.00004L0.264576 10.0033C-0.0363271 10.3041 -0.0884277 10.7405 0.149174 10.978L1.02198 11.8509C1.25948 12.0884 1.69619 12.0369 1.99719 11.736L6.00033 7.73276L10.0029 11.7354C10.3044 12.037 10.7405 12.0884 10.978 11.8509L11.8508 10.978C12.0882 10.7405 12.0368 10.3041 11.736 10.0029L7.73284 6.00004Z"
                fill="#979ABE"
              />
            </svg>
          </StyledClose>
        </StyledFlex>
        <StyledBalanceWrapper style={{ marginBottom: 24 }}>
          <StyledFlex style={{ marginBottom: 16, justifyContent: 'space-between' }}>
            <StyledInput
              placeholder="0.00"
              value={state.amount || ''}
              onChange={(ev) => {
                if (isNaN(Number(ev.target.value))) return;
                if (Big(ev.target.value || 0).gt(asset.walletBalance)) return;
                updateState({
                  amount: ev.target.value
                });
              }}
            />
            <StyledFlex style={{ gap: 6 }}>
              {/* <StyledChain></StyledChain> */}
              <img src={asset.icon} style={{ width: 20, height: 20 }} />
              <StyledFont
                style={{
                  fontSize: 14,
                  fontWeight: 500
                }}
              >
                {asset.symbol}
              </StyledFont>
            </StyledFlex>
          </StyledFlex>
          <StyledFlex style={{ justifyContent: 'space-between' }}>
            <StyledFont
              style={{
                fontSize: 12,
                color: '#979ABE'
              }}
            >
              {formatAmount({
                amount: Big(state.amount || 0).mul(asset.price),
                prev: '$'
              })}
            </StyledFont>
            <StyledFlex style={{ gap: 5 }}>
              <StyledFont
                style={{
                  fontSize: 12,
                  color: '#979ABE'
                }}
              >
                Balance:
              </StyledFont>
              <StyledFlex
                style={{ gap: '8px', cursor: 'pointer' }}
                onClick={() => {
                  const _balance = Big(asset.walletBalance || 0);
                  const splits = _balance.toFixed(18).split('.');
                  const _amount = _balance.lt(0.000001) ? _balance.toFixed(splits[1].length) : asset.walletBalance;
                  updateState({
                    amount: _amount.replace(/\.?0+$/, '')
                  });
                }}
              >
                <StyledFont
                  style={{
                    textDecoration: 'underline',
                    color: '#FFF',
                    fontSize: 12
                  }}
                >
                  {formatAmount({
                    amount: asset.walletBalance
                  })}
                </StyledFont>
                <StyledFont
                  style={{
                    color: '#979ABE',
                    fontSize: 12
                  }}
                >
                  {asset.symbol}
                </StyledFont>
              </StyledFlex>
            </StyledFlex>
          </StyledFlex>
        </StyledBalanceWrapper>
        {type === 'Borrow' && minimumBorrow && (
          <div className="h-[36px] bg-[rgba(235,244,121,0.1)] rounded-[8px] flex items-center gap-[10px] text-[#EBF479] text-[14px] px-[12px] mb-[12px]">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="6" cy="6" r="5.5" stroke="#EBF479" />
              <path d="M6 6L6 9" stroke="#EBF479" strokeWidth="1.4" strokeLinecap="round" />
              <circle cx="6" cy="3.75" r="0.75" fill="#EBF479" />
            </svg>
            <div className="flex items-center gap-[2px]">
              <span>Minimum Borrow</span>
              <span className="font-[700]">{Big(minimumBorrow).toFixed(0)}</span>
              <span className="">{asset.symbol}</span>
            </div>
          </div>
        )}
        {type !== 'Supply' && (
          <StyledFlex style={{ marginBottom: 24, gap: 16, flexDirection: 'column' }}>
            {['Collateral', 'Withdraw'].includes(type) && (
              <StyledFlex style={{ width: '100%', justifyContent: 'space-between' }}>
                <StyledFont
                  style={{
                    color: '#979ABE',
                    fontSize: 14
                  }}
                >
                  Collateral Value
                </StyledFont>
                <StyledFlex style={{ gap: '5px' }}>
                  <StyledFont
                    style={{
                      textDecoration: state.availableToBorrow !== undefined ? 'line-through' : 'inherit',
                      fontSize: 14,
                      color: state.availableToBorrow !== undefined ? '#979ABE' : '#fff'
                    }}
                  >
                    {formatAmount({
                      amount: collaterValue,
                      prev: '$'
                    })}
                  </StyledFont>
                  {state.collaterValue !== undefined && (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" width="8" height="10" viewBox="0 0 8 10" fill="none">
                        <path
                          d="M7.5 4.13397C8.16667 4.51887 8.16667 5.48113 7.5 5.86603L1.5 9.33013C0.833334 9.71503 -4.47338e-07 9.2339 -4.13689e-07 8.4641L-1.10848e-07 1.5359C-7.71986e-08 0.766098 0.833333 0.284973 1.5 0.669873L7.5 4.13397Z"
                          fill="#979ABE"
                        />
                      </svg>
                      <StyledFont
                        style={{
                          color: '#FFF',
                          fontSize: '14px'
                        }}
                      >
                        {formatAmount({
                          amount: state.collaterValue,
                          prev: '$'
                        })}
                      </StyledFont>
                    </>
                  )}
                </StyledFlex>
              </StyledFlex>
            )}
            <StyledFlex style={{ width: '100%', justifyContent: 'space-between' }}>
              <StyledFont
                style={{
                  color: '#979ABE',
                  fontSize: '14px'
                }}
              >
                Borrow Capacity
              </StyledFont>
              <StyledFlex style={{ gap: 5 }}>
                <StyledFont
                  style={{
                    textDecoration: state.borrowCapacity !== undefined ? 'line-through' : 'inherit',
                    fontSize: 14,
                    color: state.borrowCapacity !== undefined ? '#979ABE' : '#fff'
                  }}
                >
                  {formatAmount({
                    amount: borrowCapacity,
                    prev: '$'
                  })}
                </StyledFont>
                {state.borrowCapacity !== undefined && (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" width="8" height="10" viewBox="0 0 8 10" fill="none">
                      <path
                        d="M7.5 4.13397C8.16667 4.51887 8.16667 5.48113 7.5 5.86603L1.5 9.33013C0.833334 9.71503 -4.47338e-07 9.2339 -4.13689e-07 8.4641L-1.10848e-07 1.5359C-7.71986e-08 0.766098 0.833333 0.284973 1.5 0.669873L7.5 4.13397Z"
                        fill="#979ABE"
                      />
                    </svg>
                    <StyledFont
                      style={{
                        fontSize: 14
                      }}
                    >
                      {formatAmount({
                        amount: state.borrowCapacity,
                        prev: '$'
                      })}
                      {/* <span style={{ color: "#979ABE" }}>USDC</span> */}
                    </StyledFont>
                  </>
                )}
              </StyledFlex>
            </StyledFlex>
            <StyledFlex style={{ width: '100%', justifyContent: 'space-between' }}>
              <StyledFont
                style={{
                  fontSize: 14,
                  color: '#979ABE'
                }}
              >
                Available to Borrow
              </StyledFont>
              <StyledFlex style={{ gap: 5 }}>
                <StyledFont
                  style={{
                    textDecoration: state.availableToBorrow !== undefined ? 'line-through' : 'inherit',
                    fontSize: 14,
                    color: state.availableToBorrow !== undefined ? '#979ABE' : '#fff'
                  }}
                >
                  {formatAmount({
                    amount: availableToBorrow,
                    prev: '$'
                  })}
                </StyledFont>
                {state.availableToBorrow !== undefined && (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" width="8" height="10" viewBox="0 0 8 10" fill="none">
                      <path
                        d="M7.5 4.13397C8.16667 4.51887 8.16667 5.48113 7.5 5.86603L1.5 9.33013C0.833334 9.71503 -4.47338e-07 9.2339 -4.13689e-07 8.4641L-1.10848e-07 1.5359C-7.71986e-08 0.766098 0.833333 0.284973 1.5 0.669873L7.5 4.13397Z"
                        fill="#979ABE"
                      />
                    </svg>
                    <StyledFont style={{ fontSize: 14 }}>
                      {formatAmount({
                        amount: state.availableToBorrow,
                        prev: '$'
                      })}
                      {/* <span style={{ color: "#979ABE" }}>USDC</span> */}
                    </StyledFont>
                  </>
                )}
              </StyledFlex>
            </StyledFlex>
          </StyledFlex>
        )}
        {!asset.isNative && (
          <StyledFont
            style={{
              width: 382,
              marginBottom: 20,
              fontSize: 14,
              color: '#979ABE'
            }}
          >
            You need to approve Compound on the {asset.symbol} contract before you can use this asset. You only need to
            do this once.
          </StyledFont>
        )}
        <StyledFlex>
          <StyledButton
            disabled={btnDisabled}
            style={{
              backgroundColor: ['Borrow', 'Repay'].includes(type)
                ? btnDisabled
                  ? 'rgba(93, 54, 195, 0.3)'
                  : 'rgb(93, 54, 195)'
                : btnDisabled
                  ? 'rgba(0, 173, 121, 0.3)'
                  : 'rgb(0, 173, 121)',
              cursor: btnDisabled ? 'not-allowed' : 'pointer'
            }}
            onClick={() => {
              if (!Big(state.amount || 0).gt(0)) return;
              if (minimumBorrow && Big(state.amount || 0).lt(minimumBorrow)) {
                toast?.fail({
                  title: `Minimum borrow of ${Big(minimumBorrow).toFixed(2)} ${asset.symbol}!`
                });
                return;
              }
              if (!state.isApproved) {
                updateState({
                  loading: true
                });
                state.handleApprove(
                  state.amount,
                  () => {
                    updateState({
                      loading: false,
                      isApproved: true
                    });
                    onAddAction({ amount: state.amount, type });
                  },
                  () => {
                    updateState({
                      loading: false
                    });
                  }
                );
              } else {
                onAddAction({ amount: state.amount, type });
              }
            }}
          >
            {state.loading ? <Loading size={16} /> : state.isApproved ? 'Add' : 'Approve & Add'}
          </StyledButton>
        </StyledFlex>
      </StyledDialogMain>
      <CompoundV3CheckAllowance
        account={account}
        spender={cometAddress}
        token={asset}
        amount={state.amount}
        toast={toast}
        chainId={chainId}
        onLoad={(data: any) => {
          updateState({ ...data });
        }}
      />
    </StyledDialog>
  );
};

export default CompoundV3Dialog;

export interface Props {
  asset: any;
  type: any;
  collaterValue: any;
  borrowCapacity: any;
  availableToBorrow: any;
  cometAddress: any;
  borrowApr: any;
  supplyApr: any;
  account: any;
  toast: any;
  onAmountChange: any;
  onAddAction: any;
  onClose: any;
  chainId: any;
  addable?: any;
  minimumBorrow?: number;
}
