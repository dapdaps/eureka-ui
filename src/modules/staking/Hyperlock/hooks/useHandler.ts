// @ts-nocheck
import Big from 'big.js';
import { ethers } from 'ethers';
import { useEffect } from 'react';
export function useHandler(props) {
  const { account, dexConfig, addAction, toast, onLoad } = props;
  const { positionManagerAddress, targetAddress, v2Address } = dexConfig;
  useEffect(() => {
    const handleAction = ({ type, id, pool, amount, method, price, symbol, onSuccess, onError }) => {
      let Contract = null;
      if (type === 'V2') {
        Contract = new ethers.Contract(
          v2Address,
          [
            {
              inputs: [
                { internalType: 'address', name: '_lpToken', type: 'address' },
                { internalType: 'uint256', name: '_amount', type: 'uint256' },
                { internalType: 'uint256', name: '_lock', type: 'uint256' }
              ],
              name: 'stake',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function'
            },
            {
              inputs: [
                { internalType: 'address', name: '_lpToken', type: 'address' },
                { internalType: 'uint256', name: '_amount', type: 'uint256' }
              ],
              name: 'unstake',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function'
            }
          ],
          provider.getSigner()
        );
      } else {
        Contract = new ethers.Contract(
          method === 'safeTransferFrom' ? positionManagerAddress : targetAddress,
          [
            {
              inputs: [
                {
                  components: [
                    { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
                    {
                      internalType: 'address',
                      name: 'recipient',
                      type: 'address'
                    },
                    {
                      internalType: 'uint128',
                      name: 'amount0Max',
                      type: 'uint128'
                    },
                    {
                      internalType: 'uint128',
                      name: 'amount1Max',
                      type: 'uint128'
                    }
                  ],
                  internalType: 'struct INonfungiblePositionManagerStruct.CollectParams',
                  name: 'params',
                  type: 'tuple'
                }
              ],
              name: 'collect',
              outputs: [
                { internalType: 'uint256', name: '', type: 'uint256' },
                { internalType: 'uint256', name: '', type: 'uint256' }
              ],
              stateMutability: 'nonpayable',
              type: 'function'
            },
            {
              inputs: [{ internalType: 'uint256', name: '_tokenId', type: 'uint256' }],
              name: 'withdraw',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function'
            },
            {
              inputs: [
                { internalType: 'address', name: 'from', type: 'address' },
                { internalType: 'address', name: 'to', type: 'address' },
                { internalType: 'uint256', name: 'tokenId', type: 'uint256' }
              ],
              name: 'safeTransferFrom',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function'
            }
          ],
          provider.getSigner()
        );
      }

      let params = [];
      if (method === 'collect') {
        params = [
          [pool.id, account, '340282366920938463463374607431768211455', '340282366920938463463374607431768211455']
        ];
      }
      if (method === 'withdraw') {
        params = [pool.id];
      }
      if (method === 'safeTransferFrom') {
        params = [account, targetAddress, pool.id];
      }
      const _amount = Big(amount || 0)
        .mul(Big(10).pow(18))
        .toFixed(0);
      if (method === 'stake') {
        params = [id, _amount, 0];
      }
      if (method === 'unstake') {
        params = [id, _amount];
      }
      Contract.estimateGas[method](...params)
        .then((res) => {
          console.log('estimateGas', res);
          let toastId = toast.loading({
            title: 'Confirming...'
          });
          Contract[method](...params, { gasLimit: Big(res).mul(1.2).toFixed(0) })
            .then((tx) => {
              toast.dismiss(toastId);
              toastId = toast.loading({
                title: 'Pending...'
              });
              const action =
                method === 'collect' ? 'Collect Fees' : ['withdraw', 'unstake'].includes(method) ? 'Unstake' : 'Stake';
              tx.wait()
                .then((res) => {
                  const { status, transactionHash } = res;
                  toast.dismiss(toastId);
                  if (status === 1) {
                    onSuccess();
                    toast.success({
                      title: `${action} successfully!`
                    });
                  } else {
                    onError();
                    toast.fail({
                      title: `${action} faily!`
                    });
                  }
                  if (method !== 'collect') {
                    const extraData =
                      type === 'V2'
                        ? {
                            token0Symbol: symbol,
                            amount0: amount,
                            price0: price
                          }
                        : {
                            token0Symbol: pool.token0.symbol,
                            token1Symbol: pool.token1.symbol,
                            amount0: pool.amount0.toString(),
                            amount1: pool.amount1.toString(),
                            price0: pool.price0,
                            price1: pool.price1,
                            fee: pool.fee
                          };
                    addAction({
                      type: 'Staking',
                      template: 'Hyperlock',
                      account,
                      status,
                      transactionHash,
                      amount,
                      action: 'Stake',
                      token:
                        type === 'V2'
                          ? {
                              symbol
                            }
                          : null,
                      extra_data: JSON.stringify({
                        action,
                        ...extraData
                      })
                    });
                  }
                })
                .catch((err) => {
                  toast.dismiss(toastId);
                  onError(err);
                });
            })
            .catch((err) => {
              toast.dismiss(toastId);
              toast.fail({
                title: err?.message?.includes('user rejected transaction') ? 'User rejected transaction' : `Add faily!`
              });
              onError(err);
            });
        })
        .catch((err) => {
          onError(err);
        });
    };

    onLoad(handleAction);
  }, []);
}
