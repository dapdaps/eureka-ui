import { motion } from 'framer-motion';
import { useState } from 'react';

import { useInteractiveSound } from '../../hooks/useInteractiveSound';
import RuleModal from '../RuleModal';

interface FrogProps {
  id: number;
  src: string;
  className: string;
  alt?: string;
  needsCenter?: boolean;
  isInteractive?: boolean;
}

const ANIMATION_CONFIG = {
  duration: 0.3,
  type: 'spring'
} as const;

const getJumpAnimation = (isJumping: boolean, needsCenter = false) => ({
  y: isJumping ? [-10, 0, -5] : 0,
  ...(needsCenter && { x: '-50%' })
});

const AnimatedFrog: React.FC<FrogProps> = ({
  id,
  src,
  className,
  alt = '',
  needsCenter = false,
  isInteractive = true
}) => {
  const [jumpingFrogs, setJumpingFrogs] = useState<Record<number, boolean>>({});
  const { playSound } = useInteractiveSound('/audios/croak.wav', {
    volume: 0.2
  });

  const handleFrogClick = (frogId: number) => {
    if (!isInteractive) return;
    setJumpingFrogs((prev) => ({ ...prev, [frogId]: true }));
    playSound();

    setTimeout(() => {
      setJumpingFrogs((prev) => ({ ...prev, [frogId]: false }));
    }, 300);
  };

  return isInteractive ? (
    <motion.img
      src={src}
      className={`${className} hover:cursor-pointer`}
      animate={getJumpAnimation(jumpingFrogs[id], needsCenter)}
      transition={ANIMATION_CONFIG}
      onClick={() => handleFrogClick(id)}
      onMouseEnter={() => handleFrogClick(id)}
      alt={alt}
    />
  ) : (
    <img src={src} className={className} alt={alt} />
  );
};

// 青蛙数据配置
const FROGS_DATA: FrogProps[] = [
  {
    id: 1,
    src: '/images/campaign/linea-marsh/frog-1.png',
    className: 'w-[148px] h-[111px] absolute top-[50px]'
  },
  {
    id: 2,
    src: '/images/campaign/linea-marsh/frog-2.png',
    className: 'w-[177px] h-[119px]'
  },
  {
    id: 3,
    src: '/images/campaign/linea-marsh/frog-3.png',
    className: 'w-[231px] h-[168px] absolute top-[-20px] left-1/2 translate-x-[-50%]',
    needsCenter: true
  },
  {
    id: 4,
    src: '/images/campaign/linea-marsh/frog-4.png',
    className: 'w-[225px] h-[123px] absolute top-[-80px] left-1/2 translate-x-[-50%]',
    needsCenter: true,
    alt: 'Interactive Frog'
  },
  {
    id: 5,
    src: '/images/campaign/linea-marsh/rule-frog.png',
    className: 'w-[151px] h-[105px]'
  }
];

const Frogs = () => {
  const [isShow, setIsShow] = useState(false);

  return (
    <div className="w-[1244px] h-[490px] mx-auto relative z-10">
      <AnimatedFrog {...FROGS_DATA[0]} />

      <div className="absolute w-[178px] top-[90px] left-[218px]">
        <div className="relative">
          <img
            src="/images/campaign/linea-marsh/frog-2-text.png"
            className="w-[169px] h-[119px] absolute left-0 top-[-110px]"
            alt=""
          />
          <AnimatedFrog {...FROGS_DATA[1]} />
        </div>
      </div>

      <div className="absolute w-[391px] h-[260px] top-[260px] left-[260px]">
        <div className="relative w-[391px] h-[260px]">
          <img src="/images/campaign/linea-marsh/frog-3-bg.png" className="w-[391px] h-[213px]" alt="" />
          <img
            src="/images/campaign/linea-marsh/frog-3-text.png"
            className="w-[359px] h-[139px] absolute right-[-100px] top-[-168px]"
            alt=""
          />
          <AnimatedFrog {...FROGS_DATA[2]} />
        </div>
      </div>

      <div className="absolute w-[500px] h-[188px] top-[218px] right-[150px]">
        <div className="relative w-[500px] h-[188px]">
          <img src="/images/campaign/linea-marsh/frog-4-bg.png" className="w-[500px] h-[188px]" alt="" />
          <AnimatedFrog {...FROGS_DATA[3]} />
          <img
            src="/images/campaign/linea-marsh/frog-4-text.png"
            className="w-[162px] h-[119px] absolute top-[-190px] left-1/2 translate-x-[-50%]"
            alt=""
          />
        </div>
      </div>

      <div className="absolute right-0 top-0 w-[183px]">
        <div className="relative">
          <img
            src="/images/campaign/linea-marsh/rules.png"
            onClick={() => setIsShow(true)}
            className="w-[92px] h-[100px] absolute right-0 top-[-65px] hover:cursor-pointer"
            alt=""
          />
          <AnimatedFrog {...FROGS_DATA[4]} />
        </div>
      </div>
      <RuleModal show={isShow} onClose={() => setIsShow(false)} />
    </div>
  );
};

export default Frogs;
