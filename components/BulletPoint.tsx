import { Typography } from "@equinor/mad-components";
import { ComponentProps } from "react";
import { View, ViewStyle } from "react-native";

export type BulletPointProps = Pick<
  ComponentProps<typeof Typography>,
  "children"
> & { style?: ViewStyle };
export const BulletPoint = ({ children, style }: BulletPointProps) => {
  return (
    <View style={{ flexDirection: "row", gap: 8, ...style }}>
      <Typography group="paragraph" variant="body_short">{`\u2022`}</Typography>
      <Typography group="paragraph" variant="body_short">
        {children}
      </Typography>
    </View>
  );
};
