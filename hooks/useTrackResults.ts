import { useEffect } from "react";
import { trackResults } from "../services/appInsights";
import {
  DecibelDifferenceResult,
  EarVolumeResults,
} from "../contexts/_internal/types";

export const useTrackResults = (
  earVolumeResults: EarVolumeResults,
  decibelDifferenceResult: DecibelDifferenceResult,
) => {
  useEffect(() => {
    trackResults(earVolumeResults, decibelDifferenceResult);
  }, [earVolumeResults, decibelDifferenceResult]);
};
