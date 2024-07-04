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
import { useRef, useState } from "react";
import { SoundButtonControls } from "../components/VolumeButton/types";
import { Image, ScrollView, View } from "react-native";
import soundIndicator from "../assets/sound-indicator.png";

const adjustVolumePageTitle =
  "Juster lydvolumet sakte til du akkurat kan høre tonen";

export const TestScreen = () => {
  const styles = useStyles(themeStyles);
  const {
    current: { title, type },
    navigateNext,
    progress,
  } = useTestPlan();
  const { isSoundLoaded, Sound } = useSound();
  const soundButtonRef = useRef<SoundButtonControls>(null);
  const [isVolumePage, setIsVolumePage] = useState(false);

  const onPress: SoundButtonProps["onPress"] = (e) => {
    if (e.type === "play") {
      soundButtonRef.current?.setSoundButtonType("volume");
      setIsVolumePage(true);
      Sound.playInLoop();
    }
  };

  const TestDescription = () => {
    if (type === TEST_PLAN_PAGE_TYPES.TEST && isVolumePage) {
      return <Image source={soundIndicator} />;
    }

    if (type === TEST_PLAN_PAGE_TYPES.TEST && !isVolumePage) {
      return (
        <Typography style={styles.description}>
          Sett headesettet på og klikk &apos;spill av&apos; for å starte
          lydtesten
        </Typography>
      );
    }
  };

  const BottomButton = () => {
    if (type === TEST_PLAN_PAGE_TYPES.TEST && isVolumePage) {
      return (
        <Button
          title="Bekreft volum"
          onPress={() => {
            soundButtonRef.current?.setSoundButtonType("play");
            setIsVolumePage(false);
            Sound.stop();
            navigateNext();
          }}
        />
      );
    } else if (type === TEST_PLAN_PAGE_TYPES.TEST_WITH_PLUGS_INFO) {
      return <Button title="Fortsett" onPress={navigateNext} />;
    }
    return <Button title="" style={{ opacity: 0 }} />;
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.topSection}>
          <View style={styles.topContentContainer}>
            <LinearProgress value={progress} />
            <ExitButton style={styles.exitButton} />
            <Typography variant="h2" color="primary" style={styles.title}>
              {isVolumePage ? adjustVolumePageTitle : title}
            </Typography>
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
              <Typography style={{ textAlign: "center" }}>
                Placeholder for test with plugs info
              </Typography>
            )}
          </View>
        </View>
        <View style={styles.bottomSection}>
          <BottomButton />
        </View>
      </ScrollView>
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
  title: {
    textAlign: "center",
  },
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
  bottomSection: {
    justifyContent: "center",
    alignItems: "center",
  },
}));
