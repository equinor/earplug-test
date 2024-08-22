import { useMemo } from "react";
import { DecibelDifferenceResult } from "./types";
import { getFlooredResult } from "./getFlooredResult";

export const useFlooredDecibelDifferenceResult = (
  decibelDifferenceResult: DecibelDifferenceResult,
) => {
  const flooredDecibelDifferenceResult = useMemo(
    () => ({
      left: getFlooredResult(decibelDifferenceResult.left),
      right: getFlooredResult(decibelDifferenceResult.right),
    }),
    [decibelDifferenceResult],
  );

  return { flooredDecibelDifferenceResult };
};
