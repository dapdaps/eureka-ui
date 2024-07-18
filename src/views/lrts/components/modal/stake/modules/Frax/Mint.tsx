import Big from 'big.js';
import { ethers } from 'ethers';
import { useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';

import { FRAX_MINT } from '@/views/lrts/config/abi/frax';

import Button from '../../components/button';
import { StyledStakeButtonContainer } from '../../styles';
import useFrax from './hooks/useFrax';
import InputCurrency from './InputCurrency';

const TabsBody = styled.div`
  padding: 0 40px;
`;

const Tips = styled.div`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.3);
  font-weight: 500;
  margin: 14px 0 28px;
`
const frxETHMinter_ADDR = '0xbAFA44EFE7901E04E39Dad13167D089C559c1138';

const Mint = (props: any) => {
  const { token0, token1, actionType } = props;
  const [isLoading, setIsLoading] = useState(false)
  const [inputAmount, setInputAmount] = useState('');

  const { availableAmount, provider, inToken, toast, leastAmount, data } = useFrax({ actionType, token0, token1 });

  
  const isInSufficient = useMemo(() => Big(inputAmount || 0).gt(availableAmount || 0), [availableAmount, inputAmount]);


  const handleMint = useCallback(async () => {
    const contract = new ethers.Contract(frxETHMinter_ADDR, FRAX_MINT, provider.getSigner());
    const toastId = toast.loading({ title: `Mint ${inToken.symbol}` });
    try {
      setIsLoading(true)
      const tx = await contract.submit({
        value: ethers.utils.parseEther(inputAmount),
      });
      await tx.wait();
      toast.success({ title: "Mint Successfully!", text: `Mint ${inToken.symbol}`, tx: tx.hash });
      toast.dismiss(toastId);
      setInputAmount('')
    } catch (error: any) {
      toast.fail({
        title: error?.message?.includes('user rejected transaction') ? 'User rejected transaction' : `Mint faily!`,
      });
    } finally {
      setIsLoading(false)
      toast.dismiss(toastId);
    }
  }, [provider, inToken, inputAmount, toast])

  const adjustedInputAmount = useMemo(() => {
    if (inputAmount === '' || Big(inputAmount).eq(0)) {
      return '';
    }
    return Big(inputAmount).lte(leastAmount) ? leastAmount : inputAmount;
  }, [inputAmount]);
  
  return (
    <TabsBody>
      <InputCurrency
        mt={30}
        label="From"
        currency={token0}
        value={inputAmount}
        onChange={(val: string) => {
          setInputAmount(val);
        }}
      />
      <InputCurrency mt={20} label="To" readOnly currency={token1} value={adjustedInputAmount} />

      <Tips>swap fee 0.23% (0,0023 ETH)</Tips>

      <StyledStakeButtonContainer disabled={isInSufficient || Big(inputAmount ? inputAmount : 0).lt(leastAmount)}>
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
          chainId={inToken?.chainId}
          actionType={actionType}
          inAmount={inputAmount}
          leastAmount={leastAmount}
          handleStake={handleMint}
          approved={true}
        />
      </StyledStakeButtonContainer>
    </TabsBody>
  );
};

export default Mint;
