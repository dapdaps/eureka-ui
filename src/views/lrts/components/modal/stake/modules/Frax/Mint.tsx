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
        showMax={true}
        value={inputAmount}
        onMax={() => setInputAmount(availableAmount)}
        onChange={(val: string) => {
          setInputAmount(val);
        }}
      />
      <InputCurrency mt={20} label="To" readOnly currency={token1} value={adjustedInputAmount} />

      <Tips>swap fee 0.00% (0.00 ETH)</Tips>

      <StyledStakeButtonContainer disabled={isInSufficient || Big(inputAmount ? inputAmount : 0).lt(leastAmount)}>
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
