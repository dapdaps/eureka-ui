import { styled } from 'styled-components';

const StyledRadio = styled.div<{ $selected?: boolean; }>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding-left: 13px;
  padding-right: 15px;
  height: 40px;
  border-radius: 10px;
  color: #FFF;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 100%;
  cursor: pointer;
  border: 1px solid #333648;
  background: ${({ $selected }) => $selected ? '#1F2229' : '#18191E'};
  transition: all .3s ease;

  .radio-control {
    flex-shrink: 0;
    width: 14px;
    height: 14px;
    border: 1px solid rgba(255, 255, 255, 0.5);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    z-index: 1;

    &::after {
      display: block;
      content: "";
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: #EBF479;
      border: 1px solid #18191E;
      transition: all .3s ease;
      opacity: ${({ $selected }) => $selected ? 1 : 0};
    }
  }
  .radio-text {
    flex: 1;
    position: relative;
    z-index: 1;
  }
`;

export const StyledColorfulRadio = styled(StyledRadio)`
  position: relative;
  background: ${({ $selected }) => {
    if ($selected) {
      return 'linear-gradient(90deg, #FFAF65 3.39%, #FF84EB 50.73%, #9B82FF 100%)';
    }
    return 'linear-gradient(to right, #FFAF65, #FF84EB, #9B82FF)';
  }};
  
  &.selected {
    &::before {
    content: '';
    position: absolute;
    top: 1px;
    left: 1px;
    border-radius: 10px;
    width: calc(100% - 2px);
    height: calc(100% - 2px);
    background: #18191E;
    z-index: 0;
    }
  }
`;

const Radio = (
  {
    selected,
    onChange = () => {},
    label,
    colorful = false
  }: Props) => {

  const onSelect = () => {
    onChange(!selected);
  }

  const Component: any = colorful ? StyledColorfulRadio : StyledRadio;

  return (
    <Component
      $selected={selected}
      onClick={onSelect}
      className={!selected ? 'selected' : ''}
    >
      <div className="radio-control" />
      <div className="radio-text">
        {label}
      </div>
    </Component>
  );
};

export default Radio;

interface Props {
  selected: boolean;
  onChange: (_selected?: boolean) => void;
  label: string;
  colorful?: boolean;
}