import { useMemo } from "react";
import { getDecibelDifferenceResult } from "./getDecibelDifferenceResult";
import { EarVolumeResults } from "./types";
export const useDecibelDifference = (results: EarVolumeResults) => {
  const decibelDifferenceResult = useMemo(() => {
    return getDecibelDifferenceResult(results);
  }, [results]);
  return { decibelDifferenceResult };
};
