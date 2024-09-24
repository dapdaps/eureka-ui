import LazyImage from '@/components/LazyImage';
import { StyledContainer, StyledMarket, StyledMarketName } from '@/modules/lending/AllInOne/Dapps/styles';

const AllInOneDapps = (props: Props) => {
  const { currentDapp, onCurrentDapp, list } = props;

  const handleCurrentDapp = (dapp: any) => {
    if (dapp.name === currentDapp?.name) return;
    onCurrentDapp(dapp);
  };

  return (
    <StyledContainer>
      {list.map((dapp: any) => (
        <StyledMarket
          key={dapp.name}
          className={`${currentDapp?.name === dapp.name ? 'active' : ''}`}
          onClick={() => handleCurrentDapp(dapp)}
          title={dapp.name}
        >
          <LazyImage src={dapp.icon} width={24} height={24} />
          <StyledMarketName>{dapp.name}</StyledMarketName>
        </StyledMarket>
      ))}
    </StyledContainer>
  );
};

export default AllInOneDapps;

interface Props {
  currentDapp?: any;
  list: any;

  onCurrentDapp(dapp: any): void;
}
