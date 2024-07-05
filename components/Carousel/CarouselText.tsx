import { Typography } from "@equinor/mad-components";
import { ComponentProps } from "react";

export type CarouselTextProps = Pick<
  ComponentProps<typeof Typography>,
  "children"
> & { pageNumber: number };
export const CarouselText = ({ children, pageNumber }: CarouselTextProps) => {
  return (
    <Typography
      group="paragraph"
      variant="body_short"
      style={{ alignSelf: "center", textAlign: "center" }}
    >
      <>
        {`${pageNumber}. `}
        {children}
      </>
    </Typography>
  );
};
