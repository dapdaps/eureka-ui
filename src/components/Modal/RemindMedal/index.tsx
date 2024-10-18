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
  width: 181px;
  height: 181px;
  flex-shrink: 0;
  fill: radial-gradient(50% 50% at 50% 50%, #00f4ff 0%, #000 100%);
  opacity: 0.2;
  filter: blur(10px);
`;
const StyledContentBottom = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const StyledLogoContainer = styled.div`
  margin-top: -37px;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 74px;
  height: 74px;
  border-radius: 20px;
  border: 4px solid #2e3142;
  background: #000;
  z-index: 10;
`;
const StyledLogo = styled.img`
  width: 50px;
  height: 50px;
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
const RemindMedalContent = function ({ onClose, SharePool }: any) {
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
        <StyledSvg>
          <svg width="540" height="120" viewBox="0 0 540 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g mask="url(#mask0_24001_3603)">
              <g opacity="0.2" filter="url(#filter0_f_24001_3603)">
                <circle cx="30.5" cy="106.5" r="90.5" fill="url(#paint0_radial_24001_3603)" />
              </g>
              <g opacity="0.2" filter="url(#filter1_f_24001_3603)">
                <circle cx="443.5" cy="4.5" r="90.5" fill="url(#paint1_radial_24001_3603)" />
              </g>
              <path
                opacity="0.5"
                d="M248.219 -60C254.409 -53.1343 271.007 -39.5114 287.881 -39.9451C308.973 -40.4871 299.058 -59.8523 289.683 -50.2435C280.309 -40.6348 280.309 -27.6592 293.65 5.58504C306.99 38.8293 344.849 76.771 350.978 97.91L367.383 76.9517M367.383 76.9517C366.061 71.3508 365.076 60.6187 371.71 62.4977C380.003 64.8465 391.36 73.6995 395.326 66.4725C399.293 59.2455 399.112 58.8842 401.997 58.3422C404.881 57.8001 405.422 58.8842 406.143 55.8127C406.864 52.7412 407.225 51.2958 409.749 52.1992C412.273 53.1026 417.32 55.8127 417.32 52.5606C417.32 49.3084 414.616 47.321 414.616 40.2747C414.616 33.2283 415.337 19.3163 418.222 11.3666C421.106 3.41694 436.79 10.6439 435.709 13.7154C434.627 16.7869 404.701 9.92125 374.955 3.95897C345.209 -2.00331 326.821 -5.43613 325.198 -11.0371C323.576 -16.638 340.702 -10.8564 344.668 -12.6631C348.634 -14.4699 352.601 -21.3355 356.927 -33.8021C361.254 -46.2687 373.152 -43.3779 377.118 -42.8359C381.084 -42.2938 406.323 -38.319 412.273 -36.5122C418.222 -34.7055 419.484 -5.07478 419.303 1.06817C419.123 7.21112 419.484 7.75314 414.616 6.66909C409.749 5.58504 359.631 -6.15883 351.158 -9.41098C342.685 -12.6631 346.832 -15.3733 359.992 -13.5665C373.152 -11.7598 419.123 -2.90668 427.055 -0.196556C434.988 2.51357 435.889 5.22369 427.055 6.66909C418.222 8.11449 403.078 -1.46128 398.211 -0.196556C393.343 1.06817 388.296 13.3541 382.707 18.2323C377.118 23.1105 376.037 23.1821 376.217 13.7154C376.397 4.24871 375.135 9.01787 372.972 11.3666C370.809 13.7154 368.645 11.5473 367.383 7.75314C366.121 3.95897 360.713 7.93383 359.992 16.4256C359.271 24.9173 364.859 28.5529 368.285 20.4004C371.71 12.2479 359.451 23.2912 355.665 21.8458C351.879 20.4004 351.879 9.74057 354.764 9.74057C357.648 9.74057 355.846 25.2786 347.192 26.182C338.539 27.0854 336.015 1.97154 345.389 -0.196556C354.764 -2.36466 342.264 40.9974 334.392 49.6698C326.52 58.3422 290.945 66.4725 280.67 66.4725C270.394 66.4725 265.887 56.7161 275.081 59.6069C284.275 62.4977 297.435 75.687 327.181 91.767C356.927 107.847 376.938 103.872 401.997 112.003C419.191 117.582 426.285 124.862 433.005 125.204M367.383 76.9517C367.864 78.2164 370.52 81.7215 377.299 85.6241C385.772 90.5023 427.236 119.254 433.005 125.204M480.959 95.7419C473.567 103.33 479.516 114.171 485.466 113.267C491.415 112.364 494.84 110.919 497.544 114.171C500.248 117.423 506.558 124.289 509.983 115.977C513.409 107.666 515.933 112.003 521.341 110.196C526.749 108.389 522.242 102.788 521.341 97.91C520.44 93.0318 531.617 88.1535 524.766 82.914C517.916 77.6744 518.637 84.54 513.048 80.7459C507.46 76.9517 514.671 66.4725 506.558 50.9345C498.446 35.3964 489.792 34.1317 473.928 35.9385C473.009 36.043 472.108 36.1912 471.224 36.3783M480.959 95.7419C477.353 99.1747 470.286 111.316 470.863 132.419C471.372 151.051 474.76 167.519 474.164 185.899M480.959 95.7419C482.981 93.6655 485.53 92.1573 488.17 91.1913M471.224 36.3783C456.833 39.4218 446.996 52.7488 442.92 55.8127C438.593 59.0649 429.94 54.548 429.399 58.8842C428.858 63.2204 432.103 64.3044 433.005 65.5692C433.906 66.8339 428.137 69.9054 426.334 70.4474C424.532 70.9894 424.712 72.6155 424.712 74.2416C424.712 75.8676 420.385 81.8299 424.712 89.5989C429.039 97.368 455.179 109.112 442.92 120.494C439.073 124.067 436.078 125.361 433.005 125.204M471.224 36.3783C481.499 36.8181 476.812 52.1992 468.7 61.5943C460.587 70.9894 465.815 78.2164 472.305 75.8676C478.795 73.5189 480.057 76.0483 478.795 80.7459C477.533 85.4434 455.9 87.4308 467.438 92.6704C478.976 97.91 484.204 82.914 487.088 79.3005C488.107 78.0241 490.835 76.5448 493.938 75.5554M470.863 210.109C472.981 201.513 473.917 193.541 474.164 185.899M474.164 185.899C453.053 183.189 407.297 173.324 393.163 155.545M393.163 155.545C395.447 153.317 400.627 149.728 403.078 153.197C406.143 157.533 398.031 157.894 393.163 155.545ZM393.163 155.545C384.713 153.735 369.519 149.024 350.978 140.729M275.081 210.109C269.492 164.76 269.853 142.186 280.67 132.78C291.486 123.375 301.762 115.797 294.731 111.641C287.7 107.486 285.717 123.385 282.472 134.948C279.227 146.512 233.616 147.957 203.33 124.289C173.043 100.62 189.088 70.4474 201.707 55.8127C214.327 41.178 218.653 34.1317 223.16 19.3163C227.667 4.50099 239.566 2.51356 244.073 5.94639C248.58 9.37921 243.532 12.6314 237.943 9.37922C232.355 6.12707 236.681 -7.24288 245.515 -3.62938C254.349 -0.0158823 248.219 19.3163 248.219 31.9636C248.219 44.6109 255.611 54.1866 268.591 55.8127C281.571 57.4388 259.036 39.0099 244.614 40.2747C230.192 41.5394 228.389 58.3422 284.636 101.343C307.813 119.062 331.284 131.917 350.978 140.729M350.978 140.729C351.939 157.953 351.915 191.753 344.127 189.151C334.392 185.899 343.586 173.355 345.389 180.659C347.192 187.964 346.651 204.328 345.389 213M488.17 91.1913C489.371 90.781 491.595 88.551 490.874 82.914C490.153 77.2769 492.616 75.6595 493.938 75.5554M488.17 91.1913C492.518 89.5998 497.113 89.4802 500.005 90.7166M493.938 75.5554C499.62 73.7438 506.558 73.5746 506.558 79.3005C506.558 85.0079 502.812 88.0872 500.005 90.7166M493.938 75.5554C494.9 75.3583 497.436 76.1206 499.888 80.7459C502.953 86.5275 505.476 85.6241 512.147 85.6241C518.817 85.6241 515.031 92.1284 509.983 94.4772C504.935 96.8259 511.065 104.595 506.558 106.763C502.051 108.931 502.231 102.066 499.888 102.066C497.544 102.066 494.659 107.666 490.874 103.872C487.088 100.078 487.863 88.7629 500.005 90.7166M500.005 90.7166C501.772 91.4724 502.903 92.7347 502.953 94.4772C503.133 100.801 496.463 99.3554 497.003 95.0192C497.196 93.4785 498.457 92.1659 500.005 90.7166Z"
                stroke="url(#paint2_linear_24001_3603)"
              />
            </g>
            <defs>
              <filter
                id="filter0_f_24001_3603"
                x="-80"
                y="-4"
                width="221"
                height="221"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
              >
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                <feGaussianBlur stdDeviation="10" result="effect1_foregroundBlur_24001_3603" />
              </filter>
              <filter
                id="filter1_f_24001_3603"
                x="333"
                y="-106"
                width="221"
                height="221"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
              >
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                <feGaussianBlur stdDeviation="10" result="effect1_foregroundBlur_24001_3603" />
              </filter>
              <radialGradient
                id="paint0_radial_24001_3603"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(30.5 106.5) rotate(90) scale(90.5)"
              >
                <stop stop-color="#00F4FF" />
                <stop offset="1" />
              </radialGradient>
              <radialGradient
                id="paint1_radial_24001_3603"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(443.5 4.5) rotate(90) scale(90.5)"
              >
                <stop stop-color="#7B00FF" />
                <stop offset="1" />
              </radialGradient>
              <linearGradient
                id="paint2_linear_24001_3603"
                x1="356.5"
                y1="-60"
                x2="356.5"
                y2="213"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#03AEDF" />
                <stop offset="1" stop-color="#09DFD0" />
              </linearGradient>
            </defs>
          </svg>
        </StyledSvg>
      </StyledContentTop>
      <StyledContentBottom>
        <StyledLogoContainer>
          <StyledLogo src="/images/fjord/tango.png" />
        </StyledLogoContainer>
        <StyledFont color="#FFF" fontSize="26px" fontWeight="700" fontFamily="Gantari" textAlign="center">
          TANGO will go on sale soon!
        </StyledFont>
        <StyledFontRect>
          <StyledFont color="#FFF" fontSize="14px" fontWeight="500">
            {format(SharePool?.start_time * 1000, 'MMM d, yyyy, h:mm aa')} -{' '}
            {format(SharePool?.end_time * 1000, 'MMM d, yyyy, h:mm aa')}
          </StyledFont>
        </StyledFontRect>
        <StyledFont color="#EBF479" fontSize="16px" fontFamily="Gantari" fontWeight="700">
          Countdown
        </StyledFont>

        <StyledContainer style={{ marginTop: 12, marginBottom: 20 }}>
          <Timer endTime={Number(SharePool.start_time * 1000)} />
        </StyledContainer>
        <StyledContainer style={{ width: 441 }}>
          <StyledFont color="#979ABE" fontSize="14px" lineHeight="150%" textAlign="center">
            Participate in the sale on DapDap to unlock potential wealth and earn our exclusive Medal rewards!
          </StyledFont>
          <StyledFont color="#979ABE" fontSize="14px" lineHeight="150%" textAlign="center">
            Don’t miss your chance to be an early supporter of Contango!
          </StyledFont>
        </StyledContainer>

        <StyledFlex justifyContent="center" gap="20px" style={{ marginTop: 30, marginBottom: 30 }}>
          <StyledButton
            onClick={() => {
              window.open(
                `http://www.google.com/calendar/event?action=TEMPLATE&text=${SharePool?.share_token_name}&dates=${format(SharePool?.start_time * 1000, "yyyyMMdd'T'HHmmss'Z'")}/${format(SharePool?.end_time * 1000, "yyyyMMdd'T'HHmmss'Z'")}&details=${SharePool?.description}`
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
              router.push('/stake/fjord/detail?id=' + SharePool?.id);
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
  const { visible, onClose, SharePool } = props;
  return (
    <Modal
      width={540}
      display={visible}
      showHeader={false}
      portal={true}
      content={<RemindMedalContent SharePool={SharePool} onClose={onClose} />}
    />
  );
};

export default RemindMedal;

interface Props {
  visible: boolean;
  onClose(): void;
  SharePool: any;
}
