import { memo } from 'react';
import { StyledContainer, StyledDappList, StyledFoot, StyledEmptyContainer, StyledEmptyItem, StyledEmptyShadow, StyledEmptyInner, StyledEmptyText } from '@/views/AllDapps/components/DappList/styles';
import DappLoading from '@/views/AllDapps/Loading/Dapp';
import DappCard from '@/views/AllDapps/components/DappCard';
import Empty from '@/components/Empty';
import Pagination from '@/components/pagination';
import useDappOpen from '@/hooks/useDappOpen';
import { PageSize } from '../../config';
import AdvertiseCardList from '../../../AdvertiseCardList';

const DappList = (props: Props) => {
  const { open } = useDappOpen();

  const {
    loading,
    dappList,
    pageTotal,
    pageIndex,
    fetchDappList,
    from = 'alldapps',
    loadingLength = PageSize,
    loadFromApi = true
  } = props

  const onDappCardClick = (dapp: any) => {
    open({ dapp, from });
  };

  return (
    <StyledContainer style={props?.style}>
      {
        loading ? (
          <DappLoading length={loadingLength}/>
        ) : (
            dappList.length ? (
              <StyledDappList>
                {
                  dappList.map((dapp: any, idx: number) => dapp.isAdvertise
                    ? (
                        <AdvertiseCardList
                          classname='advertise'
                          adList={dapp.advertise}
                        />
                      )
                    :(
                    <DappCard
                      bp={props.bp}
                      key={idx}
                      name={dapp.name}
                      logo={dapp.logo}
                      description={dapp.description}
                      categories={dapp.categories}
                      networks={dapp.networks}
                      onClick={() => onDappCardClick(dapp)}
                      tradingVolume={dapp?.trading_volume}
                      users={dapp?.participants}
                      route={dapp?.route}
                    />
                  ))
                }
              </StyledDappList>
            )
            : (
              <StyledEmptyContainer>
                {
                  new Array(3).fill('').map((item, index) => (
                    <StyledEmptyItem key={`empty_${index}`}/>
                  ))
                }
                <StyledEmptyShadow />
                <StyledEmptyInner>
                  <Empty size={42} tips={<StyledEmptyText>No dApp found</StyledEmptyText>}/>
                </StyledEmptyInner>
              </StyledEmptyContainer>
            )
        )
      }
      <StyledFoot>
        <Pagination
          pageTotal={pageTotal}
          pageIndex={pageIndex}
          onPage={(page) => {
            loadFromApi && fetchDappList(page);
            props.onPage && props.onPage(page);
          }}
        />
      </StyledFoot>
    </StyledContainer>
  );
};

export default memo(DappList);

interface Props {
  onPage?(page: number): void;
  // data anchor
  bp?: { detail: string; dapp: string; };
  loading: boolean;
  dappList: Record<string, any>[];
  pageTotal: number;
  pageIndex: number;
  fetchDappList: (page: number) => void;
  style?: React.CSSProperties;
  from?:  'home' | 'quest' | 'alldapps'
  loadingLength?: number;
  loadFromApi?: boolean;
}
