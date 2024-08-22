import { AnimatePresence } from 'framer-motion';
import { orderBy, uniqBy, upperFirst } from 'lodash';
import React, { useMemo } from 'react';

import { container } from '@/components/animation';
import Selector from '@/components/Dropdown/Selector';
import Loading from '@/components/Icons/Loading';
import chains from '@/config/chains';
import { StyledFlex, StyledLoadingWrapper } from '@/styled/styles';
import FlexTable from '@/views/Portfolio/components/FlexTable';
import type { Column } from '@/views/Portfolio/components/FlexTable/styles';
import { NoDataLayout } from '@/views/Portfolio/components/NoDataLayout';
import DAppIconWithChain from '@/views/Portfolio/components/Protocol/DAppIconWithChain';

import { getTime } from '../../helpers';
import { StyledContainer, StyledContent, StyledHead, StyledPagination } from './styles';

const ExecuteRecords = ({ hasMore, records, loading, pageIndex, dapps, dapp, chain, handlePrev, handleNext, handleDapp, handleChain }: any) => {
  const chainList = useMemo<any[]>(() => {
    const _networks = Object.values(chains).map((it: any) => {
      return {
        value: it.chainId,
        label: it.chainName,
      };
    });
    _networks.unshift({
      label: 'All Chain',
      value: 'all',
    });
    return uniqBy(_networks, 'value');
  }, []);
  const dappList = useMemo<any[]>(() => {
    const _dapps = dapps.map((it: any) => {
      return {
        value: it.name,
        label: it.show_name,
      };
    });
    _dapps.unshift({
      label: 'All dApp',
      value: 'all',
    });
    return uniqBy(_dapps, 'value');
  }, [dapps]);

  const getDappShownName = (dapp: string) => {
    const curr = dappList.find((it) => it.value === dapp);
    if (!curr) return upperFirst(dapp);
    return curr.label;
  };

  // const pageTotal = (pageIndex - 1) * 20 + records.length;

  const columns: Column[] = [
    {
      title: 'Record',
      dataIndex: 'record',
      align: 'left',
      render: (text, record) => {
        return (
          <StyledFlex gap="11px" alignItems="center" style={{ color: '#fff', fontSize: 14 }}>
            <DAppIconWithChain
              size={32}
              icon={record.dapp_logo}
              chainIcon={record.chain_logo}
            />
            <div className="dapp-name">
              {getDappShownName(record.dapp_name)}
              <div className="token">
                {record.tx_hash.slice(0, 6) + '...' + record.tx_hash.slice(-4)}
              </div>
            </div>
          </StyledFlex>
        );
      },
    },
    {
      title: 'Executed',
      dataIndex: 'executed',
      align: 'left',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      align: 'left',
      render: () => {
        return 'Success';
      },
    },
    {
      title: 'Time',
      dataIndex: 'time',
      align: 'left',
      render: (text, record) => {
        return getTime(record.tx_time);
      },
    },
  ];

  return (
    <AnimatePresence mode="wait">
      <StyledContainer {...container}>
        <StyledHead>
          <div className="total"></div>
          <StyledFlex justifyContent="flex-end" alignItems="center" gap="14px" className="filters">
            <Selector
              className="filter-chain"
              list={orderBy(chainList || [], 'label')}
              value={chain}
              onSelect={handleChain}
              style={{
                borderRadius: 6,
                border: '1px solid #3D405A',
                background: '#101115',
              }}
              popupStyle={{
                top: 36,
                left: 'unset',
                right: 0,
                width: 150,
                maxHeight: 350,
              }}
            />
            <Selector
              className="filter-dapp"
              list={dappList}
              value={dapp}
              onSelect={handleDapp}
              style={{
                borderRadius: 6,
                border: '1px solid #3D405A',
                background: '#101115',
              }}
              popupStyle={{
                top: 36,
                left: 'unset',
                right: 0,
                width: 150,
                maxHeight: 350,
              }}
            />
          </StyledFlex>
        </StyledHead>
        <StyledContent>
          {
            !loading && records.length && (
              <FlexTable
                className="execute-records-table"
                columns={columns}
                list={records}
                pagination={(
                  <StyledPagination>
                    {/*<span className={`page-btn first-page ${pageIndex == 1 ? 'disabled' : ''}`} onClick={handleFirst}>
                      <svg width="10" height="13" viewBox="0 0 10 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g opacity={pageIndex == 1 ? '0.3' : '1'}>
                          <path
                            d="M2.77733 5.77071C2.35628 6.16574 2.35628 6.83426 2.77733 7.22928L6.31579 10.5491C6.95436 11.1482 8 10.6954 8 9.81976L8 3.18023C8 2.30462 6.95436 1.85185 6.31579 2.45095L2.77733 5.77071Z"
                            fill="#7C7F96" />
                          <path
                            d="M1 3V10"
                            stroke="#7C7F96"
                            stroke-width="1.2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </g>
                      </svg>
                    </span>*/}
                    <span className={`page-btn prev-page ${pageIndex == 1 ? 'disabled' : ''}`} onClick={handlePrev}>
                  <svg width="6" height="9" viewBox="0 0 6 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      opacity={pageIndex == 1 ? '0.3' : '1'}
                      d="M0.777329 3.77071C0.356276 4.16574 0.356276 4.83426 0.777328 5.22928L4.31579 8.54905C4.95436 9.14816 6 8.69538 6 7.81976L6 1.18023C6 0.304619 4.95436 -0.148155 4.31579 0.450951L0.777329 3.77071Z"
                      fill="#7C7F96"
                    />
                  </svg>
                </span>
                    {/*<span className="current-page">{(pageIndex - 1) * 20 + 1} - {(pageIndex) * 20} of {pageTotal}</span>*/}
                    <span className={`page-btn next-page ${!hasMore ? 'disabled' : ''}`} onClick={handleNext}>
                  <svg width="6" height="9" viewBox="0 0 6 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M5.22267 3.77071C5.64372 4.16574 5.64372 4.83426 5.22267 5.22928L1.68421 8.54905C1.04564 9.14816 -4.6751e-07 8.69538 -4.29236e-07 7.81976L-1.39013e-07 1.18023C-1.00738e-07 0.304619 1.04564 -0.148155 1.68421 0.450951L5.22267 3.77071Z"
                      fill="#7C7F96"
                      opacity={!hasMore ? '0.3' : '1'}
                    />
                  </svg>
                </span>
                    {/*<span className={`page-btn last-page ${(!hasMore && pageTotal === 1) ? 'disabled' : ''}`} onClick={handleLast}>
                      <svg width="10" height="13" viewBox="0 0 10 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          opacity={(!hasMore && pageTotal === 1) ? '0.3' : '1'}
                          d="M7.22267 5.77071C7.64372 6.16574 7.64372 6.83426 7.22267 7.22928L3.68421 10.5491C3.04564 11.1482 2 10.6954 2 9.81976L2 3.18023C2 2.30462 3.04564 1.85185 3.68421 2.45095L7.22267 5.77071Z"
                          fill="#7C7F96"
                        />
                        <path
                          opacity={(!hasMore && pageTotal === 1) ? '0.3' : '1'}
                          d="M9 3V10"
                          stroke="#7C7F96"
                          stroke-width="1.2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </span>*/}
                  </StyledPagination>
                )}
                loading={loading}
                emptyText="No result found"
              />
            )
          }
          {
            loading && (
              <StyledLoadingWrapper $h="100px">
                <Loading size={22} />
              </StyledLoadingWrapper>
            )
          }
          {
            !loading && !records.length && (
              <NoDataLayout tips="No result found" />
            )
          }
        </StyledContent>
      </StyledContainer>
    </AnimatePresence>
  );
};

export default ExecuteRecords;
