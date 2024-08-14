import { StyledFlex, StyledFont, StyledSvg } from "@/styled/styles";
import {
  StyledAchieved,
  StyledAchievedContainer,
  StyledInnerProgressBar,
  StyledProgressBar
} from './styles';
type ProgressType = {
  quantity: number;
  total: number;
  showAchieved?: boolean;
  barWidth?: string;
}
export default function Progress({ quantity, total, showAchieved, barWidth }: ProgressType) {
  quantity = quantity > total ? total : quantity
  return (
    <StyledFlex justifyContent="center" gap="37px" style={{ position: 'relative', paddingRight: 52 }}>
      {
        quantity >= total && showAchieved ? (
          <StyledAchievedContainer>
            <StyledAchieved>
              <StyledSvg>
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="10" viewBox="0 0 12 10" fill="none">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M11.3817 0.99741C11.7316 1.37961 11.7316 1.9658 11.3817 2.348L5.11313 9.19446C4.71673 9.6274 4.03443 9.6274 3.63803 9.19446L0.618295 5.89634C0.26836 5.51415 0.268359 4.92795 0.618295 4.54575L0.793969 4.35388C1.19037 3.92094 1.87267 3.92094 2.26907 4.35388L4.37558 6.65459L9.73093 0.805541C10.1273 0.3726 10.8096 0.3726 11.206 0.80554L11.3817 0.99741Z" fill="#57DB64" />
                </svg>
              </StyledSvg>
              <StyledFont color="#FFF" fontSize="14px">Achieved!</StyledFont>
            </StyledAchieved>
          </StyledAchievedContainer>
        ) : (
          <StyledProgressBar $width={barWidth}>
            <StyledInnerProgressBar $percent={(quantity / total) * 100} />
          </StyledProgressBar>
        )
      }
      <StyledFont color="#979ABE" fontSize="14px" fontWeight="500" style={{ position: 'absolute', right: 0 }}>
        {quantity}/{total}
      </StyledFont>
    </StyledFlex>
  )
}