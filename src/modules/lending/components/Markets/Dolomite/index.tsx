import LendingMarketAsset from '@/modules/lending/components/Markets/Asset';
import LendingMarketAssetList from '@/modules/lending/components/Markets/Asset/List';
import DolomiteAddPosition from '@/modules/lending/components/Markets/Dolomite/AddPosition';
import DolomitePosition from '@/modules/lending/components/Markets/Dolomite/Position';
import { StyledContainer, StyledContent } from '@/modules/lending/components/Markets/Dolomite/styles';
import LendingMarketHeader from '@/modules/lending/components/Markets/Header';
import LendingSummary from '@/modules/lending/components/Markets/Summary';
import { type DexProps } from '@/modules/lending/models';

const LendingDolomite = (props: Props) => {
  const { markets, positionList, userTotalCollateralUsd, totalCollateralUsd, userTotalBorrowUsd, userTotalSupplyUsd } =
    props;

  const columns = [
    {
      key: 'collateral',
      label: 'Collateral Assets',
      width: '20%',
      render: (position: any) => {
        if (position.addCollateralTokens.length < 2) {
          return (
            <LendingMarketAsset
              icon={position.addCollateralTokens[0].icon}
              symbol={position.addCollateralTokens[0].symbol}
            />
          );
        }
        return <LendingMarketAssetList list={position.addCollateralTokens} />;
      }
    },
    {
      key: 'borrow',
      label: 'Borrow Assets',
      width: '20%',
      render: (position: any) => {
        if (position.borrowTokens.length < 2) {
          return <LendingMarketAsset icon={position.borrowTokens[0].icon} symbol={position.borrowTokens[0].symbol} />;
        }
        return <LendingMarketAssetList list={position.borrowTokens} />;
      }
    },
    {
      key: 'userCollateralUsd',
      label: 'Collateral',
      width: '20%',
      render: (position: any) => {
        return `$${position.totalCollateralUsd}`;
      }
    },
    {
      key: 'userBorrowUsd',
      label: 'Borrowing',
      width: '20%',
      render: (position: any) => {
        return `$${position.totalBorrowedUsd}`;
      }
    },
    {
      key: 'health',
      label: 'Health',
      width: '17%',
      render: (position: any) => {
        return `${position.healthFactor}`;
      }
    }
  ];

  return (
    <StyledContainer>
      <LendingSummary
        userTotalCollateralUsd={userTotalCollateralUsd}
        userTotalBorrowUsd={userTotalBorrowUsd}
        userTotalSupplyUsd={userTotalSupplyUsd}
      />
      <StyledContent>
        {positionList && positionList.length > 0 && (
          <>
            <LendingMarketHeader columns={columns} />
            {positionList.map((position: any, idx: number) => (
              <DolomitePosition key={idx} position={position} columns={columns} {...props} />
            ))}
          </>
        )}
        <DolomiteAddPosition {...props} />
      </StyledContent>
    </StyledContainer>
  );
};

export default LendingDolomite;

interface Props extends DexProps {
  markets: any;
  positionList: any;
  userTotalCollateralUsd?: string;
  totalCollateralUsd: string;
  userTotalBorrowUsd: string;
  userTotalSupplyUsd: string;
}
