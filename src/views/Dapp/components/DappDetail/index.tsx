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
import useDappDetail from '../../hooks/useDappDetail';
import DetailTabs from './DetailTabs/index';
import RelativeOdyssey from './RelativeOdyssey';

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

const DappDetail = (props: any) => {
  const {
    activity,
    activityLoading
  } = useDappDetail(props.id);

  return (
    <StyledContainer>
      <StyledMoreContainer>
        <StyledMoreText>Scroll to learn more</StyledMoreText>
        <ArrowIcon size={12}/>
      </StyledMoreContainer>
      <DappSummary
        name={props?.name ?? ''}
        logo={props?.logo ?? ''}
        networks={props?.dapp_network ?? []}
        categories={props?.dapp_category ?? []}
        summaries={summaryList}
      />
      <StyledRelatedContainer>
        <StyledRecordContainer>
          <DetailTabs
            loading={activityLoading}
            activity={activity}
            {...props}
          />
        </StyledRecordContainer>
        <StyledRelatedOdyssey>
          <RelativeOdyssey />
        </StyledRelatedOdyssey>
      </StyledRelatedContainer>
  </StyledContainer>
  );
}

export default DappDetail;