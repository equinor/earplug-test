import { useEffect } from "react";
import { SYSTEM_VOLUME } from "../constants/sounds";
import { setSystemVolume } from "../utils/volume/setSystemVolume";
import { useInitialSystemVolume } from "./useInitialSystemVolume";

export const useSystemVolume = () => {
  useInitialSystemVolume();

  useEffect(() => {
    setSystemVolume(SYSTEM_VOLUME);
  }, []);
};
