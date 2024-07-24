import { EDSStyleSheet, Typography, useStyles } from "@equinor/mad-components";
import { useDictionary } from "../../language";
import { isError, unwrap } from "../../utils/valueOrError";
import { ResultsContextType, useResults } from "../../contexts/ResultsContext";

export const Description = () => {
  const dictionary = useDictionary();
  const {
    decibelDifferenceResult,
    isAttenuationApproved,
    isAttenuationApprovedLeftEar,
    isAttenuationApprovedRightEar,
  } = useResults();
  const styles = useStyles(themeStyles, {
    isAttenuationApprovedLeftEar,
    isAttenuationApprovedRightEar,
  });

  if (
    isError(decibelDifferenceResult.left) ||
    isError(decibelDifferenceResult.right)
  ) {
    return (
      <Typography>{dictionary["resultScreen.description.error"]}</Typography>
    );
  }

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

type ThemeStylesProps = Pick<
  ResultsContextType,
  "isAttenuationApprovedLeftEar" | "isAttenuationApprovedRightEar"
>;

const themeStyles = EDSStyleSheet.create((theme, props: ThemeStylesProps) => {
  return {
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
  };
});
