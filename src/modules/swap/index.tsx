import BridgeBanner from './components/BridgeBanner';
import Panel from './Panel';
import { StyledContainer, StyledWidgetWrapper } from './styles';

export default function SwapDapp({ currentChain, theme, localConfig, isChainSupported, ...rest }: any) {
  const mergedLocalConfig: any = {
    theme: {},
    networks: {},
    basic: {},
    ...localConfig
  };
  return (
    <StyledContainer
      style={{
        // @ts-ignore
        '--button-color': mergedLocalConfig.theme['--button-color'],
        '--button-text-color': mergedLocalConfig.theme['--button-text-color']
      }}
    >
      <StyledWidgetWrapper>
        <div>
          <Panel
            {...rest}
            currentChain={currentChain}
            isChainSupported={isChainSupported}
            localConfig={mergedLocalConfig}
          />
        </div>
        <BridgeBanner currentChain={currentChain} theme={theme} isChainSupported={isChainSupported} />
      </StyledWidgetWrapper>
    </StyledContainer>
  );
}
