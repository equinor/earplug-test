import {
  Button,
  EDSStyleSheet,
  Typography,
  useStyles,
} from "@equinor/mad-components";
import { SafeAreaView, View } from "react-native";
import { BulletPoint } from "../components/BulletPoint";
import { Carousel } from "../components/Carousel/Carousel";
import { useDictionary } from "../language";
import { useAttenuationAppNavigation } from "../navigation/useAttenuationAppNavigation";
import { openEarPlugInstructionsURL } from "../utils/openEarPlugInstructionsURL";
import { Title } from "../components/Title";

export const WelcomeScreen = () => {
  const styles = useStyles(themeStyles);
  const { navigate } = useAttenuationAppNavigation();
  const dictionary = useDictionary();

  return (
    <SafeAreaView style={styles.container}>
      <Title>{dictionary["welcomeScreen.title"]}</Title>
      <Typography
        group="paragraph"
        variant="body_short"
        style={{ textAlign: "center" }}
      >
        {dictionary["welcomeScreen.description"]}
      </Typography>
      <View style={styles.carouselContainer}>
        <Typography group="paragraph" variant="body_short" bold>
          {dictionary["welcomeScreen.thisIsHowItWorks"]}:
        </Typography>
        <Carousel />
      </View>
      <View style={styles.tipContainer}>
        <Typography group="paragraph" variant="body_short" bold>
          {dictionary["welcomeScreen.tipsForBestResults"]}:
        </Typography>
        <BulletPoint>{dictionary["welcomeScreen.tip1"]}</BulletPoint>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          iconName="play-outline"
          title={dictionary["welcomeScreen.startTestButton"]}
          onPress={() => navigate("TestScreen")}
        />
        <Button
          variant="outlined"
          iconName="link"
          title={dictionary["welcomeScreen.earPlugInstructionsButton"]}
          onPress={openEarPlugInstructionsURL}
        />
      </View>
    </SafeAreaView>
  );
};

const themeStyles = EDSStyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.container.background,
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 24,
    marginVertical: 48,
    gap: 16,
  },
  buttonContainer: {
    alignItems: "center",
    gap: 8,
  },
  tipContainer: {
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 24,
  },
  carouselContainer: {
    alignItems: "center",
    gap: 8,
    width: "100%",
  },
}));
