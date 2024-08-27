import { useEffect, useState } from "react";

import { QUEST_PATH } from "@/config/quest";
import { get } from '@/utils/http';

export default function useDappDetail(dapp_id?: string) {
  const [detail, setDetail] = useState<any>(null);
  const [ detailLoading, setDetailLoading ] = useState<boolean>(false);
  const [ activityLoading, setActivityLoading ] = useState<boolean>(false);
  const [activity, setActivity] = useState<any>({});
  const [advertise, setAdvertise] = useState<any>([]);

  const fetchData = async () => {
      try {
        setDetailLoading(true);
        const response = await get(`${QUEST_PATH}/api/dapp?id=${dapp_id}`);
        setDetail(response.data ?? {});
        setDetailLoading(false);
      } catch (error) {
        setDetailLoading(false);
        console.error('Error fetching data:', error);
      }
  };
  const fetchactivityData = async () => {
      try {
        setActivityLoading(true);
        const response = await get(
          `${QUEST_PATH}/api/action/get-actions-by-dapp?dapp_id=${dapp_id}&page=1&page_size=10`,
        );
        setActivity(response.data ?? []);
        setActivityLoading(false);
      } catch (error) {
        setActivityLoading(false);
        console.error('Error fetching data:', error);
      }
  };
  const fetchAdvertiseasync = async () => {
      try {
        const response = await get(`${QUEST_PATH}/api/ad?category=dapp&category_id=${dapp_id}`);
        setAdvertise(response);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
  };
  useEffect(() => {
    if (dapp_id) {
      fetchData();
      fetchactivityData();
      fetchAdvertiseasync();
    }
  }, [dapp_id]);

  return {
    detailLoading,
    detail,
    activity,
    activityLoading,
    advertise
  };
};