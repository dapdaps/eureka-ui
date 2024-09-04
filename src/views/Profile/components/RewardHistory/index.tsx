import { format } from "date-fns";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";

import { StyledContainer, StyledFlex, StyledFont, StyledSvg } from "@/styled/styles";

import RewardHistoryLoading from "../../Loading/RewardHistoryLoading";
import type { PagerType, RewardRecordsType, RewardType } from "../../types";
import Empty from "../Empty";
import {
  StyledPageNumber,
  StyledPageNumberContainer,
  StyledRecord,
  StyledRecordHeader,
  StyledReward,
  StyledRewardImage,
  StyledRewardList,
  StyledRewardListPopUp,
  StyledRewardListPopUpContainer,
  StyledSource,
  StyledSourceImage,
  StyledSourceMessage
} from './styles';
import MedalRewardModal from "@/components/Modal/MedalReward";
type PropsType = {
  loaded: boolean;
  userRewardRecords: RewardRecordsType | null;
  pager: PagerType;
  maxPage: number;
  onPageChange: (page: number) => void;
}
type RewardsType = {
  rewards: string;
}
const Rewards = function ({ rewards }: RewardsType) {
  const target = 1
  const rewardList = useMemo(() => {
    let _rewardList = null
    try {
      _rewardList = JSON.parse(rewards)
    } catch (error) {
      console.log('===error', error)
      _rewardList = []
    }
    return _rewardList
  }, [rewards])
  return (
    <StyledFlex style={{ flex: 1 }}>
      <StyledRewardList>
        {
          rewardList.map((reward: any, index: number) => {
            return (
              <StyledReward style={{ marginLeft: -7 * index }} key={index}>
                <StyledRewardImage src={reward?.logo} />
                {
                  rewardList.length === target && (
                    <StyledFont color="#FFF" fontSize="18px" fontWeight="700">{reward.amount} {reward?.name}</StyledFont>
                  )
                }
              </StyledReward>
            )
          })
        }
        {
          rewardList.length > target && (
            <StyledRewardListPopUpContainer>
              <StyledRewardListPopUp>
                {
                  rewardList.map((reward: any, index: number) => {
                    return (
                      <StyledFlex justifyContent="space-between" key={index}>
                        <StyledReward>
                          <StyledRewardImage src={reward?.logo} />
                          <StyledFont color="#979ABE" fontWeight="500">{reward?.name}</StyledFont>
                        </StyledReward>
                        <StyledFont color="#FFF" fontWeight="500">{reward.amount}</StyledFont>
                      </StyledFlex>
                    )
                  })
                }
              </StyledRewardListPopUp>
            </StyledRewardListPopUpContainer>
          )
        }
      </StyledRewardList>
    </StyledFlex>
  )
}

const Pager = function ({ maxPage, pager, onPageChange }: {
  maxPage: number;
  pager: PagerType;
  onPageChange: (page: number) => void;
}) {
  return (
    <StyledFlex justifyContent="flex-end" gap="12px" style={{ marginTop: 30 }}>
      <StyledSvg
        style={{ cursor: pager.page === 1 ? 'not-allowed' : 'pointer' }}
        onClick={() => {
          onPageChange(pager.page - 1)
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
          <rect width="48" height="48" rx="10" transform={pager.page === 1 ? "matrix(-1 0 0 1 48 0)" : ""} fill="#101115" />
          <path fill-rule="evenodd" clip-rule="evenodd" d="M26.6907 29.8186C27.0461 29.5331 27.1037 29.0123 26.8194 28.6554L23.1107 24L26.8194 19.3446C27.1037 18.9877 27.0461 18.4669 26.6907 18.1814C26.3353 17.8959 25.8167 17.9537 25.5324 18.3106L21 24L25.5324 29.6894C25.8167 30.0463 26.3353 30.1041 26.6907 29.8186Z" fill="#979ABE" />
        </svg>
      </StyledSvg>
      <StyledFlex gap="12px">
        {
          new Array(maxPage).fill("").map((_, index) => {
            const pageNumber = index + 1
            return (
              <StyledPageNumberContainer
                key={index}
                style={{ cursor: pageNumber === pager?.page ? 'not-allowed' : 'pointer' }}
                onClick={() => {
                  onPageChange(pageNumber)
                }}
              >
                {
                  pageNumber === pager?.page ? (
                    <StyledSvg>
                      <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50" fill="none">
                        <rect x="0.5" y="0.5" width="49" height="49" rx="10.5" fill="#1E2027" stroke="#333648" />
                      </svg>
                    </StyledSvg>
                  ) : (
                    <StyledSvg>
                      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
                        <rect width="48" height="48" rx="10" fill="#101115" />
                      </svg>
                    </StyledSvg>
                  )
                }
                <StyledPageNumber style={{ color: pageNumber === pager?.page ? "#FFF" : "#979ABE" }}>{pageNumber}</StyledPageNumber>
              </StyledPageNumberContainer>
            )
          })
        }
      </StyledFlex>
      <StyledSvg
        style={{ cursor: pager.page === maxPage ? 'not-allowed' : 'pointer' }}
        onClick={() => {
          onPageChange(pager.page + 1)
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
          <rect width="48" height="48" rx="10" transform={pager.page === maxPage ? "matrix(-1 0 0 1 48 0)" : ""} fill="#101115" />
          <path fill-rule="evenodd" clip-rule="evenodd" d="M21.3093 29.8186C20.9539 29.5331 20.8963 29.0123 21.1806 28.6554L24.8893 24L21.1806 19.3446C20.8963 18.9877 20.9539 18.4669 21.3093 18.1814C21.6647 17.8959 22.1833 17.9537 22.4676 18.3106L27 24L22.4676 29.6894C22.1833 30.0463 21.6647 30.1041 21.3093 29.8186Z" fill="#979ABE" />
        </svg>
      </StyledSvg>
    </StyledFlex>
  )
}
export default function RewardHistory({
  loaded,
  userRewardRecords,
  pager,
  maxPage,
  onPageChange
}: PropsType) {

  const [medalRewardModalVisible, setMedalRewardModalVisible] = useState(false)
  const router = useRouter()
  const handleClickSource = function (record: RewardType) {
    if (record?.source === "Medals") {
      router.push("/profile/medals")
    } else if (record?.source === "LearnMore") {
      setMedalRewardModalVisible(true)
    } else {
      router.push("/odyssey/home?id=" + record?.relate_id)
    }
  }
  return !loaded ? (
    <StyledContainer>
      <StyledRecordHeader>
        <StyledFont color="#FFF" style={{ flex: 3 }}>All Sources</StyledFont>
        <StyledFont color="#FFF" style={{ flex: 1 }}>All Rewards</StyledFont>
        <StyledFont color="#FFF" style={{ flex: 1 }}>Time</StyledFont>
      </StyledRecordHeader>
      <RewardHistoryLoading />
      <Pager maxPage={maxPage} pager={pager} onPageChange={onPageChange} />
    </StyledContainer>
  ) : (loaded && (userRewardRecords?.total ?? 0) > 0) ? (
    <StyledContainer>
      <StyledRecordHeader>
        <StyledFont color="#FFF" style={{ flex: 3 }}>All Sources</StyledFont>
        <StyledFont color="#FFF" style={{ flex: 1 }}>All Rewards</StyledFont>
        <StyledFont color="#FFF" style={{ flex: 1 }}>Time</StyledFont>
      </StyledRecordHeader>
      <StyledFlex flexDirection="column" gap="20px">
        {
          userRewardRecords?.data?.map((record: RewardType, index: number) => {
            return (
              <StyledRecord key={index}>
                <StyledSource style={{ flex: 3 }}>
                  <StyledSourceImage src={record?.logo} />
                  <StyledSourceMessage>
                    <StyledFont color="#FFF" fontWeight="600" lineHeight="120%" style={{ textTransform: 'capitalize' }}>{record?.title}</StyledFont>
                    <StyledFlex
                      gap="5px"
                      onClick={() => {
                        handleClickSource(record)
                      }}
                    >
                      <StyledFont color="#979ABE" fontSize="14px">{record?.source}</StyledFont>
                      <StyledSvg>
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="13" viewBox="0 0 14 13" fill="none">
                          <path d="M10.8182 8.72727V10C10.8182 11.1046 9.92275 12 8.81818 12H3C1.89543 12 1 11.1046 1 10V4.18182C1 3.07725 1.89543 2.18182 3 2.18182H4.27273" stroke="#979ABE" />
                          <path d="M5 8.63636L12.6364 1M12.6364 1H7.29091M12.6364 1V6.34545" stroke="#979ABE" />
                        </svg>
                      </StyledSvg>
                    </StyledFlex>
                  </StyledSourceMessage>
                </StyledSource>
                <Rewards rewards={record?.rewards} />
                <StyledFont color="#FFF" style={{ flex: 1 }}>{format(new Date(record?.created_at), "MMM dd, u, HH:mm")}</StyledFont>
              </StyledRecord>
            )
          })
        }
      </StyledFlex>
      <Pager maxPage={maxPage} pager={pager} onPageChange={onPageChange} />
      <MedalRewardModal visible={medalRewardModalVisible} onClose={() => setMedalRewardModalVisible(false)} />
    </StyledContainer>
  ) : (
    <Empty
      type={1}
      title="You don’t have any rewards record"
      tips="The reward from odyessey participation, medals, daily dap me up will be displayed here"
      btnTxt="Start your journey"
      onClick={() => {
        router.push("/")
      }}
    />
  )
}