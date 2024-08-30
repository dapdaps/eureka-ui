import Big from 'big.js';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';
import { useMemo, useRef, useState } from 'react';

import ArrowIcon from '@/components/Icons/ArrowIcon';
import Loading from '@/components/Icons/Loading';
import LazyImage from '@/components/LazyImage';
import chainCofig from '@/config/chains';
import tokens, { NativeTokenAddressMap } from '@/config/tokens';
import useAddChain from '@/hooks/useAddChain';
import useAddTokenToWallet from '@/hooks/useAddTokenToWallet';
import type { Quest, QuestDapp} from '@/hooks/useAirdrop';
import { QuestCategory, useAirdrop } from '@/hooks/useAirdrop';
import useAuthCheck from '@/hooks/useAuthCheck';
import useToast from '@/hooks/useToast';
import { useTokenPriceLatestStore } from '@/stores/tokenPrice';
import { StyledFlex } from '@/styled/styles';
import { copyText } from '@/utils/copy';
import { formatThousandsSeparator } from '@/utils/format-number';
import hexToRgba from '@/utils/hexToRgba';
import TooltipSimple from '@/views/AllDapps/components/Badges/Tooltip';
import NativeCurrency from '@/views/networks/detail/components/NativeCurrency';

import AddMetaMaskModal from './AddMetaMaskModal';
import InteractDAppsModal from './InteractDAppsModal';
import {
  StyledAddText,
  StyledAirdrop,
  StyledAirdropActions,
  StyledAirdropActionsSub,
  StyledAirdropActionsText,
  StyledAirdropActionsTextPrimary,
  StyledAirdropArrow,
  StyledAirdropBody,
  StyledAirdropBodyItem,
  StyledAirdropHead,
  StyledAirdropIcon,
  StyledAirdropLabel,
  StyledAirdropMainTitle,
  StyledAirdropReload,
  StyledAirdropShadow,
  StyledAirdropTitle,
  StyledAirdropValue, StyledImageButton,
  StyledOverview,
  StyledOverviewContainer,
  StyledOverviewDesc,
  StyledOverviewShadow,
  StyledOverviewTitle,
  StyledSummaryAdd,
  StyledSummaryAddIcon,
  StyledTokenAddress,
  StyledTokenContainer,
  StyledTokenInfo,
  StyledTokenItem,
  StyledTokenLabel,
  StyledTokenPrice,
  StyledTokenValue
} from './styles';

const Overview = (props: any) => {
  const {
    description,
    title,
    tbd_token,
    native_currency,
    overviewShadow,
    category,
    id,
    rpc,
    loading,
    chain_id,
    block_explorer,
  } = props;

  const router = useRouter();
  const pathname = usePathname();
  const { check } = useAuthCheck({ isNeedAk: false });
  const toast = useToast();
  const {
    data: airdropData,
    loading: airdropLoading,
    reportAdditionResult,
    getData: getAirdropData,
  } = useAirdrop({ category, id });
  const tokenPriceLatest = useTokenPriceLatestStore(store => store.list);
  const { add } = useAddTokenToWallet();
  const { add: addChain } = useAddChain();

  const copyTooltipRef = useRef<any>(null);

  const [addMetaMaskShow, setAddMetaMaskShow] = useState<boolean>(false);
  const [dappListVisible, setDappListVisible] = useState<boolean>(false);
  const [dappList, setDappList] = useState<QuestDapp[]>([]);
  const [taskDescription, setTaskDescription] = useState<string>('');
  const [actionLoading, setActionLoading] = useState<boolean>(false);

  const nativeCurrency = useMemo(() => {
    if (!native_currency) return undefined;
    try {
      const json = JSON.parse(native_currency) || undefined;
      if (json) {
        json.address = json?.address || NativeTokenAddressMap[json.symbol.toUpperCase()];
        if (!json.address && chain_id) {
          const currChainTokenList = tokens[chain_id];
          if (currChainTokenList) {
            const currToken = Object.values(currChainTokenList).find((t) => t.symbol.toUpperCase() === json.symbol.toUpperCase());
            json.address = currToken?.address;
          }
        }
        const _price = tokenPriceLatest[json.symbol.toUpperCase()];
        if (_price) {
          json.price = formatThousandsSeparator(_price.price, 5);
          json.changePercent = Big(_price.change_percent || 0);
        }
        return json;
      }
    } catch (err) {
      console.log('%cerror: %o', 'background:#f00;', err);
    }
    return undefined;
  }, [native_currency, chain_id, tokenPriceLatest]);

  const blockExplorer = useMemo(() => {
    if (block_explorer) return block_explorer;
    const currChain = chainCofig[nativeCurrency?.chain_id || chain_id];
    if (!currChain) return 'https://etherscan.io';
    return currChain.blockExplorers;
  }, [block_explorer, chain_id, nativeCurrency]);

  const defaultRpc = useMemo(() => {
    if (!rpc) return '';
    try {
      return JSON.parse(rpc)[0] || '';
    } catch (err) {
      console.log(err);
    }
    return '';
  }, [rpc]);

  const onAction = async (action: Quest) => {
    // cannot click after the task is completed
    if (action.completed || actionLoading) {
      return;
    }
    setActionLoading(true);
    // add metamask
    if (action.category === QuestCategory.metamask) {
      const toastId = toast.loading({ title: 'Adding to wallet...' });
      setAddMetaMaskShow(true);
      const succeed = await onAddMetaMask();
      if (succeed) {
        // report addition result
        const reportRes = await reportAdditionResult(action.id);
        toast.dismiss(toastId);
        if (reportRes.success) {
          toast.success({ title: reportRes.msg });
          setActionLoading(false);
          return;
        }
        toast.fail({ title: reportRes.msg || 'Add failed!' });
        setActionLoading(false);
        return;
      }
      toast.dismiss(toastId);
      toast.fail({ title: 'Add failed!' });
      setActionLoading(false);
      return;
    }
    // open dApp
    if (action.category === QuestCategory.dApp) {
      // open url
      if (action.url) {
        router.push(action.url);
        setActionLoading(false);
        return;
      }
      // open dapp
      if (action.dapps && action.dapps.length > 0) {
        // directly jump to a dApp
        if (action.dapps.length === 1) {
          const dappRoute = `/${action.dapps[0].route}`;
          if (pathname === dappRoute) {
            router.replace(dappRoute);
          } else {
            router.push(dappRoute);
          }
          setActionLoading(false);
          return;
        }
        // open DApp list popup
        setDappList(action.dapps);
        setTaskDescription(action.description);
        setDappListVisible(true);
      }
      // ⚠️ below are the unprocessed categories
      setActionLoading(false);
      return;
    }
    setActionLoading(false);
  };

  const handleAddWallet = async () => {
    const addChainRes = await addChain({
      chainId: nativeCurrency?.chain_id || chain_id,
    });
    if (!addChainRes.success) {
      toast.fail({
        title: 'Add failure!',
      });
      return;
    }
    const addRes = await add({
      address: nativeCurrency?.address?.trim(),
      symbol: nativeCurrency?.symbol?.trim(),
      decimals: nativeCurrency?.decimals,
      icon: nativeCurrency?.logo,
    });
    if (addRes.success) {
      toast.success({
        title: 'Add successfully!',
      });
    } else if (addRes.error) {
      const err: any = addRes.error;
      let msg = '';
      if (err?.message?.includes('User rejected')) {
        msg = 'User rejected';
      }
      toast.fail({
        title: 'Add failure!',
        text: msg,
      });
    }
  };

  const onAddMetaMask = async () => {
    const addRes = await addChain({
      chainId: chain_id,
    });
    if (!addRes.success) {
      console.log(addRes.error);
      toast.fail('Failed to add network!');
    }
    return addRes.success;
  };

  const onCopyCurrency = () => {
    copyText(nativeCurrency?.address, () => {
      if (!copyTooltipRef.current) return;
      copyTooltipRef.current.open();
    });
  };

  const onBrowser = () => {
    window.open(`${blockExplorer}/token/${nativeCurrency?.address}`);
  };

  const handleReload = (e: any) => {
    e.stopPropagation();
    if (airdropLoading) return;
    getAirdropData();
  };

  return (
    <div>
      <StyledOverviewContainer>
        {
          overviewShadow?.icon && (
            <StyledOverviewShadow
              src={overviewShadow.icon ?? ''}
              style={
                overviewShadow?.color ?
                  {
                    filter: `drop-shadow(${hexToRgba(overviewShadow?.color, 0.03)} 100vw 0)`,
                    transform: 'translateX(-100vw)',
                  } :
                  {}
              }
            />
          )
        }
        {
          loading ? (
            <StyledFlex justifyContent="center" alignItems="center" style={{ height: 150 }}>
              <Loading size={16} />
            </StyledFlex>
          ) : (
            <StyledOverview>
              <StyledOverviewTitle>{title}</StyledOverviewTitle>
              <StyledOverviewDesc>{description ?? ''}</StyledOverviewDesc>
              <StyledTokenContainer>
                <StyledTokenItem>
                  <StyledTokenLabel>Project Token</StyledTokenLabel>
                  <StyledTokenValue>
                    <NativeCurrency tbdToken={tbd_token} nativeCurrency={native_currency} />
                  </StyledTokenValue>
                </StyledTokenItem>
                {
                  tbd_token !== 'Y' && (
                    <StyledTokenItem>
                      <StyledTokenLabel>Token Price</StyledTokenLabel>
                      <StyledTokenPrice>
                        ${nativeCurrency?.price || '-'}
                        {ChangePercent(nativeCurrency?.changePercent)}
                      </StyledTokenPrice>
                    </StyledTokenItem>
                  )
                }
              </StyledTokenContainer>
              {
                tbd_token !== 'Y' && (
                  <StyledTokenContainer>
                    <StyledTokenItem>
                      <StyledTokenLabel>Token Address</StyledTokenLabel>
                      <StyledTokenInfo>
                        {nativeCurrency?.logo && (
                          <LazyImage
                            src={nativeCurrency?.logo}
                            width={20}
                            height={20}
                            containerStyle={{
                              borderRadius: 4,
                              display: 'flex',
                              alignItems: 'center',
                              overflow: 'hidden',
                            }}
                          />
                        )}
                        <StyledTokenAddress>
                          {nativeCurrency?.address ? nativeCurrency?.address.substring(0, 5) + '...' + nativeCurrency?.address.substring(nativeCurrency?.address.length - 6) : '-'}
                        </StyledTokenAddress>
                        {
                          nativeCurrency?.address && (<>
                            <TooltipSimple
                              ref={copyTooltipRef}
                              tooltip="Copied!"
                              isControlled
                            >
                              <StyledImageButton
                                src="/images/alldapps/icon-copy.svg"
                                width={14}
                                height={14}
                                alt="copy"
                                onClick={onCopyCurrency}
                              />
                            </TooltipSimple>
                            <StyledImageButton
                              src="/images/alldapps/icon-share.svg"
                              width={12}
                              height={12}
                              alt="share"
                              onClick={onBrowser}
                            />
                            <StyledImageButton
                              src="/images/alldapps/icon-metamask.svg"
                              width={17}
                              height={17}
                              alt="metamask"
                              onClick={() => {
                                check(() => {
                                  handleAddWallet();
                                });
                              }}
                            />
                          </>)
                        }
                      </StyledTokenInfo>
                    </StyledTokenItem>
                  </StyledTokenContainer>
                )
              }
            </StyledOverview>
          )
        }
        airdropData.id ? (
        <StyledAirdrop>
          <StyledAirdropMainTitle>Potential Airdrop 🪂</StyledAirdropMainTitle>
          <StyledAirdropHead>
            {
              airdropData.potential?.map((airdrop) => (
                <div key={airdrop.key} className="airdrop-item">
                  <StyledAirdropLabel>{airdrop.label}</StyledAirdropLabel>
                  <StyledAirdropValue>
                    {
                      airdropLoading ? (
                        <Loading size={16} />
                      ) : airdrop.value
                    }
                  </StyledAirdropValue>
                </div>
              ))
            }
          </StyledAirdropHead>
          {
            airdropData.quests && airdropData.quests.length > 0 && (
              <StyledAirdropBody>
                <StyledAirdropActions>
                  Recommended Actions
                  {
                    !airdropLoading && (
                      <StyledAirdropActionsText>
                        <StyledAirdropActionsTextPrimary>
                          {airdropData.completedCount}
                        </StyledAirdropActionsTextPrimary>
                        <span>/</span>
                        <span>{airdropData.quests?.length}</span>
                      </StyledAirdropActionsText>
                    )
                  }
                </StyledAirdropActions>
                <StyledAirdropActionsSub>
                  <svg
                    style={{ transform: `translateY(-2px)` }}
                    width="14"
                    height="13"
                    viewBox="0 0 14 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M9.34133 1.36842L13.6338 8.89473C14.6744 10.7193 13.3736 13 11.2924 13H2.70757C0.626391 13 -0.674354 10.7193 0.366238 8.89474L4.65867 1.36842C5.69926 -0.456136 8.30074 -0.456144 9.34133 1.36842ZM8.56089 1.82456C7.86716 0.608186 6.13284 0.608189 5.43911 1.82456L1.14668 9.35088C0.452954 10.5673 1.32012 12.0877 2.70757 12.0877H11.2924C12.6799 12.0877 13.547 10.5672 12.8533 9.35087L8.56089 1.82456Z"
                      fill="#979ABE"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M7 3C7.55228 3 8 3.33579 8 3.75V7.25C8 7.66421 7.55228 8 7 8C6.44772 8 6 7.66421 6 7.25V3.75C6 3.33579 6.44772 3 7 3ZM7 9C7.55228 9 8 9.33579 8 9.75V10.25C8 10.6642 7.55228 11 7 11C6.44772 11 6 10.6642 6 10.25V9.75C6 9.33579 6.44772 9 7 9Z"
                      fill="#979ABE"
                    />
                  </svg>
                  &nbsp;
                  The following actions are for reference only, and there is no guarantee that official airdrops can be obtained
                </StyledAirdropActionsSub>
                {
                  airdropData.quests?.map((item, index) => (
                    <StyledAirdropBodyItem
                      key={index}
                      $finished={item.completed} onClick={() => {
                      check(() => {
                        onAction(item);
                      });
                    }}
                    >
                      <div>
                        <StyledAirdropShadow className={item.completed ? 'finished' : ''}>
                          <svg
                            width="30"
                            height="30"
                            viewBox="0 0 30 30"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M0 12C0 5.37258 5.37258 0 12 0H30L0 30V12Z"
                              fill={item.completed ? '#EBF479' : '#979ABE'}
                              opacity={item.completed ? 1 : 0.2}
                            />
                          </svg>
                          {
                            item.completed && (
                              <StyledAirdropIcon url="/images/alldapps/icon-checked.svg" />
                            )
                          }
                        </StyledAirdropShadow>
                        <StyledAirdropTitle>{item.name}</StyledAirdropTitle>
                      </div>
                      <StyledFlex justifyContent="end" gap="20px">
                        {
                          !item.completed && (
                            <StyledAirdropReload
                              title="refresh"
                              onClick={handleReload}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                viewBox="0 0 18 18"
                                fill="none"
                              >
                                <motion.path
                                  d="M14.3757 2.19517C14.3668 1.84164 14.0975 1.61883 13.7118 1.62695C13.3254 1.63507 13.1264 1.8708 13.0629 2.22448C13.03 2.40789 13.0406 2.59978 13.0387 2.78794C13.0354 3.10895 13.0378 3.43003 13.0378 3.75111C12.9876 3.77386 12.9374 3.79663 12.8872 3.81942C12.7186 3.65741 12.5529 3.49236 12.381 3.3339C10.8321 1.90596 8.99443 1.37437 6.9364 1.69032C4.03065 2.13638 1.87775 4.55559 1.62512 7.57556C1.38813 10.4085 3.21572 13.1457 5.95898 14.0665C8.73411 14.998 11.8219 13.9138 13.3827 11.4571C13.4832 11.299 13.5876 11.1366 13.6489 10.9618C13.768 10.6221 13.7082 10.3059 13.3727 10.1245C13.0495 9.94966 12.7431 10.0199 12.5136 10.3166C12.3988 10.4649 12.3116 10.6342 12.2044 10.7889C11.2368 12.1863 9.90747 12.9477 8.2065 13.0306C5.9289 13.1416 3.84106 11.6643 3.17728 9.48676C2.49173 7.2378 3.43995 4.8146 5.46813 3.63245C7.43964 2.4833 9.97066 2.81307 11.5661 4.43342C11.6829 4.55207 11.7617 4.70827 11.9511 4.98069C11.3282 4.98069 10.8487 4.95533 10.3731 4.98811C9.93398 5.01841 9.70139 5.27974 9.705 5.64661C9.70852 6.00381 9.95742 6.29937 10.38 6.30976C11.4829 6.33689 12.587 6.32704 13.6906 6.31529C14.0541 6.31142 14.3551 6.10331 14.3661 5.74406C14.4024 4.56189 14.4053 3.37754 14.3757 2.19517Z"
                                  fill="currentColor"
                                  variants={{
                                    animate: {
                                      rotate: [0, 360]
                                    },
                                    default: {
                                      rotate: [0, 0]
                                    }
                                  }}
                                  transition={{
                                    duration: 1,
                                    ease: 'linear',
                                    repeat: Infinity
                                  }}
                                  animate={airdropLoading ? 'animate' : 'default'}
                                  initial="default"
                                />
                              </svg>
                            </StyledAirdropReload>
                          )
                        }
                        <StyledAirdropArrow>
                          <ArrowIcon size={11} />
                        </StyledAirdropArrow>
                      </StyledFlex>
                    </StyledAirdropBodyItem>
                  ))
                }
              </StyledAirdropBody>
            )
          }
        </StyledAirdrop>
        ) : null
      </StyledOverviewContainer>
      <AddMetaMaskModal
        display={addMetaMaskShow}
        onClose={() => setAddMetaMaskShow(false)}
        rpc={defaultRpc}
        chainId={props.chain_id}
        chainName={props.name}
        symbol={nativeCurrency?.symbol}
        explorerUrl={props.block_explorer}
      />
      <InteractDAppsModal
        display={dappListVisible}
        onClose={() => setDappListVisible(false)}
        chainName={props.name}
        dapps={dappList}
        description={taskDescription}
      />
    </div>
  );
};

export default Overview;

function ChangePercent(value: any) {
  if (!value || Big(value).eq(0)) return null;
  return (
    <StyledSummaryAdd>
      <StyledSummaryAddIcon $direction={Big(value).gte(0) ? 'up' : 'down'}>
        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="8" viewBox="0 0 10 8" fill="none">
          <path
            d="M4.56699 0.75C4.75944 0.416667 5.24056 0.416667 5.43301 0.75L8.89711 6.75C9.08956 7.08333 8.849 7.5 8.4641 7.5H1.5359C1.151 7.5 0.910436 7.08333 1.10289 6.75L4.56699 0.75Z"
            fill="currentColor" stroke="url(#paint0_linear_16163_4093)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_16163_4093"
              x1="10.9668"
              y1="1.71698"
              x2="-1"
              y2="1.71698"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="currentColor" />
              <stop offset="1" stopColor="currentColor" stopOpacity="0.1" />
            </linearGradient>
          </defs>
        </svg>
      </StyledSummaryAddIcon>
      <StyledAddText $direction={Big(value).gte(0) ? 'up' : 'down'}>{Big(value).toFixed(1)}%</StyledAddText>
    </StyledSummaryAdd>
  );
}
