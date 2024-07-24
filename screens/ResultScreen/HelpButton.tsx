import { Button, Popover, Typography } from "@equinor/mad-components";
import { useRef, useState } from "react";
import { View } from "react-native";
import { useDictionary } from "../../language";
import { ATTENUATION_THRESHOLD_LOWER } from "../../constants/attenuation";

export const HelpButton = () => {
  const helpButtonRef = useRef<View>(null);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const dictionary = useDictionary();
  return (
    <>
      <Button.Icon
        ref={helpButtonRef}
        name="help-circle-outline"
        variant="ghost"
        onPress={() => setIsPopoverOpen(!isPopoverOpen)}
      />

      <Popover
        open={isPopoverOpen}
        anchorEl={helpButtonRef}
        onClose={() => setIsPopoverOpen(false)}
        placement="top"
      >
        <Typography>
          {`${dictionary["resultScreeen.popover.lowerThreshold.partOne"]} ${ATTENUATION_THRESHOLD_LOWER} dB ${dictionary["resultScreeen.popover.lowerThreshold.partTwo"]}.`}
        </Typography>
      </Popover>
    </>
  );
};
