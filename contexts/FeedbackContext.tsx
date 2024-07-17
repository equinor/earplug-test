import { addToast } from "@equinor/mad-toast";
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from "react";

type FeedbackContextType = {
  rating: number | undefined;
  setRating: (rating: number) => void;
  improvementText: string | undefined;
  setImprovementText: (text: string) => void;
  submit: () => Promise<void>;
};

const noProviderErrorFn = () => {
  throw new Error("Please call this function within a FeedbackProvider");
};

const initialState = {
  rating: undefined,
  setRating: noProviderErrorFn,
  improvementText: undefined,
  setImprovementText: noProviderErrorFn,
  submit: noProviderErrorFn,
};

const FeedbackContext = createContext<FeedbackContextType>(initialState);

export const FeedbackProvider = ({ children }: PropsWithChildren) => {
  const [rating, setRatingInternal] = useState<number>();
  const [improvementText, setImprovementText] = useState<string>();

  const setRating = useCallback(
    (num: number) => {
      if (num > 5) num = 5;
      if (num < 1) num = 1;
      setRatingInternal(() => num);
    },
    [setRatingInternal],
  );

  const submit = useCallback(async () => {
    //TODO
    addToast({ type: "error", text: "Not implemented yet" });
    await Promise.resolve();
  }, []);

  return (
    <FeedbackContext.Provider
      value={{ rating, setRating, improvementText, setImprovementText, submit }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export const useFeedback = () => {
  return useContext(FeedbackContext);
};
