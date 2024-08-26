import { toast } from 'react-toastify';

import Toast from '@/components/Toast';

// export default function useToast() {
//   const success = (params: any) => {
//     return toast(<Toast type="success" {...params} />, {
//       position: "top-right"
//     });
//   };
//   const fail = (params: any) => {
//     return toast(<Toast type="error" {...params} />, {
//       position: "top-right"
//     });
//   };
//   const info = (params: any) => {
//     return toast(<Toast type="info" {...params} />, {
//       position: "top-right"
//     });
//   };
//   const loading = (params: any) => {
//     return toast(<Toast type="pending" {...params} />, {
//       position: "top-right"
//     });
//   };
//   return {
//     success,
//     fail,
//     info,
//     loading,
//     dismiss: toast.dismiss,
//   };
// }

type ToastType = 'success' | 'error' | 'info' | 'pending';

interface ToastParams {
  title?: string;
  text?: string | null;
  tx?: string;
  chainId?: number;
  closeToast?: boolean;
}

export default function useToast() {
  const showToast = (type: ToastType, params: string | ToastParams) => {
    const toastParams: ToastParams = typeof params === 'string' ? { title: params } : params;
    return toast(<Toast type={type} {...toastParams} />, {
      position: 'top-right',
    });
  };

  return {
    success: (params: string | ToastParams) => showToast('success', params),
    fail: (params: string | ToastParams) => showToast('error', params),
    info: (params: string | ToastParams) => showToast('info', params),
    loading: (params: string | ToastParams) => showToast('pending', params),
    dismiss: toast.dismiss,
  };
}