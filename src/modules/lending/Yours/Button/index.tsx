import Loading from '@/components/Icons/Loading';

import { Button } from './styles';

const LendingYoursButton = (props: Props) => {
  const { text, loading, onClick } = props;

  return (
    <Button className={text.toLowerCase()} onClick={onClick}>
      {loading && (
        <Loading size={16} />
      )}
      {text}
    </Button>
  );
};

export default LendingYoursButton;

export interface Props {
  text: string;
  loading?: boolean;

  onClick?(): void;
}
