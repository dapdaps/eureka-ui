import React, { memo, useEffect, useState } from "react";

import useTokensAndChains from "@/components/Bridge/hooks/useTokensAndChains";
import { StyledFlex } from "@/styled/styles";
import FlexTable from "@/views/AllInOne/components/FlexTable";
import type { Column } from "@/views/AllInOne/components/FlexTable/styles";
import { getListData } from "@/views/AllInOne/components/Liquidity/data";
import {
  StyledLiquidityEntry,
  StyledTokenBadge,
  StyledTokenName
} from "@/views/AllInOne/components/Liquidity/styles";
import {
  StyledBadge,
  StyledChain,
  StyledTokens,
  StyledTokensList,
} from "@/views/AllInOne/components/Liquidity/styles";

const LiquidityEntry = () => {
  const [tableList, setTableList] = useState<any>([]);

  const columns: Column[] = [
    {
      title: 'Pool',
      dataIndex: 'pool',
      align: 'left',
      width: '300px',
      render: (text, record, index) => {
        if (!record.tokens || !record.tokens.length) {
          return <>No tokens</>;
        }
        return (
          <StyledFlex alignItems="center" gap="8px">
            <StyledTokensList>
              {
                record.tokens.map((token: any) => (
                  <StyledTokens key={token.poolId}>
                    <img src={token.icon} alt={token.symbol} />
                  </StyledTokens>
                ))
              }
            </StyledTokensList>
            <StyledTokenName title={record.tokens.map((token: any) => token.symbol).join(' / ')}>
              {record.tokens.map((token: any) => token.symbol).join(' / ')}
            </StyledTokenName>
            <StyledTokenBadge>
              {record.poolRate || '-'}
            </StyledTokenBadge>
          </StyledFlex>
        );
      },
    },
    {
      title: 'Chain',
      dataIndex: 'chain',
      align: 'left',
      render: (text, record, index) => {
        return (
          <StyledChain bg={record.bgColor}>
            <img src={record.icon} />
          </StyledChain>
        );
      },
    },
    {
      title: 'AMM',
      dataIndex: 'amm',
      align: 'left',
      render: (text, record, index) => {
        if (!record.amm) return null;
        return (
          <StyledFlex justifyContent="flex-start" alignItems="center" gap="4px">
            <StyledTokens bg={record.amm.iconBg} borderColor={record.amm.iconBg}>
              {
                record.amm.icon && (
                  <img src={record.amm.icon} alt={record.amm.name} />
                )
              }
            </StyledTokens>
            {record.amm.name}
          </StyledFlex>
        );
      },
    },
    {
      title: 'Strategy',
      dataIndex: 'strategy',
      align: 'left',
      width: '100px',
      render: (text, record, index) => {
        return (
          <StyledBadge>
            {record.strategy}
          </StyledBadge>
        );
      },
    },
    {
      title: 'TVL',
      dataIndex: 'tvl',
      align: 'left',
      ellipsis: true,
    },
    {
      title: 'Total APR',
      dataIndex: 'totalApr',
      align: 'left',
      ellipsis: true,
    },
    {
      title: 'Yours',
      dataIndex: 'yours',
      align: 'left',
      ellipsis: true,
    },
  ];

  const { tokens } = useTokensAndChains();

  const getTableList = () => {
    const res: any[] = getListData();
    res.forEach((chainItem) => {
      chainItem.tokens = Object.values(tokens).filter((it) => it.chainId === chainItem.chainId);
    });
    setTableList(res);
  };

  useEffect(() => {
    getTableList();
  }, []);

  return (
    <StyledLiquidityEntry className="StyledLiquidityEntry">
      <FlexTable columns={columns} list={tableList} />
    </StyledLiquidityEntry>
  );
};

export default memo(LiquidityEntry);
