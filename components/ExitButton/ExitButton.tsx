import { Button, IconButtonProps, alert } from "@equinor/mad-components";
import { useDictionary } from "../../language";
import { useAttenuationAppNavigation } from "../../navigation/useAttenuationAppNavigation";
import { ViewProps } from "react-native";
import { useTestPlan } from "../../contexts/TestPlanContext";

export type ExitButtonProps = Omit<
  IconButtonProps & ViewProps,
  "onPress" | "name" | "variant"
>;

export const ExitButton = (props: ExitButtonProps) => {
  const navigation = useAttenuationAppNavigation();
  const dictionary = useDictionary();
  const { resetTestPlan } = useTestPlan();
  const onPress = () => {
    alert(
      dictionary["exitDialog.title"],
      dictionary["exitDialog.description"],
      [
        {
          text: dictionary["exitDialog.cancel"],
          onPress: () => undefined,
          style: "cancel",
        },
        {
          text: dictionary["exitDialog.confirm"],
          onPress: () => {
            resetTestPlan();
            navigation.navigate("WelcomeScreen");
          },
          style: "destructive",
          isPreferred: true,
        },
      ],
    );
  };
  return (
    <Button.Icon variant="ghost" name="close" onPress={onPress} {...props} />
  );
};
