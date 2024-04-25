import { useSize } from "ahooks";
import { useRouter } from 'next/router';
import { useEffect, useMemo } from "react";
export default function useMobile() {
  const router = useRouter();
  const size: any = useSize(window.document.getElementsByTagName("body")[0]);
  const isMobile = useMemo(() => size?.width < 750, [size])
  useEffect(() => {
    if (isMobile && router.pathname !== "/mobile") {
      router.replace("/mobile")
      return
    }
    if (!isMobile && router.pathname === "/mobile") {
      router.replace("/");
      return
    }
  }, [isMobile])
}