import { useEffect, useRef } from "react"

type Handler = (event: MouseEvent | TouchEvent) => void

export function useOutsideClick<T extends HTMLElement>(
  handler: Handler,
  enabled: boolean = true
) {
  const ref = useRef<T>(null)

  useEffect(() => {
    if (!enabled) return

    const listener = (event: MouseEvent | TouchEvent) => {
      const el = ref.current
      if (!el || el.contains(event.target as Node)) {
        return
      }
      handler(event)
    }

    document.addEventListener("mousedown", listener)
    document.addEventListener("touchstart", listener)

    return () => {
      document.removeEventListener("mousedown", listener)
      document.removeEventListener("touchstart", listener)
    }
  }, [handler, enabled])

  return ref
}
