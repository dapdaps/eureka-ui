import styled from 'styled-components';

export const StyleTop = styled.div`
padding: 20px 20px 20px;
` 


export const LoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding-bottom: 20px;
  padding-left: 30px;
  margin-top: 10px;
`;

export const StyledSearchResults = styled.div`
  width:540px;
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translate(-50%, 0);
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
  background: rgba(24, 25, 30, 1);
  border: 1px solid #333648;
  border-radius: 12px;
  max-height: 680px;
  padding-bottom: 20px;
  overflow-y: auto;
  z-index: 120;

  &.show {
    border: 1px solid rgba(55, 58, 83, 1);
    padding: 20px 0px;
    animation: slideDown 0.5s ease forwards;
  }
  &.hide {
    border: 1px solid rgba(55, 58, 83, 1);
    padding: 20px 0px;
    animation: slideUp 0.5s ease forwards;
  }
  @keyframes slideDown {
    0% {
      opacity: 0;
      transform: translateY(-10px);
      height: 0;
    }
    100% {
      opacity: 1;
      transform: translateY(0);
      height: auto;
    }
  }
  @keyframes slideUp {
    0% {
      opacity: 1;
      transform: translateY(0);
      height: auto;
    }
    100% {
      opacity: 0;
      transform: translateY(-10px);
      height: 0;
    }
  }
`;

export const StyledResultItemContainer = styled.div`
  .result-item-link {
    text-decoration: none;
  }
`;

export const StyledResultTitle = styled.div`
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 7px 20px;
`;

export const StyledResultItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 20px;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;

export const StyledResultItemImg = styled.img`
  width: 30px;
  height: 30px;
`;

export const StyledResultItemTitle = styled.div`
  font-size: 16px;
  line-height: 16px;
  font-family: Montserrat;
  font-weight: 600;
  color: #ffffff;
  margin-left: 10px;
`;

export const StyledMore = styled.div`
  cursor: pointer;
`;


export const StyleView = styled.div`
  margin: 0 auto;
  margin-top: 20px;
  padding: 0 30px;
  width: calc(100% - 60px);
  display: flex;
  align-items: center;
  justify-content: center;
  height: 48px;
  gap: 10px;
  color: #fff;
  font-weight: 600;
  font-size: 16px;
  font-family: Montserrat;
  cursor: pointer;
  border: 1px solid rgba(51, 54, 72, 1);
  background: rgba(31, 34, 41, 1);
  border-radius: 12px;
  &:hover {
    background: rgba(24, 25, 30, 1);
  }
`