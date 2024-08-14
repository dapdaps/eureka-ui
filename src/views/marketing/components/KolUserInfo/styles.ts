import styled from 'styled-components';
export const Inviter = styled.div`
  position: relative;
  z-index: 5;
  width: 220px;
  height: 65px;
  border-radius: 70px;
  display: flex;
  align-items: center;
  padding: 8px;
  background-color: rgba(33, 35, 42, 0.9);
`;
export const InviterAvatar = styled.img`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  margin-right: 10px;
`;
export const InviterAvatarHold = styled.div`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  margin-right: 10px;
`;
export const InviterContent = styled.div`
  flex-grow: 1;
`;
export const InviterTitle = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: #FFF;
`;
export const InviterAddr = styled.div`
  font-size: 14px;
  color: white;
`;