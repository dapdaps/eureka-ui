import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import { useMemo } from 'react';

const DAppTabs = (props: Props) => {
  const { current, tabs, tabWidth = 253, style, className, onChange } = props;

  const currentTabIndex = useMemo(() => {
    const index = tabs.findIndex((tab) => tab.value === current);
    if (index > -1) return index;
    return 0;
  }, [tabs, current]);

  const handleCurrentTab = (tab: Tab) => {
    if (tab.value === current) return;
    onChange && onChange(tab.value, tab);
  };

  return (
    <div className={classNames('w-full', className)} style={style}>
      <div className="relative w-full flex items-center justify-center">
        <div className="relative flex items-center justify-center">
          {tabs.map((tab) => (
            <div
              key={tab.value}
              className="flex items-center justify-center text-[#979ABE] text-[18px] font-[500] leading-[100%] py-[16px]"
              style={{
                width: tabWidth,
                color: current === tab.value ? '#FFFFFF' : '#979ABE',
                cursor: current === tab.value ? 'default' : 'pointer'
              }}
              onClick={() => handleCurrentTab(tab)}
            >
              {tab.label}
            </div>
          ))}
          <motion.div
            className="h-[2px] absolute bottom-0 bg-white left-0"
            style={{
              width: tabWidth
            }}
            animate={{
              x: `${currentTabIndex * 100}%`
            }}
          />
        </div>
        <div className="absolute bottom-0 w-[93%] h-[1px] bg-[linear-gradient(90deg,_rgba(22,_24,_29,_0.00)_0%,_#373A53_50%,_rgba(22,_24,_29,_0.00)_100%)]" />
      </div>
      <div className="relative w-full">
        <AnimatePresence mode="wait">
          {tabs.map((tab) =>
            tab.value === current ? (
              <motion.div
                className=""
                key={`content-${tab.value}`}
                variants={{
                  visible: {
                    opacity: 1
                  },
                  hidden: {
                    opacity: 0
                  }
                }}
                initial="hidden"
                exit="hidden"
                animate="visible"
              >
                {tab.content}
              </motion.div>
            ) : null
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DAppTabs;

type TabKey = string | number;

interface Tab {
  value: TabKey;
  label: any;
  content: any;
}

interface Props {
  style?: React.CSSProperties;
  className?: string;
  tabWidth?: number;
  current: TabKey;
  tabs: Tab[];
  onChange(value: TabKey, tab: Tab): void;
}
