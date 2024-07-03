import { useRef, useState } from "react";
import PagerView from "react-native-pager-view";
import { CarouselImage } from "./CarouselImage";
import { CarouselPage } from "./CarouselPage";
import { CarouselText } from "./CarouselText";
import InfographicOne from "../../assets/infographic-1.png";
import InfographicTwo from "../../assets/infographic-2.png";
import InfographicThree from "../../assets/infographic-3.png";

export const Carousel = () => {
  const pagerViewRef = useRef<PagerView>(null);
  const [selectedPageIndex, setSelectedPageIndex] = useState(0);
  const [height, setHeight] = useState(0);
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
      style={{
        height,
        width: "100%",
        backgroundColor: "#FFFFFF",
        borderRadius: 4,
      }}
    >
      <CarouselPage key="1" isFirstPage onPressPageButton={onPress}>
        <CarouselImage source={InfographicOne} />
        <CarouselText>
          1. Du vil først teste hørselen din uten ørepropper og så med
          ørepropper.
        </CarouselText>
      </CarouselPage>
      <CarouselPage key="2" onPressPageButton={onPress}>
        <CarouselImage source={InfographicTwo} />
        <CarouselText>2. Forskjellen i dB er dempingen.</CarouselText>
      </CarouselPage>
      <CarouselPage key="3" isLastPage onPressPageButton={onPress}>
        <CarouselImage source={InfographicThree} />
        <CarouselText>
          3. For å få godkjent testen, så må du oppnå en demping på minimum 16dB
          i hvert øre.
        </CarouselText>
      </CarouselPage>
    </PagerView>
  );
};
