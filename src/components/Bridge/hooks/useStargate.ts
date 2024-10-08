import Big from 'big.js';
import { Contract, providers, utils } from 'ethers';
import { useState } from 'react';

import { chainCofig, tokens as configTokens } from '@/config/bridge';
import useAccount from '@/hooks/useAccount';
import useAddAction from '@/hooks/useAddAction';
import { usePriceStore } from '@/stores/price';

import type { Chain, Token } from '../types';

const { JsonRpcProvider } = providers;

export default function useStargate() {
  const { account, provider } = useAccount();
  const [fee, setFee] = useState();
  const { addAction } = useAddAction('wallet/bridge');
  const priceStore = usePriceStore((store) => store.price);
  const getQouteInfo = async ({
    targetToken,
    chain,
    targetChain,
  }: {
    targetToken: Token;
    chain: Chain;
    targetChain: Chain;
  }) => {
    if (!targetToken || !chain || !targetChain) return;
    const _inputChain = chainCofig[chain.chainId];
    const _outputChain = chainCofig[targetChain.chainId];
    const provider = new JsonRpcProvider(chain.rpcUrls[0]);
    const RouterContract = new Contract(
      _inputChain.router,
      [
        {
          inputs: [
            { internalType: 'uint16', name: '_dstChainId', type: 'uint16' },
            { internalType: 'uint8', name: '_functionType', type: 'uint8' },
            { internalType: 'bytes', name: '_toAddress', type: 'bytes' },
            {
              internalType: 'bytes',
              name: '_transferAndCallPayload',
              type: 'bytes',
            },
            {
              components: [
                {
                  internalType: 'uint256',
                  name: 'dstGasForCall',
                  type: 'uint256',
                },
                {
                  internalType: 'uint256',
                  name: 'dstNativeAmount',
                  type: 'uint256',
                },
                {
                  internalType: 'bytes',
                  name: 'dstNativeAddr',
                  type: 'bytes',
                },
              ],
              internalType: 'struct IStargateRouter.lzTxObj',
              name: '_lzTxParams',
              type: 'tuple',
            },
          ],
          name: 'quoteLayerZeroFee',
          outputs: [
            { internalType: 'uint256', name: '', type: 'uint256' },
            { internalType: 'uint256', name: '', type: 'uint256' },
          ],
          stateMutability: 'view',
          type: 'function',
        },
      ],
      provider,
    );
    const res = await RouterContract.quoteLayerZeroFee(_outputChain.dstId, 1, targetToken.address, '0x', {
      dstGasForCall: 0,
      dstNativeAmount: 0,
      dstNativeAddr: '0x0000000000000000000000000000000000000001',
    });
    setFee(res[0].toString());
    const tokenPrice = priceStore[chain.nativeCurrency.symbol];
    if (tokenPrice) {
      return (
        '$' + new Big(utils.formatUnits(res[0].toString(), chain.nativeCurrency.decimals)).mul(tokenPrice).toFixed(4)
      );
    }
    return utils.formatUnits(res[0].toString(), chain.nativeCurrency.decimals) + '  ' + chain.nativeCurrency.symbol;
  };
  const swap = async ({
    chain,
    token,
    targetChain,
    targetToken,
    amount,
    destination,
    onSuccess,
  }: {
    chain: Chain;
    token: Token;
    targetChain: Chain;
    targetToken: Token;
    amount: string;
    destination?: string;
    onSuccess: (hash: string) => void;
  }) => {

    if (!provider) return;
    const signer = await provider.getSigner(account);
    const _amount = utils.parseUnits(amount, token.decimals);
    const _inputChain = chainCofig[chain.chainId];
    const _outputChain = chainCofig[targetChain.chainId];


    const RouterContract =
      token.isNative && _inputChain.ethRouter
        ? new Contract(
            _inputChain.ethRouter,
            [
              {
                inputs: [
                  {
                    internalType: 'uint16',
                    name: '_dstChainId',
                    type: 'uint16',
                  },
                  {
                    internalType: 'address payable',
                    name: '_refundAddress',
                    type: 'address',
                  },
                  { internalType: 'bytes', name: '_toAddress', type: 'bytes' },
                  {
                    internalType: 'uint256',
                    name: '_amountLD',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: '_minAmountLD',
                    type: 'uint256',
                  },
                ],
                name: 'swapETH',
                outputs: [],
                stateMutability: 'payable',
                type: 'function',
              },
            ],
            signer,
          )
        : new Contract(
            _inputChain.router,
            [
              {
                inputs: [
                  {
                    internalType: 'uint16',
                    name: '_dstChainId',
                    type: 'uint16',
                  },
                  {
                    internalType: 'uint256',
                    name: '_srcPoolId',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: '_dstPoolId',
                    type: 'uint256',
                  },
                  {
                    internalType: 'address payable',
                    name: '_refundAddress',
                    type: 'address',
                  },
                  {
                    internalType: 'uint256',
                    name: '_amountLD',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: '_minAmountLD',
                    type: 'uint256',
                  },
                  {
                    components: [
                      {
                        internalType: 'uint256',
                        name: 'dstGasForCall',
                        type: 'uint256',
                      },
                      {
                        internalType: 'uint256',
                        name: 'dstNativeAmount',
                        type: 'uint256',
                      },
                      {
                        internalType: 'bytes',
                        name: 'dstNativeAddr',
                        type: 'bytes',
                      },
                    ],
                    internalType: 'struct IStargateRouter.lzTxObj',
                    name: '_lzTxParams',
                    type: 'tuple',
                  },
                  { internalType: 'bytes', name: '_to', type: 'bytes' },
                  { internalType: 'bytes', name: '_payload', type: 'bytes' },
                ],
                name: 'swap',
                outputs: [],
                stateMutability: 'payable',
                type: 'function',
              },
            ],
            signer,
          );
    const method = token.isNative ? 'swapETH' : 'swap';
    const params = token.isNative
      ? [
          _outputChain.dstId,
          account,
          account,
          _amount.toString(),
          new Big(_amount.toString()).mul(0.995).toString(),
          { value: new Big((fee || '0')?.toString()).add(_amount.toString()).toString() },
        ]
      : [
          _outputChain.dstId,
          configTokens[token.address].poolId,
          configTokens[targetToken.address].poolId,
          account,
          _amount.toString(),
          new Big(_amount.toString()).mul(0.995).toString(),
          { dstGasForCall: 0, dstNativeAmount: 0, dstNativeAddr: '0x' },
          destination || account,
          '0x',
          { value: new Big(fee || '0').toString() },
        ];

    const tx = await RouterContract[method](...params);
    const res = await tx.wait();


    if (res.status === 1) {
      onSuccess(tx.hash);
      const bridgeTxs = localStorage.getItem('bridgeTxs') || '{}';
      const _bridgeTxs = JSON.parse(bridgeTxs);
      addAction({
        type: 'Bridge',
        fromChainId: chain.chainId,
        toChainId: targetChain.chainId,
        token,
        amount,
        template: 'Stargate Bridge',
        add: false,
        status: res.status,
        transactionHash: tx.hash,
      });
      _bridgeTxs[tx.hash] = {
        amount,
        inputChain: chain.chainName,
        outputChain: targetChain.chainName,
        symbol: token.symbol,
        tx: tx.hash,
        time: Date.now(),
        scan: chain.blockExplorers,
        isStargate: true,
        duration: '5 min',
      };
      localStorage.setItem('bridgeTxs', JSON.stringify(_bridgeTxs));
    }
  };
  return {
    getQouteInfo,
    swap,
    gasCost: fee,
  };
}
