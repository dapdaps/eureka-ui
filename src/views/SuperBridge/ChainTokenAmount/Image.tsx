import { forwardRef, memo,useCallback, useEffect, useMemo, useRef, useState } from "react";

export default function ImageCom({ src, cls }: {src: string, cls?: string}) {
    const imgRef = useRef<any>()
    const loadTime = useRef<any>(0)

    return <img ref={imgRef} src={src} className={cls} 
    onError={(e) => {
        if (loadTime.current >= 3) {
            return
        }
        imgRef.current.src = src
        loadTime.current += 1
    }}/>
}