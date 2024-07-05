import { useRef, useState } from "react";
import PagerView from "react-native-pager-view";
import { CarouselImage } from "./CarouselImage";
import { CarouselPage } from "./CarouselPage";
import { CarouselText } from "./CarouselText";
import InfographicOne from "../../assets/infographic-1.png";
import InfographicTwo from "../../assets/infographic-2.png";
import InfographicThree from "../../assets/infographic-3.png";
import { EDSStyleSheet, useStyles } from "@equinor/mad-components";
import { DimensionValue } from "react-native";
import { useDictionary } from "../../language";

export const Carousel = () => {
  const pagerViewRef = useRef<PagerView>(null);
  const dictionary = useDictionary();
  const [selectedPageIndex, setSelectedPageIndex] = useState(0);
  const [height, setHeight] = useState(0);
  const styles = useStyles(carouselStyles, height);

  const onPress = (button: "left" | "right") => {
    let nextPage = -1;
    if (button === "left") {
      nextPage = selectedPageIndex - 1;
    }
    if (button === "right") {
      nextPage = selectedPageIndex + 1;
    }
    pagerViewRef.current?.setPage(nextPage);
  };

  return (
    <PagerView
      ref={pagerViewRef}
      initialPage={0}
      onPageSelected={(e) => setSelectedPageIndex(e.nativeEvent.position)}
      onLayout={(e) => setHeight(e.nativeEvent.layout.width * 0.60818)}
      style={styles.carousel}
    >
      <CarouselPage key="1" isFirstPage onPressPageButton={onPress}>
        <CarouselImage source={InfographicOne} />
        <CarouselText pageNumber={1}>
          {dictionary["welcomeScreen.carousel.pageOne"]}
        </CarouselText>
      </CarouselPage>
      <CarouselPage key="2" onPressPageButton={onPress}>
        <CarouselImage source={InfographicTwo} />
        <CarouselText pageNumber={2}>
          {dictionary["welcomeScreen.carousel.pageTwo"]}
        </CarouselText>
      </CarouselPage>
      <CarouselPage key="3" isLastPage onPressPageButton={onPress}>
        <CarouselImage source={InfographicThree} />
        <CarouselText pageNumber={3}>
          {dictionary["welcomeScreen.carousel.pageThree"]}
        </CarouselText>
      </CarouselPage>
    </PagerView>
  );
};

const carouselStyles = EDSStyleSheet.create(
  (theme, height?: DimensionValue) => ({
    carousel: {
      height,
      width: "100%",
      backgroundColor: theme.colors.container.default,
      borderRadius: 4,
    },
  }),
);
