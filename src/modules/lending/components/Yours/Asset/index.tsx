import { Asset, Dapp, DappIcon, DappName, Icon, Symbol } from './styles';

const LendingYoursAsset = (props: Props) => {
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
};

export default LendingYoursAsset;

export interface Props {
  icon: string;
  symbol: string;
  dappIcon: string;
  dappName: string;
}
