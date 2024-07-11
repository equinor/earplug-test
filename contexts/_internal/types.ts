import { Ear } from "../../types";
import { CalculateDecibelDifferenceResult } from "../../utils/calculateDecibelDifference";

export type EarVolumeResults = Record<Ear, EarVolumeResult>;
export type EarResultKey = keyof EarVolumeResult;
export type EarVolumeResult = {
  withPlugs: number | null;
  withoutPlugs: number | null;
};
export type DecibelDifferenceResult = {
  left: CalculateDecibelDifferenceResult;
  right: CalculateDecibelDifferenceResult;
};

export type ValidEarVolumeResults = NonNullableObject<EarVolumeResults>;

//Typescript magic
export type NonNullableObject<T extends object> = T extends {
  [k in keyof T]: infer Value | null;
}
  ? Value extends object
    ? { [k in keyof T]: NonNullableObject<Value> }
    : { [k in keyof T]: Value }
  : never;
