import { EDSProvider } from "@equinor/mad-components";
import { ToastEmitter } from "@equinor/mad-toast";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { DoneButtonInputAccessoryView } from "./components/DoneButtonInputAccessoryView";
import { useCachedResources } from "./hooks/useCachedResources";
import { useColorScheme } from "./hooks/useColorScheme";
import { useLockScreenOrientation } from "./hooks/useLockScreenOrientation";
import { Navigation } from "./navigation";
import { getEDSDensity } from "./utils/getEDSDensity";

export default function App() {
  const colorScheme = useColorScheme();
  const isLoadingComplete = useCachedResources();
  useLockScreenOrientation();

  if (!isLoadingComplete) return null;

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
