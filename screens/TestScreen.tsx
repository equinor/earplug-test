import {
  Button,
  CircularProgress,
  EDSStyleSheet,
  LinearProgress,
  Typography,
  useStyles,
} from "@equinor/mad-components";
import { SafeAreaView } from "react-native-safe-area-context";
import { ExitButton } from "../components/ExitButton/ExitButton";
import { TEST_PLAN_PAGE_TYPES, useTestPlan } from "../contexts/TestPlanContext";
import { useSound } from "../hooks/useSound";
import {
  SoundButton,
  SoundButtonProps,
} from "../components/VolumeButton/SoundButton";
import { useEffect, useRef, useState } from "react";
import { SoundButtonControls } from "../components/VolumeButton/types";
import { Image, ScrollView, View } from "react-native";
import soundIndicator from "../assets/sound-indicator.png";
import { useDictionary } from "../language";
import { useSystemVolume } from "../hooks/useSystemVolume";
import { useResults } from "../contexts/ResultsContext";
import { Title } from "../components/Title";
import insertEarplugs from "../assets/insert-earplugs.png";

export const TestScreen = () => {
  const styles = useStyles(themeStyles);
  const {
    current: { title, type, ear, withPlug },
    increaseProgress,
    navigateNext,
    progress,
  } = useTestPlan();
  const { isSoundLoaded, Sound } = useSound();
  const soundButtonRef = useRef<SoundButtonControls>(null);
  const [isVolumePage, setIsVolumePage] = useState(false);
  const dictionary = useDictionary();
  const {
    decreaseSystemVolume,
    increaseSystemVolume,
    resetSystemVolume,
    systemVolume,
  } = useSystemVolume();
  const { setEarVolumeResult: setResult } = useResults();

  useEffect(() => {
    resetSystemVolume();
  }, [resetSystemVolume]);

  const onPress: SoundButtonProps["onPress"] = (e) => {
    if (e.type === "play" && ear) {
      soundButtonRef.current?.setSoundButtonType("volume");
      increaseProgress();
      setIsVolumePage(true);
      Sound.playInLoop(ear);
    }

    if (e.type === "volume" && e.variant === "+") {
      increaseSystemVolume();
    }

    if (e.type === "volume" && e.variant === "-") {
      decreaseSystemVolume();
    }
  };

  const TestDescription = () => {
    if (type === TEST_PLAN_PAGE_TYPES.TEST && isVolumePage) {
      return <Image source={soundIndicator} />;
    }

    if (type === TEST_PLAN_PAGE_TYPES.TEST && !isVolumePage) {
      return (
        <Typography style={styles.description}>
          {dictionary["testScreen.testDescription"]}
        </Typography>
      );
    }
  };

  const BottomButton = () => {
    if (type === TEST_PLAN_PAGE_TYPES.TEST && isVolumePage) {
      return (
        <Button
          title={dictionary["testScreen.button.confirmVolume"]}
          onPress={() => {
            if (ear && typeof withPlug === "boolean") {
              soundButtonRef.current?.setSoundButtonType("play");
              setIsVolumePage(false);
              Sound.stop();
              setResult(
                ear,
                withPlug ? "withPlugs" : "withoutPlugs",
                systemVolume,
              );
              resetSystemVolume();
              navigateNext();
            }
          }}
        />
      );
    } else if (type === TEST_PLAN_PAGE_TYPES.TEST_WITH_PLUGS_INFO) {
      return (
        <Button
          title={dictionary["testScreen.button.continue"]}
          onPress={navigateNext}
        />
      );
    }
    return <Button title="" style={styles.invisible} />;
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {type === TEST_PLAN_PAGE_TYPES.NOT_FOUND ? (
        <Typography>{title}</Typography>
      ) : (
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.topSection}>
            <View style={styles.topContentContainer}>
              <LinearProgress value={progress} />
              <ExitButton style={styles.exitButton} />
              <Title>
                {isVolumePage
                  ? dictionary["testScreen.title.adjustVolume"]
                  : title}
              </Title>
            </View>
            <View style={styles.middleContentContainer}>
              {type === TEST_PLAN_PAGE_TYPES.TEST && isSoundLoaded ? (
                <>
                  <TestDescription />
                  <SoundButton ref={soundButtonRef} onPress={onPress} />
                </>
              ) : type === TEST_PLAN_PAGE_TYPES.TEST && !isSoundLoaded ? (
                <CircularProgress />
              ) : (
                <>
                  <Typography style={{ textAlign: "center" }}>
                    {dictionary["testScreen.description.insertEarplugs"]}
                  </Typography>
                  <Image
                    source={insertEarplugs}
                    resizeMode="contain"
                    style={styles.insertEarplugs}
                  />
                </>
              )}
            </View>
          </View>
          <View style={styles.bottomSection}>
            <BottomButton />
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const themeStyles = EDSStyleSheet.create((theme) => ({
  container: {
    flex: 1,
    paddingHorizontal: theme.spacing.container.paddingHorizontal,
    paddingVertical: theme.spacing.container.paddingVertical,
    justifyContent: "space-between",
  },
  topSection: { flex: 1, maxHeight: 800 },
  topContentContainer: { gap: 16 },
  exitButton: { alignSelf: "flex-end" },
  description: {
    textAlign: "center",
  },
  middleContentContainer: {
    flex: 1,
    paddingTop: 24,
    paddingBottom: 48,
    justifyContent: "space-between",
    alignItems: "center",
  },
  insertEarplugs: { width: "70%" },
  bottomSection: {
    justifyContent: "center",
    alignItems: "center",
  },
  invisible: {
    opacity: 0,
  },
}));
