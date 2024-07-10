import { Image, ImageProps } from "expo-image";

export type CarouselImageProps = Pick<ImageProps, "source">;

export const CarouselImage = ({ source }: CarouselImageProps) => {
  return (
    <Image
      source={source}
      contentFit="contain"
      style={{
        alignSelf: "center",
        height: "50%",
        width: "100%",
      }}
    />
  );
};
