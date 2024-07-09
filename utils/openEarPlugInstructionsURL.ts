import { Linking } from "react-native";
import { getEarPlugInstructionsURL } from "./getEarPlugInstructionsURL";

export const openEarPlugInstructionsURL = () => {
  return void Linking.openURL(getEarPlugInstructionsURL());
};
