import Big from 'big.js';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { styled } from 'styled-components';

import { formateValueWithThousandSeparatorAndFont } from '@/utils/formate';
import { DefaultIcon } from '@/views/Portfolio/config';

export const StyledContainer = styled(motion.div)<{ bgColor: string }>`
  width: 325px;
  height: 70px;
  flex-shrink: 0;
  flex-grow: 0;
  border-radius: 10px;
  backdrop-filter: blur(10px);
  cursor: pointer;
  position: relative;
  overflow: hidden;
  background: #20212d;
  padding: 12px;
  border: 1px solid #20212d;

  //&:hover {
  //  .bg {
  //    animation-name: fadeOut;
  //  }
  //  .bg-active {
  //    animation-delay: .3s;
  //    animation-name: fadeIn;
  //  }
  //}

  .bg,
  .bg-active {
    position: absolute;
    z-index: 0;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    //animation-fill-mode: both;
    //animation-timing-function: linear;
    //animation-duration: .6s;
  }

  .bg {
    opacity: 1;
    background: ${({ bgColor }) => `radial-gradient(46.69% 100% at 12.07% 0%, ${bgColor} 0%, #20212D 100%)`};
    //animation-delay: .6s;
  }

  .bg-active {
    background: ${({ bgColor }) => `radial-gradient(46.69% 100% at 50% 0%, ${bgColor} 0%, #1B1D25 100%)`};
    //animation-name: fadeOut;
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

export const StyledIcon = styled.div`
  width: 46px;
  height: 46px;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
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

const ChainCard = (props: Props) => {
  const { selected, chain, onClick = () => {} } = props;

  const disabled = Big(chain.totalUsdValue || 0).lte(0);

  const cardTotalUsd = formateValueWithThousandSeparatorAndFont(chain.totalUsdValue, 2, false, {
    prefix: '$',
    isLTIntegerZero: true
  });

  return (
    <StyledContainer
      bgColor={chain.selectBgColor}
      whileHover={disabled ? 'default' : 'active'}
      initial="default"
      animate={selected ? 'active' : 'default'}
      style={{
        opacity: disabled ? 0.3 : 1,
        cursor: disabled ? 'default' : 'pointer'
      }}
      onClick={() => {
        if (disabled) return;
        onClick();
      }}
      variants={{
        default: {
          borderColor: '#20212D'
        },
        active: {
          borderColor: chain.selectBgColor,
          transition: {
            duration: 1
          }
        }
      }}
    >
      <motion.div
        className="bg"
        variants={{
          default: {
            opacity: 1
          },
          active: {
            opacity: 0,
            transition: {
              duration: 1
            }
          }
        }}
        transition={{
          ease: 'linear',
          duration: 0.6
        }}
        style={{
          display: disabled ? 'none' : 'block'
        }}
      />
      <motion.div
        className="bg-active"
        variants={{
          default: {
            opacity: 0
          },
          active: {
            opacity: 1,
            transition: {
              delay: 0.1,
              duration: 1.3
            }
          }
        }}
        transition={{
          ease: 'linear',
          duration: 0.6
        }}
        style={{
          display: disabled ? 'none' : 'block'
        }}
      />
      <StyledContent>
        <StyledIcon>
          <Image style={{ color: '#000' }} src={chain.logo || DefaultIcon} alt="" width={46} height={46} />
        </StyledIcon>
        <div className="name">{chain.name}</div>
        <div className="usd">
          {cardTotalUsd.integer}
          <span className="sm">{cardTotalUsd.decimal}</span>
        </div>
      </StyledContent>
    </StyledContainer>
  );
};

export default ChainCard;

export interface Props {
  chain: any;
  selected?: boolean;

  onClick?(): void;
}
