import React from "react";

import type { Token } from "@/components/Bridge/types";
import useAccount from '@/hooks/useAccount';
import { StyledFlex } from "@/styled/styles";
import { ellipsAccount, ellipsAll } from '@/utils/account';
import {
  StyledCard,
  StyledCardBody,
  StyledCardContent,
  StyledCardContentInput,
  StyledCardHead,
  StyledCardHeadEdit,
  StyledCardHeadLeft,
  StyledCardHeadRight,
  StyledGasToken
} from "@/views/AllInOne/components/Bridge/Card/styles";
import type { Chain } from "@/views/AllInOne/components/Bridge/Chain";
import ChainSelector from "@/views/AllInOne/components/Bridge/Chain";
import TokenSelector from "@/views/AllInOne/components/Bridge/Token";

const BridgeCard = (props: BridgeCardProps) => {
  const {
    type,
    styles,
    title,
    chainId,
    poolId,
    onChainSelect,
    onTokenSelect,
    tokenEditable,
    disabled,
  } = props;
  const { account, provider } = useAccount();

  const handleGas = () => {
    if (disabled) return;
  };

  return (
    <StyledCard style={styles}>
      <StyledCardHead>
        <StyledCardHeadLeft>
          <h5 className="title">{title}</h5>
          <ChainSelector
            chainId={chainId}
            onSelect={onChainSelect}
            styles={{ width: 'auto' }}
            popupStyles={{ width: 202, zIndex: 2, maxHeight: 400 }}
            disabled={disabled}
          />
        </StyledCardHeadLeft>
        <StyledCardHeadRight>
          { ellipsAccount(account) }
          {
            tokenEditable && (
              <StyledCardHeadEdit>
                <svg width="11" height="12" viewBox="0 0 11 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M10.1551 10.8038C10.3057 10.8038 10.4502 10.8668 10.5567 10.979C10.6632 11.0912 10.7231 11.2433 10.7231 11.4019C10.7231 11.5605 10.6632 11.7127 10.5567 11.8248C10.4502 11.937 10.3057 12 10.1551 12H0.567984C0.417345 12 0.272876 11.937 0.166359 11.8248C0.059841 11.7127 6.9936e-09 11.5605 6.9936e-09 11.4019V8.47481C-1.19545e-05 8.39455 0.0153198 8.3151 0.0450819 8.2412C0.0748439 8.16731 0.118427 8.10048 0.173235 8.04469L7.61997 0.46701C7.90401 0.167985 8.28921 0 8.69086 0C9.09251 0 9.47771 0.167985 9.76175 0.46701L10.5569 1.30432C10.6976 1.45261 10.8091 1.62862 10.8851 1.8223C10.9611 2.01598 11.0002 2.22354 11 2.43311C10.9998 2.64269 10.9604 2.85017 10.8841 3.04371C10.8077 3.23725 10.6959 3.41306 10.555 3.56108L4.42317 9.96952C4.37021 10.0249 4.30742 10.0687 4.23839 10.0985C4.16935 10.1282 4.09541 10.1434 4.02081 10.1431C3.9462 10.1428 3.87238 10.127 3.80356 10.0967C3.73474 10.0664 3.67227 10.022 3.61971 9.96628C3.56716 9.91051 3.52555 9.84439 3.49726 9.7717C3.46898 9.699 3.45456 9.62115 3.45485 9.54259C3.45513 9.46403 3.47011 9.38629 3.49893 9.31383C3.52774 9.24136 3.56983 9.17558 3.62279 9.12024L9.75323 2.7138C9.78843 2.67677 9.81636 2.6328 9.83542 2.58439C9.85447 2.53599 9.86428 2.4841 9.86428 2.4317C9.86428 2.37931 9.85447 2.32742 9.83542 2.27902C9.81636 2.23061 9.78843 2.18664 9.75323 2.14961L8.95852 1.3128C8.92261 1.27546 8.88001 1.246 8.8332 1.22614C8.78638 1.20628 8.73629 1.19641 8.68583 1.19711C8.63536 1.19781 8.58553 1.20905 8.53923 1.23019C8.49292 1.25134 8.45107 1.28196 8.4161 1.32027L1.13597 8.7285V10.8043H10.1551V10.8038Z"
                    fill="#979ABE" />
                </svg>
              </StyledCardHeadEdit>
            )
          }
        </StyledCardHeadRight>
      </StyledCardHead>
      <StyledCardBody className={type}>
        <StyledCardContent>
          <StyledFlex className="content-row body" justifyContent="space-between" alignItems="center">
            <StyledCardContentInput value={0} disabled={tokenEditable || disabled} />
            <TokenSelector
              chainId={chainId}
              poolId={poolId}
              onSelect={onTokenSelect}
              popupStyles={{ width: 202, zIndex: 2, maxHeight: 300 }}
              disabled={disabled}
            />
          </StyledFlex>
          <StyledFlex className="content-row foot" justifyContent="space-between" alignItems="center">
            <div className="gas">$-</div>
            <StyledFlex className="foot-right" justifyContent="flex-start" alignItems="flex-end">
              {
                tokenEditable ? (
                  <StyledGasToken className="gas-token" disabled={disabled} onClick={handleGas}>
                    <svg width="11" height="10" viewBox="0 0 11 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M0.564103 9.16667V0.555556C0.564103 0.408213 0.623535 0.266905 0.729324 0.162718C0.835114 0.0585316 0.978596 0 1.12821 0H6.20513C6.35474 3.45334e-09 6.49822 0.0585316 6.60401 0.162718C6.7098 0.266905 6.76923 0.408213 6.76923 0.555556V5H7.89744C8.19666 5 8.48362 5.11706 8.6952 5.32544C8.90678 5.53381 9.02564 5.81643 9.02564 6.11111V8.61111C9.02566 8.75844 9.08511 8.89972 9.19089 9.00389C9.29668 9.10806 9.44015 9.16658 9.58974 9.16658C9.73934 9.16658 9.88281 9.10806 9.98859 9.00389C10.0944 8.89972 10.1538 8.75844 10.1538 8.61111V4.44444H9.02564C8.87603 4.44444 8.73255 4.38591 8.62676 4.28173C8.52097 4.17754 8.46154 4.03623 8.46154 3.88889V1.89667L7.84723 1.29167C7.8054 1.2505 7.77232 1.20153 7.74992 1.14763C7.72752 1.09372 7.71626 1.03596 7.71678 0.977723C7.71731 0.919483 7.72962 0.86193 7.75298 0.808427C7.77635 0.754924 7.81031 0.706543 7.85287 0.666111C7.94011 0.58322 8.05681 0.537223 8.17803 0.53795C8.29926 0.538677 8.41538 0.586069 8.50159 0.67L10.8347 2.94056C10.8872 2.99208 10.9288 3.0533 10.9572 3.1207C10.9855 3.18811 11.0001 3.26037 11 3.33333V8.61111C11 9.53167 10.3851 10 9.58974 10C8.79436 10 8.17949 9.53167 8.17949 8.61111V6.11111C8.17949 6.03744 8.14977 5.96679 8.09688 5.91469C8.04398 5.8626 7.97224 5.83333 7.89744 5.83333H6.76923V9.16667H6.91026C7.02246 9.16667 7.13008 9.21056 7.20942 9.2887C7.28876 9.36685 7.33333 9.47283 7.33333 9.58333C7.33333 9.69384 7.28876 9.79982 7.20942 9.87796C7.13008 9.9561 7.02246 10 6.91026 10H0.423077C0.31087 10 0.203259 9.9561 0.123916 9.87796C0.044574 9.79982 0 9.69384 0 9.58333C0 9.47283 0.044574 9.36685 0.123916 9.2887C0.203259 9.21056 0.31087 9.16667 0.423077 9.16667H0.564103ZM1.41026 1.11111V4.16667C1.41026 4.20315 1.41755 4.23927 1.43173 4.27297C1.4459 4.30667 1.46668 4.33729 1.49287 4.36308C1.51906 4.38888 1.55015 4.40934 1.58437 4.4233C1.61859 4.43726 1.65527 4.44444 1.69231 4.44444H5.64103C5.71583 4.44444 5.78757 4.41518 5.84047 4.36308C5.89336 4.31099 5.92308 4.24034 5.92308 4.16667V1.11111C5.92308 1.07463 5.91578 1.03851 5.90161 1.00481C5.88743 0.971109 5.86666 0.940486 5.84047 0.914692C5.81428 0.888898 5.78318 0.868438 5.74896 0.854478C5.71474 0.840518 5.67807 0.833333 5.64103 0.833333H1.69231C1.65527 0.833333 1.61859 0.840518 1.58437 0.854478C1.55015 0.868438 1.51906 0.888898 1.49287 0.914692C1.46668 0.940486 1.4459 0.971109 1.43173 1.00481C1.41755 1.03851 1.41026 1.07463 1.41026 1.11111Z"
                        fill="#EBF479" />
                    </svg>
                    Need Gas Token
                  </StyledGasToken>
                ) : (
                  <div className="balance">balance: -</div>
                )
              }
            </StyledFlex>
          </StyledFlex>
        </StyledCardContent>
      </StyledCardBody>
    </StyledCard>
  );
};

export type BridgeCardType = 'editable';

export interface BridgeCardProps {
  type?: BridgeCardType;
  styles?: React.CSSProperties;
  title: string;
  chainId?: number;
  poolId?: number;
  tokenEditable?: boolean;
  disabled?: boolean;

  onChainSelect?(chainId: number, chain: Chain): void;

  onTokenSelect?(poolId: number, token: Token): void;
}

export default BridgeCard;
