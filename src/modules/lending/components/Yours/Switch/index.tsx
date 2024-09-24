import { Handler, Switcher } from './styles';

const LendingSwitch = (props: Props) => {
  const { active, disabled, onChange, theme } = props;

  return (
    <Switcher
      onClick={() => {
        onChange?.();
      }}
      style={theme ? theme : {}}
      className={`${active ? 'active' : ''} ${disabled ? 'disabled' : ''}`}
    >
      <Handler className={`${active ? 'active' : ''} ${disabled ? 'disabled' : ''}`} />
    </Switcher>
  );
};

export default LendingSwitch;

export interface Props {
  active?: boolean;
  disabled?: boolean;
  theme?: any;

  onChange?(): void;
}
