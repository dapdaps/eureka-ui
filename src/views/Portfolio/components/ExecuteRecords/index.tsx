import { styled } from 'styled-components';
import { container } from '@/components/animation';
import { AnimatePresence, motion } from 'framer-motion';
import { StyledLoadingWrapper } from '@/styled/styles';
import Loading from '@/components/Icons/Loading';
import chains from '@/config/chains';
import { getDappLogo } from '../../helpers';
import { StyledTx } from './styles';

const Container = styled(motion.div)`
  .title-btn-icon {
    display: none;
  }
  .recordList {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    padding-top: 12px;
    border-radius: 16px;
    margin-top: 20px;
    table {
      width: 100%;
      tbody tr:hover {
        background-color: #373a53;
      }
      tr th {
        color: #91a2ae;
        font-size: 14px;
        height: 34px;
        border-bottom: 1px solid #332c4b;
        .arrow {
          cursor: pointer;
        }
      }
      tr td {
        color: #fff;
        height: 42px;
        font-size: 14px;
      }
      tr th:nth-child(1),
      tr td:nth-child(1) {
        padding-left: 22px;
      }
      tr th:nth-last-child(1),
      tr td:nth-last-child(1) {
        padding-right: 22px;
      }
      tr .head_th {
        position: relative;
        display: inline-flex;
        cursor: pointer;
        .select {
          display: none;
          position: absolute;
          width: 190px;
          border-radius: 16px;
          background-color: #373a53;
          padding: 10px;
          top: 26px;
          left: -20px;
          &.show {
            display: block;
          }
          &.hide {
            display: none;
          }
          .item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 36px;
            border-radius: 10px;
            padding: 0 12px;
            font-size: 14px;
            color: #fff;
            font-weight: 400;
            cursor: pointer;
            margin: 5px 0;
            .template_item {
              display: flex;
              align-items: center;
              img {
                margin-right: 10px;
              }
            }
            .selected_icon {
              display: none;
            }
            &:hover,
            &.active {
              background-color: rgba(24, 26, 39, 0.3);
            }
            &.active .selected_icon {
              display: block;
            }
          }
        }
      }
    }
    .emptyText {
      display: flex;
      justify-content: center;
      font-size: 18px;
      color: #4f5375;
      font-weight: 500;
    }
    .page {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      height: 42px;
      border-top: 1px solid #332c4b;
      font-size: 14px;
      color: #91a2ae;
      gap: 6px;
      padding: 0 16px;
      .cur_page {
        position: relative;
        top: 1px;
        margin: 0 10px;
      }
      svg {
        cursor: pointer;
      }
      .disabled {
        opacity: 0.3;
        svg {
          cursor: not-allowed;
        }
      }
    }
  }
  @media (max-width: 900px) {
    .contanier-title {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .title-btn-icon {
        width: 32px;
        height: 32px;
        line-height: 32px;
        background: rgba(55, 58, 83, 0.5);
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 8px;
        img {
          width: 16px;
          height: 13px;
        }
      }
      .overlay {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: black;
        opacity: 0.5;
        z-index: 1000;
      }
      .title-btn-popups {
        position: fixed;
        bottom: 0;
        right: 0;
        left: 0;
        width: 100%;
        height: 70vh;
        background-color: #1e202f;
        z-index: 1001;
        border-radius: 12px 12px 0 0;
        padding: 22px;
        overflow: auto;
        .popups-filter {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 26px;
          .popups-filter-title {
            font-size: 18px;
            font-weight: 700;
            line-height: 22px;
            letter-spacing: 0em;
            text-align: left;
            color: #ffffff;
          }
          .popups-filter-icon {
            width: 32px;
            height: 32px;
            line-height: 32px;
            background: rgba(55, 58, 83, 0.5);
            text-align: center;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 8px;
            img {
              width: 16px;
              height: 13px;
            }
          }
        }
        .list-title {
          font-size: 16px;
          font-weight: 400;
          line-height: 19px;
          letter-spacing: 0em;
          text-align: left;
          margin-bottom: 16px;
          color: #ffffff;
        }
        .select {
          margin-bottom: 30px;
          .item {
            width: 50%;
            display: inline-block;
            align-items: center;
            height: 36px;
            line-height: 28px;
            border-radius: 10px;
            padding: 0 12px;
            font-size: 14px;
            color: #fff;
            font-weight: 400;
            cursor: pointer;
            margin: 5px 0;
            .template_item {
              display: flex;
              align-items: center;
              img {
                margin-right: 8px;
              }
            }
            .popups-seleceted_icon {
              width: 20px;
              height: 20px;
              display: inline-block;
              position: relative;
              margin-right: 8px;
              .circle_icon {
                position: absolute;
                top: 0;
              }
              .circle_selected_icon {
                display: none;
                position: absolute;
                top: 0;
                left: 4px;
              }
            }
            &.active .circle_selected_icon {
              display: inline-block;
            }
          }
        }
        .select1 {
          margin-bottom: 30px;
          .item {
            width: 100%;
            display: inline-block;
            align-items: center;
            height: 36px;
            line-height: 28px;
            border-radius: 10px;
            padding: 0 12px;
            font-size: 14px;
            color: #fff;
            font-weight: 400;
            cursor: pointer;
            margin: 5px 0;
            .template_item {
              display: flex;
              align-items: center;
              img {
                margin-right: 8px;
              }
            }
            .popups-seleceted_icon {
              width: 20px;
              height: 20px;
              display: inline-block;
              position: relative;
              margin-right: 8px;
              .circle_icon {
                position: absolute;
                top: 0;
              }
              .circle_selected_icon {
                display: none;
                position: absolute;
                top: 0;
                left: 4px;
              }
            }
            &.active .circle_selected_icon {
              display: inline-block;
            }
          }
        }
      }
    }
    .recordList {
      display: none;
    }
  }
`;
const left_icon = (
  <svg width="6" height="9" viewBox="0 0 6 9" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M0.777329 3.77071C0.356276 4.16574 0.356276 4.83426 0.777328 5.22928L4.31579 8.54905C4.95436 9.14816 6 8.69538 6 7.81976L6 1.18023C6 0.304619 4.95436 -0.148155 4.31579 0.450951L0.777329 3.77071Z"
      fill="#7E8A93"
    />
  </svg>
);

const right_icon = (
  <svg width="6" height="9" viewBox="0 0 6 9" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M5.22267 3.77071C5.64372 4.16574 5.64372 4.83426 5.22267 5.22928L1.68421 8.54905C1.04564 9.14816 -4.6751e-07 8.69538 -4.29236e-07 7.81976L-1.39013e-07 1.18023C-1.00738e-07 0.304619 1.04564 -0.148155 1.68421 0.450951L5.22267 3.77071Z"
      fill="#7E8A93"
    />
  </svg>
);

const ExecuteRecords = ({ hasMore, records, loading, currentPage, setCurrentPage }: any) => {
  function getTime(timeStr: number) {
    const date = new Date(timeStr * 1000);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hour = String(date.getHours()).padStart(2, '0');
    const minute = String(date.getMinutes()).padStart(2, '0');
    const second = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
  }
  let timer: string | number | NodeJS.Timeout | undefined;
  const duration = 500;
  function click_left() {
    clearTimeout(timer);
    timer = setTimeout(() => {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    }, duration);
  }

  function click_right() {
    clearTimeout(timer);
    timer = setTimeout(() => {
      if (hasMore) {
        setCurrentPage(currentPage + 1);
      }
    }, duration);
  }

  const formatTx = (tx: string, chain_id: number) => {
    if (!tx) return '-';
    const currentChain = chains[chain_id];
    return (
      <a
        style={{
          color: '#91A2AE',
          textDecoration: 'underline',
        }}
        href={`${currentChain.blockExplorers}tx/${tx}`}
        target="_blank"
      >
        Tx
      </a>
    );
  };
  return (
    <AnimatePresence mode="wait">
      <Container {...container}>
        <div className="recordList">
          <table>
            <thead>
              <tr>
                <th style={{ width: '40%' }}>Quest</th>
                <th style={{ width: '10%' }}>Action</th>
                <th style={{ width: '15%' }}>Template</th>
                <th style={{ width: '15%' }}>Gas</th>
                <th style={{ width: '20%' }}>Time</th>
              </tr>
            </thead>
            <tbody>
              {records?.length &&
                records.map((record: any) => {
                  return (
                    <tr key={record.id}>
                      <td>{record.quest}</td>
                      <td>{record.action}</td>
                      <td>
                        <img
                          width="16"
                          height="16"
                          src={getDappLogo(record.dapp_name)}
                          style={{ marginRight: '6px' }}
                        />
                        {record.dapp_name}
                      </td>
                      <td>{record.gas}</td>
                      <td>
                        {getTime(record.tx_time)} <StyledTx>{formatTx(record.tx_hash, record.chain_id)}</StyledTx>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          {loading && (
            <StyledLoadingWrapper $h="100px">
              <Loading size={22} />
            </StyledLoadingWrapper>
          )}
          {!loading && !records?.length && (
            <StyledLoadingWrapper $h="100px">
              <div className="emptyText">No result found</div>
            </StyledLoadingWrapper>
          )}

          <div className="page">
            <span className={`${currentPage == 1 ? 'disabled' : ''}`} onClick={click_left}>
              {left_icon}
            </span>
            <span className="cur_page">{currentPage}</span>
            <span className={`${!hasMore ? 'disabled' : ''}`} onClick={click_right}>
              {right_icon}
            </span>
          </div>
        </div>
      </Container>
    </AnimatePresence>
  );
};

export default ExecuteRecords;
