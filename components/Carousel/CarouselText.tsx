import { Typography } from "@equinor/mad-components";
import { ComponentProps } from "react";

export type CarouselTextProps = Pick<
  ComponentProps<typeof Typography>,
  "children"
>;
export const CarouselText = ({ children }: CarouselTextProps) => {
  return (
    <Typography
      group="paragraph"
      variant="body_short"
      style={{ alignSelf: "center", textAlign: "center" }}
    >
      {children}
    </Typography>
  );
};
