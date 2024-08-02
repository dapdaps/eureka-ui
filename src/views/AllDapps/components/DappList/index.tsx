import { forwardRef, memo, useImperativeHandle } from 'react';
import { StyledContainer, StyledDappList, StyledFoot, StyledEmptyContainer, StyledEmptyItem, StyledEmptyShadow, StyledEmptyInner, StyledEmptyText } from '@/views/AllDapps/components/DappList/styles';
import DappLoading from '@/views/AllDapps/Loading/Dapp';
import DappCard from '@/views/AllDapps/components/DappCard';
import Empty from '@/components/Empty';
import Pagination from '@/components/pagination';
import useList, { Props } from '@/views/AllDapps/hooks/useList';
import useDappOpen from '@/hooks/useDappOpen';

const DappList = forwardRef((props: Props, ref) => {
  const { open } = useDappOpen();

  const {
    loading,
    dappList,
    pageTotal,
    pageIndex,
    fetchDappList,
  } = useList(props);

  const onDappCardClick = (dapp: any) => {
    open({ dapp, from: 'alldapps' });
  };

  useImperativeHandle(ref, () => ({
    dappList,
    fetchDappList,
    pageTotal,
    pageIndex,
  }));

  console.log(dappList);

  return (
    <StyledContainer style={props?.style}>
      {
        loading ? (
          <DappLoading />
        ) : (
            dappList.length ? (
              <StyledDappList>
                {
                  dappList.map((dapp: any, idx: number) => (
                    <DappCard
                      bp={props.bp}
                      key={idx}
                      name={dapp.name}
                      logo={dapp.logo}
                      description={dapp.description}
                      categories={dapp.categories}
                      networks={dapp.networks}
                      onClick={() => onDappCardClick(dapp)}
                      trading_volume={dapp?.trading_volume}
                      participants={dapp?.participants}
                      badges={dapp.rewards}
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
            fetchDappList(page);
          }}
        />
      </StyledFoot>
    </StyledContainer>
  );
});

export default memo(DappList);
