import { KeyboardAvoidingView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FeedbackIntroduction } from "./FeedbackIntroduction";
import { GiveRating } from "./GiveRating";
import { HowCanWeImprove } from "./HowCanWeImprove";
import { NavigationButtons } from "./NavigationButtons";
import { useFeedbackStyles } from "./useFeedbackStyles";

export const FeedbackScreen = () => {
  const styles = useFeedbackStyles();
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior="position"
          style={styles.keyboardAvoidingView}
        >
          <View style={styles.keyboardAvoidingViewInnerContainer}>
            <FeedbackIntroduction />
            <GiveRating />
            <HowCanWeImprove />
          </View>
        </KeyboardAvoidingView>
        <NavigationButtons />
      </View>
    </SafeAreaView>
  );
};
