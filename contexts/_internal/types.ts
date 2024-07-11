import { Ear } from "../../types";
import { CalculateDecibelDifferenceResult } from "../../utils/calculateDecibelDifference";

export type EarVolumeResults = Record<Ear, EarVolumeResult>;
export type EarResultKey = keyof EarVolumeResult;
export type EarVolumeResult = {
  withPlugs: number | null;
  withoutPlugs: number | null;
};
export type DecibelDifferenceResult = Record<
  Ear,
  CalculateDecibelDifferenceResult
>;
