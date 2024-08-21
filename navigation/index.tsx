import { useToken } from "@equinor/mad-components";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ColorSchemeName } from "react-native";
import { ResultsProvider } from "../contexts/ResultsContext";
import { TestPlanProvider } from "../contexts/TestPlanContext";
import { ResultScreen } from "../screens/ResultScreen/ResultScreen";
import { TestScreen } from "../screens/TestScreen/TestScreen";
import { WelcomeScreen } from "../screens/WelcomeScreen";
import { RootStackParamList } from "./types";
import { FeedbackScreen } from "../screens/FeedbackScreen/FeedbackScreen";
import { FeedbackProvider } from "../contexts/FeedbackContext";

export type NavigationProps = { colorScheme: ColorSchemeName };

export function Navigation({ colorScheme }: NavigationProps) {
  const token = useToken();
  return (
    <NavigationContainer
      theme={{
        dark: colorScheme === "dark",
        colors: {
          primary: token.colors.interactive.primary,
          background: token.colors.container.background,
          card: token.colors.container.default,
          text: token.colors.text.primary,
          border: token.colors.border.medium,
          notification: token.colors.interactive.primary,
        },
      }}
    >
      <FeedbackProvider>
        <ResultsProvider>
          <TestPlanProvider>
            <RootNavigator />
          </TestPlanProvider>
        </ResultsProvider>
      </FeedbackProvider>
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
      <Stack.Screen name="TestScreen" component={TestScreen} />
      <Stack.Screen name="ResultScreen" component={ResultScreen} />
      <Stack.Screen name="FeedbackScreen" component={FeedbackScreen} />
    </Stack.Navigator>
  );
}
