import { useMemo } from "react";
import { DecibelDifferenceResult } from "./types";
import { createValue, isValue, unwrap } from "../../utils/valueOrError";

export const useFlooredDecibelDifferenceResult = (
  decibelDifferenceResult: DecibelDifferenceResult,
) => {
  const flooredDecibelDifferenceResult = useMemo(() => {
    let left = decibelDifferenceResult.left;
    let right = decibelDifferenceResult.right;
    if (isValue(left)) {
      left = createValue(Math.floor(unwrap(left)));
    }
    if (isValue(right)) {
      right = createValue(Math.floor(unwrap(right)));
    }
    return { left, right };
  }, [decibelDifferenceResult]);

  return { flooredDecibelDifferenceResult };
};
