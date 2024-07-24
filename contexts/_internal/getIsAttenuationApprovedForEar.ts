import { ATTENUATION_THRESHOLD_LOWER } from "../../constants/attenuation";
import { CalculateDecibelDifferenceResult } from "../../utils/calculateDecibelDifference";
import { isValue, unwrap } from "../../utils/valueOrError";

export const getIsAttenuationApprovedForEar = (
  calculateDecibelDifferenceResult: CalculateDecibelDifferenceResult,
) => {
  if (
    isValue(calculateDecibelDifferenceResult) &&
    unwrap(calculateDecibelDifferenceResult) >= ATTENUATION_THRESHOLD_LOWER
  ) {
    return true;
  }
  return false;
};
