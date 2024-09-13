// @ts-nocheck
import { memo, useEffect, useId, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
const StyledSelect = styled.div`
  position: relative;
`;
const StyledValueContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 134px;
  height: 40px;
  padding: 0 12px;
  border-radius: 10px;
  border: 1px solid #333648;
  background: #18191e;
  cursor: pointer;
  color: #fff;
  font-family: Montserrat;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 100%; /* 14px */
  &:hover {
    background-color: #1f2229;
  }
`;
const StyledValue = styled.div`
  display: flex;
  align-items: center;
  img {
    width: 15px;
    height: 15px;
    margin-right: 8px;
  }
`;
const StyledSvg = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const StyledOptions = styled.div`
  position: fixed;
  /* left: 0;
  right: 0; */
  /* bottom: -6px; */
  /* transform: translateY(100%); */
  border-radius: 10px;
  border: 1px solid #333648;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  z-index: 10;
  background: #1f2229;
  color: #fff;
  font-family: Montserrat;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 100%; /* 14px */
`;
const StyledOption = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;
const StyledImageList = styled.div`
  display: flex;
  align-items: center;
`;

export default memo(function Select(props) {
  const label = props.label ?? 'Label';
  const noLabel = props.noLabel ?? false;
  const placeholder = props.placeholder ?? 'Select';
  const value = props.value ?? '';
  const options = props.options ?? [];
  const onChange = props.onChange ?? (() => {});
  const validate = props.validate ?? (() => {});
  const error = props.error ?? '';
  const [clientRect, setClientRect] = useState(null);
  const valueDomRef = useRef(null);
  const id = useId();
  const currentOption = useMemo(() => options.find((option) => option.value === value?.value), [options, value]);
  useEffect(() => {
    const handleClick = function (event) {
      event.stopPropagation();
      let target = event.target;
      while (target && target.getAttribute) {
        if (id === target.getAttribute('id')) {
          setClientRect(target.getBoundingClientRect());
          return;
        }
        target = target.parentNode;
      }
      setClientRect(null);
    };
    const handleScroll = function () {
      clientRect && setClientRect(valueDomRef?.current?.getBoundingClientRect());
    };
    window.addEventListener('click', handleClick);
    window.addEventListener('scroll', handleScroll);
    return function () {
      window.removeEventListener('click', handleClick);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <StyledSelect>
      <StyledValueContainer type="button" id={id} ref={valueDomRef}>
        {currentOption ? (
          <StyledValue>
            {value?.icons && (
              <StyledImageList>
                {value?.icons?.map((icon, iconIndex) => <img key={iconIndex} src={icon} />)}
              </StyledImageList>
            )}
            {currentOption?.text}
          </StyledValue>
        ) : (
          <StyledValue>{placeholder}</StyledValue>
        )}

        <StyledSvg>
          <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M1 1.5L6 6.5L11 1.5"
              stroke="currentColor"
              stroke-width="1.66667"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </svg>
        </StyledSvg>
      </StyledValueContainer>
      {clientRect && (
        <StyledOptions
          style={{
            width: clientRect?.width,
            left: clientRect?.left,
            top: clientRect?.top + 46
          }}
        >
          {options.map((option, index) => (
            <StyledOption
              key={index}
              onClick={() => {
                onChange(option);
                setClientRect(null);
              }}
            >
              <StyledValue>
                {option?.icons && (
                  <StyledImageList>
                    {option?.icons?.map((icon, iconIndex) => <img key={iconIndex} src={icon} />)}
                  </StyledImageList>
                )}
                {option.text}
              </StyledValue>
              {option?.value === value?.value && (
                <StyledSvg>
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                      fill="currentColor"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </StyledSvg>
              )}
            </StyledOption>
          ))}
        </StyledOptions>
      )}
    </StyledSelect>
  );
});
