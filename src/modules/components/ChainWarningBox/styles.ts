import styled from 'styled-components';

export const SwitchButton = styled.button`
  cursor: pointer;
  white-space: nowrap;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 500;
  letter-spacing: 0em;
  text-align: center;
  border-radius: 8px;
  width: 100%;
  margin-top: 22px;
  height: 46px;
  border: none;
  background: var(--button-color, var(--agg-primary-color, #000));
  color: var(--button-text-color, var(--agg-secondary-color, #fff));
`;

export const Container = styled.div`
  position: absolute;
  z-index: 40;
  width: 100%;
  height: 100%;
  min-height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
  left: 0px;
`;

export const Wrapper = styled.div`
  padding: 36px 33px 20px;
  font-size: 18px;
  font-weight: 500;
  line-height: 22px;
  letter-spacing: 0em;
  text-align: center;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 334px;

  color: var(--agg-text-color, white);
  border-radius: 16px;
  border: 1px solid var(--agg-border-color, #373a53);
  background: var(--agg-bg-color, #262836);
`;
