import { ChainId } from '@lifi/sdk';
import IconLink from '@public/images/alldapps/link.svg';
import Big from 'big.js';
import { addDays, addMonths, addYears, format, startOfDay } from 'date-fns';
import { ethers } from 'ethers';
import Link from 'next/link';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';

import { linea } from '@/config/tokens/linea';
import useAccount from '@/hooks/useAccount';
import useAddAction from '@/hooks/useAddAction';
import useToast from '@/hooks/useToast';
import useTokenBalance from '@/hooks/useTokenBalance';
import { usePriceStore } from '@/stores/price';
import { balanceFormated } from '@/utils/balance';
import usePoolV2Detail from '@/views/Pool/Detail/hooks/usePoolV2Detail';

import lockABI from './abi/lock.json';
import lpABI from './abi/lp.json';
import TradeButton from './TradeButton';

const Container = styled.div`
  padding: 10px 20px 10px;
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
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const AmountContainer = styled.div`
  width: 100%;
  height: 72px;
  background: #2e3142;
  border: 1px solid #373a53;
  border-radius: 8px;
  display: flex;
  align-items: center;
  padding: 0 14px;
  margin-bottom: 25px;
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
  white-space: nowrap;
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
  margin-bottom: 16px;
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
  width: 106px;
  height: 32px;
  /* padding: 8px 19px; */
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

const StyledApr = styled.div`
  color: #979abe;
  font-family: Montserrat;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  margin-bottom: 20px;
  span {
    color: #00ffa1;
    font-family: Montserrat;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
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

const config = {
  vestUiHelper: '0xBECA96Ed81807231663f10DBfE1A82FCe5efD4fA',
  lpVotingPower: '0x0374ae8e866723adae4a62dce376129f292369b4',
  stakeLP: '0x8bB8B092f3f872a887F377f73719c665Dd20Ab06',
  zeroEthLP: '0x0040F36784dDA0821E74BA67f86E084D70d67a3A',
  vePower: '0xf374229a18ff691406f99ccbd93e8a3f16b68888'
};

const CreateNewLockContent: React.FC<ICreateNewLockContentProps> = ({ onSuccess }) => {
  const [amount, setAmount] = useState<any>();
  const [activeDuration, setActiveDuration] = useState('3 months');
  const [lockUntil, setLockUntil] = useState<any>();
  const [vePower, setVePower] = useState<any>();
  const [apr, setApr] = useState<any>();
  const [gasFee, setGasFee] = useState<any>();

  const { addAction } = useAddAction('dapp');
  const prices = usePriceStore((store) => store.price);

  const [loading, setLoading] = useState(false);

  const { tokenBalance } = useTokenBalance(config.zeroEthLP, linea['ZERO-ETH'].decimals, linea['ZERO-ETH'].chainId);

  const { provider, account, chainId } = useAccount();

  const toast = useToast();

  const { detail } = usePoolV2Detail(59144, '0x0040F36784dDA0821E74BA67f86E084D70d67a3A');

  const calculateTokenAmounts = (amount: string) => {
    if (!detail || !amount) return { zeroAmount: '0', ethAmount: '0' };

    const { reserve0, reserve1, totalSupply } = detail;
    const totalSupplyFormatted = ethers.utils.formatUnits(totalSupply, 18);
    const reserve0Formatted = ethers.utils.formatUnits(reserve0, 18);
    const reserve1Formatted = ethers.utils.formatUnits(reserve1, 18);
    const shareToStake = Big(amount).div(totalSupplyFormatted);
    const ethAmount = shareToStake.mul(reserve1Formatted).toFixed(18);
    const zeroAmount = shareToStake.mul(reserve0Formatted).toFixed(18);

    return { zeroAmount, ethAmount };
  };

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
    const formattedDate = format(calculateTime(duration), 'dd/MM/yyyy');
    setLockUntil(formattedDate);
  };

  useEffect(() => {
    setLockUntil(format(calculateTime('3 months'), 'dd/MM/yyyy'));
  }, []);

  const calculateGasFee = async () => {
    try {
      if (!provider || !amount || isNaN(Number(amount))) return;
      const contract = new ethers.Contract(config.stakeLP, lockABI, provider);
      const gasPrice = await provider.getGasPrice();
      const gasLimit = await contract.estimateGas.createLock(ethers.utils.parseEther(amount), 7776000, true, {
        from: account
      });
      const gasFeeWei = gasPrice.mul(gasLimit);
      const gasFeeUsd = Big(ethers.utils.formatEther(gasFeeWei)).mul(prices['ETH']).toFixed(2);
      setGasFee(gasFeeUsd);
    } catch (error) {
      console.error('Error estimating gas fee:', error);
    }
  };

  const handleLock = async () => {
    if (!provider || !amount || isNaN(Number(amount))) return;

    setLoading(true);
    try {
      const contract = new ethers.Contract(config.stakeLP, lockABI, provider.getSigner());

      const time = activeDuration === '3 months' ? 7776000 : activeDuration === '6 months' ? 15552000 : 31536000;

      const tx = await contract.createLock(ethers.utils.parseEther(amount), time, true);
      const receipt = await tx.wait();
      onSuccess();
      toast.success('Staking zLP successfully');
      const { zeroAmount, ethAmount } = calculateTokenAmounts(amount);
      addAction({
        type: 'Staking',
        fromChainId: linea['ZERO-ETH'].chainId,
        toChainId: linea['ZERO-ETH'].chainId,
        token: linea['ZERO-ETH'],
        amount: amount,
        template: 'Zerolend Stake',
        add: false,
        status: 1,
        action: 'Staking',
        transactionHash: receipt.transactionHash,
        sub_type: 'Stake',
        extra_data: JSON.stringify({
          during_time: time,
          amount0: zeroAmount,
          token0Symbol: 'ZERO',
          amount1: ethAmount,
          token1Symbol: 'ETH'
        })
      });
    } catch (error) {
      console.log(error, '<---');
    }
    setLoading(false);
  };

  const getPowerInfo = async () => {
    if (!provider || !amount || isNaN(Number(amount))) return;
    const contract = new ethers.Contract(config.vePower, lpABI, provider);
    try {
      const power = await contract.getTokenPower(ethers.utils.parseEther(amount));
      setVePower(ethers.utils.formatEther(power));
    } catch (error) {
      console.log('Error getting power info:', error);
    }
  };

  const calculateAndSetAPR = async () => {
    if (!provider) return;
    const contract = new ethers.Contract(config.lpVotingPower, lpABI, provider);
    try {
      const rewardRate = await contract.rewardRate();
      const totalSupply = await contract.totalSupply();

      const priceConversion = Big(6728.15);
      const secondsInYear = Big(31_536_000);
      const thousand = Big(1000);

      const poolRewardAnnual = Big(rewardRate.toString()).times(secondsInYear);
      const apr = priceConversion.times(poolRewardAnnual).times(thousand).div(totalSupply.toString());
      console.log(
        'Reward Rate:',
        rewardRate.toString(),
        'Total Supply:',
        totalSupply.toString(),
        'APR:',
        apr.toString()
      );
      setApr(apr.toString());
    } catch (error) {
      console.error('Error calculating APR:', error);
    }
  };

  useEffect(() => {
    if (!amount) return;
    getPowerInfo();
    calculateGasFee();
  }, [amount, activeDuration]);

  useEffect(() => {
    calculateAndSetAPR();
  }, [provider, chainId]);

  const computedPower = useMemo(() => {
    // wait Contract Dev to provide the power *coefficient
    if (!vePower || !amount) return 0;
    const power = Big(vePower);
    if (activeDuration === '3 months') {
      return power.div(4).toFixed(5);
    } else if (activeDuration === '6 months') {
      return power.div(2).toFixed(5);
    }
    return power.toFixed(5);
  }, [amount, activeDuration, vePower]);

  const computedAPR = useMemo(() => {
    if (!apr || !amount) return 0;
    const aprNum = Big(apr).mul(100);

    if (activeDuration === '3 months') {
      return aprNum.div(4).toFixed(2);
    } else if (activeDuration === '6 months') {
      return aprNum.div(2).toFixed(2);
    }
    return aprNum.toFixed(2);
  }, [amount, activeDuration, apr]);

  return (
    <Container>
      <StyledApr>
        APR upto <span>{apr ? Big(apr).mul(100).toFixed(2) : '0'}%</span> ETH
      </StyledApr>
      <Title>
        <span>Amount</span>
        <Link href="/dapp/etherex?tab=pools&action=zerolendAddToV2" className="flex gap-2 items-center">
          <span className="text-sm font-normal leading-[17.07px] text-left">No balance? Get LP </span>
          <IconLink />
        </Link>
      </Title>
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
              .mul(prices?.[linea['ZERO-ETH']?.symbol] || 1.6) // wait for the price of zLP
              .toFixed(2)}`}
          </AmountLabel>
        </AmountInputWrapper>
        <RightInfo>
          <LynxInfo>
            <LynxText>ZERO/ETH</LynxText>
          </LynxInfo>
          <TicketInfo>
            <Balance onClick={() => setAmount(tokenBalance)}>
              Balance: <BalanceValue>{balanceFormated(tokenBalance)}</BalanceValue>
            </Balance>
          </TicketInfo>
        </RightInfo>
      </AmountContainer>

      <LockUntilContainer>
        <Title>Lock Duration</Title>

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
        </ButtonGroup>
      </LockUntilContainer>

      <div className="border !border-[#373A53] p-3 rounded-lg space-y-[13px] mb-[30px]">
        <div className="flex justify-between items-center">
          <span className="text-[#979ABE] text-sm font-normal leading-[17.07px]">Locked Until</span>
          <span className="text-white text-sm font-normal leading-[17.07px]">{lockUntil}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[#979ABE] text-sm font-normal leading-[17.07px]">Voting Power</span>
          <span className="text-white text-sm font-normal leading-[17.07px]">~{computedPower} veZERO</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[#979ABE] text-sm font-normal leading-[17.07px]">ETH APR (From Revenue)</span>
          <span className="text-white text-sm font-normal leading-[17.07px]">{computedAPR}%</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[#979ABE] text-sm font-normal leading-[17.07px]">Incentives</span>
          <div className="flex space-x-2">
            <span className="border !border-[#373A53] px-3.5 py-2 rounded text-white text-sm font-normal leading-[17.07px]">
              LXP-L Points
            </span>
            <span className="border !border-[#373A53] px-3.5 py-2 rounded text-white text-sm font-normal leading-[17.07px]">
              Gravity Points
            </span>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[#979ABE] text-sm font-normal leading-[17.07px]">Gas fee</span>
          <span className="text-white text-sm font-normal leading-[17.07px]">${gasFee || 0.1}</span>
        </div>
      </div>
      <TradeButton
        tokenBalance={tokenBalance}
        amount={amount}
        token={linea['ZERO-ETH']}
        loading={loading}
        onClick={handleLock}
        spender={config.stakeLP}
      >
        Stake ZERO/ETH
      </TradeButton>

      <div className="flex items-center justify-between mt-4 mb-2 hover:text-white cursor-pointer">
        <div
          className="text-[#979ABE] font-montserrat text-sm font-normal underline"
          onClick={() => {
            window.open('https://docs.zerolend.xyz/governance/token-overview/staking/zlp-staking', '_blank');
          }}
        >
          Learn about zLP
        </div>
        <div className="text-[#979ABE] text-sm flex justify-center gap-2">
          <span>Manage exist assets on</span>
          <Link href="/dapp/zerolend?tab=stake" className="underline text-white">
            Zerolend
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default CreateNewLockContent;
