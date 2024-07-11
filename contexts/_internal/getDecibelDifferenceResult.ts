import { calculateDecibelDifference } from "../../utils/calculateDecibelDifference";
import { DecibelDifferenceResult, EarVolumeResults } from "./types";

export const getDecibelDifferenceResult = (
  results: EarVolumeResults,
): DecibelDifferenceResult => {
  const leftVolumeResults = results.left;
  const rightVolumeResults = results.right;
  const left = calculateDecibelDifference(
    leftVolumeResults.withoutPlugs,
    leftVolumeResults.withPlugs,
  );
  const right = calculateDecibelDifference(
    rightVolumeResults.withoutPlugs,
    rightVolumeResults.withPlugs,
  );

  return { left, right };
};
