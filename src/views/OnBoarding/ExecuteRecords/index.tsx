import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { styled } from 'styled-components';

import chainsConfig from '@/config/chains';
import useAccount from '@/hooks/useAccount';
import useDappsByNetwork from '@/hooks/useDappsByNetwork';
import { get } from '@/utils/http';

import { DAPP_LOGO } from '../config';
import { formatTitle } from '../helpers';
const Container = styled.div`
  padding-top: 20px;
  padding-bottom: 65px;
  margin: 0 8%;
  .pageTitle {
    display: flex;
    align-items: center;
    margin-top: 14px;
    img {
      margin-right: 14px;
    }
    span {
      font-size: 32px;
      color: #fff;
      font-weight: 700;
    }
  }
  .title-btn-icon {
    display: none;
  }

  .recordList {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border: 1px solid #332c4b;
    background-color: #181a27;
    padding-top: 12px;
    border-radius: 16px;
    margin-top: 20px;
    min-height: 200px;
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
  .mobile-recordList {
    display: none;
  }
  @media (max-width: 900px) {
    .contanier-title {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .pageTitle {
        margin: 0;
        img {
          display: none;
        }
        span {
          font-size: 18px;
        }
      }
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
    .mobile-recordList {
      display: block;
      margin-top: 26px;
      .mobile-recordList-item {
        padding: 10px 0;
        border-bottom: 1px rgba(55, 58, 83, 1) solid;
        display: flex;
        align-items: center;
        position: relative;
        .recordList-item-icon {
          margin-right: 10px;
          span {
            display: block;
            background: rgba(168, 132, 255, 1);
            width: 7px;
            height: 7px;
            border-radius: 50%;
          }
        }
        .recordList-text {
          color: #ffffff;
          p {
            margin-bottom: 0;
            font-size: 16px;
            margin-bottom: 6px;
            span {
              color: #979abe;
            }
          }
          .recordList-text-btn {
            color: #979abe;
            span {
              font-family: Gantari;
              font-size: 12px;
              font-weight: 400;
              line-height: 12px;
              letter-spacing: 0em;
              text-align: left;
            }
            .text-btn-icon {
              display: inline-block;
              width: auto;
              height: 20px;
              background: rgb(55, 58, 83);
              padding: 4px 6px;
              line-height: 20px;
              text-align: center;
              border-radius: 6px;
              font-family: Gantari;
              font-size: 12px;
              font-weight: 400;
              line-height: 12px;
              letter-spacing: 0em;
              text-align: left;
              margin-right: 10px;
            }
          }
        }
        .recordList-img {
          justify-content: right;
          position: absolute;
          right: 0;
        }
      }
    }
  }
`;
const Back = styled.div`
  display: flex;
  align-items: center;
  img {
    margin-right: 14px;
    cursor: pointer;
  }
  span {
    color: #979abe;
    font-size: 18px;
    font-weight: 500;
    cursor: pointer;
  }
  &:hover {
    text-decoration: none;
  }
  @media (max-width: 900px) {
    width: 32px;
    height: 26px;
    line-height: 26px;
    text-align: center;
    align-items: center;
    background: rgba(55, 58, 83, 0.5);
    border-radius: 8px;
    display: inline-block;
    img {
      width: 13px;
      margin: 0;
    }
    span {
      display: none;
    }
  }
`;
const left_most_icon = (
  <svg width="10" height="13" viewBox="0 0 10 13" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g>
      <path
        d="M2.77733 5.77071C2.35628 6.16574 2.35628 6.83426 2.77733 7.22928L6.31579 10.5491C6.95436 11.1482 8 10.6954 8 9.81976L8 3.18023C8 2.30462 6.95436 1.85185 6.31579 2.45095L2.77733 5.77071Z"
        fill="#7E8A93"
      />
      <path d="M1 3V10" stroke="#7E8A93" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  </svg>
);
const left_icon = (
  <svg width="6" height="9" viewBox="0 0 6 9" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M0.777329 3.77071C0.356276 4.16574 0.356276 4.83426 0.777328 5.22928L4.31579 8.54905C4.95436 9.14816 6 8.69538 6 7.81976L6 1.18023C6 0.304619 4.95436 -0.148155 4.31579 0.450951L0.777329 3.77071Z"
      fill="#7E8A93"
    />
  </svg>
);

const right_most_icon = (
  <svg width="10" height="13" viewBox="0 0 10 13" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M7.22267 5.77071C7.64372 6.16574 7.64372 6.83426 7.22267 7.22928L3.68421 10.5491C3.04564 11.1482 2 10.6954 2 9.81976L2 3.18023C2 2.30462 3.04564 1.85185 3.68421 2.45095L7.22267 5.77071Z"
      fill="#7E8A93"
    />
    <path d="M9 3V10" stroke="#7E8A93" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
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

const arrow_down_icon = (
  <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M5.70705 5.29289C5.31653 5.68342 4.68336 5.68342 4.29284 5.29289L0.707053 1.70711C0.0770878 1.07714 0.523254 -9.15906e-07 1.41416 -8.38021e-07L8.58573 -2.11062e-07C9.47664 -1.33177e-07 9.9228 1.07714 9.29284 1.70711L5.70705 5.29289Z"
      fill="#91A2AE"
    />
  </svg>
);

const selected_icon = (
  <svg width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 2.84615L4.47826 7L11 1" stroke="#9E75FF" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const circle_icon = (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="9" cy="9" r="8.5" fill="#1A1C28" stroke="#7C7F96" />
  </svg>
);

const circle_selected_icon = (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="5" cy="5" r="5" fill="#E9F456" />
  </svg>
);

const switchIcon = '/assets/images/onboarding-switch.svg';

const closeIcon = '/assets/images/onboarding-close.svg';

const select_action_list = [
  { id: '', name: 'All Actions' },
  { id: 'Swap', name: 'Swap' },
  { id: 'Bridge', name: 'Bridge' },
  { id: 'Lending', name: 'Lending' },
  { id: 'Liquidity', name: 'Liquidity' }
  // {id: 'Staking', name: 'Staking'},
];
const select_status_list = [
  { id: '', name: 'All Status' },
  { id: 'Success', name: 'Success' },
  { id: 'Failed', name: 'Failed' },

  { id: 'Pending', name: 'Pending' }
];

const ExecuteRecords = ({ chain }: any) => {
  const [recordList, setRecordList] = useState<any[]>([]);
  const [actionSelectBoxStatus, setActionSelectBoxStatus] = useState(false);
  const [templateSelectBoxStatus, setTemplateSelectBoxStatus] = useState(false);
  const [statusSelectBoxStatus, setStatusSelectBoxStatus] = useState(false);
  const [searchAction, setSearchAction] = useState('');
  const [searchTemplate, setSearchTemplate] = useState('');
  const [searchStatus, setSearchStatus] = useState('');
  const [totalPageSize, setTotalPageSize] = useState('');
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [showPopup, setShowPopup] = useState(false);
  const { account } = useAccount();
  const router = useRouter();
  const { dapps } = useDappsByNetwork(chain);
  const currentChain = chainsConfig[chain];

  function get_current_page_range() {
    const start = (currentPage - 1) * pageSize + 1;
    const end = start - 1 + recordList?.length;
    return `${Math.min(start, end) || 0}-${end || 0}`;
  }
  const fetchRecordList = async () => {
    try {
      const resultRecordList = await get(
        `/api/action/my?account_id=${account}&page=${
          currentPage || 1
        }&size=${pageSize}&action_type=${searchAction}&action_status=${searchStatus}&template=${searchTemplate}&chain_id=${chain}`
      );
      setRecordList(resultRecordList.data.data);
      setTotalPageSize(resultRecordList.data.total);
      setTotalPage(Math.ceil(resultRecordList.data.total / 20));
    } catch (error) {
      console.error('Error fetching resultNetwork data:', error);
    }
  };
  useEffect(() => {
    if (account) {
      fetchRecordList();
    }
  }, [account, currentPage, pageSize, searchAction, searchTemplate, searchStatus]);
  function getTime(timeStr: string) {
    const date = new Date(timeStr);
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
  function click_left_most() {
    clearTimeout(timer);
    timer = setTimeout(() => {
      setCurrentPage(1);
    }, duration);
  }
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
      if (currentPage < totalPage) {
        setCurrentPage(currentPage + 1);
      }
    }, duration);
  }

  function click_right_most() {
    clearTimeout(timer);
    timer = setTimeout(() => {
      setCurrentPage(totalPage);
    }, duration);
  }
  function switch_action_select() {
    setActionSelectBoxStatus(!actionSelectBoxStatus);
    setTemplateSelectBoxStatus(false);
    setStatusSelectBoxStatus(false);
  }

  function switch_template_select() {
    setTemplateSelectBoxStatus(!templateSelectBoxStatus);
    setActionSelectBoxStatus(false);
    setStatusSelectBoxStatus(false);
  }
  function switch_status_select() {
    setActionSelectBoxStatus(false);
    setTemplateSelectBoxStatus(false);
    setStatusSelectBoxStatus(!statusSelectBoxStatus);
  }

  function handleTitleBtnClick() {
    setShowPopup(true);
  }
  function handleCancelClick() {
    setShowPopup(false);
  }

  const statusColorMap = {
    Success: '#93FFCB',
    Failed: '#FF5BA0',
    Pending: '#A884FF'
  };

  const formatTx = (tx: string) => {
    // console.log('tx: ', tx);
    if (!tx) return '-';
    else {
      return (
        <a
          style={{
            color: 'white',
            textDecoration: 'underline'
          }}
          href={`${currentChain.blockExplorers}/tx/${tx}`}
          target="_blank"
        >
          {tx.substring(0, 4) + '...' + tx.substring(tx.length - 4, tx.length)}
        </a>
      );
    }
  };
  return (
    <Container>
      <div className="contanier-title">
        <Back
          onClick={() => {
            router.back();
          }}
        >
          <img src="/assets/images/onboarding-back.svg"></img>
          <span>Back</span>
        </Back>
        <div className="pageTitle">
          <img src="/assets/images/onboarding-records.svg"></img>
          <span className="">My Execute Records</span>
        </div>
        <div className="title-btn-icon" onClick={handleTitleBtnClick}>
          <img src={switchIcon} alt="Icon" />
        </div>
        {showPopup ? (
          <>
            <div className="overlay"></div>
            <div className="title-btn-popups">
              <div className="popups-filter">
                <div className="popups-filter-title">Filter</div>
                <div className="popups-filter-icon" onClick={handleCancelClick}>
                  <img src={closeIcon} alt="Icon" />
                </div>
              </div>
              <div className="list-title">Action</div>
              <div className={`select`}>
                {select_action_list.map((item) => {
                  return (
                    <div
                      key={item.name}
                      onClick={() => {
                        setSearchAction(item.id);
                        setCurrentPage(1);
                      }}
                      className={`item ${searchAction == item.id ? 'active' : ''}`}
                    >
                      <div className="popups-seleceted_icon">
                        <span className="circle_icon">{circle_icon}</span>
                        <span className="circle_selected_icon">{circle_selected_icon}</span>
                      </div>
                      {item.name}
                    </div>
                  );
                })}
              </div>
              <div className="list-title">dApp</div>
              <div className={`select1 `}>
                {dapps?.map((item: any) => {
                  return (
                    <div
                      key={item.name}
                      onClick={() => {
                        setSearchTemplate(item.id);
                        setCurrentPage(1);
                      }}
                      className={`item ${searchTemplate == item.id ? 'active' : ''}`}
                    >
                      <div className="template_item">
                        <div className="popups-seleceted_icon">
                          <span className="circle_icon">{circle_icon}</span>
                          <span className="circle_selected_icon">{circle_selected_icon}</span>
                        </div>
                        {item.name}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        ) : null}
      </div>

      <div className="recordList">
        <table>
          <thead>
            <tr>
              <th style={{ width: '30%' }}>Quest</th>
              <th style={{ width: '10%' }}>
                <div
                  className="head_th"
                  onClick={(e) => {
                    switch_action_select();
                  }}
                >
                  Action
                  <span className="arrow" style={{ marginLeft: '8px' }}>
                    {arrow_down_icon}
                  </span>
                  <div className={`select ${actionSelectBoxStatus ? 'show' : 'hide'}`}>
                    {select_action_list.map((item) => {
                      return (
                        <div
                          key={item.name}
                          onClick={() => {
                            setSearchAction(item.id);
                            setCurrentPage(1);
                          }}
                          className={`item ${searchAction == item.id ? 'active' : ''}`}
                        >
                          {item.name}
                          <span className="selected_icon">{selected_icon}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </th>
              <th style={{ width: '15%' }}>
                <div className="head_th" onClick={switch_template_select}>
                  Template
                  <span className="arrow" style={{ marginLeft: '5px' }}>
                    {arrow_down_icon}
                  </span>
                  <div className={`select ${templateSelectBoxStatus ? 'show' : 'hide'}`}>
                    {dapps?.map((item: any) => {
                      return (
                        <div
                          key={item.name}
                          onClick={() => {
                            setSearchTemplate(item.id);
                            setCurrentPage(1);
                          }}
                          className={`item ${searchTemplate == item.id ? 'active' : ''}`}
                        >
                          <div className="template_item">
                            {item.logo ? <img src={item.logo} width={16} height={16}></img> : null}
                            {item.name}
                          </div>
                          <span className="selected_icon">{selected_icon}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </th>
              <th style={{ width: '10%' }}>
                <div className="head_th" onClick={switch_status_select}>
                  Status
                  <span className="arrow" style={{ marginLeft: '5px' }}>
                    {arrow_down_icon}
                  </span>
                  <div className={`select ${statusSelectBoxStatus ? 'show' : 'hide'}`}>
                    {select_status_list.map((item) => {
                      return (
                        <div
                          key={item.name}
                          onClick={() => {
                            setSearchStatus(item.id);
                            setCurrentPage(1);
                          }}
                          className={`item ${searchStatus == item.id ? 'active' : ''}`}
                        >
                          <div
                            className="template_item"
                            style={{
                              color: item.name && statusColorMap[item.name as keyof typeof statusColorMap]
                            }}
                          >
                            {/* {item.icon ? <img src={item.icon} width={16} height={16}></img> : null} */}
                            {item.name}
                          </div>
                          <span className="selected_icon">{selected_icon}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </th>

              <th style={{ width: '15%' }}>Gas</th>

              <th style={{ width: '15%' }}>Time</th>

              <th style={{ width: '10%' }}>Tx</th>
            </tr>
          </thead>
          <tbody>
            {recordList &&
              recordList.map((record, index) => {
                return (
                  <tr key={index}>
                    <td>{formatTitle(record)}</td>
                    <td>{record.action_type}</td>
                    <td>
                      <img
                        width="16"
                        height="16"
                        src={DAPP_LOGO[record.template] || record.dapp_logo}
                        style={{ marginRight: '6px' }}
                      />
                      {record?.template === 'native bridge' ? 'Native Bridge' : record?.template}
                    </td>

                    <td
                      style={{
                        color: statusColorMap[record.action_status as keyof typeof statusColorMap]
                      }}
                    >
                      {record.action_status}
                    </td>

                    <td>{!record.gas ? '-' : record.gas + ' ETH'}</td>

                    <td>{getTime(record.create_time)}</td>

                    <td>{formatTx(record.tx_id)}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        {recordList?.length == 0 ? <div className="emptyText">No result found</div> : null}

        <div className="page">
          <span className={`${currentPage == 1 ? 'disabled' : ''}`} onClick={click_left_most}>
            {left_most_icon}
          </span>
          <span className={`${currentPage == 1 ? 'disabled' : ''}`} onClick={click_left}>
            {left_icon}
          </span>
          <span className="cur_page">
            {get_current_page_range()} of {totalPageSize}
          </span>
          <span className={`${currentPage == totalPage ? 'disabled' : ''}`} onClick={click_right}>
            {right_icon}
          </span>
          <span className={`${currentPage == totalPage ? 'disabled' : ''}`} onClick={click_right_most}>
            {right_most_icon}
          </span>
        </div>
      </div>

      <div className="mobile-recordList">
        {recordList &&
          recordList.map((record, index) => {
            return (
              <div className="mobile-recordList-item" key={index}>
                <div className="recordList-item-icon">
                  <span></span>
                </div>
                <div className="recordList-text">
                  <p>{formatTitle(record)}</p>
                  <div className="recordList-text-btn">
                    <span className="text-btn-icon">{record.action_type}</span>
                    <span>{getTime(record.create_time)}</span>
                  </div>
                </div>
                <div className="recordList-img">
                  <img
                    width="16"
                    height="16"
                    src={DAPP_LOGO[record.template] || record.dapp_logo}
                    style={{ marginRight: '6px' }}
                  />
                </div>
              </div>
            );
          })}
      </div>
    </Container>
  );
};

export default ExecuteRecords;
