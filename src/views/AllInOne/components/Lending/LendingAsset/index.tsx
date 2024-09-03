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
`;
const Symbol = styled.div`
  font-weight: 400;
  color: #fff;
  overflow: hidden;
  text-overflow: ellipsis;
  width: calc(100% - 30px);
  font-size: 14px;

  &.large {
    font-size: 16px;
  }
`;

const Dapp = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
  margin-top: 4px;
`;
const DappIcon = styled.img`
  width: 14px;
  height: 14px;
  border-radius: 50%;
`;
const DappName = styled.div`
  font-size: 12px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.5);
`;

const Block = styled.div`
  width: 100%;
`;

interface IProps {
  icon: string;
  symbol: string;
  dappIcon?: string;
  dappName?: string;
}

const LendingAsset = (props: IProps) => {
  const { icon, symbol, dappIcon, dappName } = props;

  return (
    <Asset>
      {icon ? <Icon src={icon} /> : null}
      <Block>
        <Symbol className={dappIcon || dappName ? 'large' : ''}>{symbol}</Symbol>
        <Dapp>
          {dappIcon ? <DappIcon src={dappIcon} /> : null}
          <DappName>{dappName}</DappName>
        </Dapp>
      </Block>
    </Asset>
  );
};

export default LendingAsset;
