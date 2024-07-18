import { Typography } from "@equinor/mad-components";
import { IconButton } from "@equinor/mad-components/dist/components/Button/IconButton";
import { Dispatch, SetStateAction } from "react";
import { StyleSheet, View } from "react-native";

type CheckboxProps = {
  isChecked: boolean;
  label: string;
  onCheck: Dispatch<SetStateAction<boolean>>;
};

export const Checkbox = ({ isChecked, label, onCheck }: CheckboxProps) => {
  return (
    <View style={styles.container}>
      <IconButton
        name={isChecked ? "checkbox-marked" : "checkbox-blank-outline"}
        variant="ghost"
        onPress={() => onCheck(!isChecked)}
      />
      <Typography>{label}</Typography>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
});
