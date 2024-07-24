import { EDSStyleSheet, Typography, useStyles } from "@equinor/mad-components";
import { useDictionary } from "../../language";
import { ResultsContextType, useResults } from "../../contexts/ResultsContext";

export const Subtitle = () => {
  const dictionary = useDictionary();
  const { isAttenuationApproved } = useResults();
  const styles = useStyles(themeStyles, { isAttenuationApproved });

  return (
    <Typography variant="h5" style={styles.subtitle}>
      {isAttenuationApproved
        ? dictionary["resultScreen.subtitle.approved"]
        : dictionary["resultScreen.subtitle.notApproved"]}
    </Typography>
  );
};

type ThemeStylesProps = Pick<ResultsContextType, "isAttenuationApproved">;

const themeStyles = EDSStyleSheet.create((theme, props: ThemeStylesProps) => {
  return {
    subtitle: {
      textAlign: "center",
      color: props.isAttenuationApproved
        ? theme.colors.feedback.success
        : theme.colors.feedback.danger,
      marginBottom: theme.spacing.spacer.small,
    },
  };
});
