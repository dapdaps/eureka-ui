import { motion } from 'framer-motion';

import Loading from '@/components/Icons/Loading';

const Button = (props: Props) => {
  const { children, ...restProps } = props;

  return <BaseButton {...restProps}>{children}</BaseButton>;
};

const BaseButton = (props: Props) => {
  const { children, loading, disabled } = props;

  return (
    <motion.button
      type="button"
      className="w-full h-[48px] leading-[48px] text-[#02051E] text-[16px] font-[600] flex justify-center items-center rounded-[8px] bg-[#B4E9CB]"
      variants={{
        active: {
          opacity: 1,
          cursor: 'pointer'
        },
        disabled: {
          opacity: 0.3,
          cursor: 'not-allowed'
        }
      }}
      initial="active"
      animate={disabled || loading ? 'disabled' : 'active'}
    >
      {loading ? <Loading size={16} /> : children}
    </motion.button>
  );
};

export default Button;

interface Props {
  children: any;
  loading?: boolean;
  disabled?: boolean;
}
