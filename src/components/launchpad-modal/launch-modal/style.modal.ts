import styled from 'styled-components';

export const Wrapper = styled.div`
  .mask {
    background: rgba(22, 24, 29, 1);
    opacity: 0.8;
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    z-index: 15;
  }
  .base-modal {
    width: 550px;
    overflow: hidden;
    border: 1px solid rgba(55, 58, 83, 1);
    border-radius: 16px;
    border: 1px solid #373a53;
    background: #262836;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 18;
    .base-modal-close {
      cursor: pointer;
      svg {
        width: 14px;
        height: 14px;
      }
    }
    .base-modal-head {
      margin-bottom: 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .base-modal-title {
        font-size: 26px;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
      }
    }
  }
`;
