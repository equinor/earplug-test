import {
  Button,
  CircularProgress,
  EDSStyleSheet,
  LinearProgress,
  Typography,
  useStyles,
} from "@equinor/mad-components";
import { SafeAreaView } from "react-native-safe-area-context";
import { ExitButton } from "../components/ExitButton/ExitButton";
import { useTestPlan } from "../contexts/TestPlanContext";
import { useSound } from "../hooks/useSound";

export const TestScreen = () => {
  const styles = useStyles(themeStyles);
  const {
    current: { title, Component },
    navigateNext,
    progress,
  } = useTestPlan();
  const { isSoundLoaded, Sound } = useSound();

  return (
    <SafeAreaView style={styles.container}>
      <LinearProgress value={progress} />
      <ExitButton style={styles.exitButton} />
      <Typography variant="h2" color="primary" style={styles.title}>
        {title}
      </Typography>
      <Typography>Progress {progress}</Typography>
      {Component}
      {isSoundLoaded ? (
        <Button title="Spill av testlyd" onPress={Sound.playInLoop} />
      ) : (
        <CircularProgress />
      )}
      <Button
        title="Neste side"
        onPress={() => {
          Sound.stop();
          navigateNext();
        }}
      />
    </SafeAreaView>
  );
};

const themeStyles = EDSStyleSheet.create((theme) => ({
  container: {
    flex: 1,
    gap: 24,
    paddingHorizontal: theme.spacing.container.paddingHorizontal,
    paddingVertical: theme.spacing.container.paddingVertical,
  },
  exitButton: { alignSelf: "flex-end" },
  title: {
    textAlign: "center",
  },
}));
