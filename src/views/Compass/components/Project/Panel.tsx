import maskImg from '@public/images/others/odyssey/v1/mask.svg?url';
import styled from 'styled-components';

import { useAllInOneTabCachedStore } from '@/stores/all-in-one';
import { useChainsStore } from '@/stores/chains';

import useQuestStatus from '../../hooks/useQuestStatus';
import Complete from '../Complate';
import Fresh from '../Fresh';
import Spin from '../Spin';

const PanelWapper = styled.div<{ color: string }>`
    width: 25%;
    border-radius: 20px;
    padding: 20px 20px 10px;
    border: 1px solid #373A53;
    text-align: center;
    padding: 38px 0 24px;
    cursor: pointer;
    backdrop-filter: blur(20px);
    background: rgba(33, 35, 42, 0.3) url(${maskImg.src}) right bottom no-repeat;
    &:hover {
        background: 
        radial-gradient(at 50% -30%, rgba(33, 35, 42, 0), ${({ color }) => color} 10%, rgba(33, 35, 42, 0) 100%),
        rgba(33, 35, 42, 0.9) url(${maskImg.src}) right bottom no-repeat;
    }
`


const Title = styled.div`
  font-size: 26px;
  font-weight: 700;
  line-height: 31px;
  color: #fff;
`;

const TitleArrow = styled.div`
  margin-top: 15px;
`;

const Desc = styled.div`
  color: #979abe;
  text-align: center;
  font-size: 16px;
  font-weight: 400;
  margin: 10px;
  height: 50px;
`;

const FreshWapper = styled.div`
  display: flex;
  align-items: center;
  height: 42px;
  margin-top: 25px;
  justify-content: center;
`;

const SpinWapper = styled.div`
  width: 127px;
  height: 42px;
  margin-right: 10px;
`;

const SpinText = styled.div`
  font-size: 16px;
  font-weight: 400;
  height: 42px;
  line-height: 38px;
  text-align: center;
  color: rgba(0, 255, 209, 1);
`;

const Amount = styled.div`
  font-size: 16px;
  font-weight: 400;
  line-height: 20px;
  color: rgba(151, 154, 190, 1);
  margin-top: 10px;
`;

interface Props {
  value: any;
  currentChainIndex: number;
  getQuestGroupList: () => void;
  getSumaryDetail: () => void;
}

const chainIndexes = ['linea', 'base', 'manta', 'scroll', 'zksync'];

const colors = [
  'rgb(27, 93, 107, .2)',
  'rgb(22, 36, 108, .2)',
  'rgb(255, 255, 255, .05)',
  'rgb(255, 238, 218, .05)',
  'rgb(41, 104, 255, .05)',
];

export default function Panel({ value, currentChainIndex, getQuestGroupList, getSumaryDetail }: Props) {
  const { isQuestSuccess, checkQuestStatus } = useQuestStatus(value.id);
  const setCachedTab = useAllInOneTabCachedStore((store: any) => store.setCachedTab);
  const chains = useChainsStore((store: any) => store.chains);
  const showComplete = value.times === 1 && value.spins === value.total_spins;

  return (
    <PanelWapper
      color={colors[currentChainIndex]}
      onClick={() => {
        const chain = chains.find((chain: any) => chain.id === Number(value.networks));
        if (chain) setCachedTab(value.category_name, chain.chain_id);
        window.open(`/all-in-one/${chainIndexes[currentChainIndex]}`);
      }}
    >
      <Title>{value.name}</Title>
      <TitleArrow>
        <svg width="28" height="16" viewBox="0 0 28 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M1 7C0.447715 7 -4.82823e-08 7.44772 0 8C4.82823e-08 8.55228 0.447715 9 1 9L1 7ZM27.7071 8.7071C28.0976 8.31658 28.0976 7.68342 27.7071 7.29289L21.3431 0.92893C20.9526 0.538406 20.3195 0.538406 19.9289 0.928931C19.5384 1.31945 19.5384 1.95262 19.9289 2.34314L25.5858 8L19.9289 13.6569C19.5384 14.0474 19.5384 14.6805 19.9289 15.0711C20.3195 15.4616 20.9526 15.4616 21.3431 15.0711L27.7071 8.7071ZM1 9L27 9L27 7L1 7L1 9Z"
            fill="white"
          />
        </svg>
      </TitleArrow>

      <Desc>{value.description}</Desc>

      <FreshWapper>
        <SpinWapper>
          <Spin
            renderChildren={() => (
              <SpinText>
                + {value.total_spins}
                {value.times === 0 ? '' : '/' + value.times * value.spins} SPIN
              </SpinText>
            )}
          />
        </SpinWapper>

        {showComplete ? (
          <Complete />
        ) : (
          <Fresh
            onCheck={async () => {
              await checkQuestStatus();
              getQuestGroupList();
              getSumaryDetail();
            }}
            isLoading={isQuestSuccess}
          />
        )}
      </FreshWapper>

      <Amount>Participate: {value.total_spins && value.spins > 0 ? value.total_spins / value.spins : '0'}</Amount>
    </PanelWapper>
  );
}
