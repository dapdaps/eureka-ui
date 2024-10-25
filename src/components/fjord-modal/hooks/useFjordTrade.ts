import { useSetChain } from '@web3-onboard/react';
import Big from 'big.js';
import type { Signer } from 'ethers';
import { Contract, ethers, providers, utils } from 'ethers';
import { useEffect, useState } from 'react';
import type { QuoteResponse } from 'super-bridge-sdk';
import { approve, execute, getQuote, getStatus } from 'super-bridge-sdk';

import chainCofig from '@/config/chains';
import useAccount from '@/hooks/useAccount';
import useToast from '@/hooks/useToast';
import type { Chain, Token } from '@/types';
import { errorFormated, getFullNum } from '@/utils/balance';

export interface QuoteProps {
  fromChain: Chain;
  fromToken: Token;
  amount: Big;
  pool: string;
  address: string;
  toToken: Token;
  chainId: number;
}

export interface QuoteResProps {
  shareVal: string;
  loading: boolean;
  bridgeRoute: QuoteResponse | null;
  receiveAmount: string;
  tradeType: number;
  isFixedPriceSale?: boolean;
}

export interface TradeProps {
  shareVal: string;
  bridgeRoute: QuoteResponse | null;
  receiveAmount: string;
  tradeType: number;
  pool: string;
  midToken: Token | null;
  recipient: string | undefined;
  quote: QuoteProps | undefined;
  chainId: number;
  slippage: string;
  isFixedPriceSale?: boolean;
}

const poolAbi = [
  {
    inputs: [],
    name: 'asset',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'pure',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'assetsIn',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'minSharesOut',
        type: 'uint256'
      },
      {
        internalType: 'address',
        name: 'recipient',
        type: 'address'
      }
    ],
    name: 'swapExactAssetsForShares',
    outputs: [
      {
        internalType: 'uint256',
        name: 'sharesOut',
        type: 'uint256'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'assetsIn',
        type: 'uint256'
      }
    ],
    name: 'previewSharesOut',
    outputs: [
      {
        internalType: 'uint256',
        name: 'sharesOut',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'sharesIn',
        type: 'uint256'
      }
    ],
    name: 'previewAssetsOut',
    outputs: [
      {
        internalType: 'uint256',
        name: 'assetsOut',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    name: 'purchasedShares',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'saleStart',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'pure',
    type: 'function'
  },
  {
    inputs: [],
    name: 'saleEnd',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'pure',
    type: 'function'
  },
  {
    inputs: [],
    name: 'closed',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'sharesIn',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'minAssetsOut',
        type: 'uint256'
      },
      {
        internalType: 'address',
        name: 'recipient',
        type: 'address'
      }
    ],
    name: 'swapExactSharesForAssets',
    outputs: [
      {
        internalType: 'uint256',
        name: 'assetsOut',
        type: 'uint256'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'recipient',
        type: 'address'
      },
      {
        internalType: 'bool',
        name: 'referred',
        type: 'bool'
      }
    ],
    name: 'redeem',
    outputs: [
      {
        internalType: 'uint256',
        name: 'shares',
        type: 'uint256'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'shares',
        type: 'uint256'
      },
      {
        internalType: 'address',
        name: 'recipient',
        type: 'address'
      }
    ],
    name: 'buyExactShares',
    outputs: [
      {
        internalType: 'uint256',
        name: 'assetsIn',
        type: 'uint256'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'assetsPerToken',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'platformFeeWAD',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'swapFees',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'weiPerToken',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  }
];

const executorAbi = [
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: '_transactionId',
        type: 'bytes32'
      },
      {
        components: [
          {
            internalType: 'address',
            name: 'callTo',
            type: 'address'
          },
          {
            internalType: 'address',
            name: 'approveTo',
            type: 'address'
          },
          {
            internalType: 'address',
            name: 'sendingAssetId',
            type: 'address'
          },
          {
            internalType: 'address',
            name: 'receivingAssetId',
            type: 'address'
          },
          {
            internalType: 'uint256',
            name: 'fromAmount',
            type: 'uint256'
          },
          {
            internalType: 'bytes',
            name: 'callData',
            type: 'bytes'
          },
          {
            internalType: 'bool',
            name: 'requiresDeposit',
            type: 'bool'
          }
        ],
        internalType: 'struct LibSwap.SwapData[]',
        name: '_swapData',
        type: 'tuple[]'
      },
      {
        internalType: 'address',
        name: '_transferredAssetId',
        type: 'address'
      },
      {
        internalType: 'address payable',
        name: '_receiver',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: '_amount',
        type: 'uint256'
      }
    ],
    name: 'swapAndExecute',
    outputs: [],
    stateMutability: 'payable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'erc20Proxy',
    outputs: [
      {
        internalType: 'contract IERC20Proxy',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  }
];

export function useBuyQuote(
  quote: QuoteProps | undefined,
  midToken: Token,
  signer: Signer,
  isFixedPriceSale: boolean
): QuoteResProps {
  const [loading, setLoading] = useState(false);
  const [shareVal, setShareVal] = useState('');
  const [receiveAmount, setReceiveAmount] = useState('');
  const [bridgeRoute, setBridgeRoute] = useState<QuoteResponse | null>(null);
  const [tradeType, setTradeType] = useState<number>(1);

  useEffect(() => {
    if (quote && midToken) {
      excuteQuote(quote, midToken);
    }
  }, [quote, midToken]);

  async function excuteQuote(quote: QuoteProps, midToken: Token) {
    setLoading(true);
    setShareVal('');

    const rpc = chainCofig[quote.chainId].rpcUrls[0];

    const provider = new providers.JsonRpcProvider(rpc);
    const PoolContract = new Contract(quote.pool, poolAbi, provider);
    try {
      if (
        Number(quote.fromChain.chainId) === Number(quote.chainId) &&
        quote.fromToken.address?.toLocaleLowerCase() === midToken.address?.toLocaleLowerCase()
      ) {
        setReceiveAmount(quote.amount.toString());
        await getAssetRuote(quote, midToken, PoolContract, provider);
        setTradeType(1);
      } else {
        await getBridgeRuote(quote, midToken, PoolContract, signer);
        setTradeType(3);
      }
    } catch (e) {
      console.log('e:', e);
      setShareVal('');
      setBridgeRoute(null);
      setReceiveAmount('');
      setLoading(false);
    }
  }

  async function getBridgeRuote(quote: QuoteProps, midToken: Token, PoolContract: Contract, signer: any) {
    setBridgeRoute(null);
    setReceiveAmount('');

    const bridgeQuote = await getQuote(
      {
        fromChainId: quote.fromChain.chainId.toString(),
        toChainId: quote.chainId.toString(),
        fromToken: quote.fromToken,
        toToken: midToken,
        fromAddress: quote.address,
        destAddress: quote.address,
        amount: quote.amount,
        identification: Date.now()
      },
      signer
    );

    console.log('bridgeQuote: ', bridgeQuote);
    if (!bridgeQuote.length) {
      setLoading(false);
      return false;
    }

    let maxRoute = bridgeQuote[0];
    for (let i = 0; i < bridgeQuote.length; i++) {
      if (
        Number(bridgeQuote[i].duration) < 10 &&
        Number(bridgeQuote[i].receiveAmount) > Number(maxRoute.receiveAmount)
      ) {
        maxRoute = bridgeQuote[i];
      }
    }

    const route = maxRoute;
    const receiveAmount = route.receiveAmount;
    getAssetRuote(
      {
        ...quote,
        amount: Big(receiveAmount)
      },
      midToken,
      PoolContract,
      providers
    );
    setBridgeRoute(route);
    setLoading(false);
  }

  async function getAssetRuote(quote: QuoteProps, midToken: Token, PoolContract: Contract, provider: any) {
    if (isFixedPriceSale) {
      const _shares = await getShares(
        PoolContract,
        Big(quote.amount)
          .div(10 ** quote?.fromToken?.decimals)
          .toString(),
        quote
      );
      setShareVal(_shares);
    } else {
      const targetShareVal = await PoolContract.previewSharesOut(quote.amount.toString());
      setShareVal(new Big(targetShareVal).div(10 ** quote.toToken.decimals).toString());
    }
    setReceiveAmount(quote.amount.toString());
    setLoading(false);
  }
  return {
    shareVal,
    loading,
    bridgeRoute,
    receiveAmount,
    tradeType
  };
}

export function useBuyTrade({
  shareVal,
  bridgeRoute,
  receiveAmount,
  tradeType,
  pool,
  midToken,
  recipient,
  slippage,
  quote,
  isFixedPriceSale
}: TradeProps) {
  const [loading, setLoading] = useState(false);
  const { fail, success } = useToast();

  const [{ settingChain, connectedChain }, setChain] = useSetChain();

  async function excuteBuyTrade(signer: Signer) {
    if (!midToken || !recipient || !quote) {
      return;
    }

    try {
      setLoading(true);
      if (tradeType === 3 && bridgeRoute) {
        // 1:bridge 2:asset token => target
        const bridgeHash = await execute(bridgeRoute, signer);

        for (let i = 0; i < 999; i++) {
          const isSuccess = await getStatus(
            {
              hash: bridgeHash,
              chainId: quote.fromChain.chainId.toString(),
              address: quote.address,
              fromChainId: quote.fromChain.chainId.toString(),
              toChainId: quote.chainId.toString()
            },
            bridgeRoute.bridgeType,
            signer
          );

          if (isSuccess) {
            break;
          }
          await sleep(1000 * 10);
        }
      }
      if (Number(quote?.fromChain.chainId) !== Number(quote.chainId)) {
        await setChain({ chainId: `0x${quote.chainId.toString(16)}` });
      }

      const PoolContract = new Contract(pool, poolAbi, signer);

      const rpcUrl = chainCofig[quote.chainId].rpcUrls[0];

      const midTokenBalance = await getBalance(rpcUrl, recipient, midToken);

      let _receiveAmount = receiveAmount;
      if (Number(midTokenBalance) < Number(receiveAmount)) {
        _receiveAmount = midTokenBalance;
      }

      const _slippage = Number(slippage) / 100;

      const assetsIn = new Big(_receiveAmount).times(1.05);
      const minSharesOut = getFullNum(
        new Big(shareVal)
          .mul(10 ** quote.toToken.decimals)
          .mul(1 - _slippage)
          .toNumber()
      );
      await approve(midToken.address, assetsIn, pool, signer);

      let tx: any = null;
      if (isFixedPriceSale) {
        const shares = await getShares(PoolContract, Big(assetsIn).div(10 ** quote?.fromToken?.decimals), quote);
        const wei = ethers.utils.parseUnits(Big(shares).toFixed(18), 18);

        let gasLimit: any = 4000000;
        try {
          gasLimit = await PoolContract.estimateGas.buyExactShares(wei, recipient);
        } catch (error) {
          console.log('error: ', error);
        }
        tx = await PoolContract.buyExactShares(wei, recipient, {
          gasLimit
        });
      } else {
        tx = await PoolContract.swapExactAssetsForShares(assetsIn.toString(), minSharesOut.toString(), recipient);
      }
      await tx.wait();
      setLoading(false);
      success({
        title: 'Transaction success',
        text: 'Buy success'
        // token: quote.toToken
      });

      return tx.hash;
    } catch (err) {
      setLoading(false);
      fail({
        title: 'Transaction failed',
        text: errorFormated(err)
      });
    }
  }

  return {
    excuteBuyTrade,
    loading
  };
}

export function useSellQuote({
  amount,
  pool,
  recipient,
  toToken,
  midToken,
  chainId
}: {
  amount: string;
  pool: string;
  recipient: string | null;
  toToken: Token;
  midToken: Token;
  chainId: number;
}) {
  const [assetOut, setAssetOut] = useState('');

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (amount && recipient) {
      setLoading(true);
      const _amount = new Big(amount).mul(10 ** toToken.decimals).toNumber();
      const PoolContract = getPoolContract(pool, chainId);

      PoolContract.previewAssetsOut(BigInt(_amount).toString()).then((res: string) => {
        setAssetOut(new Big(res.toString()).div(10 ** midToken.decimals).toString());
        setLoading(false);
      });
    }
  }, [amount, recipient]);

  return {
    assetOut,
    loading
  };
}

export function useDetail(pool: string, recipient: string, toToken: Token, chainId: number, updater: number) {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [isClosed, setIsClosed] = useState(false);
  const [balance, setBalance] = useState('');

  async function saleStart() {
    const PoolContract = getPoolContract(pool, chainId);
    const time = await PoolContract.saleStart();
    setStartTime(time.toString());
  }

  async function saleEnd() {
    const PoolContract = getPoolContract(pool, chainId);
    const time = await PoolContract.saleEnd();
    setEndTime(time.toString());
  }

  async function getClosed() {
    const PoolContract = getPoolContract(pool, chainId);
    const isClosed = await PoolContract.closed();
    setIsClosed(isClosed);
  }

  useEffect(() => {
    if (recipient) {
      const PoolContract = getPoolContract(pool, chainId);
      PoolContract.purchasedShares(recipient).then((res: string) => {
        setBalance(new Big(res.toString()).div(10 ** toToken.decimals).toString());
      });
    }
  }, [recipient, updater]);

  useEffect(() => {
    saleStart();
    saleEnd();
    getClosed();
  }, [updater]);

  return {
    startTime,
    endTime,
    isClosed,
    balance
  };
}

export function useSellTrade({
  pool,
  amount,
  assetOut,
  recipient,
  toToken,
  midToken,
  chainId: tragetChainId,
  slippage
}: {
  pool: string;
  amount: string;
  assetOut: string;
  recipient: string;
  toToken: Token;
  midToken: Token | null;
  chainId: number;
  slippage: string;
}) {
  const [loading, setLoading] = useState(false);
  const { fail, success } = useToast();
  const [{ settingChain, connectedChain }, setChain] = useSetChain();
  const { account, chainId, provider } = useAccount();

  async function excuteSellTrade(signer: Signer) {
    if (!midToken) {
      return;
    }

    setLoading(true);
    try {
      if (Number(chainId) !== Number(chainId)) {
        await setChain({ chainId: `0x${Number(chainId).toString(16)}` });
      }

      const PoolContract = new Contract(pool, poolAbi, signer);

      const _slippage = Number(slippage) / 100;

      const minAssetsOut = new Big(assetOut)
        .mul(10 ** midToken.decimals)
        .mul(1 - _slippage)
        .toNumber()
        .toFixed(0)
        .toString();

      // const amountBig = new Big(amount).mul(10 ** toToken.decimals).toString()
      const balnace = (await PoolContract.purchasedShares(recipient)).toString();
      let _amount = BigInt(new Big(amount).mul(10 ** toToken.decimals).toNumber()).toString();

      if (new Big(_amount).gte(new Big(balnace))) {
        _amount = balnace;
      }
      console.log('minAssetsOut:', _amount, minAssetsOut);
      let gasLimit = 19200;
      try {
        gasLimit = (
          await PoolContract.estimateGas.swapExactSharesForAssets(_amount, minAssetsOut, recipient)
        ).toNumber();
      } catch (e) {
        console.log(e);
      }

      const tx = await PoolContract.swapExactSharesForAssets(_amount, minAssetsOut, recipient, {
        gasLimit: gasLimit
      });
      const v = await tx.wait();
      setLoading(false);

      success({
        title: 'Transaction success',
        text: ''
      });

      return tx.hash;
    } catch (err) {
      console.log('err:', err);

      setLoading(false);
      fail({
        title: 'Transaction failed',
        text: errorFormated(err)
      });
    }
  }

  return {
    excuteSellTrade,
    loading
  };
}

export function useRedeem() {
  const { fail, success } = useToast();

  async function excuteRedeemTrade(pool: string, signer: Signer) {
    try {
      const PoolContract = new Contract(pool, poolAbi, signer);

      const tx = await PoolContract.redeem();
      await tx.wait();
      success({
        title: 'Transaction success',
        text: ''
      });
      return tx.hahh;
    } catch (err) {
      fail({
        title: 'Transaction failed',
        text: errorFormated(err)
      });
    }
  }

  return {
    excuteRedeemTrade
  };
}

async function getBalance(rpcUrl: string, account: string, currency: Token) {
  try {
    const provider = new providers.JsonRpcProvider(rpcUrl);
    const TokenContract = new Contract(
      currency.address,
      [
        {
          constant: true,
          inputs: [
            {
              name: '_owner',
              type: 'address'
            }
          ],
          name: 'balanceOf',
          outputs: [
            {
              name: 'balance',
              type: 'uint256'
            }
          ],
          payable: false,
          stateMutability: 'view',
          type: 'function'
        }
      ],
      provider
    );
    const res = await TokenContract.balanceOf(account);
    return res.toString();
  } catch (err) {
    return '0';
  }
}

function sleep(time: number) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

function getPoolContract(pool: string, chainId: number) {
  const rpcUrl = chainCofig[chainId]?.rpcUrls[0];

  const provider = new providers.JsonRpcProvider(rpcUrl);
  const PoolContract = new Contract(pool, poolAbi, provider);

  return PoolContract;
}

async function getShares(contract: any, assetsIn: any, quote: QuoteProps): Promise<any> {
  try {
    const ppt: any =
      quote?.fromToken?.isNative || quote?.fromToken?.symbol === 'ETH'
        ? await contract.weiPerToken()
        : await contract.assetsPerToken();
    const platformFeeWADResult: any = await contract.platformFeeWAD();
    const swapFee: string = utils.formatUnits(platformFeeWADResult, 18);
    return Big(assetsIn)
      .times(10 ** quote?.fromToken?.decimals)
      .div(Big(Big(1).plus(swapFee)).times(ppt))
      .times(0.99)
      .toFixed(0);
  } catch (err) {
    console.log('===err', err);
    return '0';
  }
}
