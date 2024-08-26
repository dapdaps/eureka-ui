import { RPC_STATUS, RPC_TIMEOUT } from '@/utils/config';

export function getRpcPing(url: string): Promise<number> {
  const start = new Date().getTime();
  const requestPromise = fetch(url, {
    method: 'POST',
    headers: { 'Content-type': 'application/json; charset=UTF-8' },
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: 'dontcare',
      method: 'gas_price',
      params: [null],
    }),
  });
  const timeoutPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(-1);
    }, RPC_TIMEOUT);
  });
  return new Promise((resolve) => {
    Promise.race([requestPromise, timeoutPromise])
      .then(() => {
        const end = new Date().getTime();
        resolve(end - start);
      })
      .catch(() => {
        resolve(-1);
      });
  });
}

export function renderPing(ping?: number) {
  if (!ping) return '-ms';
  if (ping < 0) {
    return 'off';
  }
  return ping + 'ms';
}

export function renderPingConfig(ping?: number) {
  if (!ping) return RPC_STATUS.FAST;
  if (ping < RPC_STATUS.FAST.lt && ping >= RPC_STATUS.FAST.gte) {
    return RPC_STATUS.FAST;
  }
  if (ping < RPC_STATUS.SLOW.lt && ping >= RPC_STATUS.SLOW.gte) {
    return RPC_STATUS.SLOW;
  }
  return RPC_STATUS.STOP;
}
