import { StyledContainer, StyledFlex, StyledFont, StyledSvg } from "@/styled/styles";
import {
  StyledFilter,
  StyledFilterCurrent,
  StyledFilterOption,
  StyledFilterOptions,
  StyledFilterOptionsWrap,
  StyledReward,
  StyledRewardHeader,
  StyledSource,
  StyledSourceImage,
  StyledSourceMessage
} from './styles';
export default function RewardHistory() {
  return (
    <StyledContainer>
      <StyledRewardHeader>
        <StyledFilter style={{ flex: 3 }}>
          <StyledFilterCurrent>
            <StyledFont color="#FFF" lineHeight="100%">All Sources</StyledFont>
            <StyledSvg>
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="6" viewBox="0 0 12 6" fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M0.175334 0.300273C0.451342 -0.0447361 0.954776 -0.100673 1.29979 0.175334L5.80003 3.77553L10.3003 0.175334C10.6453 -0.100673 11.1487 -0.0447361 11.4247 0.300273C11.7007 0.645283 11.6448 1.14872 11.2998 1.42472L5.80003 5.82453L0.300273 1.42472C-0.0447361 1.14872 -0.100673 0.645283 0.175334 0.300273Z" fill="white" />
              </svg>
            </StyledSvg>
          </StyledFilterCurrent>
          <StyledFilterOptionsWrap>
            <StyledFilterOptions>
              <StyledFilterOption className="active">All Sources</StyledFilterOption>
              <StyledFilterOption>Odyssey</StyledFilterOption>
            </StyledFilterOptions>
          </StyledFilterOptionsWrap>
        </StyledFilter>

        <StyledFilter style={{ flex: 1 }}>
          <StyledFilterCurrent>
            <StyledFont color="#FFF" lineHeight="100%">All Rewards</StyledFont>
            <StyledSvg>
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="6" viewBox="0 0 12 6" fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M0.175334 0.300273C0.451342 -0.0447361 0.954776 -0.100673 1.29979 0.175334L5.80003 3.77553L10.3003 0.175334C10.6453 -0.100673 11.1487 -0.0447361 11.4247 0.300273C11.7007 0.645283 11.6448 1.14872 11.2998 1.42472L5.80003 5.82453L0.300273 1.42472C-0.0447361 1.14872 -0.100673 0.645283 0.175334 0.300273Z" fill="white" />
              </svg>
            </StyledSvg>
          </StyledFilterCurrent>
          <StyledFilterOptionsWrap>
            <StyledFilterOptions>
              <StyledFilterOption className="active">All Rewards</StyledFilterOption>
              <StyledFilterOption>Gem</StyledFilterOption>
            </StyledFilterOptions>
          </StyledFilterOptionsWrap>
        </StyledFilter>
        <StyledFont color="#FFF" style={{ flex: 1 }}>Time</StyledFont>
      </StyledRewardHeader>
      <StyledFlex flexDirection="column" gap="20px">
        <StyledReward>
          <StyledSource style={{ flex: 3 }}>
            <StyledSourceImage />
            <StyledSourceMessage>
              <StyledFont color="#FFF" fontWeight="600" lineHeight="120%" style={{ textTransform: 'capitalize' }}>Odyssey Vol.5 | DapDap x Mode: The Airdrop Ascendancy </StyledFont>
              <StyledFlex gap="5px">
                <StyledFont color="#979ABE" fontSize="14px">Odyssey</StyledFont>
                <StyledSvg>
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="13" viewBox="0 0 14 13" fill="none">
                    <path d="M10.8182 8.72727V10C10.8182 11.1046 9.92275 12 8.81818 12H3C1.89543 12 1 11.1046 1 10V4.18182C1 3.07725 1.89543 2.18182 3 2.18182H4.27273" stroke="#979ABE" />
                    <path d="M5 8.63636L12.6364 1M12.6364 1H7.29091M12.6364 1V6.34545" stroke="#979ABE" />
                  </svg>
                </StyledSvg>
              </StyledFlex>
            </StyledSourceMessage>
          </StyledSource>
          <StyledFlex gap="12px" style={{ flex: 1 }}>
            <StyledSvg>
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                <rect x="1" y="1" width="28" height="28" rx="14" fill="#DFFE00" stroke="#343434" stroke-width="2" />
                <path d="M10.8003 21.0664H8.06665V8.93311H12.1394L14.6689 15.8454V17.8309H15.4129V15.8454L17.9424 8.93311H21.9333V21.0664H19.2815V15.0365L20.3974 11.5804L19.6535 11.3598L16.0825 21.0664H13.9994L10.5027 11.3598L9.68436 11.5804L10.8003 15.0365V21.0664Z" fill="black" />
              </svg>
            </StyledSvg>
            <StyledFont color="#FFF" fontWeight="700">200 MODE</StyledFont>
          </StyledFlex>
          <StyledFont color="#FFF" style={{ flex: 1 }}>Jul 12, 2024, 20:45</StyledFont>
        </StyledReward>
      </StyledFlex>
    </StyledContainer>
  )
}