import { createError, createValue, ValueOrError } from "./valueOrError";

export type CalculateDecibelDifferenceError =
  | "VOLUME_RESULTS_MISSING"
  | "ZERO_VALUES_NOT_ALLOWED"
  | "VOLUME_HIGHER_WITHOUT_PLUGS";
export type CalculateDecibelDifferenceResult = ValueOrError<
  number,
  CalculateDecibelDifferenceError
>;
export const calculateDecibelDifference = (
  withoutPlugs: number | null,
  withPlugs: number | null,
): CalculateDecibelDifferenceResult => {
  if (withoutPlugs === null || withPlugs === null) {
    return createError("VOLUME_RESULTS_MISSING");
  }
  if (withoutPlugs === 0 || withPlugs === 0) {
    return createError("ZERO_VALUES_NOT_ALLOWED");
  }
  if (withPlugs < withoutPlugs) {
    return createError("VOLUME_HIGHER_WITHOUT_PLUGS");
  }
  const rawValue = 20 * Math.log10(withoutPlugs / withPlugs);
  return createValue(parseFloat(rawValue.toFixed(2)));
};
