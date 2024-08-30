import styled from 'styled-components';

const Asset = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 6px;

  &.asset-small {
    .asset-small-icon {
      width: 24px;
      height: 24px;
    }

    .asset-small-symbol {
      font-size: 14px;
    }
  }
`;
const Icon = styled.img`
  width: 26px;
  height: 26px;
  object-fit: contain;
  flex-shrink: 0;
  //border-radius: 50%;
`;
const Symbol = styled.div`
  width: 0;
  flex: 1;
  font-size: 16px;
  font-weight: 400;
  color: #fff;
  overflow: hidden;
  text-overflow: ellipsis;
`;

interface IProps {
  icon: string;
  symbol: string;
  size?: 'small' | 'medium';
}

const LendingAsset = (props: IProps) => {
  const { icon, symbol, size = 'medium' } = props;

  return (
    <Asset className={`asset-${size}`}>
      {icon ? <Icon src={icon} className={`asset-${size}-icon`} /> : null}
      <Symbol className={`asset-${size}-symbol`} title={symbol}>
        {symbol}
      </Symbol>
    </Asset>
  );
};

export default LendingAsset;
