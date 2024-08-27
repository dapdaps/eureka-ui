import React, { memo, useEffect, useState } from "react";

import { StyledFlex } from "@/styled/styles";
import FlexTable from "@/views/AllInOne/components/FlexTable";
import type { Column } from "@/views/AllInOne/components/FlexTable/styles";
import { getListData } from "@/views/AllInOne/components/Lending/data";
import { StyledChain, StyledLendingEntry, StyledSupplied } from "@/views/AllInOne/components/Lending/styles";

const LendingEntry = () => {
  const [tableList, setTableList] = useState<any>([]);

  const columns: Column[] = [
    {
      title: 'Asset',
      dataIndex: 'asset',
      align: 'left',
      render: (text, record, index) => {
        return (
          <StyledFlex gap="8px" alignItems="center">
            <StyledChain bg={record.bgColor}>
              <img src={record.icon} />
            </StyledChain>
            {record.title}
          </StyledFlex>

        );
      },
    },
    {
      title: 'Total Supplied',
      dataIndex: 'totalSupplied',
      align: 'left',
      render: (text, record, index) => {
        return (
          <StyledFlex justifyContent="flex-start" alignItems="flex-start" flexDirection="column">
            <StyledSupplied>{record.deposit}</StyledSupplied>
            <StyledSupplied sub>{record.borrowed}</StyledSupplied>
          </StyledFlex>
        );
      },
    },
    {
      title: 'Supply APY',
      dataIndex: 'supplyApy',
      align: 'left',
      render: (text, record, index) => {
        return (
          <StyledFlex justifyContent="flex-start" alignItems="flex-start" flexDirection="column">
            <StyledSupplied>{record.depositApy}</StyledSupplied>
            <StyledSupplied sub>{record.borrowedApy}</StyledSupplied>
          </StyledFlex>
        );
      },
    },
    {
      title: 'Market Size',
      dataIndex: 'marketSize',
      align: 'left',
    },
  ];

  const getTableList = () => {
    const res: any[] = getListData();
    setTableList(res);
  };

  useEffect(() => {
    getTableList();
  }, []);

  return (
    <StyledLendingEntry className="StyledLendingEntry">
      <FlexTable columns={columns} list={tableList} rowAlign="center" />
    </StyledLendingEntry>
  );
};

export default LendingEntry;
