import { motion } from 'framer-motion';

const Chains = (props: Props) => {
  const { list, selected, onSelect } = props;

  return (
    <div className="flex items-center gap-[12px] mt-[12px]">
      {list.map((it: any) => (
        <motion.div
          key={it.chainId}
          className="cursor-pointer gap-[10px] h-[40px] flex rounded-[8px] text-[14px] font-[500] justify-center items-center border border-[#373A53!important] bg-[#2a2c3c] pl-[7px] pr-[12px]"
          onClick={() => {
            onSelect(it);
          }}
          variants={{
            active: {
              background: '#B4E9CB',
              color: '#000',
              borderColor: '#B4E9CB'
            },
            default: {
              background: '#2a2c3c',
              color: '#fff',
              borderColor: '#373A53'
            }
          }}
          initial="default"
          animate={selected?.chainId === it.chainId ? 'active' : 'default'}
        >
          <img src={it.icon} alt="" className="w-[26px] h-[26px]" />
          <div className="">{it.chainName}</div>
        </motion.div>
      ))}
    </div>
  );
};

export default Chains;

interface Props {
  list: any;
  selected: any;
  onSelect(chain: any): void;
}
