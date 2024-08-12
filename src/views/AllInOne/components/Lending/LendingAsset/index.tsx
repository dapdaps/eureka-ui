import styled from 'styled-components';

const Asset = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
const Icon = styled.img`
  width: 26px;
  height: 26px;
  border-radius: 50%;
`;
const Symbol = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: var(--agg-primary-color, #fff);
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
    dappIcon: string;
    dappName: string;
}

const LendingAsset = (props: IProps) => {
    const { icon, symbol, dappIcon, dappName } = props;

    return (
        <Asset>
          {icon ? <Icon src={icon} /> : null}
          <div>
            <Symbol>{symbol}</Symbol>
            <Dapp>
              {dappIcon ? <DappIcon src={dappIcon} /> : null}
              <DappName>{dappName}</DappName>
            </Dapp>
          </div>
        </Asset>
      );
}

export default LendingAsset


