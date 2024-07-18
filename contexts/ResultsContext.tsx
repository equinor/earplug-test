import cloneDeep from "lodash.clonedeep";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from "react";
import { Ear } from "../types";
import { createError } from "../utils/valueOrError";
import {
  DecibelDifferenceResult,
  EarResultKey,
  EarVolumeResults,
} from "./_internal/types";
import { useDecibelDifference } from "./_internal/useDecibelDifference";
import { getIsAttenuationApprovedForEar } from "./_internal/getIsAttenuationApprovedForEar";

type ResultsContextType = {
  isAttenuationApproved: boolean;
  isAttenuationApprovedLeftEar: boolean;
  isAttenuationApprovedRightEar: boolean;
  earVolumeResults: EarVolumeResults;
  setEarVolumeResult: (ear: Ear, type: EarResultKey, value: number) => void;
  reset: () => void;
  decibelDifferenceResult: DecibelDifferenceResult;
};

const initialValue: EarVolumeResults = {
  left: {
    withoutPlugs: null,
    withPlugs: null,
  },
  right: {
    withoutPlugs: null,
    withPlugs: null,
  },
};

const noProviderErrorFn = () => {
  throw new Error("Please call this function within a ResultsProvider");
};

const ResultsContext = createContext<ResultsContextType>({
  isAttenuationApproved: false,
  isAttenuationApprovedLeftEar: false,
  isAttenuationApprovedRightEar: false,
  earVolumeResults: initialValue,
  setEarVolumeResult: noProviderErrorFn,
  reset: noProviderErrorFn,
  decibelDifferenceResult: {
    left: createError("VOLUME_RESULTS_MISSING"),
    right: createError("VOLUME_RESULTS_MISSING"),
  },
});

export const ResultsProvider = ({ children }: PropsWithChildren) => {
  const [earVolumeResults, setEarVolumeResults] =
    useState<EarVolumeResults>(initialValue);
  const setEarVolumeResult: ResultsContextType["setEarVolumeResult"] = (
    ear,
    type,
    value,
  ) => {
    setEarVolumeResults((earVolumeResults) => {
      const newResults = cloneDeep(earVolumeResults);
      newResults[ear][type] = value;
      return newResults;
    });
  };
  const { decibelDifferenceResult } = useDecibelDifference(earVolumeResults);
  const isAttenuationApprovedLeftEar = useMemo(() => {
    return getIsAttenuationApprovedForEar(decibelDifferenceResult.left);
  }, [decibelDifferenceResult]);
  const isAttenuationApprovedRightEar = useMemo(() => {
    return getIsAttenuationApprovedForEar(decibelDifferenceResult.right);
  }, [decibelDifferenceResult]);
  const isAttenuationApproved = useMemo(() => {
    return isAttenuationApprovedLeftEar && isAttenuationApprovedRightEar;
  }, [isAttenuationApprovedLeftEar, isAttenuationApprovedRightEar]);

  const reset = () => setEarVolumeResults(initialValue);
  return (
    <ResultsContext.Provider
      value={{
        isAttenuationApproved,
        isAttenuationApprovedLeftEar,
        isAttenuationApprovedRightEar,
        earVolumeResults,
        setEarVolumeResult,
        reset,
        decibelDifferenceResult,
      }}
    >
      {children}
    </ResultsContext.Provider>
  );
};

export const useResults = () => useContext(ResultsContext);
