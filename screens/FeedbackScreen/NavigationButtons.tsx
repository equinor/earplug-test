import { View } from "react-native";
import { useDictionary } from "../../language";
import { useFeedbackStyles } from "./useFeedbackStyles";
import { Button } from "@equinor/mad-components";
import { useAttenuationAppNavigation } from "../../navigation/useAttenuationAppNavigation";
import { useFeedback } from "../../contexts/FeedbackContext";

export const NavigationButtons = () => {
  const styles = useFeedbackStyles();
  const dictionary = useDictionary();
  const navigation = useAttenuationAppNavigation();
  const { submit } = useFeedback();

  const navigate = () => navigation.navigate("WelcomeScreen");

  const onPressSubmit = () => {
    void submit().then(navigate);
  };
  return (
    <View style={styles.buttonContainer}>
      <Button
        title={dictionary["feedbackScreen.sendFeedback"]}
        onPress={onPressSubmit}
      />
      <Button
        variant="outlined"
        title={dictionary["feedbackScreen.skip"]}
        onPress={navigate}
      />
    </View>
  );
};
