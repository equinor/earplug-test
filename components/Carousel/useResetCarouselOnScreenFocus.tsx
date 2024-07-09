import { useEffect } from "react";
import { useAttenuationAppNavigation } from "../../navigation/useAttenuationAppNavigation";
import PagerView from "react-native-pager-view";

export const useResetCarouselOnScreenFocus = (
  pagerViewRef: React.RefObject<PagerView>,
) => {
  const navigation = useAttenuationAppNavigation();
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      pagerViewRef.current?.setPageWithoutAnimation(0);
    });
    return unsubscribe;
  }, [navigation, pagerViewRef]);
};
