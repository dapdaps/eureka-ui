import ArrowIcon from '@/components/Icons/ArrowIcon';
import {
  StyledContainer,
  StyledMoreContainer,
  StyledMoreText,
  StyledRelatedContainer,
  StyledRecordContainer,
  StyledRelatedOdyssey
} from '@/views/Dapp/components/DappDetail/styles';
import DappSummary from './Summary';
import DetailTabs from './DetailTabs/index';
import RelativeOdyssey from './RelativeOdyssey';
import Medal from './Medal';
import { formatIntegerThousandsSeparator } from '@/utils/format-number';
import { useAirdrop } from '@/hooks/useAirdrop';

const medalList = [
  {
    label:'Bridger Junior',
    logo:'/images/alldapps/icon-medal.png',
    percent:0.35
  }
]

const DappDetail = (props: any) => {
  const {
    trading_volume,
    trading_volume_change_percent,
    total_execution,
    participants,
    participants_change_percent,
  } = props;

  const summaryList = [
    {
      key: 'volume',
      label: 'Trading Volume on DapDap',
      value: `$${formatIntegerThousandsSeparator(trading_volume, 1)}`,
      increaseValue: `${trading_volume_change_percent}`,
    },
    {
      key: 'txns',
      label: 'Total txns',
      value: `${formatIntegerThousandsSeparator(total_execution, 1)}`,
      increaseValue: '',
    },
    {
      key: 'user',
      label: 'User',
      value: `${formatIntegerThousandsSeparator(participants, 1)}`,
      increaseValue: `${participants_change_percent}`,
    },
  ];
  const airdrop = useAirdrop({ category: 'dapp', id: props.id });
  console.log('airdrop: %o', airdrop);

  return (
    <StyledContainer>
      <StyledMoreContainer>
        <StyledMoreText>Scroll to learn more</StyledMoreText>
        <ArrowIcon size={12}/>
      </StyledMoreContainer>
      <DappSummary
        dappId={props?.id}
        name={props?.name ?? ''}
        logo={props?.logo ?? ''}
        networks={props?.dapp_network ?? []}
        categories={props?.dapp_category ?? []}
        summaries={summaryList}
      />
      <StyledRelatedContainer>
        <StyledRecordContainer>
          <DetailTabs
            {...props}
            overviewTitle={props?.name && `What is ${props.name} ?`}
            historyType='dApp'
          />
        </StyledRecordContainer>
        <StyledRelatedOdyssey>
          <Medal medalList={medalList}/>
          <RelativeOdyssey
            title='Related Campaign'
            dappId={props?.id}
          />
        </StyledRelatedOdyssey>
      </StyledRelatedContainer>
  </StyledContainer>
  );
}

export default DappDetail;