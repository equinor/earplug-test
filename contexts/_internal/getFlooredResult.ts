import { CalculateDecibelDifferenceResult } from "../../utils/calculateDecibelDifference";
import { createValue, isValue, unwrap } from "../../utils/valueOrError";

export const getFlooredResult = (
  resultForASingleEar: CalculateDecibelDifferenceResult,
) => {
  if (isValue(resultForASingleEar)) {
    return createValue(Math.floor(unwrap(resultForASingleEar)));
  }
  return resultForASingleEar;
};
