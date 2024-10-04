import { format } from 'date-fns';
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';
import styled from 'styled-components';

import Modal from '@/components/Modal';
import { useUserStore } from '@/stores/user';
import { StyledContainer, StyledFlex, StyledFont, StyledSvg } from '@/styled/styles';
import { ellipsAccount } from '@/utils/account';
import { formatValueDecimal } from '@/utils/formate';
import Counter from '@/views/AllDapps/components/Title/Counter';
import Timer from '@/views/Fjord/components/Timer';
import usePools from '@/views/Fjord/hooks/usePools';
import useConvert from '@/views/Home/hooks/useConvert';
import type { ConvertType } from '@/views/Home/types';

const StyledContent = styled.div``;
const StyledContentTop = styled.div`
  position: relative;
  height: 120px;
  background: #0a0b06;
  overflow: hidden;
`;
const StyledCircle = styled.div`
  position: absolute;
  width: 650px;
  height: 185px;
  border-radius: 650px;
  background: radial-gradient(50% 50% at 50% 50%, rgba(220, 222, 39, 0.5) 0%, rgba(220, 222, 39, 0) 100%);
  filter: blur(25px);
`;
const StyledContentBottom = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const StyledLogo = styled.img`
  margin-top: -37px;
  margin-bottom: 15px;
  width: 74px;
  height: 74px;
  border-radius: 20px;
  z-index: 10;
`;
const StyledFontRect = styled.div`
  margin: 12px 0;
  padding: 10px 16px;
  border-radius: 18px;
  background: #373a53;
`;
const StyledButton = styled.div`
  cursor: pointer;
  width: 230px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: 8px;
  background: linear-gradient(180deg, #eef3bf 0%, #e9f456 100%);

  color: #02051e;
  font-family: Montserrat;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;
const RemindMedalContent = function ({ onClose, DuaPool }: any) {
  const router = useRouter();
  return (
    <StyledContent>
      <StyledContentTop>
        <StyledSvg
          onClick={onClose}
          style={{ cursor: 'pointer', position: 'absolute', zIndex: 10, right: 20, top: 20 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M7.73284 6.00004L11.7359 1.99701C12.0368 1.696 12.0882 1.2593 11.8507 1.0219L10.9779 0.14909C10.7404 -0.0884124 10.3043 -0.0363122 10.0028 0.264491L6.00013 4.26743L1.99719 0.264591C1.69619 -0.036712 1.25948 -0.0884125 1.02198 0.14939L0.149174 1.0223C-0.0882277 1.2594 -0.0368271 1.6961 0.264576 1.99711L4.26761 6.00004L0.264576 10.0033C-0.0363271 10.3041 -0.0884277 10.7405 0.149174 10.978L1.02198 11.8509C1.25948 12.0884 1.69619 12.0369 1.99719 11.736L6.00033 7.73276L10.0029 11.7354C10.3044 12.037 10.7405 12.0884 10.978 11.8509L11.8508 10.978C12.0882 10.7405 12.0368 10.3041 11.736 10.0029L7.73284 6.00004Z"
              fill="white"
            />
          </svg>
        </StyledSvg>
        <StyledCircle style={{ left: -157, bottom: -63 }} />
        <StyledCircle style={{ right: -224, top: -70 }} />
        <svg width="540" height="120" viewBox="0 0 540 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 41H540" stroke="#9CA063" stroke-opacity="0.05" />
          <path d="M0 90H540" stroke="#9CA063" stroke-opacity="0.05" />
          <path d="M330 0L330 120" stroke="#9CA063" stroke-opacity="0.05" />
          <path d="M390 0L390 120" stroke="#9CA063" stroke-opacity="0.05" />
          <path d="M450 0L450 120" stroke="#9CA063" stroke-opacity="0.05" />
          <path d="M510 0L510 120" stroke="#9CA063" stroke-opacity="0.05" />
          <path d="M270 0L270 120" stroke="#9CA063" stroke-opacity="0.05" />
          <path d="M210 0L210 120" stroke="#9CA063" stroke-opacity="0.05" />
          <path d="M150 0L150 120" stroke="#9CA063" stroke-opacity="0.05" />
          <path d="M90 0L90 120" stroke="#9CA063" stroke-opacity="0.05" />
          <path d="M30 0L30 120" stroke="#9CA063" stroke-opacity="0.05" />
        </svg>
      </StyledContentTop>
      <StyledContentBottom>
        <StyledLogo src="/images/fjord/hyperlock.png" />
        <StyledFont color="#FFF" fontSize="26px" fontWeight="700" fontFamily="Gantari" textAlign="center">
          HYPER will go on sale soon!
        </StyledFont>
        <StyledFontRect>
          <StyledFont color="#FFF" fontSize="14px" fontWeight="500">
            {format(DuaPool?.start_time * 1000, 'MMM d, yyyy, h:mm aa')} -{' '}
            {format(DuaPool?.end_time * 1000, 'MMM d, yyyy, h:mm aa')}
          </StyledFont>
        </StyledFontRect>
        <StyledFont color="#EBF479" fontSize="16px" fontFamily="Gantari" fontWeight="700">
          Countdown
        </StyledFont>

        <StyledContainer style={{ marginTop: 12, marginBottom: 20 }}>
          <Timer endTime={Number(DuaPool.start_time * 1000)} />
        </StyledContainer>
        <StyledContainer style={{ width: 441 }}>
          <StyledFont color="#979ABE" fontSize="14px" lineHeight="150%" textAlign="center">
            Participate in the sale on DapDap to unlock potential wealth and earn our exclusive 20 Gems rewards!
          </StyledFont>
          <StyledFont color="#979ABE" fontSize="14px" lineHeight="150%" textAlign="center">
            Don’t miss your chance to be an early supporter of Hyperlock!
          </StyledFont>
        </StyledContainer>

        <StyledFlex justifyContent="center" gap="20px" style={{ marginTop: 30, marginBottom: 30 }}>
          <StyledButton
            onClick={() => {
              window.open(
                `http://www.google.com/calendar/event?action=TEMPLATE&text=${DuaPool?.share_token_name}&dates=${format(DuaPool?.start_time * 1000, "yyyyMMdd'T'HHmmss'Z'")}/${format(DuaPool?.end_time * 1000, "yyyyMMdd'T'HHmmss'Z'")}&details=${DuaPool?.description}`
              );
              onClose();
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="20" viewBox="0 0 17 20" fill="none">
              <path
                d="M3.71933 2.71836L3.51451 1.99448C3.35312 1.42408 3.69054 0.824011 4.26694 0.660922C4.84198 0.49822 5.44515 0.83215 5.60654 1.40256L5.81136 2.12643C9.00177 1.77379 11.545 4.00989 12.4768 7.30331L13.6066 11.2962L16.2558 12.5063C16.7704 12.987 16.906 13.4298 16.7352 14.1118C16.5666 14.7961 15.9794 15.0414 15.299 15.234L2.50582 18.8537C1.82536 19.0462 1.19672 19.1449 0.693905 18.6535C0.192465 18.1617 0.0752398 17.7108 0.261053 17.0348L0.282649 16.97L1.86943 14.6186L0.739683 10.6257C-0.19217 7.3323 0.814379 4.09036 3.71933 2.71836ZM10.8045 17.1188C11.0747 18.0735 10.6078 19.4026 9.64534 19.6749C8.68285 19.9472 7.58888 19.0598 7.31874 18.1051L10.8045 17.1188Z"
                fill="black"
              />
            </svg>
            Add to Reminder
          </StyledButton>
          <StyledButton
            onClick={() => {
              router.push('/stake/fjord/detail?id=' + DuaPool?.id);
              onClose();
            }}
          >
            View Sale Detail
          </StyledButton>
        </StyledFlex>
      </StyledContentBottom>
    </StyledContent>
  );
};
const RemindMedal = (props: Props) => {
  const { visible, onClose, DuaPool } = props;
  return (
    <Modal
      width={540}
      display={visible}
      showHeader={false}
      portal={true}
      content={<RemindMedalContent DuaPool={DuaPool} onClose={onClose} />}
    />
  );
};

export default RemindMedal;

interface Props {
  visible: boolean;
  onClose(): void;
  DuaPool: any;
}
