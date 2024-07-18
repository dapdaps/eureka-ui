import Big from 'big.js';

import StakeList from '../components/stake-list';
import {
  StyledActionTypeTab,
  StyledActionTypeTabContainer,
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
  StyledDapLogo,
  StyledFirstTips,
  StyledInput,
  StyledInputContainer,
  StyledLrtBgImage,
  StyledLrtDapp,
  StyledMax,
  StyledMaxAndSymbol,
  StyledPlusSvg,
  StyledPlusTips,
  StyledReceive,
  StyledReceiveContainer,
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
  StyledWithdrawTips,
} from '../styles';
import Button from './button';

const BaseComponent = function (props: any) {
  const {
    box,
    gem,
    dapp,
    data,
    setShow,
    inAmount,
    outAmount,
    isLoading,
    approved,
    approving,
    leastAmount,
    actionType = gem ? 'restake' : 'stake',
    inToken,
    outToken,
    handleMax,
    isInSufficient,
    hasNoUnstake,
    handleApprove,
    handleAmountChange,
    handleStake,
    handleAddMetaMask,
    handleChangeActionType,
    requests,
    requestsLoading,
    claiming,
    queryRequests,
    claim,
  } = props?.componentProps;
  const actionTypeList = [gem ? 'restake' : 'stake', 'unstake'];
  return (
    <StyledStakeContainer>
      {gem?.dapp?.logo ? (
        <StyledDapLogo src={gem?.dapp?.logo} />
      ) : (
        <StyledLrtDapp>
          <StyledLrtBgImage src={box} />
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              right: 0,
              bottom: 0,
            }}
          >
            <div
              style={{
                paddingTop: 10,
                fontSize: 14,
                fontWeight: 600,
                color: '#FFF',
                fontFamily: 'Orbitron',
                textAlign: 'center',
              }}
            >
              {inToken?.symbol}
            </div>
            <div
              style={{
                paddingTop: 4,
                paddingRight: 8,
                display: 'flex',
                gap: 4,
                alignItems: 'center',
                justifyContent: 'flex-end',
              }}
            >
              <img width={8} src={dapp?.logo} />
              <div
                style={{
                  fontSize: 8,
                  color: '#FFF',
                  fontFamily: 'Orbitron',
                }}
              >
                {dapp.name}
              </div>
            </div>
            <div
              style={{
                paddingTop: 20,
                paddingRight: 8,
                textAlign: 'right',
                fontSize: 10,
                color: 'rgba(255,255,255,0.5)',
                fontFamily: 'Orbitron',
                fontWeight: 700,
              }}
            >
              {dapp?.minApr} -
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
                paddingLeft: 8,
                paddingRight: 8,
              }}
            >
              <div
                style={{
                  fontSize: 8,
                  color: 'rgba(255,255,255,0.5)',
                  fontFamily: 'Orbitron',
                  fontWeight: 700,
                }}
              >
                APR RANGE
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: '#FFF',
                  fontFamily: 'Orbitron',
                  fontWeight: 700,
                }}
              >
                {dapp?.maxApr}
              </div>
            </div>
          </div>
        </StyledLrtDapp>
      )}
      <StyledStakeTopContainer
        style={actionType === 'unstake' ? { borderRadius: '4px 4px 0 0', borderBottom: 'none', minHeight: 484 } : {}}
      >
        {!hasNoUnstake && (
          <StyledActionTypeTabContainer>
            {actionTypeList.map((_actionType) => (
              <StyledActionTypeTab
                key={_actionType}
                className={_actionType === actionType ? 'active' : ''}
                onClick={() => {
                  handleChangeActionType(_actionType);
                }}
              >
                {_actionType}
              </StyledActionTypeTab>
            ))}
          </StyledActionTypeTabContainer>
        )}
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
        <StyledBaseInfoContainer>
          {['stake', 'restake'].includes(actionType) && (
            <StyledBaseInfo>
              <StyledFirstTips>Available to stake</StyledFirstTips>
              <StyledBaseInfoValue>
                {Big(data?.availableAmount ?? 0).toFixed(4)} {inToken?.symbol}
              </StyledBaseInfoValue>
            </StyledBaseInfo>
          )}
          <StyledBaseInfo style={{ alignItems: ['stake', 'restake'].includes(actionType) ? 'center' : 'flex-start' }}>
            <StyledFirstTips>APR</StyledFirstTips>
            <StyledBaseInfoValue style={{ color: '#A4E417' }}>
              {Big(gem?.dapp?.apr || dapp?.apr).toFixed(2)}%
            </StyledBaseInfoValue>
          </StyledBaseInfo>
          <StyledBaseInfo>
            <StyledFirstTips>Staked amount</StyledFirstTips>

            <StyledBaseInfoValueContainer>
              <StyledBaseInfoValue>
                {Big(data?.stakedAmount ?? 0).toFixed(4)} {outToken?.symbol}
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
                <StyledPlusTips>Add token to MetaMask</StyledPlusTips>
              </StyledPlusSvg>
            </StyledBaseInfoValueContainer>
          </StyledBaseInfo>
        </StyledBaseInfoContainer>
        <StyledBottomContainer>
          <StyledTipsContainer>
            <StyledFirstTips>Stake</StyledFirstTips>
            {/* <StyledSecondTips>
              1 {inToken.symbol} = {data?.exchangeRate} {outToken?.symbol}
            </StyledSecondTips> */}
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
                <StyledSymbolImage src={inToken.icon} />
                <StyledSymbolTxt>{inToken.symbol}</StyledSymbolTxt>
              </StyledSymbol>
            </StyledMaxAndSymbol>
          </StyledInputContainer>
          {/* <StyledSecondTips>swap fee 0.23% (0,0023 ETH)</StyledSecondTips> */}
          <StyledReceiveContainer>
            <StyledFirstTips>Min. Receive</StyledFirstTips>
            <StyledReceive>
              ~{Big(outAmount ? outAmount : 0).toFixed(6)} {outToken?.symbol}
            </StyledReceive>
          </StyledReceiveContainer>
          <StyledStakeButtonContainer disabled={isInSufficient || Big(inAmount ? inAmount : 0).lt(leastAmount)}>
            <Button
              data={data}
              isInSufficient={isInSufficient}
              isLoading={approving || isLoading}
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
      </StyledStakeTopContainer>
      {actionType === 'unstake' && (
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
            <StyledSecondTips style={{ marginTop: 16, marginBottom: 20 }}>
              Unstake requests may take from a few minutes to several days, depending on the project.
            </StyledSecondTips>
            <StakeList
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
  );
};
export default BaseComponent;
