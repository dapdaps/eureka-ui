import { motion } from 'framer-motion';
import { memo } from 'react';

const Animate = (props: { children: any; }) => {
  const { children } = props;

  return (
    <motion.div
      variants={{
        visible: {
          opacity: 1,
          y: 0,
        },
        hidden: {
          opacity: 0,
          y: 10,
        },
      }}
      initial="hidden"
      animate="visible"
      exit="hidden"
      transition={{
        duration: 0.3,
      }}
    >
      {children}
    </motion.div>
  );
};

export default memo(Animate);
