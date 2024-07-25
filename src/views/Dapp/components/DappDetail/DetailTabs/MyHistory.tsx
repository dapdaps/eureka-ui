import FlexTable from "../../FlexTable";
import Image from 'next/image';
import useAccount from "@/hooks/useAccount";
import { useUserStore } from "@/stores/user";
import {
  StyledHead,
  StyledMyAvatar,
  StyledHeadInfo,
  StyledHeadOther,
  StyledMyAddress,
  StyledDateText,
  StyledTitleText,
} from './styles';
import { Column } from "../../FlexTable/styles";
import { formatTitle } from '@/views/OnBoarding/helpers';
import useCopy from "@/hooks/useCopy";

const MyHistory = ({ loading, list }: any) => {

  const { account } = useAccount();
  const userInfo = useUserStore((store: any) => store.user);

  const { copy } = useCopy();

  const formatId = (tx: string) => {
    if (!tx) return '-';
    else {
      return <>{tx.substring(0, 6) + '...' + tx.substring(tx.length - 4, tx.length)}</>;
    }
  };

  function formatDate(timestamp: number) {
    const date = new Date(timestamp * 1000);
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    } as const;
    return date.toLocaleString('en-US', options);
  }

  const onPortfolioClick = () => {}

  const onShareClick = () => {}

  const  historyColumns: Column[] = [
    {
      dataIndex: 'actions',
      title: 'Actions',
      render: (_, record) =>  <StyledTitleText>{formatTitle(record)}</StyledTitleText>,
    },
    {
      dataIndex: 'timestamp',
      title: 'Time',
      render: (_, record) => <StyledDateText>{formatDate(record.timestamp)}</StyledDateText>,
      width: '30%'
    },
  ];

  return (
    <>
      <StyledHead>
        <StyledHeadInfo>
          <StyledMyAvatar url={userInfo.avatar}/>
          <StyledMyAddress>{formatId(account ?? '')}</StyledMyAddress>
          <Image
            className='head-icon'
            src='/images/alldapps/icon-copy.svg'
            width={14}
            height={14}
            alt='copy'
            onClick={() => copy(account ?? '')}
          />
          <Image
            className='head-icon'
            src='/images/alldapps/icon-share.svg'
            width={12}
            height={12}
            alt='share'
            onClick={onShareClick}
          />
        </StyledHeadInfo>
        <StyledHeadOther onClick={onPortfolioClick}>
          View more on Portfolio
        </StyledHeadOther>

      </StyledHead>
      <FlexTable
        className='activity-table'
        loading={loading}
        list={list}
        columns={historyColumns}
        emptyText='No history yet'
      />
    </>
  );
};


export default MyHistory;