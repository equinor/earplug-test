import { Typography } from "@equinor/mad-components";
import { View } from "react-native";
import { useFeedbackStyles } from "./useFeedbackStyles";
import { useDictionary } from "../../language";
import { RatingFeedback } from "./RatingFeedback";

export const GiveRating = () => {
  const styles = useFeedbackStyles();
  const dictionary = useDictionary();
  return (
    <View style={styles.contentContainer}>
      <Typography group="paragraph" variant="body_short">
        {dictionary["feedbackScreen.doYouWantToGiveUsARating"]}
      </Typography>
      <RatingFeedback />
    </View>
  );
};
