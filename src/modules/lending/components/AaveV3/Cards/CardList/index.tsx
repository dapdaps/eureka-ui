import { styled } from 'styled-components';

const THead = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  color: var(--agg-primary-color, #777790);
  font-size: 14px;
  font-weight: normal;
  div {
    padding: 10px 8px;
    font-size: 16px;
    font-weight: normal;
    color: #6f6f6f;
  }
`;
const TBody = styled.div`
  .list {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    height: 84px;
    border: 1px solid #f0f0f0;
    border-radius: 10px;
    margin-bottom: 10px;
  }
  .item {
    display: flex;
    align-items: center;
    padding: 0 20px;
  }
`;
const CardsList = styled.div`
  margin-top: 20px;
  width: 100%;
`;

const CardList = (props: any) => {
  const { headers, data } = props;

  if (!headers || !data) {
    return null;
  }

  return (
    <>
      <CardsList>
        <div>
          <THead>
            {headers.map((header: any, idx: any) => (
              <div key={idx}>{header}</div>
            ))}
          </THead>

          <TBody>
            {data.map((rows: any, idx: any) => (
              <div className="list" key={idx}>
                {rows.map((data: any, idx: any) => (
                  <div className="item" key={idx}>
                    {data}
                  </div>
                ))}
              </div>
            ))}
          </TBody>
        </div>
      </CardsList>
    </>
  );
};

export default CardList;
