import Empty from '@/components/Empty';
import LendingTotal from '@/modules/lending/components/Total';

import {
  StyledInfo,
  StyledInfoContent,
  StyledInfoItem,
  StyledInfoList,
  StyledInfoTips,
  StyledInfoTitle
} from './styles';

const LendingMarketDolomiteAddInfo = (props: Props) => {
  const { title = 'Your info', tips, list = [], itemStyle, contentStyle, style } = props;

  return (
    <StyledInfo style={style}>
      <StyledInfoContent style={contentStyle}>
        <StyledInfoTitle>{title}</StyledInfoTitle>
        <StyledInfoList>
          {list.length > 0 ? (
            list.map((item, idx) => (
              <StyledInfoItem key={idx} style={itemStyle}>
                {item.label && <div>{item.label}</div>}
                {item.type === 'balance' && (
                  <div className="white">
                    <LendingTotal
                      total={item.value.balance}
                      digit={item.value.precision}
                      suffixUnit={` ${item.value.unit}`}
                    />
                  </div>
                )}
                {!['balance'].includes(item.type as string) && item.value}
              </StyledInfoItem>
            ))
          ) : (
            <Empty size={30} tips="No data" style={{ padding: 10 }} />
          )}
        </StyledInfoList>
        {tips && (
          <StyledInfoTips>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              style={{ flexShrink: 0, transform: 'translateY(3px)' }}
            >
              <circle cx="6" cy="6" r="5.5" stroke="#EBF479" />
              <path d="M6 6L6 9" stroke="#EBF479" strokeWidth="1.4" strokeLinecap="round" />
              <circle cx="6" cy="3.75" r="0.75" fill="#EBF479" />
            </svg>
            <div>{tips}</div>
          </StyledInfoTips>
        )}
      </StyledInfoContent>
    </StyledInfo>
  );
};

export default LendingMarketDolomiteAddInfo;

interface Props {
  title?: string;
  tips?: string;
  list?: { label?: string; value?: any; type?: string }[];
  itemStyle?: React.CSSProperties;
  contentStyle?: React.CSSProperties;
  style?: React.CSSProperties;
}
