import { Dispatch, SetStateAction, useImperativeHandle } from "react";
import { LayoutAnimation } from "react-native";
import { SoundButtonRef, SoundButtonType } from "./types";

export const useSoundButtonHandle = (
  ref: SoundButtonRef,
  soundButtonType: SoundButtonType,
  setSoundButtonType: Dispatch<SetStateAction<SoundButtonType>>,
  setIsPressed: Dispatch<SetStateAction<boolean>>,
) => {
  return useImperativeHandle(
    ref,
    () => ({
      soundButtonType,
      setSoundButtonType: (type: SoundButtonType) => {
        LayoutAnimation.configureNext({
          ...LayoutAnimation.Presets.easeInEaseOut,
          duration: 150,
        });
        setSoundButtonType(type);
        setIsPressed(false);
      },
    }),
    [soundButtonType, setSoundButtonType],
  );
};
