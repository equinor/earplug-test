import { EDSStyleSheet, Typography, useStyles } from "@equinor/mad-components";
import { SafeAreaView } from "react-native-safe-area-context";
import { useResults } from "../contexts/ResultsContext";
import { unwrap } from "../utils/valueOrError";

export const ResultScreen = () => {
  const styles = useStyles(themeStyles);
  const { earVolumeResults: results, decibelDifferenceResult } = useResults();
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
      <Typography>Høyre øre med plugg: {results.right.withPlugs}</Typography>
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
