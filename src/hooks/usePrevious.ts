// src/hooks/usePrevious.ts
import { useRef, useEffect } from "react";

// Generic T -- works for any state type (string, number, Item, etc.)
function usePrevious<T>(value: T): T | undefined {
  // useRef<T>() alone will NOT compile -- it needs an initial value
  const ref = useRef<T | undefined>(undefined);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  // Reading the previously committed ref value during render is the purpose
  // of this hook. It is written only from the effect above.
  // eslint-disable-next-line react-hooks/refs
  return ref.current;
}

export default usePrevious;
