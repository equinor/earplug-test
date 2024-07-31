import {
  Button,
  EDSStyleSheet,
  Spacer,
  useStyles,
} from "@equinor/mad-components";
import { SafeAreaView } from "react-native-safe-area-context";
import { useResults } from "../../contexts/ResultsContext";
import { ScrollView } from "react-native-gesture-handler";
import { View } from "react-native";
import { useDictionary } from "../../language";
import { useState } from "react";
import { colors } from "@equinor/mad-components/dist/styling";
import {
  ATTENUATION_THRESHOLD_LOWER,
  MAX_ATTENUATION,
} from "../../constants/attenuation";
import { useTestPlan } from "../../contexts/TestPlanContext";
import { useAttenuationAppNavigation } from "../../navigation/useAttenuationAppNavigation";
import { TestAgainDialog } from "../../components/TestAgainDialog/TestAgainDialog";
import { HelpButton } from "./HelpButton";
import { Bar, BAR_HEIGHT } from "./Bar";
import { Title } from "../../components/Title";
import { Description } from "./Description";
import { Subtitle } from "./Subtitle";
import { useTrackResults } from "../../hooks/useTrackResults";

export const ResultScreen = () => {
  const [isTestAgainDialogOpen, setIsTestAgainDialogOpen] = useState(false);

  const { resetTestPlan } = useTestPlan();
  const { navigate } = useAttenuationAppNavigation();
  const {
    earVolumeResults,
    decibelDifferenceResult,
    isAttenuationApproved,
    isAttenuationApprovedLeftEar,
    isAttenuationApprovedRightEar,
  } = useResults();
  const styles = useStyles(themeStyles, {
    decibelDifferenceResult,
    isAttenuationApproved,
    isAttenuationApprovedLeftEar,
    isAttenuationApprovedRightEar,
  });
  const dictionary = useDictionary();

  useTrackResults(earVolumeResults, decibelDifferenceResult);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View>
          <Title>{dictionary["resultScreen.title"]}</Title>
          <Spacer />
          <Subtitle />
          <Description />
        </View>
        <View style={styles.middleContainer}>
          <View>
            <View style={styles.lowerDbThreshold} />
            <View style={styles.chartContainer}>
              <Bar
                calculateDecibelDifferenceResult={decibelDifferenceResult.left}
                isAttenuationApprovedForEar={isAttenuationApprovedLeftEar}
                label={dictionary["resultScreen.chart.label.left"]}
              />
              <Bar
                calculateDecibelDifferenceResult={decibelDifferenceResult.right}
                isAttenuationApprovedForEar={isAttenuationApprovedRightEar}
                label={dictionary["resultScreen.chart.label.right"]}
              />
            </View>
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <View style={styles.buttonRow}>
            <Button.Icon name="ghost" disabled style={styles.invisible} />
            <Button
              variant={isAttenuationApproved ? "outlined" : "contained"}
              title={dictionary["resultScreen.button.testAgain"]}
              onPress={() => setIsTestAgainDialogOpen(true)}
            />
            <HelpButton />
          </View>
          <Button
            variant={isAttenuationApproved ? "contained" : "outlined"}
            title={dictionary["resultScreen.button.done"]}
            onPress={() => {
              resetTestPlan("full");
              navigate("FeedbackScreen");
            }}
          />
        </View>
        <TestAgainDialog
          isOpen={isTestAgainDialogOpen}
          setIsOpen={setIsTestAgainDialogOpen}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const themeStyles = EDSStyleSheet.create((theme) => {
  return {
    container: {
      flex: 1,
      paddingHorizontal: theme.spacing.container.paddingHorizontal,
      paddingVertical: theme.spacing.container.paddingVertical,
    },
    contentContainer: {
      flex: 1,
      justifyContent: "space-between",
    },
    titleAndExitButtonContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: theme.spacing.spacer.medium,
    },
    invisible: { opacity: 0 },
    middleContainer: {
      alignItems: "center",
    },
    lowerDbThreshold: {
      backgroundColor: colors.feedback_danger_light_resting,
      height: 2,
      position: "relative",
      top:
        BAR_HEIGHT -
        (ATTENUATION_THRESHOLD_LOWER / MAX_ATTENUATION) * BAR_HEIGHT,
      zIndex: 1,
    },
    chartContainer: {
      gap: 20,
      flexDirection: "row",
      justifyContent: "space-between",
    },
    bottomContainer: {
      alignItems: "center",
      gap: theme.spacing.element.paddingVertical,
    },
    buttonRow: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
    },
  };
});
