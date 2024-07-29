import Big from 'big.js';
import { Contract, ethers, utils } from 'ethers';
import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';

import { ethereum } from '@/config/tokens/ethereum';
import useAccount from '@/hooks/useAccount';

import useAddAction from '@/hooks/useAddAction';
import { ENTER_QUEUE_ABI, FRAX_REDEEM_ABI } from '../../../../../config/abi/frax';
import Button from '../../components/button';
import { StyledStakeButtonContainer } from '../../styles';
import Checkbox from './Checkbox';
import useFrax, { sfrxETH_ADDR } from './hooks/useFrax';
import InputCurrency from './InputCurrency';
import { useSelectedToken } from './hooks/useSelectedToken';

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

const Redeem = (props: any) => {
  const {
    gem,
    dapp,
    leastAmount,
    actionType
  } = props;
  const { addAction } = useAddAction('lrts');
  const { account } = useAccount();
  const tokens = [ethereum['frxETH'], ethereum['sfrxETH']];

  const [inputAmount, setInputAmount] = useState('');
  const [checked, setChecked] = useState(false);
  const [address, setAddress] = useState(account);
  const [isLoading, setIsLoading] = useState(false)
  const [selectToken, setSelectToken] = useState(tokens[0]);
  const [_, setApproved] = useState(false);
  const [stakeAmount, setStakeAmount] = useState('');
  const { provider, toast, tokenLoading, getBalance, data } = useFrax({ actionType });
  const setSelectedTokenStore = useSelectedToken((state) => state.set);


  const isInSufficient = useMemo(() => Number(inputAmount) > Number(stakeAmount), [data, inputAmount, selectToken]);

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
      const { status, transactionHash, ...rest } = await tx.wait();
      toast.success({ title: "Enter Queue Successfully!", text: `Enter Queue ${selectToken.symbol}`, tx: tx.hash });
      addAction({
        type: "Staking",
        action: actionType,
        token: [selectToken.symbol, ethereum['eth'].symbol],
        amount: inputAmount,
        template: gem ? gem?.dapp?.name : dapp.name,
        status,
        transactionHash,
        chain_id: selectToken.chainId,
        extra_data: JSON.stringify({
          action: actionType,
          fromTokenSymbol: selectToken.symbol,
          fromTokenAmount: inputAmount,
          toTokenSymol: ethereum['eth'].symbol,
          toTokenAmount: inputAmount,
        })
      })
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

  const handleQueryStakedAmount = async () => {
    const address = selectToken.symbol === 'frxETH' ? ethereum['frxETH'].address : sfrxETH_ADDR
    const contract = new ethers.Contract(address, FRAX_REDEEM_ABI, provider.getSigner());
    const data = await contract.balanceOf(account);
    const stakeAmount = ethers.utils.formatUnits(data, 18)
    setStakeAmount(stakeAmount)
  };

  useEffect(() => {
    getBalance(selectToken?.address);
    handleQueryStakedAmount()
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
          handleQueryStakedAmount()
          setSelectedTokenStore({
            token
          })
        }}
        onChange={(val: string) => {
          setInputAmount(val);
        }}
        onMax={() => setInputAmount(stakeAmount)}
      />
      <StyleFee>Fee 0.00% (0,00 ETH)</StyleFee>
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
          handleWalletAddress={() => {
            setAddress(account)
            setSelectedTokenStore({
              recipient: account
            })
          }}
          onChange={(addr: string) => {
            setAddress(addr)
            setSelectedTokenStore({
              recipient: addr
            })
          }}
        />
      )}
      <StyleInfo>
        Unstake requests may take from a few minutes to several days, depending on the project.
      </StyleInfo>
      <StyledStakeButtonContainer disabled={isInSufficient || Big(inputAmount ? inputAmount : 0).lt(leastAmount)}>
        <Button
          data={data}
          isInSufficient={isInSufficient}
          isLoading={isLoading}
          approved={true}
          chainId={selectToken.chainId}
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
