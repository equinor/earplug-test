import { ApplicationInsights } from "@microsoft/applicationinsights-web";
import { ReactNativePlugin } from "@microsoft/applicationinsights-react-native";
import {
  DecibelDifferenceResult,
  EarVolumeResults,
} from "../contexts/_internal/types";

const RNPlugin = new ReactNativePlugin();
const appInsights = new ApplicationInsights({
  config: {
    instrumentationKey: "ddf92b95-2458-4cec-82e6-872b54112973",
    extensions: [RNPlugin],
  },
});
appInsights.loadAppInsights();

export const trackResults = (
  earVolumeResults: EarVolumeResults,
  decibelDifferenceResult: DecibelDifferenceResult,
) => {
  appInsights.trackEvent(
    { name: "Results" },
    { earVolumeResults, decibelDifferenceResult },
  );
  void appInsights.flush();
};
