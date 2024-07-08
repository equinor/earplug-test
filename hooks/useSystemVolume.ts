import { useEffect, useState } from "react";
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
  return newVolume;
};

const decreaseSystemVolume = () => {
  void SystemSetting.getVolume().then((volume) => {
    importedSetSystemVolume(getNewVolume(volume, "down"));
  });
};

const increaseSystemVolume = () => {
  void SystemSetting.getVolume().then((volume) => {
    importedSetSystemVolume(getNewVolume(volume, "up"));
  });
};

export const useSystemVolume = () => {
  const [systemVolume, setSystemVolume] = useState(SYSTEM_VOLUME);
  useInitialSystemVolume();

  useEffect(() => {
    const volumeListener = SystemSetting.addVolumeListener((data) => {
      const volume = data.value;
      setSystemVolume(volume);
    });
    return () => SystemSetting.removeVolumeListener(volumeListener);
  }, []);

  return { decreaseSystemVolume, increaseSystemVolume, systemVolume };
};
