import {
  Button,
  EDSStyleSheet,
  Typography,
  useStyles,
} from "@equinor/mad-components";
import { SafeAreaView } from "react-native-safe-area-context";
import { useResults } from "../../contexts/ResultsContext";
import { unwrap } from "../../utils/valueOrError";
import { ScrollView } from "react-native-gesture-handler";
import { View } from "react-native";
import { ExitButton } from "../../components/ExitButton/ExitButton";
import { useDictionary } from "../../language";
import { useState } from "react";
import { DecibelDifferenceResult } from "../../contexts/_internal/types";
import { colors } from "@equinor/mad-components/dist/styling";
import { IconButton } from "@equinor/mad-components/dist/components/Button/IconButton";
import {
  ATTENUATION_THRESHOLD_LOWER,
  MAX_ATTENUATION,
} from "../../constants/attenuation";
import { useTestPlan } from "../../contexts/TestPlanContext";
import { useAttenuationAppNavigation } from "../../navigation/useAttenuationAppNavigation";
import { TestAgainDialog } from "../../components/TestAgainDialog/TestAgainDialog";
import { HelpButton } from "./HelpButton";
import { Bar, BAR_HEIGHT } from "./Bar";

export const ResultScreen = () => {
  const [isTestAgainDialogOpen, setIsTestAgainDialogOpen] = useState(false);

  const { resetTestPlan } = useTestPlan();
  const { navigate } = useAttenuationAppNavigation();
  const {
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

  const getSubtitle = (isAttenuationApproved: boolean) => {
    if (isAttenuationApproved) {
      return dictionary["resultScreen.subtitle.approved"];
    }
    return dictionary["resultScreen.subtitle.notApproved"];
  };

  const getDescription = (
    isAttenuationApproved: boolean,
    decibelDifferenceResult: DecibelDifferenceResult,
  ) => {
    return (
      <Typography>
        {dictionary["resultScreen.description.partOne"]}{" "}
        <Typography
          bold
          style={styles.leftEar}
        >{`${unwrap(decibelDifferenceResult.left)} dB ${dictionary["resultScreen.description.leftEar"]}`}</Typography>{" "}
        &{" "}
        <Typography bold style={styles.rightEar}>
          {`${unwrap(decibelDifferenceResult.right)} dB ${dictionary["resultScreen.description.rightEar"]}`}
        </Typography>
        .{" "}
        {isAttenuationApproved
          ? ""
          : `${dictionary["resultScreen.description.notApproved"]}.`}
      </Typography>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View>
          <View style={styles.titleAndExitButtonContainer}>
            <ExitButton disabled style={styles.invisible} />
            <Typography variant="h2" color="primary">
              {dictionary["resultScreen.title"]}
            </Typography>
            <ExitButton />
          </View>
          <Typography variant="h5" style={styles.subtitle}>
            {getSubtitle(isAttenuationApproved)}
          </Typography>
          {getDescription(isAttenuationApproved, decibelDifferenceResult)}
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
            <IconButton name="ghost" disabled style={styles.invisible} />
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
              navigate("WelcomeScreen");
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

type ThemeStylesProps = {
  decibelDifferenceResult: DecibelDifferenceResult;
  isAttenuationApproved: boolean;
  isAttenuationApprovedLeftEar: boolean;
  isAttenuationApprovedRightEar: boolean;
};

const themeStyles = EDSStyleSheet.create((theme, props: ThemeStylesProps) => {
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
    subtitle: {
      textAlign: "center",
      color: props.isAttenuationApproved
        ? theme.colors.feedback.success
        : theme.colors.feedback.danger,
      marginBottom: theme.spacing.spacer.small,
    },
    middleContainer: {
      alignItems: "center",
    },
    leftEar: {
      color: props.isAttenuationApprovedLeftEar
        ? theme.colors.feedback.success
        : theme.colors.feedback.danger,
    },
    rightEar: {
      color: props.isAttenuationApprovedRightEar
        ? theme.colors.feedback.success
        : theme.colors.feedback.danger,
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
