import { Button, EDSStyleSheet, useStyles } from "@equinor/mad-components";
import { InputAccessoryView, Keyboard, View } from "react-native";
import { useDictionary } from "../language";

export const DoneButtonInputAccessoryView = () => {
  const dictionary = useDictionary();
  const styles = useStyles(inputAccessoryStyles);
  return (
    <InputAccessoryView nativeID="keyboard-done-button">
      <View style={styles.container}>
        <Button
          onPress={() => Keyboard.dismiss()}
          title={dictionary["keyboard.done"]}
        />
      </View>
    </InputAccessoryView>
  );
};

const inputAccessoryStyles = EDSStyleSheet.create((theme) => ({
  container: {
    flexDirection: "row",
    justifyContent: "flex-end",
    backgroundColor: theme.colors.container.default,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border.medium,
    padding: 8,
  },
}));
