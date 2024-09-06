import styled from 'styled-components';

export const Asset = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
export const Icon = styled.img`
  width: 26px;
  height: 26px;
  border-radius: 50%;
`;
export const Symbol = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: var(--agg-primary-color, #fff);
`;
export const Dapp = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
`;
export const DappIcon = styled.img`
  width: 14px;
  height: 14px;
  border-radius: 50%;
`;
export const DappName = styled.div`
  font-size: 12px;
  font-weight: 400;
  color: color: var(--agg-primary-color, rgba(255, 255, 255, 0.5));
`;
