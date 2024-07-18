import Big from 'big.js';
import { Contract,utils } from 'ethers';
import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';

import { ethereum } from '@/config/tokens/ethereum';
import useAccount from '@/hooks/useAccount';

import { ENTER_QUEUE_ABI, FRAX_REDEEM_ABI, TOKEN_ABI } from '../../../../../config/abi/frax';
import Button from '../../components/button';
import { StyledStakeButtonContainer } from '../../styles';
import Checkbox from './Checkbox';
import useFrax from './hooks/useFrax';
import InputCurrency from './InputCurrency';

const TabsBody = styled.div`
  padding: 0 40px;
`;

const StyleFee = styled.div`
  font-size: 12px;
  font-weight: 500;
  color: #000;
  margin: 10px 0 24px;
  color: rgba(255, 255, 255, 0.3);
`;

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Label = styled.div`
  color: rgba(255, 255, 255, 0.6);
  font-size: 14px;
  font-weight: 500;
`;

const Value = styled.div`
  display: flex;
`;

const Compose = styled.div`
  display: flex;
  flex-direction: column;
`;

const Amount = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.3);
`;

const StyleImage = styled.img`
  width: 26px;
  height: 26px;
  border-radius: 50%;
  margin-right: 6px;
`;

const Currency = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: #fff;
`;

const StyledCheck = styled.div`
  display: flex;
  align-items: center;
  margin-top: 27px;
`;
const Tips = styled.div`
  color: rgba(255, 255, 255, 0.3);
  font-weight: 500;
  font-size: 12px;
  margin-left: 10px;
  &:hover {
    cursor: pointer;
  }
`;

const StyleInfo = styled.div`
  color: rgba(255, 255, 255, 0.6);
  margin: 16px 0 20px;
  font-size: 12px;
  font-weight: 400;
`;

// spender 地址
const FraxEtherRedemptionQueue_ADDR = '0x82bA8da44Cd5261762e629dd5c605b17715727bd'

// frxETH 合约地址
const Frx_ETHAddress = '0x5E8422345238F34275888049021821E8E08CAa1f';



const Redeem = (props: any) => {
  const {
    token0,
    token1,
    leastAmount,
    actionType
  } = props;
  const { account } = useAccount();
  const tokens = [ethereum['frxETH'], ethereum['sfrxETH']];

  const [inputAmount, setInputAmount] = useState('');
  const [checked, setChecked] = useState(false);
  const [address, setAddress] = useState(account);
  const [isLoading, setIsLoading] = useState(false)
  const [selectToken, setSelectToken] = useState(tokens[0]);
  const [_, setApproved] = useState(false);
  const { provider, toast, inToken, tokenLoading, getBalance, data } = useFrax({ actionType, token0, token1 });

  const isInSufficient = useMemo(() => Number(inputAmount) > Number(data?.stakedAmount), [data, inputAmount]);






  const checkApproval = async () => {
    const contract = new Contract(selectToken?.address, FRAX_REDEEM_ABI, provider.getSigner());
    const allowance = await contract.allowance(account, selectToken?.address);
    setApproved(!!allowance.toNumber());
    return !!allowance.toNumber()
  }

  const handleApprove = async () => {
    const toastId = toast.loading({ title: `Approve ${selectToken.symbol}` });
    setIsLoading(true)
    try {
      const frxETHContract = new Contract(selectToken.address, FRAX_REDEEM_ABI, provider.getSigner());
      const tx = await frxETHContract.approve(FraxEtherRedemptionQueue_ADDR, utils.parseEther(inputAmount));
      await tx.wait(); 
      toast.success({ title: "Approve Successfully!", text: `Approve ${selectToken.symbol}`, tx: tx.hash });
      return true; 
    } catch (error: any) {
      toast.fail({
        title: error?.message?.includes('user rejected transaction') ? 'User rejected transaction' : `Approve faily!`,
      });
      return false; 
    } finally {
      setIsLoading(false)
      toast.dismiss(toastId);
    }
  }


  const enterRedemptionQueue = async () => { 
    const toastId = toast.loading({ title: `Enter Queue ${selectToken.symbol}` });
    setIsLoading(true)
    try {
      const frxETHContract = new Contract(FraxEtherRedemptionQueue_ADDR, ENTER_QUEUE_ABI, provider.getSigner());
      const tx = await frxETHContract.enterRedemptionQueue(address, utils.parseEther(inputAmount));
      await tx.wait();
      toast.success({ title: "Enter Queue Successfully!", text: `Enter Queue ${selectToken.symbol}`, tx: tx.hash });
    } catch (error: any) {
      toast.fail({
        title: error?.message?.includes('user rejected transaction') ? 'User rejected transaction' : `Enter Queue faily!`,
      });
    } finally {
      toast.dismiss(toastId);
      setIsLoading(false)
    }
  }

  const handleEnter = async () => {
    const checkApprovalStatus = await checkApproval()
    if (checkApprovalStatus) return enterRedemptionQueue()

    const approveSuccess = await handleApprove(); // 等待 handleApprove 完成
    if (approveSuccess) await enterRedemptionQueue(); 
  }


  useEffect(() => {
    getBalance(selectToken?.address);
  }, [provider, selectToken]);

  return (
    <TabsBody>
      <InputCurrency
        mt={30}
        label="Enter Redemption Queue"
        currency={selectToken}
        value={inputAmount}
        loading={tokenLoading}
        tokens={tokens}
        onSelect={(token: any) => {
          setInputAmount('');
          setSelectToken(token)
        }}
        onChange={(val: string) => {
          setInputAmount(val);
        }}
        onMax={() => setInputAmount(data?.stakedAmount)}
      />
      <StyleFee>Fee 0.23% (0,0023 ETH)</StyleFee>
      <Flex>
        <Label>You Receive</Label>
        <Value>
          <StyleImage src={ethereum['eth'].icon || '/images/tokens/default_icon.png'} alt="default"></StyleImage>
          <Compose>
            <Currency>~{inputAmount} ETH</Currency>
          </Compose>
        </Value>
      </Flex>
      <StyledCheck onClick={() => setChecked(!checked)}>
        <Checkbox checked={checked}></Checkbox>
        <Tips>Receive to a different address</Tips>
      </StyledCheck>
      {checked && (
        <InputCurrency
          addr
          value={address}
          maxLength={42}
          sx={{ fontSize: '12px' }}
          handleWalletAddress={() => setAddress(account)}
          onChange={(addr: string) => setAddress(addr)}
        />
      )}
      <StyleInfo>
        Unstake requests are processed in 7-10 days, subject to exit queue on Ethereum network and delays imposed by
        EigenLayer
      </StyleInfo>
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
          approved={true}
          chainId={inToken.chainId}
          actionType={'Approve and Enter Queue'}
          inAmount={inputAmount}
          leastAmount={leastAmount}
          handleStake={handleEnter}
        />
      </StyledStakeButtonContainer>
    </TabsBody>
  );
};

export default Redeem;
