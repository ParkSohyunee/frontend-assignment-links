import { useEffect, useRef } from 'react'

/**
 * 닫힘상태를 감지하는 커스텀 훅
 * @param onClose
 */

export const useDetectClose = (onClose: () => void) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onClick = (e: Event) => {
      if (ref.current !== null && !ref.current.contains(e.target as Node)) {
        onClose()
      }
    }

    document.addEventListener('mousedown', onClick)

    return () => {
      document.addEventListener('mousedown', onClick)
    }
  }, [onClose])

  return ref
}
