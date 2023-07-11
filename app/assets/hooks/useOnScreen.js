"use client";
import { useEffect, useMemo, useState } from "react";

export default function useOnScreen(ref) {
  const [isIntersecting, setIntersecting] = useState(false);

  const observer = useMemo(
    () =>
      typeof window !== "undefined"
        ? new IntersectionObserver(([entry]) =>
            setIntersecting(entry.isIntersecting)
          )
        : "",
    [ref]
  );

  useEffect(() => {
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return isIntersecting;
}
