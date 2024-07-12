import { EDSStyleSheet, Typography, useStyles } from "@equinor/mad-components";
import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useResults } from "../contexts/ResultsContext";
import { unwrap } from "../utils/valueOrError";
import { useTrackResults } from "../hooks/useTrackResults";

export const ResultScreen = () => {
  const styles = useStyles(themeStyles);
  const {
    earVolumeResults: results,
    setEarVolumeResult: setResult,
    decibelDifferenceResult,
  } = useResults();

  useTrackResults(results, decibelDifferenceResult);

  useEffect(() => {
    setResult("left", "withPlugs", 20);
    setResult("left", "withoutPlugs", 40);
    setResult("right", "withPlugs", 60);
    setResult("right", "withoutPlugs", 80);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- We only want this to run once
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <Typography>Resultater</Typography>
      <Typography>
        Venstre øre uten plugg: {results.left.withoutPlugs}
      </Typography>
      <Typography>Venstre øre med plugg: {results.left.withPlugs}</Typography>
      <Typography>
        Høyre øre uten plugg: {results.right.withoutPlugs}
      </Typography>
      <Typography>Høyre øre med plugg: {results.left.withPlugs}</Typography>
      <Typography>
        Differanse venstre øre: {unwrap(decibelDifferenceResult.left)} dB
      </Typography>
      <Typography>
        Differanse høyre øre: {unwrap(decibelDifferenceResult.right)} dB
      </Typography>
    </SafeAreaView>
  );
};

const themeStyles = EDSStyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.container.background,
    alignItems: "center",
    justifyContent: "center",
  },
}));
