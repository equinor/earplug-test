import { useEffect, useRef, useState } from "react";
import { Sounds } from "./Sounds";

export const useSound = () => {
  const [isSoundLoaded, setIsSoundLoaded] = useState(false);
  const soundRef = useRef<Sounds | null>(null);
  if (soundRef.current === null) {
    soundRef.current = new Sounds(
      () => setIsSoundLoaded(true),
      () => setIsSoundLoaded(false),
    );
  }

  useEffect(() => {
    return soundRef.current?.stopAndRelease;
  }, []);

  return { isSoundLoaded, Sound: soundRef.current };
};
