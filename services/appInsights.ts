import { ApplicationInsights } from "@microsoft/applicationinsights-web";
import { ReactNativePlugin } from "@microsoft/applicationinsights-react-native";
import { instrumentationKey } from "../settings.json";
import {
  DecibelDifferenceResult,
  EarVolumeResults,
} from "../contexts/_internal/types";
import AppInfo from "../app.json";
import { Envelope } from "./types";

const RNPlugin = new ReactNativePlugin();
const appInsights = new ApplicationInsights({
  config: {
    instrumentationKey,
    extensions: [RNPlugin],
  },
});
appInsights.loadAppInsights();

const appVersionEnvelope: Envelope = (item) => {
  if (item.data) {
    item.data["app-version"] = AppInfo.expo.version;
  }
};
appInsights.addTelemetryInitializer(appVersionEnvelope);

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
