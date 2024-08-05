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

const summaryList = [
  {
    key: 'volume',
    label: 'Trading Volume on DapDap',
    value: '$16.7k',
    increaseValue: '0.23%'
  },
  {
    key: 'txns',
    label: 'Total txns',
    value: '1.2k',
    increaseValue: ''
  },
  {
    key: 'user',
    label: 'User',
    value: '351',
    increaseValue: ''
  },
];

const medalList = [
  {
    label:'Bridger Junior',
    logo:'/images/alldapps/icon-medal.png',
    percent:0.35
  }
]

const DappDetail = (props: any) => {

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