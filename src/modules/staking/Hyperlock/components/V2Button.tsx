// @ts-nocheck
import Big from 'big.js';
import { memo, useEffect } from 'react';

import Loading from '@/modules/components/Loading';
export default memo(function V2Button(props) {
  const { amount, title, account, id, symbol, price, handler, handleApprove, checkAllowance, onSuccess, onError } =
    props;
  const render = function () {
    if (Big(amount || 0).eq(0)) {
      return (
        <button className="button primary" disabled>
          Enter An Amount
        </button>
      );
    }

    if (state.loading) {
      return (
        <button className="button primary" disabled>
          <Loading size={16} />
        </button>
      );
    }
    return (
      <button
        className="button primary"
        disabled={state.loading}
        onClick={() => {
          updateState({
            loading: true
          });
          if (!state.approved) {
            handleApprove(
              amount,
              () => {
                updateState({
                  loading: false,
                  approved: true
                });
              },
              () => {
                updateState({
                  loading: false
                });
              }
            );
            return;
          }
          handler({
            type: 'V2',
            amount,
            id,
            method: title === 'Deposit' ? 'stake' : 'unstake',
            symbol,
            price,
            onSuccess: () => {
              updateState({
                loading: false
              });
              onSuccess?.();
            },
            onError: () => {
              updateState({
                loading: false
              });
              onError?.();
            }
          });
        }}
      >
        {state.approved ? title : 'Approve'}
      </button>
    );
  };
  useEffect(() => {
    if (title === 'Withdraw') {
      updateState({
        approved: true
      });
    } else {
      updateState({
        loading: true
      });
      checkAllowance(amount, (approved) => {
        updateState({
          loading: false,
          approved
        });
      });
    }
  }, [amount]);

  return render();
});
