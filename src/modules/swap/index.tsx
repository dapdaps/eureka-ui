import BridgeBanner from './components/BridgeBanner';
import Panel from './Panel';
import { StyledContainer, StyledWidgetWrapper } from './styles';

export default function SwapDapp({ currentChain, theme, localConfig, isChainSupported, ...rest }: any) {
  return (
    <StyledContainer
      style={{
        // @ts-ignore
        '--button-color': localConfig.theme['--button-color'],
        '--button-text-color': localConfig.theme['--button-text-color']
      }}
    >
      <StyledWidgetWrapper>
        <div>
          <Panel {...rest} currentChain={currentChain} isChainSupported={isChainSupported} localConfig={localConfig} />
        </div>
        <BridgeBanner currentChain={currentChain} theme={theme} isChainSupported={isChainSupported} />
      </StyledWidgetWrapper>
    </StyledContainer>
  );
}
