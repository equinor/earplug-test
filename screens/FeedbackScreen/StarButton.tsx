import { Button } from "@equinor/mad-components";
import { useFeedback } from "../../contexts/FeedbackContext";

export type StarButtonProps = {
  index: number;
};

export const StarButton = ({ index }: StarButtonProps) => {
  const { rating, setRating } = useFeedback();
  const name = index < (rating ?? 0) ? "star" : "star-outline";
  return (
    <Button.Icon
      variant="ghost"
      name={name}
      onPress={() => setRating(index + 1)}
    />
  );
};
