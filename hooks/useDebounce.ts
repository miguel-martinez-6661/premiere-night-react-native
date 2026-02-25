import { useCallback, useEffect, useRef } from "react";

export function useDebounce<A extends unknown[]>(
  fn: (...args: A) => void,
  delay: number
): (...args: A) => void {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const fnRef = useRef(fn);
  const delayRef = useRef(delay);

  fnRef.current = fn;
  delayRef.current = delay;

  const debounced = useCallback((...args: A) => {
    if (timeoutRef.current != null) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      fnRef.current(...args);
      timeoutRef.current = undefined;
    }, delayRef.current);
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current != null) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return debounced;
}
