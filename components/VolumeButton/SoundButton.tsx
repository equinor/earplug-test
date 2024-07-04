import { Typography } from "@equinor/mad-components";
import * as Haptics from "expo-haptics";
import { forwardRef, useState } from "react";
import { Pressable, View } from "react-native";
import { BigButtonContainer } from "./BigButtonContainer";
import { VolumeButton } from "./VolumeButton";
import { SPACE_BETWEEN_VOLUME_BUTTONS, VOLUME_BUTTON_KEY } from "./constants";
import { SoundButtonRef, SoundButtonType, Variant } from "./types";
import { useSoundButtonHandle } from "./useSoundButtonHandle";

type onPressEvent =
  | {
      type: "play";
      variant: undefined;
    }
  | {
      type: "volume";
      variant: Variant;
    };
export type SoundButtonProps = { onPress: (e: onPressEvent) => void };

const SoundButtonInner = (
  { onPress }: SoundButtonProps,
  ref: SoundButtonRef,
) => {
  const [buttonType, setButtonType] = useState<SoundButtonType>("play");
  const [isPressed, setIsPressed] = useState(false);
  useSoundButtonHandle(ref, buttonType, setButtonType, setIsPressed);

  const onPressIn = () => {
    haptics();
    setIsPressed(true);
  };
  const onPressOut = () => setIsPressed(false);

  const haptics = () => {
    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
  };

  const finalOnPress = (variant: Variant) => {
    if (buttonType === "play") {
      return onPress({ type: buttonType, variant: undefined });
    }
    return onPress({ type: buttonType, variant });
  };

  const getIsPressed = () => {
    if (buttonType === "volume") return undefined;
    return isPressed;
  };
  return (
    <BigButtonContainer key="BIG_BUTTON_CONTAINER">
      <VolumeButton
        key={VOLUME_BUTTON_KEY.UP}
        variant="+"
        displaySymbol={buttonType === "volume"}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        isPressed={getIsPressed()}
        onPress={finalOnPress}
      />
      {buttonType === "volume" && (
        <View style={{ height: SPACE_BETWEEN_VOLUME_BUTTONS }} />
      )}
      <VolumeButton
        key={VOLUME_BUTTON_KEY.DOWN}
        variant="-"
        displaySymbol={buttonType === "volume"}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        isPressed={getIsPressed()}
        onPress={finalOnPress}
      />
      {buttonType === "play" && (
        <Pressable
          style={{ position: "absolute", alignSelf: "center" }}
          onPressIn={onPressIn}
          onPressOut={onPressOut}
          onPress={() => onPress({ type: buttonType, variant: undefined })}
        >
          <Typography color="textInverted">Spill av</Typography>
        </Pressable>
      )}
    </BigButtonContainer>
  );
};

export const SoundButton = forwardRef(SoundButtonInner);
