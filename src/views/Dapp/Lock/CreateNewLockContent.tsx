import Big from 'big.js';
import { addDays, addMonths, addYears, differenceInSeconds, format, startOfDay } from 'date-fns';
import { ethers } from 'ethers';
import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';

import { linea } from '@/config/tokens/linea';
import useAccount from '@/hooks/useAccount';
import useAddAction from '@/hooks/useAddAction';
import useToast from '@/hooks/useToast';
import useTokenBalance from '@/hooks/useTokenBalance';
import { usePriceStore } from '@/stores/price';
import { balanceFormated } from '@/utils/balance';

import { veLYNX } from '.';
import veLockABI from './abi/veLock.json';
import TradeButton from './TradeButton';
const Container = styled.div`
  padding: 30px;
  padding-top: 10px;
  color: #fff;
  font-family: Montserrat;
`;

const Title = styled.h4`
  font-family: Montserrat;
  font-size: 16px;
  font-weight: 500;
  line-height: 20px;
  text-align: left;
  margin-bottom: 16px;
`;

const AmountContainer = styled.div`
  width: 100%;
  height: 72px;
  background: #2e3142;
  border: 1px solid #373a53;
  border-radius: 8px;
  display: flex;
  align-items: center;
  padding: 0 16px;
  margin-bottom: 20px;
`;

const AmountInputWrapper = styled.div`
  flex-grow: 1;
`;

const AmountInput = styled.input`
  background: transparent;
  border: none;
  color: #fff;
  font-size: 24px;
  width: 100%;
  &:focus {
    outline: none;
  }
`;

const AmountLabel = styled.div`
  display: flex;
  justify-content: space-between;
  color: #8c8e94;
  font-size: 14px;
`;

const RightInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
`;

const LynxInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const LynxLogo = styled.img`
  width: 24px;
  height: 24px;
`;

const LynxText = styled.span`
  color: #fff;
  font-size: 16px;
  font-family: Montserrat;
  font-weight: 500;
  line-height: 19.5px;
`;

const TicketInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const TicketPrice = styled.div`
  background: rgba(50, 54, 75, 0.3);
  border-radius: 4px;
  padding: 4px 8px;
  font-size: 12px;
  color: #fff;
  border: 1px solid #373a53;
  font-family: Montserrat;
  font-size: 12px;
  font-weight: 400;
  line-height: 14.63px;
  text-align: left;
  padding: 2px 8px;
  border-radius: 6px;
  color: #979abe;
`;

const Balance = styled.div`
  font-family: Montserrat;
  font-size: 12px;
  font-weight: 400;
  line-height: 14.63px;
  color: #979abe;
  &:hover {
    cursor: pointer;
  }
`;

const BalanceValue = styled.span`
  text-decoration: underline;
`;

const LockUntilContainer = styled.div`
  margin-bottom: 20px;
`;

const DateInput = styled.input`
  width: 100%;
  height: 44px;
  background: #2e3142;
  border: 1px solid #373a53;
  border-radius: 8px;
  color: #fff;
  font-family: Gantari;
  font-size: 20px;
  font-weight: 500;
  line-height: 24px;
  text-align: left;
  padding: 10px;
  width: 100%;
  margin-bottom: 10px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 32px;
`;

const Button = styled.button<{ active?: boolean }>`
  background-color: ${(props) => (props.active ? '#EBF479' : 'rgba(50, 54, 75, 0.3)')};
  color: ${(props) => (props.active ? '#000' : '#fff')};
  border: none;
  border-radius: 6px;
  padding: 8px 19px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid #373a53;
  font-family: Montserrat;
  flex: 1;
  &:hover {
    opacity: 0.8;
  }
`;

const VotingPower = styled.div`
  margin-bottom: 34px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const VotingPowerTitle = styled.div`
  font-family: Montserrat;
  font-size: 16px;
  font-weight: 500;
  line-height: 19.5px;
`;

const LockButton = styled.button`
  background-color: #ebf479;
  color: #000;
  border: none;
  border-radius: 8px;
  padding: 15px;
  width: 100%;
  font-family: Montserrat;
  font-size: 16px;
  font-weight: 600;
  line-height: 19.5px;
  text-align: center;
  color: #02051e;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    opacity: 0.8;
  }
`;

const durationMap: Record<string, number> = {
  '3 months': 90,
  '6 months': 180,
  '1 year': 365,
  Max: 730
};

interface ICreateNewLockContentProps {
  onSuccess: () => void;
}

const CreateNewLockContent: React.FC<ICreateNewLockContentProps> = ({ onSuccess }) => {
  const [amount, setAmount] = useState<any>();
  const [activeDuration, setActiveDuration] = useState('3 months');
  const [lockUntil, setLockUntil] = useState<any>();
  const { addAction } = useAddAction('dapp');
  const prices = usePriceStore((store) => store.price);

  const [loading, setLoading] = useState(false);

  const { tokenBalance } = useTokenBalance(linea['lynx'].address, linea['lynx'].decimals, linea['lynx'].chainId);
  const { provider } = useAccount();

  const toast = useToast();

  const calculateTime = (duration: string) => {
    let time = startOfDay(new Date());

    switch (duration) {
      case '3 months':
        time = addDays(time, 90);
        break;
      case '6 months':
        time = addMonths(time, 6);
        break;
      case '1 year':
        time = addYears(time, 1);
        break;
      case 'Max':
        time = addYears(time, 2);
        break;
      default:
        break;
    }

    return time;
  };

  const handleDurationClick = (duration: string) => {
    setActiveDuration(duration);
    const formattedDate = format(calculateTime(duration), 'yyyy/MM/dd');
    setLockUntil(formattedDate);
  };

  const computedPower = useMemo(() => {
    const durationDays = durationMap[activeDuration] || 0;

    const validAmount = new Big(amount || 0);
    return validAmount.mul(new Big(durationDays).div(durationMap['Max'])).toFixed(2);
  }, [amount, activeDuration]);

  useEffect(() => {
    setLockUntil(format(calculateTime('3 months'), 'yyyy/MM/dd'));
  }, []);

  const handleLock = async () => {
    if (!amount) return;

    setLoading(true);
    try {
      const contract = new ethers.Contract(veLYNX, veLockABI, provider.getSigner());
      const time = differenceInSeconds(calculateTime(activeDuration), startOfDay(new Date()));
      const tx = await contract.createLock(ethers.utils.parseEther(amount), time, activeDuration === 'Max');
      const receipt = await tx.wait();
      onSuccess();
      toast.success('Lock created successfully');

      addAction({
        type: 'Staking',
        fromChainId: linea['lynx'].chainId,
        toChainId: linea['lynx'].chainId,
        token: linea['lynx'],
        amount: amount,
        template: 'Lynex Lock',
        add: false,
        status: 1,
        action: 'Staking',
        transactionHash: receipt.transactionHash,
        sub_type: 'Stake',
        extra_data: JSON.stringify({
          during_time: time
        })
      });
    } catch (error) {
      console.log(error, '<---');
    }
    setLoading(false);
  };

  return (
    <Container>
      <Title>Amount</Title>
      <AmountContainer>
        <AmountInputWrapper>
          <AmountInput
            type="text"
            placeholder="0.0"
            value={amount}
            onChange={(ev) => {
              if (isNaN(Number(ev.target.value))) return;
              setAmount(ev.target.value.replace(/\s+/g, ''));
            }}
          />
          <AmountLabel>
            $
            {`${Big(amount || 0)
              .mul(prices[linea['lynx'].symbol])
              .toFixed(2)}`}
          </AmountLabel>
        </AmountInputWrapper>
        <RightInfo>
          <LynxInfo>
            <LynxLogo src="/assets/tokens/lynx.png" alt="lynx" />
            <LynxText>LYNX</LynxText>
          </LynxInfo>
          <TicketInfo>
            <TicketPrice>$15/ticket</TicketPrice>
            <Balance onClick={() => setAmount(tokenBalance)}>
              Balance: <BalanceValue>{balanceFormated(tokenBalance)}</BalanceValue>
            </Balance>
          </TicketInfo>
        </RightInfo>
      </AmountContainer>

      <LockUntilContainer>
        <Title>Lock Until</Title>
        <DateInput
          type="text"
          readOnly
          value={lockUntil}
          //   onChange={(e) => setLockUntil(e.target.value)}
        />
        <ButtonGroup>
          <Button active={activeDuration === '3 months'} onClick={() => handleDurationClick('3 months')}>
            3 months
          </Button>
          <Button active={activeDuration === '6 months'} onClick={() => handleDurationClick('6 months')}>
            6 months
          </Button>
          <Button active={activeDuration === '1 year'} onClick={() => handleDurationClick('1 year')}>
            1 year
          </Button>
          <Button active={activeDuration === 'Max'} onClick={() => handleDurationClick('Max')}>
            Max
          </Button>
        </ButtonGroup>
      </LockUntilContainer>

      <VotingPower>
        <VotingPowerTitle>veLYNX Voting Power: </VotingPowerTitle>
        <VotingPowerTitle>{computedPower}</VotingPowerTitle>
      </VotingPower>
      <TradeButton amount={amount} token={linea['lynx']} loading={loading} onClick={handleLock} spender={veLYNX}>
        Lock
      </TradeButton>
    </Container>
  );
};

export default CreateNewLockContent;
