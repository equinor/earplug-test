import { EDSProvider, useEDS } from "@equinor/mad-components";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useColorScheme } from "./hooks/useColorScheme";
import { Navigation } from "./navigation";
import { getEDSDensity } from "./utils/getEDSDensity";
import { useLockScreenOrientation } from "./hooks/useLockScreenOrientation";
import { DoneButtonInputAccessoryView } from "./components/DoneButtonInputAccessoryView";
import { ToastEmitter } from "@equinor/mad-toast";

export default function App() {
  const colorScheme = useColorScheme();
  const [hasLoadedEDS] = useEDS();
  useLockScreenOrientation();
  if (!hasLoadedEDS) return null;
  return (
    <SafeAreaProvider>
      <EDSProvider colorScheme={colorScheme} density={getEDSDensity()}>
        <Navigation colorScheme={colorScheme} />
        <DoneButtonInputAccessoryView />
        <ToastEmitter topOffset={70} />
      </EDSProvider>
    </SafeAreaProvider>
  );
}
