import { useMemo } from "react";
import { getDecibelDifferenceResult } from "./getDecibelDifferenceResult";
import { DecibelDifferenceResult, EarVolumeResults } from "./types";
export const useDecibelDifference = (
  results: EarVolumeResults,
): DecibelDifferenceResult => {
  return useMemo(() => {
    return getDecibelDifferenceResult(results);
  }, [results]);
};
