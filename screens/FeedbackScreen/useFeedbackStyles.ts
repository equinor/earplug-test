import { EDSStyleSheet, useStyles } from "@equinor/mad-components";

export const useFeedbackStyles = () => {
  return useStyles(feedbackStyles);
};

const feedbackStyles = EDSStyleSheet.create((theme) => ({
  container: {
    ...theme.spacing.container,
    alignItems: "center",
    justifyContent: "space-between",
    height: "100%",
    gap: 16,
  },
  keyboardAvoidingView: {
    flex: 3,
    paddingBottom: 32,
    width: "100%",
  },
  keyboardAvoidingViewInnerContainer: {
    alignItems: "center",
    gap: 16,
  },
  textFieldContainer: { flexDirection: "row" },
  textField: {
    flex: 1,
    height: 64,
  },
  contentContainer: {
    gap: 16,
    justifyContent: "center",
    width: "100%",
    alignItems: "center",
  },
  buttonContainer: {
    gap: 16,
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
}));
