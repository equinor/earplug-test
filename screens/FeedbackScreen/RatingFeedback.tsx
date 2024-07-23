import { View } from "react-native";
import { StarButton } from "./StarButton";

export const RatingFeedback = () => {
  const array = new Array(5).fill(null);
  return (
    <View style={{ flexDirection: "row" }}>
      {array.map((_, index) => (
        <StarButton key={index} index={index} />
      ))}
    </View>
  );
};
