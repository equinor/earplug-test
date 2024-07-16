import { Typography } from "@equinor/mad-components";
import { StyleSheet } from "react-native";

export type TitleProps = Omit<
  React.ComponentProps<typeof Typography>,
  "group" | "variant" | "color"
>;
export const Title = (props: TitleProps) => {
  return (
    <Typography
      group="basic"
      variant="h2"
      color="primary"
      {...props}
      style={StyleSheet.flatten([{ textAlign: "center" }, props.style])}
    />
  );
};
