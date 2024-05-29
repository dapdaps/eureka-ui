import { styled } from 'styled-components';

import { formateValueWithThousandSeparatorAndFont } from '@/utils/formate';
import { DefaultIcon } from '@/views/Portfolio/config';

export const StyledContainer = styled.div<{bgColor: string}>`
  width: 325px;
  height: 70px;
  flex-shrink: 0;
  flex-grow: 0;
  border-radius: 10px;
  backdrop-filter: blur(10px);
  cursor: pointer;
  position: relative;
  overflow: hidden;
  background: #20212D;
  padding: 12px;
  
  &:hover {
    .bg {
      animation-name: fadeOut;
    }
    .bg-active {
      animation-delay: .3s;
      animation-name: fadeIn;
    }
  }
  
  .bg,
  .bg-active {
    position: absolute;
    z-index: 0;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    animation-fill-mode: both;
    animation-timing-function: linear;
    animation-duration: .6s;
  }
  .bg {
    opacity: 1;
    background: ${({ bgColor }) => `radial-gradient(46.69% 100% at 12.07% 0%, ${bgColor} 0%, #20212D 100%)`};
    animation-delay: .6s;
  }
  .bg-active {
    background: ${({ bgColor }) => `radial-gradient(46.69% 100% at 50% 0%, ${bgColor} 0%, #20212D 100%)`};
    animation-name: fadeOut;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
`;

export const StyledIcon = styled.div<{src: string}>`
  background: ${({ src }) => `url("${src}") no-repeat center / contain`};
  width: 46px;
  height: 46px;
  border-radius: 8px;
  overflow: hidden;
`;

export const StyledContent = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  color: #fff;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;

  .name {
    line-height: 20px;
  }

  .usd {
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: 24px;
    margin-left: auto;

    .sm {
      font-size: 14px;
    }
  }
`;

const ChainCard = (props: any) => {
  const { chain } = props;

  return (
    <StyledContainer bgColor={chain.bgColor}>
      <div className="bg"></div>
      <div className="bg-active"></div>
      <StyledContent>
        <StyledIcon src={chain.icon || DefaultIcon} />
        <div className="name">{chain.name}</div>
        <div className="usd">
          ${formateValueWithThousandSeparatorAndFont(chain.usd, 2).integer}
          <span className="sm">{formateValueWithThousandSeparatorAndFont(chain.usd, 2).decimal}</span>
        </div>
      </StyledContent>
    </StyledContainer>
  );
};

export default ChainCard;
