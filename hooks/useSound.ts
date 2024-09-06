import { useEffect, useRef, useState } from "react";
import { Sounds } from "./Sounds";

export const useSound = () => {
  const [isFineTuneMode, setIsFineTuneMode] = useState(false);
  const [isSoundLoaded, setIsSoundLoaded] = useState(false);
  const soundRef = useRef<Sounds | null>(null);
  if (soundRef.current === null) {
    soundRef.current = new Sounds(
      () => setIsSoundLoaded(true),
      () => setIsSoundLoaded(false),
      (bool: boolean) => setIsFineTuneMode(bool),
    );
  }

  useEffect(() => {
    return soundRef.current?.stopAndRelease;
  }, []);

  return { isFineTuneMode, isSoundLoaded, Sound: soundRef.current };
};
