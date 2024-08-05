import FlexTable from '../../FlexTable';
import Image from 'next/image';
import useAccount from '@/hooks/useAccount';
import { useUserStore } from '@/stores/user';
import {
  StyledHead,
  StyledMyAvatar,
  StyledHeadInfo,
  StyledHeadOther,
  StyledMyAddress,
  StyledDateText,
  StyledTitleText,
  StyledEmptyTxt,
  StyledHistoryDapp,
  StyledHistoryDappLogo,
  StyledHistoryDappName,
} from './styles';
import { Column } from '../../FlexTable/styles';
import { formatTitle } from '@/views/OnBoarding/helpers';
import useCopy from '@/hooks/useCopy';
import Empty from '@/components/Empty';
import Pagination from '@/components/pagination';
import { formateAddress } from "@/utils/formate";
import { formatUSDate } from "@/utils/date";
import { useMemo } from "react";
import {chainPortfolioShowConfig} from "@/views/Dapp/components/DappDetail/config";
import { Category } from '@/hooks/useAirdrop';

const Types = {
  network: 'chain',
  dapp: 'dApp',
};

const MyHistory = (
  {
    category,
    loading,
    historyList,
    pageTotal,
    pageIndex,
    fetchHistoryList,
    chainIds,
  }: Props) => {
  const { account } = useAccount();
  const userInfo = useUserStore((store: any) => store.user);

  const { copy } = useCopy();

  const onPortfolioClick = () => {
  };

  const onShareClick = () => {
  };

  const historyDappColumns: Column[] = [
    {
      dataIndex: 'actions',
      title: 'Actions',
      render: (_, record) => <StyledTitleText>{formatTitle(record)}</StyledTitleText>,
    },
    {
      dataIndex: 'timestamp',
      title: 'Time',
      render: (_, record) => <StyledDateText>{formatUSDate(record.timestamp)}</StyledDateText>,
      width: '30%',
    },
  ];

  const historyChainColumns: Column[] = [
    {
      dataIndex: 'actions',
      title: 'Actions',
      render: (_, record) => <StyledTitleText>{formatTitle(record)}</StyledTitleText>,
    },
    {
      dataIndex: 'dapp',
      title: 'dApp',
      width: '28%',
      render: (_, record) => <StyledHistoryDapp>
        <StyledHistoryDappLogo url={record.dapp_logo} />
        <StyledHistoryDappName>{record.template ?? '-'}</StyledHistoryDappName>
      </StyledHistoryDapp>,
    },
    {
      dataIndex: 'timestamp',
      title: 'Time',
      render: (_, record) => <StyledDateText>{formatUSDate(record.timestamp)}</StyledDateText>,
      width: '30%',
    },
  ];

  const isShowPortfolio = useMemo(() => {
    return chainIds.some((chain: number) => chainPortfolioShowConfig.includes(chain));
  }, [chainIds]);

  return (
    <>
      <StyledHead>
        <StyledHeadInfo>
          <StyledMyAvatar url={userInfo.avatar} />
          <StyledMyAddress>{formateAddress(account ?? '')}</StyledMyAddress>
          {
            account && (<>
              <Image
                className="head-icon"
                src="/images/alldapps/icon-copy.svg"
                width={14}
                height={14}
                alt="copy"
                onClick={() => copy(account ?? '')}
              />
              <Image
                className="head-icon"
                src="/images/alldapps/icon-share.svg"
                width={12}
                height={12}
                alt="share"
                onClick={onShareClick}
              />
            </>)
          }
        </StyledHeadInfo>
        { account && isShowPortfolio && (<StyledHeadOther onClick={onPortfolioClick}>
          View more on Portfolio
        </StyledHeadOther>)
        }
      </StyledHead>
      <FlexTable
        className="history-table"
        loading={loading}
        list={historyList}
        columns={category == 'network' ? historyChainColumns : historyDappColumns}
        emptyText={<Empty
          size={42}
          tips={<StyledEmptyTxt>You don’t have any record on this {Types[category]} yet</StyledEmptyTxt>}
        />}
        pagination={<Pagination
          pageClassName={'history-pagination-item'}
          className={'history-pagination'}
          pageTotal={pageTotal}
          pageIndex={pageIndex}
          onPage={(page) => {
            fetchHistoryList(page);
          }}
        />}
      />
    </>
  );
};

export default MyHistory;

interface Props {
  category: Category;
  loading: boolean;
  historyList: any;
  pageTotal: number;
  pageIndex: number;
  fetchHistoryList: any;
  chainIds: any;
}