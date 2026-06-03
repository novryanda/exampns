"use client";

import { useCallback, useRef, useState } from "react";

/**
 * Tracks real async submit state. useTransition does not wait for await inside
 * startTransition, which can make buttons re-enable too early or drop the first request.
 */
export function useAsyncFormSubmit() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const lockRef = useRef(false);

  const run = useCallback(async (task: () => Promise<void>) => {
    if (lockRef.current) {
      return;
    }

    lockRef.current = true;
    setIsSubmitting(true);

    try {
      await task();
    } finally {
      lockRef.current = false;
      setIsSubmitting(false);
    }
  }, []);

  return { isSubmitting, run };
}
