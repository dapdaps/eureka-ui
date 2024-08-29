import styled from 'styled-components';

const Asset = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  
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
  //border-radius: 50%;
`;
const Symbol = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: #fff;
  font-family: Gantari;
`;
const Dapp = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
`;
const DappIcon = styled.img`
  width: 14px;
  height: 14px;
  border-radius: 50%;
`;
const DappName = styled.div`
  font-size: 12px;
  font-weight: 400;
  color: var(--agg-primary-color, rgba(255, 255, 255, 0.5));
`;


interface IProps {
    icon: string;
    symbol: string;
    size?: 'small' | 'medium';
    // dappIcon: string;
    // dappName: string;
}

const LendingAsset = (props: IProps) => {
    const { icon, symbol, size = 'medium' } = props;

    return (
        <Asset className={`asset-${size}`}>
          {icon ? <Icon src={icon} className={`asset-${size}-icon`}/> : null}
          <Symbol className={`asset-${size}-symbol`}>{symbol}</Symbol>
        </Asset>
      );
}

export default LendingAsset


