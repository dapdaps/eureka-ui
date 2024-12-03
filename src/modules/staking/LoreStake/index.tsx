import Big from 'big.js';
import { ethers } from 'ethers';
import { useCallback, useEffect, useState } from 'react';

import Loading from '@/components/Icons/Loading';
import useAccount from '@/hooks/useAccount';
import useToast from '@/hooks/useToast';
import ChainWarningBox from '@/modules/components/ChainWarningBox';
import { formatIntegerThousandsSeparator } from '@/utils/format-number';

import LoreAbi from './abi/lore.json';
import ReliquaryAbi from './abi/reliquary.json';
import StabilityPoolAbi from './abi/stabilityPool.json';
import StakeModal from './modal/stake';
import StakeStabilityModal from './modal/stakeStability';
import WithDrawModal from './modal/withDraw';

const loreUSD = 0.0167402;

export enum ActionType {
  STAKE = 'STAKE',
  LORE_USD = 'LORE_USD'
}

const LoreStake = (props: any) => {
  const { dexConfig, isChainSupported, onSwitchChain, curChain } = props;

  const [stakeModalVisible, setStakeModalVisible] = useState(false);
  const [withdrawModalVisible, setWithdrawModalVisible] = useState(false);
  const [stablePoolModalVisible, setStablePoolModalVisible] = useState(false);
  const [nftIndex, setNftIndex] = useState<any>(null);
  const [loreDetail, setLoreDetail] = useState<any>(null);
  const [updater, setUpdater] = useState(0);
  const [claimLoading, setClaimLoading] = useState(false);
  const [claimLoadingUSD, setClaimLoadingUSD] = useState(false);
  const [actionType, setActionType] = useState<ActionType>(ActionType.STAKE);

  const { provider, account, chainId } = useAccount();
  const toast = useToast();

  const getLoreTvl = async () => {
    const contract = new ethers.Contract(dexConfig.loreAddress, LoreAbi, provider);
    try {
      const loreTVL = await contract.balanceOf(dexConfig.reliquaryAddress);
      setLoreDetail((prev: any) => ({
        ...prev,
        tvl: formatIntegerThousandsSeparator(ethers.utils.formatEther(loreTVL)),
        tvlUSD: Big(ethers.utils.formatEther(loreTVL))
          .mul(loreDetail?.lorePriceInUsd || loreUSD)
          .toFixed(3)
      }));
    } catch (error) {
      console.log(error, 'getLoreTvl: error');
    }
  };

  const getLoreUsdTvl = async () => {
    const contract = new ethers.Contract(dexConfig.loreUSDAddress, LoreAbi, provider);
    try {
      const loreUsdTVL = await contract.balanceOf(dexConfig.stabilityPoolAddress);

      setLoreDetail((prev: any) => ({
        ...prev,
        loreUsdTvl: formatIntegerThousandsSeparator(ethers.utils.formatEther(loreUsdTVL)),
        loreTvlUSD: Big(ethers.utils.formatEther(loreUsdTVL)).mul(1).toFixed(3)
      }));
    } catch (error) {
      console.log(error, 'getLoreTvl: error');
    }
  };

  const getNftIndex = async () => {
    const contract = new ethers.Contract(dexConfig.reliquaryAddress, ReliquaryAbi, provider);
    try {
      const index = await contract.tokenOfOwnerByIndex(account, 0);
      setNftIndex(index.toString());
    } catch (error) {
      console.log(error, 'error');
    }
  };

  const getStakeAmount = async () => {
    const contract = new ethers.Contract(dexConfig.reliquaryAddress, ReliquaryAbi, provider);
    try {
      const data = await contract.getPositionForId(nftIndex);
      setLoreDetail((prev: any) => ({
        ...prev,
        stakeAmount: ethers.utils.formatEther(data['amount'])
      }));
    } catch (error) {
      console.log(error, 'error');
    }
  };

  const getLoreUsdStakeAmount = async () => {
    const contract = new ethers.Contract(dexConfig.stabilityPoolAddress, StabilityPoolAbi, provider);
    try {
      const data = await contract.deposits(account);
      setLoreDetail((prev: any) => ({
        ...prev,
        loreUsdStakeAmount: ethers.utils.formatEther(data),
        loreUsdStakeAmountUSD: Big(ethers.utils.formatEther(data)).mul(1).toFixed(2)
      }));
    } catch (error) {
      console.log(error, 'getLoreUsdStakeAmount: error');
    }
  };

  const getRewards = async () => {
    const loreContract = new ethers.Contract(dexConfig.reliquaryAddress, ReliquaryAbi, provider);
    const loreUSDContract = new ethers.Contract(dexConfig.stabilityPoolAddress, StabilityPoolAbi, provider);

    try {
      const loreRewards = await loreContract.pendingReward(nftIndex);
      const loreUsdRewards = await loreUSDContract.getDepositorLQTYGain(account);

      setLoreDetail((prev: any) => ({
        ...prev,
        loreRewards: ethers.utils.formatEther(loreRewards),
        loreUsdRewards: ethers.utils.formatEther(loreUsdRewards)
      }));
    } catch (error) {
      console.log(error, 'getRewards: error');
    }
  };

  const init = async () => {
    getLoreTvl();
    getStakeAmount();
    getLoreUsdTvl();
    getLoreUsdStakeAmount();
    getRewards();
  };

  useEffect(() => {
    if (!dexConfig.loreAddress || !provider) return;
    if (!nftIndex) {
      getNftIndex();
      getLoreApr();
      getLoreUsdApr();
      return;
    }
    init();
  }, [provider, nftIndex, updater, chainId]);

  const formatAmount = (value: string | number, price: string | number, precision: number = 2): string => {
    if (!value || !price || value === '0.0') {
      return '0';
    }

    const amount = new Big(value).mul(price);
    if (amount.lt(0.01)) {
      return '< 0.01';
    }
    return formatIntegerThousandsSeparator(amount.toFixed(precision));
  };

  const handleClaim = async (actionType: ActionType) => {
    if (!account || !provider) return;

    if (actionType === ActionType.STAKE) {
      setClaimLoading(true);
    } else {
      setClaimLoadingUSD(true);
    }

    const address = actionType === ActionType.STAKE ? dexConfig.reliquaryAddress : dexConfig.stabilityPoolAddress;
    const abi = actionType === ActionType.STAKE ? ReliquaryAbi : StabilityPoolAbi;

    const contract = new ethers.Contract(address, abi, provider.getSigner());

    try {
      const tx =
        actionType === ActionType.STAKE ? await contract.update(nftIndex, account) : await contract.withdrawFromSP(0);
      await tx.wait();
      toast.success('Claim successful');
      setUpdater(+new Date());
    } catch (error: any) {
      console.log(error, 'handleClaim: error');
      toast.fail(error.message);
    } finally {
      if (actionType === ActionType.STAKE) {
        setClaimLoading(false);
      } else {
        setClaimLoadingUSD(false);
      }
    }
  };

  async function getLoreApr() {
    try {
      const PRICE_PROVIDER = dexConfig.priceProviderAddress;
      const LORE_TOKEN = dexConfig.loreAddress;
      const RELIQUARY = dexConfig.reliquaryAddress;

      const loreTokenABI = ['function balanceOf(address) external view returns (uint256)'];
      const reliquaryABI = ['function emissionRate() external view returns (uint256)'];

      const priceProvider = new ethers.Contract(
        PRICE_PROVIDER,
        [
          {
            inputs: [],
            name: 'getPrices',
            outputs: [
              {
                components: [
                  {
                    internalType: 'address',
                    name: 'contractAddress',
                    type: 'address'
                  },
                  { internalType: 'int256', name: 'price', type: 'int256' }
                ],
                internalType: 'struct PriceDataProvider.PriceRecord[]',
                name: '',
                type: 'tuple[]'
              }
            ],
            stateMutability: 'view',
            type: 'function'
          }
        ],
        provider
      );
      const loreToken = new ethers.Contract(LORE_TOKEN, loreTokenABI, provider);
      const reliquary = new ethers.Contract(RELIQUARY, reliquaryABI, provider);

      const [prices, stakingBalance, emissionRate] = await Promise.all([
        priceProvider.getPrices(),
        loreToken.balanceOf(RELIQUARY),
        reliquary.emissionRate()
      ]);

      const yieldPerYear = Big(emissionRate.toString()).mul(prices[2][1].toString()).mul(Big(31536000));

      const loreApr = yieldPerYear.div(Big(stakingBalance.toString())).div(1e6).mul(100).toFixed(2);

      setLoreDetail((prev: any) => ({
        ...prev,
        loreApr
      }));
    } catch (error: any) {
      throw new Error(`Failed to calculate Lore APR: ${error.message}`);
    }
  }

  async function getLoreUsdApr() {
    try {
      const PRICE_PROVIDER = dexConfig.priceProviderAddress;
      const STABILITY_POOL = dexConfig.stabilityPoolAddress;
      const COMMUNITY_ISSUANCE = '0x7F30c91B7Fb2691D2a0D681f77056001520276B2';

      const stabilityPoolABI = ['function getTotalLUSDDeposits() external view returns (uint256)'];
      const communityIssuanceABI = ['function rewardPerSecond() external view returns (uint256)'];

      const priceProvider = new ethers.Contract(
        PRICE_PROVIDER,
        [
          {
            inputs: [],
            name: 'getPrices',
            outputs: [
              {
                components: [
                  {
                    internalType: 'address',
                    name: 'contractAddress',
                    type: 'address'
                  },
                  { internalType: 'int256', name: 'price', type: 'int256' }
                ],
                internalType: 'struct PriceDataProvider.PriceRecord[]',
                name: '',
                type: 'tuple[]'
              }
            ],
            stateMutability: 'view',
            type: 'function'
          }
        ],
        provider
      );
      const stabilityPool = new ethers.Contract(STABILITY_POOL, stabilityPoolABI, provider);
      const communityIssuance = new ethers.Contract(COMMUNITY_ISSUANCE, communityIssuanceABI, provider);

      const [prices, totalLusdDeposits, emissionRate] = await Promise.all([
        priceProvider.getPrices(),
        stabilityPool.getTotalLUSDDeposits(),
        communityIssuance.rewardPerSecond()
      ]);

      const lorePrice = Big(prices[2][1].toString());

      const SECONDS_IN_YEAR = 31536000;
      const yieldPerYear = Big(emissionRate.toString()).mul(lorePrice).mul(SECONDS_IN_YEAR);

      const loreUsdApr = yieldPerYear.div(Big(totalLusdDeposits.toString())).div(1e8).mul(100).toFixed(2);

      const lorePriceInUsd = Big(prices[0][1].toString());

      setLoreDetail((prev: any) => ({
        ...prev,
        loreUsdApr,
        lorePriceInUsd: lorePriceInUsd.div(1e8).toString(),
        oLorePriceInUsd: Big(prices[2][1].toString()).div(1e8).toString()
      }));
    } catch (error: any) {
      throw new Error(`Failed to calculate LoreUSD APR: ${error.message}`);
    }
  }

  return (
    <div className="w-full mx-auto p-4 space-y-6" style={{ maxWidth: '1200px' }}>
      {/* LORE Staking Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white">Stake</h2>
        <div className="bg-[#262836] rounded-2xl overflow-hidden border border-[#373a53]">
          <div
            className="grid grid-cols-7 gap-4 p-4 text-sm text-white bg-[#262836]"
            style={{
              gridTemplateColumns: '3fr repeat(5, 2fr) 240px'
            }}
          >
            <div>Pool</div>
            <div>TVL</div>
            <div>APR</div>
            <div>Maturity Multiplier</div>
            <div>Balance</div>
            <div>Pending Rewards</div>
            <div></div>
          </div>
          <div
            className="grid grid-cols-7 gap-4 p-4 items-center bg-[#262836] text-white"
            style={{
              gridTemplateColumns: '3fr repeat(5, 2fr) 240px'
            }}
          >
            <div className="font-medium">LORE Staking</div>
            <div className="space-y-1">
              <div>{loreDetail?.tvl || '-'}</div>
              <div className="text-white text-xs">
                ${formatIntegerThousandsSeparator(loreDetail?.tvlUSD) || '-'} USD
              </div>
            </div>
            <div>{loreDetail?.loreApr || '-'}%</div>
            <div>x1</div>
            <div className="space-y-1">
              <div>{loreDetail?.stakeAmount || '0'}</div>
              <div className="text-white text-xs">
                ${formatAmount(loreDetail?.stakeAmount, loreDetail?.lorePriceInUsd || loreUSD)} USD
              </div>
            </div>
            <div>
              {formatAmount(loreDetail?.loreRewards, loreDetail?.oLorePriceInUsd || 1) === '0'
                ? '-'
                : `$${formatAmount(loreDetail?.loreRewards, loreDetail?.oLorePriceInUsd || 1)}`}
            </div>
            <div className="flex gap-2">
              <button
                className="px-4 py-1.5 text-sm bg-[#3A679B] text-white rounded-md hover:opacity-80 transition-colors"
                onClick={() => handleClaim(ActionType.STAKE)}
              >
                {claimLoading ? (
                  <div className="flex items-center gap-[4px]">
                    <Loading size={12} />
                  </div>
                ) : (
                  'Claim'
                )}
              </button>
              <button
                className="px-4 py-1.5 text-sm bg-[#3A679B] text-white rounded-md hover:opacity-80 transition-colors"
                onClick={() => {
                  setActionType(ActionType.STAKE);
                  setWithdrawModalVisible(true);
                }}
              >
                Withdraw
              </button>
              <button
                className="px-4 py-1.5 text-sm bg-[#3A679B] text-white rounded-md hover:opacity-80 transition-colors"
                onClick={() => {
                  setActionType(ActionType.STAKE);
                  setStakeModalVisible(true);
                }}
              >
                Stake
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* loreUSD Section */}
      <div className="max-w-[1200px] mx-auto space-y-4">
        <h2 className="text-xl font-semibold text-white">loreUSD</h2>
        <div className="bg-[#262836] rounded-2xl overflow-hidden border border-[#373a53]">
          {/* Header */}
          <div className="grid grid-cols-[2fr_1.5fr_1fr_1.5fr_1.5fr_2.5fr] gap-4 p-4 text-sm text-white">
            <div>Pool</div>
            <div>TVL</div>
            <div>APR</div>
            <div>Balance</div>
            <div>Pending Rewards</div>
            <div></div>
          </div>

          {/* Content */}
          <div className="grid grid-cols-[2fr_1.5fr_1fr_1.5fr_1.5fr_2.5fr] gap-4 p-4 items-center text-white">
            <div className="font-medium">loreUSD Stability Pool</div>

            <div className="space-y-1">
              <div>{loreDetail?.loreUsdTvl || '-'}</div>
              <div className="text-xs">${formatIntegerThousandsSeparator(loreDetail?.loreTvlUSD) || '-'} USD</div>
            </div>

            <div>{loreDetail?.loreUsdApr || '-'}%</div>

            <div className="space-y-1">
              <div>{loreDetail?.loreUsdStakeAmount || '-'}</div>
              <div className="text-xs">
                ${formatIntegerThousandsSeparator(loreDetail?.loreUsdStakeAmountUSD) || '-'} USD
              </div>
            </div>

            <div>
              {formatAmount(loreDetail?.loreUsdRewards, loreDetail?.oLorePriceInUsd || 1) === '0'
                ? '-'
                : `$${formatAmount(loreDetail?.loreUsdRewards, loreDetail?.oLorePriceInUsd || 1)}`}
            </div>

            <div className="flex justify-end gap-2">
              <button
                className="px-3 py-1.5 text-sm bg-[#3A679B] text-white rounded-md hover:opacity-80 transition-colors"
                onClick={() => handleClaim(ActionType.LORE_USD)}
              >
                {claimLoadingUSD ? (
                  <div className="flex items-center gap-[4px]">
                    <Loading size={12} />
                  </div>
                ) : (
                  'Claim'
                )}
              </button>

              <button
                className="px-3 py-1.5 text-sm bg-[#3A679B] text-white rounded-md hover:opacity-80 transition-colors"
                onClick={() => {
                  setActionType(ActionType.LORE_USD);
                  setWithdrawModalVisible(true);
                }}
              >
                Withdraw
              </button>

              <button
                className="px-3 py-1.5 text-sm bg-[#3A679B] text-white rounded-md hover:opacity-80 transition-colors"
                onClick={() => {
                  setActionType(ActionType.LORE_USD);
                  setStablePoolModalVisible(true);
                }}
              >
                Stake
              </button>
            </div>
          </div>
        </div>
      </div>

      {!isChainSupported && <ChainWarningBox chain={curChain} onSwitchChain={onSwitchChain} theme={dexConfig.theme} />}

      {stakeModalVisible && (
        <StakeModal
          nftIndex={nftIndex}
          config={props}
          onClose={() => setStakeModalVisible(false)}
          onSuccess={() => {
            setUpdater(+new Date());
            setStakeModalVisible(false);
          }}
        />
      )}

      {withdrawModalVisible && (
        <WithDrawModal
          actionType={actionType}
          loreDetail={loreDetail}
          nftIndex={nftIndex}
          config={props}
          onClose={() => setWithdrawModalVisible(false)}
          onSuccess={() => {
            setUpdater(+new Date());
            setWithdrawModalVisible(false);
          }}
        />
      )}

      {stablePoolModalVisible && (
        <StakeStabilityModal
          nftIndex={nftIndex}
          config={props}
          onClose={() => setStablePoolModalVisible(false)}
          onSuccess={() => {
            setUpdater(+new Date());
            setStablePoolModalVisible(false);
          }}
        />
      )}
    </div>
  );
};

export default LoreStake;
