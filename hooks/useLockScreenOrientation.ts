import { useEffect } from "react";
import * as ScreenOrientation from "expo-screen-orientation";
export const useLockScreenOrientation = () => {
  useEffect(() => {
    void ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.PORTRAIT_UP,
    );
  }, []);
};
