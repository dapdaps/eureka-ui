import Big from 'big.js';
import { format } from 'date-fns';
import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import Empty from '@/components/Empty';
import Modal from '@/components/Modal';
import { linea } from '@/config/tokens/linea';
import useAccount from '@/hooks/useAccount';
import useTokenBalance from '@/hooks/useTokenBalance';
import { usePriceStore } from '@/stores/price';
import { simplifyNum } from '@/utils/format-number';

import detailsABI from './abi/details.json';
import CreateNewLockContent from './LockModal/CreateNewLockContent';

interface IProps {
  dapp: string;
  chainId: number;
  currentChain: string;
  localConfig: any;
  chains: string[];
}

const Container = styled.div`
  background-color: #000000;
  color: #ffffff;
  width: 100%;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 24px;
`;

const CreateLockButton = styled.button`
  background-color: #ebf479;
  color: #000000;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.5fr 1.5fr 1.5fr 1.5fr;
  gap: 10px;
  align-items: center;
`;

const GridHeader = styled(Grid)`
  font-family: Montserrat;
  font-size: 16px;
  font-weight: 400;
  line-height: 20px;
  text-align: left;
  padding: 0 20px 10px 20px;
  color: #979abe;
`;

const GridRow = styled(Grid)`
  background: #262836;
  border: 1px solid #373a53;
  border-radius: 16px;
  overflow: hidden;
  padding: 20px;
  margin-bottom: 10px;
`;

const GridCell = styled.div`
  display: flex;
  flex-direction: column;
`;

const MainText = styled.div`
  font-family: Montserrat;
  font-size: 16px;
  font-weight: 500;
  line-height: 20px;
  text-align: left;
`;

const SmallText = styled.div`
  font-family: Montserrat;
  font-size: 14px;
  font-weight: 500;
  line-height: 17.07px;
  text-align: left;
  margin-top: 4px;
  color: #979abe;
`;

export const veLYNX = '0x8D95f56b0Bac46e8ac1d3A3F12FB1E5BC39b4c0c';

const config = {
  vestUiHelper: '0xBECA96Ed81807231663f10DBfE1A82FCe5efD4fA',
  lpVotingPower: '0x0374ae8e866723adae4a62dce376129f292369b4',
  stakeLP: '0x8bB8B092f3f872a887F377f73719c665Dd20Ab06',
  zeroEthLP: '0x0040F36784dDA0821E74BA67f86E084D70d67a3A',
  vePower: '0xf374229a18ff691406f99ccbd93e8a3f16b68888'
};

const LockPanel = () => {
  const { tokenBalance, update } = useTokenBalance(veLYNX, linea['lynx'].decimals);

  const [visible, setVisible] = useState(false);

  const [updater, setUpdater] = useState(0);
  const [list, setList] = useState<any[]>([]);

  const prices = usePriceStore((store) => store.price);

  const { account, provider, chainId } = useAccount();

  const getLockDetails = async () => {
    const contract = new ethers.Contract(config.vestUiHelper, detailsABI, provider);
    try {
      const details = await contract.getLPLockDetails(account);
      const data = details.map((item: any) => {
        return {
          id: item.id.toString(),
          amount: ethers.utils.formatUnits(item.amount.toString(), 18),
          end: format(Number(item.end.toString() * 1000), 'dd-MM-yyyy'),
          start: item.start.toString(),
          power: ethers.utils.formatUnits(item.power.toString(), 18),
          apr: ethers.utils.formatUnits(item.apr.toString(), 18)
        };
      });
      setList(data);
    } catch (error) {
      console.log(error, '<getLockDetails: error');
    }
  };

  const init = async () => {
    await getLockDetails();
  };

  useEffect(() => {
    if (!account || !chainId) return;
    init();
  }, [account, updater, chainId]);

  const onSuccess = () => {
    setVisible(false);
    setUpdater(Date.now());
    update();
  };

  const formatAmount = (lockValue: string | number, price: string | number, precision: number = 3): string => {
    if (!lockValue || !price) {
      return '0';
    }

    const amount = new Big(lockValue).mul(price);

    if (amount.lt(0.001)) {
      return '< 0.001';
    }

    return amount.toFixed(precision);
  };

  return (
    <Container>
      <Header>
        <Title></Title>
        <CreateLockButton onClick={() => setVisible(true)}>Stake ZERO/ETH LP</CreateLockButton>
      </Header>
      <GridHeader>
        <div>LP Lock ID</div>
        <div>Amount Locked</div>
        <div>APR</div>
        <div>Lock End Date</div>
        <div>Voting Power</div>
      </GridHeader>
      {list && list.length > 0 ? (
        list.map((lock) => (
          <GridRow key={lock.id}>
            <GridCell>
              <MainText>#{lock.id}</MainText>
            </GridCell>
            <GridCell>
              <MainText>{Number(lock.amount).toFixed(2) || 0}</MainText>
            </GridCell>
            <GridCell>
              <MainText>{Big(lock.apr).mul(100).toFixed(2)}% ETH</MainText>
            </GridCell>
            <GridCell>
              <MainText>{lock.end}</MainText>
            </GridCell>
            <GridCell>
              <MainText>{simplifyNum(lock.power)} veZERO</MainText>
            </GridCell>
          </GridRow>
        ))
      ) : (
        <Empty size={48} tips="No zLP Data" />
      )}

      <Modal
        display={visible}
        title="Create New Lock"
        onClose={() => setVisible(false)}
        portal={true}
        width={680}
        titleStyle={{ fonwWeight: 'bold', fontSize: '22px' }}
        content={<CreateNewLockContent onSuccess={onSuccess} />}
      />
    </Container>
  );
};

export default LockPanel;
