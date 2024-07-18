import { View } from "react-native";
import { CalculateDecibelDifferenceResult } from "../../utils/calculateDecibelDifference";
import { isValue, unwrap } from "../../utils/valueOrError";
import { EDSStyleSheet, Typography, useStyles } from "@equinor/mad-components";
import { colors } from "@equinor/mad-components/dist/styling";
import { MAX_ATTENUATION } from "../../constants/attenuation";

export const BAR_HEIGHT = 250;

const getBarHeight = (
  calculateDecibelDifferenceResult: CalculateDecibelDifferenceResult,
) => {
  if (
    isValue(calculateDecibelDifferenceResult) &&
    unwrap(calculateDecibelDifferenceResult) > MAX_ATTENUATION
  ) {
    return BAR_HEIGHT;
  }

  if (isValue(calculateDecibelDifferenceResult)) {
    return (
      (unwrap(calculateDecibelDifferenceResult) / MAX_ATTENUATION) * BAR_HEIGHT
    );
  }

  return 0;
};

type BarProps = {
  label: string;
  calculateDecibelDifferenceResult: CalculateDecibelDifferenceResult;
  isAttenuationApprovedForEar: boolean;
};

export const Bar = ({
  label,
  calculateDecibelDifferenceResult,
  isAttenuationApprovedForEar,
}: BarProps) => {
  const styles = useStyles(themeStyles, {
    calculateDecibelDifferenceResult,
    isAttenuationApprovedForEar,
  });
  return (
    <View>
      <View style={styles.barContainer}>
        <View style={styles.bar} />
      </View>
      <Typography style={styles.label}>{label}</Typography>
      <Typography bold style={styles.dbLabel}>
        {`${unwrap(calculateDecibelDifferenceResult)} dB`}
      </Typography>
    </View>
  );
};

type ThemeStylesProps = Pick<
  BarProps,
  "calculateDecibelDifferenceResult" | "isAttenuationApprovedForEar"
>;

const themeStyles = EDSStyleSheet.create((theme, props: ThemeStylesProps) => {
  return {
    barContainer: {
      height: BAR_HEIGHT,
      width: 90,
      backgroundColor: theme.colors.container.background,
      justifyContent: "flex-end",
      borderColor: theme.colors.border.medium,
      borderWidth: 2,
    },
    bar: {
      height: getBarHeight(props.calculateDecibelDifferenceResult),
      backgroundColor: props.isAttenuationApprovedForEar
        ? colors.feedback_success_dark_hover
        : colors.ui_background_light_danger,
      borderTopColor: theme.colors.border.medium,
      borderTopWidth: 2,
    },
    label: { textAlign: "center" },
    dbLabel: {
      textAlign: "center",
      position: "relative",
      bottom: 90,
      fontSize: 20,
    },
  };
});
