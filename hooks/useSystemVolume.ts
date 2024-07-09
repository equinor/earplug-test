import { useCallback, useState } from "react";
import { useInitialSystemVolume } from "./useInitialSystemVolume";
import { SYSTEM_VOLUME, SYSTEM_VOLUME_INCREMENT } from "../constants/sounds";
import SystemSetting from "react-native-system-setting";
import { setSystemVolume as importedSetSystemVolume } from "../utils/volume/setSystemVolume";

type UpOrDown = "up" | "down";

const getNewVolume = (currentVolume: number, upOrDown: UpOrDown) => {
  let newVolume = currentVolume;
  if (upOrDown === "up") {
    newVolume += SYSTEM_VOLUME_INCREMENT;
    if (newVolume > 1) {
      newVolume = 1;
    }
  }
  if (upOrDown === "down") {
    newVolume -= SYSTEM_VOLUME_INCREMENT;
    if (newVolume < 0) {
      newVolume = 0;
    }
  }
  const roundedNewVolume = parseFloat(newVolume.toFixed(2));
  return roundedNewVolume;
};

export const useSystemVolume = () => {
  const [systemVolume, setSystemVolume] = useState(SYSTEM_VOLUME);
  useInitialSystemVolume();

  const adjustSystemVolume = (upOrDown: UpOrDown) => {
    void SystemSetting.getVolume().then((volume) => {
      const newVolume = getNewVolume(volume, upOrDown);
      importedSetSystemVolume(newVolume);
      setSystemVolume(newVolume);
    });
  };

  const decreaseSystemVolume = () => {
    adjustSystemVolume("down");
  };

  const increaseSystemVolume = () => {
    adjustSystemVolume("up");
  };

  const resetSystemVolume = useCallback(() => {
    importedSetSystemVolume(SYSTEM_VOLUME);
    setSystemVolume(SYSTEM_VOLUME);
  }, []);

  return {
    decreaseSystemVolume,
    increaseSystemVolume,
    resetSystemVolume,
    systemVolume,
  };
};
