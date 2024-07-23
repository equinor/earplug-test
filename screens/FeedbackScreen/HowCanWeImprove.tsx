import { View } from "react-native";
import { useFeedbackStyles } from "./useFeedbackStyles";
import { TextField, Typography } from "@equinor/mad-components";
import { useFeedback } from "../../contexts/FeedbackContext";
import { useDictionary } from "../../language";

export const HowCanWeImprove = () => {
  const { improvementText, setImprovementText, setIsTextFieldFocused } =
    useFeedback();
  const styles = useFeedbackStyles();
  const dictionary = useDictionary();

  return (
    <View style={styles.contentContainer}>
      <Typography group="paragraph" variant="body_short">
        {dictionary["feedbackScreen.howCanWeImprove"]}
      </Typography>
      <View style={styles.textFieldContainer}>
        <TextField
          value={improvementText}
          onChange={setImprovementText}
          onFocus={() => setIsTextFieldFocused(true)}
          onBlur={() => setIsTextFieldFocused(false)}
          multiline
          inputAccessoryViewID="keyboard-done-button"
          label={dictionary["feedbackScreen.improvementSuggestions"]}
          placeholder={dictionary["feedbackScreen.improvementSuggestions"]}
          style={styles.textField}
        />
      </View>
    </View>
  );
};
