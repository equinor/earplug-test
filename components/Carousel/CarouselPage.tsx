import { Button, EDSStyleSheet, useStyles } from "@equinor/mad-components";
import { PropsWithChildren } from "react";
import { View } from "react-native";

export type CarouselPageProps = PropsWithChildren<{
  isFirstPage?: boolean;
  isLastPage?: boolean;
  onPressPageButton: (button: "left" | "right") => void;
}>;
export const CarouselPage = ({
  isFirstPage = false,
  isLastPage = false,
  onPressPageButton: onPress,
  children,
}: CarouselPageProps) => {
  const styles = useStyles(carouselPageStyles);
  return (
    <View style={styles.container}>
      <Button.Icon
        variant="ghost"
        name="chevron-left"
        disabled={isFirstPage}
        onPress={() => onPress("left")}
      />
      <View style={{ flex: 1, gap: 16 }}>{children}</View>
      <Button.Icon
        variant="ghost"
        name="chevron-right"
        disabled={isLastPage}
        onPress={() => onPress("right")}
      />
    </View>
  );
};

const carouselPageStyles = EDSStyleSheet.create(() => ({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
    gap: 8,
  },
}));
