import { QUEST_PATH } from "@/config/quest";
import { formatIntegerThousandsSeparator } from '@/utils/format-number';
import { get } from '@/utils/http';
import Counter from "@/views/AllDapps/components/Title/Counter";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #F2F2F2;
    color: #000;
    margin: 0 14px;
    border-radius: 30px;
`

const Item = styled.div`
    flex: 1;
    text-align: center;
    padding: 30px 0;
`

const ItemTitle = styled.div`
    font-size: 20px;
    font-weight: 400;
    /* border-bottom: 1px dotted #000; */
    /* display: inline-block; */
`

const Amount = styled.div`
    font-family: Montserrat;
    font-size: 42px;
    font-weight: 700;
    margin-top: 5px;

`

const Sep = () => <div>
  <svg width="118" height="2" viewBox="0 0 118 2" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0.947144 1H117.358" stroke="black" stroke-width="2" stroke-dasharray="2 6" />
  </svg>
</div>

interface IData {
  total_users?: number;
  total_transactions?: number;
  total_trading_volume?: number;
}




export default function Statistics() {
  const [statData, setStatData] = useState<IData>({});

  const fetchStatData = () => {
    get(`${QUEST_PATH}/api/stats`).then((res) => {
      setStatData(res.data);
    }).catch((err) => {
      console.log(err);
    });
  };

  useEffect(() => {
    fetchStatData();
  }, []);

  return (
    <Wrapper>
      <Item>
        <ItemTitle>Participants</ItemTitle>
        <Sep />
        <Amount>
          <Counter
            from={1}
            to={statData?.total_users ?? 0}
            formatter={formatIntegerThousandsSeparator}
          />
        </Amount>
      </Item>
      <Item>
        <ItemTitle>Transactions</ItemTitle>
        <Sep />
        <Amount>
          <Counter
            from={1}
            to={statData?.total_transactions ?? 0}
            formatter={formatIntegerThousandsSeparator}
          />
        </Amount>
      </Item>
      <Item>
        <ItemTitle>Trading Volume</ItemTitle>
        <Sep />
        <Amount>
          <Counter
            from={1}
            to={statData?.total_trading_volume ?? 0}
            formatter={formatIntegerThousandsSeparator}
          />
        </Amount>
      </Item>
    </Wrapper>
  )
}



