import { memo, useState, useEffect } from 'react';
import Big from 'big.js';
import Modal from '@/components/Modal';
import TokenImg from './TokenImg';
import CloseBtn from './CloseBtn';
import InputCurrency from './InputCurrency';
import Result from './Result';
import Button from './Button';
import useTokens from './hooks/useTokens';
import useSelectTokens from './hooks/useSelectTokens';
import useTokenBalance from '@/hooks/useTokenBalance';
import useApprove from '@/hooks/useApprove';
import useTrade from './hooks/useTrade';
import { StyledContainer, StyledHeader, StyledHeaderTitle } from './styles';

const SwapModal = ({ show, setShow, token }: any) => {
  const [errorTips, setErrorTips] = useState('');
  const { inputCurrency, outputCurrency, setOutputCurrency } = useTokens(token);
  const selectableTokens = useSelectTokens(inputCurrency);
  const {
    tokenBalance,
    isLoading: tokenLoading,
    update,
  } = useTokenBalance(inputCurrency?.address, inputCurrency?.decimals);
  const { trade, loading, inputAmount, setInputAmount, swap } = useTrade(inputCurrency, outputCurrency, () => {
    update();
  });
  const { approve, approved, approving } = useApprove({
    amount: inputAmount,
    token: inputCurrency.isNative ? null : inputCurrency,
    spender: trade?.spender,
  });

  useEffect(() => {
    if (Number(inputAmount || 0) === 0) {
      setErrorTips('Enter an amount');
      return;
    }
    if (Big(inputAmount || 0).gt(tokenBalance || 0)) {
      setErrorTips(`Insufficient ${inputCurrency?.symbol} Balance`);
      return;
    }
    setErrorTips('');
  }, [inputAmount, tokenBalance]);

  return (
    <Modal
      display={show}
      showHeader={false}
      width={620}
      modalStyle={{
        border: '1px solid #3f3f3f',
        background: '#2f2f2f',
        borderRadius: '4px',
      }}
      content={
        inputCurrency && outputCurrency ? (
          <StyledContainer>
            <StyledHeader>
              <TokenImg src={inputCurrency.icon} width={inputCurrency.width} color={inputCurrency.color} />
              <div>
                <StyledHeaderTitle>Swap {inputCurrency.isLST ? 'LST' : 'LRT'}</StyledHeaderTitle>
                <svg xmlns="http://www.w3.org/2000/svg" width="210" height="6" viewBox="0 0 210 6" fill="none">
                  <path
                    d="M5 2.5L0 0.113249V5.88675L5 3.5V2.5ZM205 3.5L210 5.88675V0.113249L205 2.5V3.5ZM2.9717 3.5H4.95283V2.5H2.9717V3.5ZM6.93396 3.5H8.91509V2.5H6.93396V3.5ZM10.8962 3.5H12.8774V2.5H10.8962V3.5ZM14.8585 3.5H16.8396V2.5H14.8585V3.5ZM18.8208 3.5H20.8019V2.5H18.8208V3.5ZM22.783 3.5H24.7642V2.5H22.783V3.5ZM26.7453 3.5H28.7264V2.5H26.7453V3.5ZM30.7076 3.5H32.6887V2.5H30.7076V3.5ZM34.6698 3.5H36.6509V2.5H34.6698V3.5ZM38.6321 3.5H40.6132V2.5H38.6321V3.5ZM42.5943 3.5H44.5755V2.5H42.5943V3.5ZM46.5566 3.5H48.5377V2.5H46.5566V3.5ZM50.5189 3.5H52.5V2.5H50.5189V3.5ZM54.4811 3.5H56.4623V2.5H54.4811V3.5ZM58.4434 3.5H60.4245V2.5H58.4434V3.5ZM62.4057 3.5H64.3868V2.5H62.4057V3.5ZM66.3679 3.5H68.3491V2.5H66.3679V3.5ZM70.3302 3.5H72.3113V2.5H70.3302V3.5ZM74.2925 3.5H76.2736V2.5H74.2925V3.5ZM78.2547 3.5H80.2359V2.5H78.2547V3.5ZM82.217 3.5H84.1981V2.5H82.217V3.5ZM86.1793 3.5H88.1604V2.5H86.1793V3.5ZM90.1415 3.5H92.1227V2.5H90.1415V3.5ZM94.1038 3.5H96.0849V2.5H94.1038V3.5ZM98.0661 3.5H100.047V2.5H98.0661V3.5ZM102.028 3.5H104.009V2.5H102.028V3.5ZM105.991 3.5H107.972V2.5H105.991V3.5ZM109.953 3.5H111.934V2.5H109.953V3.5ZM113.915 3.5H115.896V2.5H113.915V3.5ZM117.877 3.5H119.859V2.5H117.877V3.5ZM121.84 3.5H123.821V2.5H121.84V3.5ZM125.802 3.5H127.783V2.5H125.802V3.5ZM129.764 3.5H131.745V2.5H129.764V3.5ZM133.726 3.5H135.708V2.5H133.726V3.5ZM137.689 3.5H139.67V2.5H137.689V3.5ZM141.651 3.5H143.632V2.5H141.651V3.5ZM145.613 3.5H147.594V2.5H145.613V3.5ZM149.575 3.5H151.557V2.5H149.575V3.5ZM153.538 3.5H155.519V2.5H153.538V3.5ZM157.5 3.5H159.481V2.5H157.5V3.5ZM161.462 3.5H163.443V2.5H161.462V3.5ZM165.424 3.5H167.406V2.5H165.424V3.5ZM169.387 3.5H171.368V2.5H169.387V3.5ZM173.349 3.5H175.33V2.5H173.349V3.5ZM177.311 3.5H179.292V2.5H177.311V3.5ZM181.273 3.5H183.255V2.5H181.273V3.5ZM185.236 3.5H187.217V2.5H185.236V3.5ZM189.198 3.5H191.179V2.5H189.198V3.5ZM193.16 3.5H195.141V2.5H193.16V3.5ZM197.122 3.5H199.104V2.5H197.122V3.5ZM201.085 3.5H203.066V2.5H201.085V3.5ZM205.047 3.5H207.028V2.5H205.047V3.5Z"
                    fill="#979ABE"
                  />
                </svg>
              </div>
              <TokenImg src={outputCurrency.icon} width={outputCurrency.width} color={outputCurrency.color} />
            </StyledHeader>
            <InputCurrency
              mt={30}
              label="Swap from"
              currency={inputCurrency}
              value={inputAmount}
              loading={tokenLoading}
              onChange={(val: string) => {
                setInputAmount(val);
              }}
              onMax={() => {
                setInputAmount(tokenBalance);
              }}
            />
            <InputCurrency
              mt={20}
              label="To"
              currency={outputCurrency}
              value={trade ? trade.outputAmount : ''}
              tokens={selectableTokens}
              onSelect={(token: any) => {
                setOutputCurrency(token);
              }}
            />
            <Result outputCurrency={outputCurrency} trade={trade} />
            <Button
              errorTips={errorTips}
              loading={approving || loading}
              onClick={swap}
              chainId={inputCurrency.chainId}
              approved={approved}
              onApprove={approve}
            />
            <CloseBtn
              onClick={() => {
                setShow(false);
              }}
            />
          </StyledContainer>
        ) : null
      }
    />
  );
};

export default memo(SwapModal);
