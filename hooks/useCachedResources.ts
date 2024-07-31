import { useEDS } from "@equinor/mad-components";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

export const useCachedResources = () => {
  const [hasLoadedEDS] = useEDS();
  useEffect(() => {
    void SplashScreen.preventAutoHideAsync();
  }, []);

  useEffect(() => {
    if (hasLoadedEDS) void SplashScreen.hideAsync();
  }, [hasLoadedEDS]);

  return hasLoadedEDS;
};
