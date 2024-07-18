import { Button, Spacer, Typography } from "@equinor/mad-components";
import { IconButton } from "@equinor/mad-components/dist/components/Button/IconButton";
import { Dialog } from "@equinor/mad-components/dist/components/Dialog";
import { StyleSheet, View } from "react-native";
import { useDictionary } from "../../language";
import { useTestPlan } from "../../contexts/TestPlanContext";
import { ComponentProps, Dispatch, SetStateAction, useState } from "react";
import { useAttenuationAppNavigation } from "../../navigation/useAttenuationAppNavigation";
import { Checkbox } from "../Checkbox/Checkbox";

type TestAgainDialogProps = Pick<ComponentProps<typeof Dialog>, "isOpen"> & {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export const TestAgainDialog = ({
  isOpen,
  setIsOpen,
}: TestAgainDialogProps) => {
  const [isWithoutPlugsSelected, setIsWithoutPlugsSelected] = useState(true);
  const [isWithPlugsSelected, setIsWithPlugsSelected] = useState(true);
  const { navigate } = useAttenuationAppNavigation();
  const dictionary = useDictionary();
  const { resetTestPlan } = useTestPlan();

  const handleTryAgain = () => {
    if (isWithoutPlugsSelected && isWithPlugsSelected) {
      resetTestPlan("full");
    }
    if (isWithoutPlugsSelected && !isWithPlugsSelected) {
      resetTestPlan("withoutPlugs");
    }
    if (!isWithoutPlugsSelected && isWithPlugsSelected) {
      resetTestPlan("withPlugs");
    }
    setIsOpen(false);
    navigate("TestScreen");
  };

  return (
    <Dialog isOpen={isOpen}>
      <Dialog.CustomContent>
        <View style={styles.container}>
          <View style={styles.titleAndCloseContainer}>
            <IconButton name="ghost" disabled style={styles.invisible} />
            <Typography variant="h3">
              {dictionary["resultScreen.button.testAgain"]}
            </Typography>
            <IconButton
              name="close"
              variant="ghost"
              onPress={() => setIsOpen(false)}
            />
          </View>
          <Spacer />
          <Typography>
            {dictionary["resultScreeen.dialog.description"]}
          </Typography>
          <Spacer />
          <View>
            <Checkbox
              isChecked={isWithoutPlugsSelected}
              label={dictionary["resultScreeen.dialog.checkbox.withoutPlugs"]}
              onCheck={setIsWithoutPlugsSelected}
            />
            <Checkbox
              isChecked={isWithPlugsSelected}
              label={dictionary["resultScreeen.dialog.checkbox.withPlugs"]}
              onCheck={setIsWithPlugsSelected}
            />
          </View>
          <Spacer />
          <Button
            title={dictionary["resultScreen.button.testAgain"]}
            disabled={!isWithoutPlugsSelected && !isWithPlugsSelected}
            onPress={handleTryAgain}
          />
          <Spacer />
        </View>
      </Dialog.CustomContent>
    </Dialog>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  titleAndCloseContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  invisible: {
    opacity: 0,
  },
});
