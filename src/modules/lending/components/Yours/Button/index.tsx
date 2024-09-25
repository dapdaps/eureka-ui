import Loading from '@/modules/components/Loading';

import { Button } from './styles';

const LendingYoursButton = (props: Props) => {
  const { text, loading, onClick } = props;

  return (
    <Button
      className={text.toLowerCase()}
      onClick={(e) => {
        e.stopPropagation();
        onClick?.(e);
      }}
    >
      {loading && <Loading size={16} />}
      {text}
    </Button>
  );
};

export default LendingYoursButton;

export interface Props {
  text: string;
  loading?: boolean;

  onClick?(e: any): void;
}
