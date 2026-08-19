import { useEffect, useState } from "react";

// Delays updating the returned value until the input has stopped
// changing for `delayMs` — used to avoid firing an API call on every
// single keystroke in a search box.
export function useDebouncedValue<T>(value: T, delayMs = 350): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delayMs);
    return () => clearTimeout(timer);
  }, [value, delayMs]);

  return debounced;
}