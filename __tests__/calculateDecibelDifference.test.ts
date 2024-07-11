import {
  CalculateDecibelDifferenceError,
  calculateDecibelDifference,
} from "../utils/calculateDecibelDifference";
import { createError, createValue, Error } from "../utils/valueOrError";
describe("calculateDecibelDifference", () => {
  it("Should calculate the decibel difference for volume X and Y", () => {
    expect(calculateDecibelDifference(0.1, 1)).toEqual(createValue(20));
    expect(calculateDecibelDifference(0.02, 0.5)).toEqual(createValue(27.96));
    expect(calculateDecibelDifference(0.06, 0.4)).toEqual(createValue(16.48));
    expect(calculateDecibelDifference(0.06, 0.42)).toEqual(createValue(16.9));
  });

  it("Should return an error object if the arguments are invalid", () => {
    const VOLUME_HIGHER_WITHOUT_PLUGS_ERROR: Error<CalculateDecibelDifferenceError> =
      createError("VOLUME_HIGHER_WITHOUT_PLUGS");
    const ZERO_VALUES_NOT_ALLOWED_ERROR: Error<CalculateDecibelDifferenceError> =
      createError("ZERO_VALUES_NOT_ALLOWED");
    const VOLUME_RESULTS_MISSING_ERROR: Error<CalculateDecibelDifferenceError> =
      createError("VOLUME_RESULTS_MISSING");

    expect(calculateDecibelDifference(1, 1)).toEqual(createValue(0));
    expect(calculateDecibelDifference(1, 0.1)).toEqual(
      VOLUME_HIGHER_WITHOUT_PLUGS_ERROR,
    );
    expect(calculateDecibelDifference(1, 0)).toEqual(
      ZERO_VALUES_NOT_ALLOWED_ERROR,
    );
    expect(calculateDecibelDifference(0, 1)).toEqual(
      ZERO_VALUES_NOT_ALLOWED_ERROR,
    );
    expect(calculateDecibelDifference(0, null)).toEqual(
      VOLUME_RESULTS_MISSING_ERROR,
    );
    expect(calculateDecibelDifference(null, 0)).toEqual(
      VOLUME_RESULTS_MISSING_ERROR,
    );
  });
});
