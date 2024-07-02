import { useEffect, useRef, useState } from "react";
import { Sounds } from "./Sounds";

export const useSound = () => {
  const [isSoundLoaded, setIsSoundLoaded] = useState(false);
  const soundRef = useRef(
    new Sounds(
      () => setIsSoundLoaded(true),
      () => setIsSoundLoaded(false),
    ),
  );

  useEffect(() => {
    return soundRef.current.stopAndUnload;
  }, []);

  return { isSoundLoaded, Sound: soundRef.current };
};
