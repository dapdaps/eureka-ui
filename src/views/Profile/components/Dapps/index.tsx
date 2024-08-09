import useDappOpen from '@/hooks/useDappOpen';
import { StyledContainer, StyledFlex, StyledFont } from '@/styled/styles';
import DappCard from '@/views/AllDapps/components/DappCard';
import RectangleNumber from '../RectangleNumber';
import { DappType } from '../../types';
// import Empty from '@/components/Empty';
export default function Dapps({ dapps }: any) {
  const { open } = useDappOpen();
  const onDappCardClick = (_dapp: any) => {
    open({ dapp: _dapp, from: 'alldapps' });
  };
  return (
    <StyledContainer style={{ marginTop: 80 }}>
      <StyledFlex gap='6px' style={{ paddingLeft: 16, marginBottom: 20 }}>
        <StyledFont color='#FFF' fontSize='20px' fontWeight='600'>dApps</StyledFont>
        <RectangleNumber quantity={dapps?.length ?? 0} />
      </StyledFlex>
      <StyledFlex gap="14px" style={{ flexWrap: 'wrap' }}>
        {
          dapps?.map((dapp: DappType) => {
            return (
              <DappCard
                name={dapp.name}
                logo={dapp.logo}
                description={dapp.description}
                categories={dapp?.categories}
                networks={dapp.networks}
                onClick={() => onDappCardClick(dapp)}
                tradingVolume={dapp.trading_volume}
                users={dapp.participants}
                rewards={dapp.rewards}
              />
            )
          })
        }

      </StyledFlex>
    </StyledContainer>
  )
}