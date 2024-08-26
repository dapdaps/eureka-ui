import { useRouter } from 'next/router';
import { memo } from 'react';
import styled from 'styled-components';

import Modal from '@/components/Modal';
import type { MedalType } from '@/views/Profile/types';
const StyledMedal = styled.div`
  padding: 0 36px;
`;
const StyleMain = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .medal-logo {
    width: 202px;
    height: 202px;
    object-fit: contain;
    margin-bottom: 12px;
  }
  .header {
    font-weight: 700;
    font-family: Montserrat;
    font-size: 32px;
    line-height: 40px;
    margin-bottom: 20px;
    color: #fff;
  }

  .title {
    font-size: 20px;
    font-weight: 700;
    font-family: Montserrat;
    color: #fff;
    margin-bottom: 40px;
    span {
      color: #ebf479;
    }
  }

  .btns {
    display: flex;
    gap: 20px;
    align-items: center;
    .btn {
      width: 234px;
      height: 56px;
      border: 1px solid #45475c;
      border-radius: 8px;
      font-size: 16px;
      font-weight: 600;
      color: #979abe;
      background-color: #21222b;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      &:hover {
        cursor: pointer;
      }
    }
  }
`;
const StyledVideo = styled.video`
  width: 202px;
`
export interface Props {
  visible?: boolean;
  data: MedalType;
  close?(): void;
}

const MedalPopup = (props: Props) => {
  const { visible, close, data } = props;
  const router = useRouter();
  return (
    <Modal
      width={560}
      overlayStyle={{
        backdropFilter: 'blur(10px)',
        height: '100vh',
      }}
      className="medal-modal"
      style={{
        background: '#18191E',
        border: '1px solid #202329',
        backdropFilter: 'blur(10px)',
        paddingBottom: '40px',
      }}
      display={visible || false}
      onClose={() => close?.()}
      portal
      content={
        <StyledMedal>
          <StyleMain>
            {
              data?.animation_url ? (
                <StyledVideo src={data?.animation_url} controls={false} muted autoPlay loop />
              ) : (
                <img className="medal-logo" src={data.logo} alt="medal" />
              )
            }
            <div className="header">Congrats!</div>
            <div className="title">
              You’ve got the <span>{data.level_name}</span> medal
            </div>
            <div className="btns">
              <div
                className="btn"
                onClick={() => {
                  router.push('/profile/medals');
                  close?.();
                }}
              >
                View all medals
              </div>
              <div
                className="btn"
                onClick={() => {
                  router.push('/profile');
                  close?.();
                }}
              >
                My profile
              </div>
            </div>
          </StyleMain>
        </StyledMedal>
      }
    />
  );
};

export default memo(MedalPopup);
