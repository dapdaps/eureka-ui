import Big from 'big.js';
import { useEffect, useState } from 'react';

import { ethereum } from '@/config/tokens/ethereum';

import Button from '../../components/button';
import StakeList from '../../components/stake-list';
import {
  StyledActiveAndCompleted,
  StyledActiveAndCompletedButton,
  StyledActiveAndCompletedContainer,
  StyledBaseInfo,
  StyledBaseInfoContainer,
  StyledBaseInfoValue,
  StyledBaseInfoValueContainer,
  StyledBottomContainer,
  StyledClose,
  StyledCloseIcon,
  StyledFirstTips,
  StyledInput,
  StyledInputContainer,
  StyledMax,
  StyledMaxAndSymbol,
  StyledPlusSvg,
  StyledPlusTips,
  StyledReceive,
  StyledReceiveContainer,
  StyledRecord,
  StyledRecordList,
  StyledRecordText,
  StyledSecondLine,
  StyledSecondTips,
  StyledStakeBottomContainer,
  StyledStakeButtonContainer,
  StyledStakeContainer,
  StyledStakeTopContainer,
  StyledSymbol,
  StyledSymbolImage,
  StyledSymbolTxt,
  StyledTipsContainer,
  StyledWithdrawTips
} from '../../styles';
import useFrax from './hooks/useFrax';
import { ITab, useTabStore } from './hooks/useTab';
import Mint from './Mint';
import Redeem from './Redeem';
import Tabs from './Tabs';



const FraxComponent = function (props: any) {

  const { setShow, 
    token0, 
    token1,     
    requests,
    requestsLoading,
    claiming,
    queryRequests,
    claim, } = props.componentProps;
  const setTabStore = useTabStore(store => store.set)

  const {
    data,
    inAmount,
    outAmount,
    isLoading,
    approved,
    approving,
    leastAmount,
    inToken,
    outToken,
    isInSufficient,
    sfrxBalance,
    handleApprove,
    handleAmountChange,
    handleStake,
    handleAddMetaMask,
    handleMax
  } = useFrax({ token0, token1 });

  const [actionType, setActionType] = useState(ITab.MINT)
  

  const changeTab = (tab: any) => {
    setActionType(tab)
    setTabStore({
      tab
    })
  }

  return (
    <StyledStakeContainer>
      <StyledStakeTopContainer
        style={[ITab.UNSTAKE, ITab.REDEEM].includes(actionType) ? { borderRadius: '4px 4px 0 0', borderBottom: 'none', minHeight: 484 } : {}}
      >
        <StyledClose
          onClick={() => {
            setShow(false);
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="97" height="49" viewBox="0 0 97 49" fill="none">
            <path
              d="M2 1H92C94.2091 1 96 2.79086 96 5V48H41.9098C40.7019 48 39.5587 47.4542 38.7993 46.5149L2 1Z"
              fill="#272727"
              stroke="#3F3F3F"
            />
          </svg>
          <StyledCloseIcon>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M9.02165 7.00005L13.6919 2.32984C14.0429 1.97867 14.1029 1.46918 13.8258 1.19221L12.8075 0.173938C12.5304 -0.103148 12.0216 -0.0423642 11.6699 0.308572L7.00015 4.97866L2.33006 0.308689C1.97889 -0.0428307 1.4694 -0.103148 1.19231 0.174288L0.174037 1.19268C-0.102932 1.4693 -0.042965 1.97879 0.308672 2.32996L4.97888 7.00005L0.308672 11.6705C-0.0423816 12.0214 -0.103166 12.5306 0.174037 12.8077L1.19231 13.826C1.4694 14.1031 1.97889 14.043 2.33006 13.692L7.00038 9.02155L11.67 13.6913C12.0218 14.0432 12.5305 14.1031 12.8076 13.826L13.8259 12.8077C14.1029 12.5306 14.0429 12.0214 13.692 11.67L9.02165 7.00005Z"
                fill="#979ABE"
              />
            </svg>
          </StyledCloseIcon>
        </StyledClose>

        <Tabs defaultTab={actionType} items={Object.values(ITab)} onClick={changeTab} />
        { actionType === ITab.MINT && 
          (<Mint 
            token0={token0}
            token1={token1} 
            actionType={actionType}
          />)
        }

        {
          actionType === ITab.REDEEM && (<Redeem 
            token0={token0}
            token1={token1} 
            inAmount={inAmount} 
            outAmount={outAmount} 
            leastAmount={leastAmount} 
            actionType={actionType}
          />)
        }
        {
          ![ITab.MINT, ITab.REDEEM].includes(actionType) && (
            <>
              <StyledBaseInfoContainer style={{ justifyContent: 'space-between'}}>
                {[ITab.STAKE].includes(actionType) && (
                  <StyledBaseInfo>
                    <StyledFirstTips>Available to stake</StyledFirstTips>
                    <StyledBaseInfoValue>
                    {Big(data?.stakedAmount ?? 0).toFixed(4)} {outToken?.symbol}
                    </StyledBaseInfoValue>
                  </StyledBaseInfo>
                )}
                <StyledBaseInfo flex={ITab.UNSTAKE === actionType ? 'none':'' } style={{ alignItems: [ITab.STAKE, ITab.UNSTAKE].includes(actionType) ? 'center' : 'flex-start' }}>
                  <StyledFirstTips>APR</StyledFirstTips>
                  <StyledBaseInfoValue style={{ color: '#A4E417' }}>{Big(data?.apy ?? 0).toFixed(2)}%</StyledBaseInfoValue>
                </StyledBaseInfo>
                <StyledBaseInfo flex={ITab.UNSTAKE === actionType ? 'none':'' } >
                  <StyledFirstTips>Staked amount</StyledFirstTips>

                  <StyledBaseInfoValueContainer>
                    <StyledBaseInfoValue>
                      {Big(sfrxBalance ?? 0).toFixed(4)} sfrxETH
                    </StyledBaseInfoValue>
                    <StyledPlusSvg onClick={handleAddMetaMask}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <g opacity="0.6">
                          <rect x="1" y="1" width="16" height="16" rx="4" fill="#272727" stroke="#3F3F3F" />
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M8.5558 9.44448V13H9.5558V9.44448H13V8.44448H9.5558V5H8.5558V8.44448H5V9.44448H8.5558Z"
                            fill="white"
                          />
                        </g>
                      </svg>
                      <StyledPlusTips>Add tokens to MetaMask</StyledPlusTips>
                    </StyledPlusSvg>
                  </StyledBaseInfoValueContainer>
                </StyledBaseInfo>
              </StyledBaseInfoContainer>
              <StyledBottomContainer style={{ paddingBottom: ITab.STAKE === actionType ? 34: 0 }}>
                <StyledTipsContainer>
                  <StyledFirstTips>{actionType}</StyledFirstTips>
                  <StyledSecondTips>
                    1 {outToken.symbol} = {data?.exchangeRate} {inToken.symbol}
                  </StyledSecondTips>
                </StyledTipsContainer>
                <StyledInputContainer>
                  <StyledInput
                    value={inAmount}
                    type="number"
                    placeholder="0.0"
                    onChange={(event) => handleAmountChange(event.target.value)}
                  />
                  <StyledMaxAndSymbol>
                    <StyledMax onClick={handleMax}>Max</StyledMax>
                    <StyledSymbol>
                      <StyledSymbolImage src={actionType === ITab.STAKE ? ethereum['sfrxETH'].icon : ethereum['frxETH'].icon } />
                      <StyledSymbolTxt>{actionType === ITab.STAKE ? ethereum['sfrxETH'].symbol : ethereum['frxETH'].symbol}</StyledSymbolTxt>
                    </StyledSymbol>
                  </StyledMaxAndSymbol>
                </StyledInputContainer>
                <StyledSecondTips>swap fee 0.00% </StyledSecondTips>
                <StyledReceiveContainer>
                  <StyledFirstTips>Min. Receive</StyledFirstTips>
                  <StyledReceive>
                    ~{Big(inAmount ? inAmount : 0).toFixed(4)} {actionType === ITab.STAKE ? ethereum['sfrxETH'].symbol : ethereum['frxETH'].symbol}
                  </StyledReceive>
                </StyledReceiveContainer>
                <StyledSecondTips style={{ marginBottom: 20 }}>
                Unstake requests are processed in 7-10 days, subject to exit queue on Ethereum network and delays imposed
                by EigenLayer
              </StyledSecondTips>
                <StyledStakeButtonContainer disabled={isInSufficient || Big(inAmount ? inAmount : 0).lt(leastAmount)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="534" height="49" viewBox="0 0 534 49" fill="none">
                    <path
                      d="M509.05 1H24.9497C23.3567 1 21.8291 1.63349 20.7036 2.76084L3.23223 20.2608C0.893712 22.6032 0.893714 26.3968 3.23223 28.7392L20.7036 46.2392C21.8291 47.3665 23.3567 48 24.9497 48H509.05C510.643 48 512.171 47.3665 513.296 46.2392L530.768 28.7392C533.106 26.3968 533.106 22.6032 530.768 20.2608L513.296 2.76083C512.171 1.63349 510.643 1 509.05 1Z"
                      stroke="white"
                    />
                  </svg>
                  <Button
                    data={data}
                    isInSufficient={isInSufficient}
                    isLoading={isLoading}
                    chainId={inToken.chainId}
                    approved={approved}
                    onApprove={handleApprove}
                    handleStake={handleStake}
                    actionType={actionType}
                    inAmount={inAmount}
                    leastAmount={leastAmount}
                  />
                </StyledStakeButtonContainer>
              </StyledBottomContainer>
            </>
          )
        }
      </StyledStakeTopContainer>
      {[ITab.UNSTAKE, ITab.REDEEM].includes(actionType) && (
        <>
          <StyledSecondLine src="/images/lrts/trapezium.png" />
          <StyledStakeBottomContainer>
            <StyledActiveAndCompletedContainer>
              <StyledWithdrawTips>Withdrawl requests</StyledWithdrawTips>
              <StyledActiveAndCompleted>
                <StyledActiveAndCompletedButton className="active">Active</StyledActiveAndCompletedButton>
                <StyledActiveAndCompletedButton>completed</StyledActiveAndCompletedButton>
              </StyledActiveAndCompleted>
            </StyledActiveAndCompletedContainer>
            <StakeList
              sx={{ marginTop: 20 }}
              requests={requests}
              requestsLoading={requestsLoading}
              claiming={claiming}
              queryRequests={queryRequests}
              claim={claim}
            />
          </StyledStakeBottomContainer>
        </>
      )}
    </StyledStakeContainer>
  )
}
export default FraxComponent