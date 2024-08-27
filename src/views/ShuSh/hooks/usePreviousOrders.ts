import { useEffect, useState } from 'react';

import { useShushOrdersStore } from '@/stores/shush';

import useChechStatus from './useChechStatus';

let timer: ReturnType<typeof setTimeout> | null = null;

export default function usePreviousOrders() {
  const [orders, setOrders] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const shushOrdersStore: any = useShushOrdersStore();
  const { queryStatus } = useChechStatus(false);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const cachedOrders = shushOrdersStore.orders;
      const result = await Promise.all(Object.keys(cachedOrders).map((order) => queryStatus(order)));
      const _orders: any = [];
      result.forEach((order) => {
        const isNotExpired = Date.now() - new Date(order.created).getTime() < 60 * 60 * 1000;
        if (!order) return;
        if (!isNotExpired) {
          delete cachedOrders[order.houdiniId];
        } else {
          _orders.push(order);
        }
      });
      setOrders(_orders);
      setLoading(false);
      if (timer) clearTimeout(timer);
      timer = setTimeout(
        () => {
          fetchOrders();
        },
        1 * 60 * 1000,
      );
    } catch (err) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, []);

  return { orders, loading, fetchOrders };
}
