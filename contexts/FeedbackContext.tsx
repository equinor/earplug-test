import { addToast } from "@equinor/mad-toast";
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useCallback,
  useContext,
  useState,
} from "react";
import { submitFeedback } from "../services/appInsights";
import { useDictionary } from "../language";

export type FeedbackContextType = {
  rating: number | undefined;
  setRating: (rating: number) => void;
  improvementText: string | undefined;
  setImprovementText: (text: string) => void;
  isTextFieldFocused: boolean;
  setIsTextFieldFocused: Dispatch<SetStateAction<boolean>>;
  reset: () => void;
  submit: () => void;
};

const noProviderErrorFn = () => {
  throw new Error("Please call this function within a FeedbackProvider");
};

const initialState = {
  rating: undefined,
  setRating: noProviderErrorFn,
  improvementText: undefined,
  setImprovementText: noProviderErrorFn,
  isTextFieldFocused: false,
  setIsTextFieldFocused: noProviderErrorFn,
  reset: noProviderErrorFn,
  submit: noProviderErrorFn,
};

const FeedbackContext = createContext<FeedbackContextType>(initialState);

export const FeedbackProvider = ({ children }: PropsWithChildren) => {
  const [rating, setRatingInternal] = useState<number>();
  const [improvementText, setImprovementText] = useState<string>();
  const [isTextFieldFocused, setIsTextFieldFocused] = useState(false);
  const dictionary = useDictionary();
  const setRating = useCallback(
    (num: number) => {
      if (num > 5) num = 5;
      if (num < 1) num = 1;
      setRatingInternal(num);
    },
    [setRatingInternal],
  );

  const reset = useCallback(() => {
    setRatingInternal(undefined);
    setImprovementText(undefined);
    setIsTextFieldFocused(false);
  }, []);

  const submit = useCallback(() => {
    let improvementTextToSubmit: string | undefined = improvementText;
    if (improvementText?.trim() === "") {
      improvementTextToSubmit = undefined;
    }
    submitFeedback(rating, improvementTextToSubmit);
    reset();
    addToast({
      type: "success",
      text: dictionary["feedback.thankYou"],
    });
  }, [improvementText, rating, dictionary, reset]);

  return (
    <FeedbackContext.Provider
      value={{
        rating,
        setRating,
        improvementText,
        setImprovementText,
        isTextFieldFocused,
        setIsTextFieldFocused,
        reset,
        submit,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export const useFeedback = () => {
  return useContext(FeedbackContext);
};
