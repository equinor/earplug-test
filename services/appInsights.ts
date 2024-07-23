import { ApplicationInsights } from "@microsoft/applicationinsights-web";
import { ReactNativePlugin } from "@microsoft/applicationinsights-react-native";
import { instrumentationKey } from "../settings.json";
import {
  DecibelDifferenceResult,
  EarVolumeResults,
} from "../contexts/_internal/types";

const RNPlugin = new ReactNativePlugin();
const appInsights = new ApplicationInsights({
  config: {
    instrumentationKey,
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

export const submitFeedback = (
  rating: number | undefined,
  improvementText: string | undefined,
) => {
  appInsights.trackEvent(
    {
      name: "Feedback",
    },
    {
      rating,
      improvementText,
    },
  );
  void appInsights.flush();
};
