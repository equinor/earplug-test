import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { Ear, ObjectValues } from "../types";
import { useAttenuationAppNavigation } from "../navigation/useAttenuationAppNavigation";

export const TEST_PLAN_PAGE_TYPES = {
  TEST: "test",
  TEST_WITH_PLUGS_INFO: "testWithPlugsInfo",
} as const;

type TestPlanPageType = ObjectValues<typeof TEST_PLAN_PAGE_TYPES>;

type TestPlanPage = {
  title: string;
  type: TestPlanPageType;
};

type TestPlanContextType = {
  current: TestPlanPage;
  progress: number;
  navigateNext: () => void;
  setTestPlan: Dispatch<SetStateAction<TestPlanPage[]>>;
};

const getPlaySoundPageTitle = (ear: Ear, withPlug: boolean) => {
  const withOrWithout = withPlug ? "med" : "uten";
  const earName = ear === "left" ? "venstre" : "høyre";
  return `Lydtest ${earName} øre ${withOrWithout} propper`;
};

const TEST_PLAN_PAGES: Record<string, TestPlanPage> = {
  WITHOUT_PLUG_LEFT_EAR: {
    title: getPlaySoundPageTitle("left", false),
    type: TEST_PLAN_PAGE_TYPES.TEST,
  },
  WITHOUT_PLUG_RIGHT_EAR: {
    title: getPlaySoundPageTitle("right", false),
    type: TEST_PLAN_PAGE_TYPES.TEST,
  },
  TEST_WITH_PLUGS_INFO: {
    title: "Lydtest med propper",
    type: TEST_PLAN_PAGE_TYPES.TEST_WITH_PLUGS_INFO,
  },
  WITH_PLUG_LEFT_EAR: {
    title: getPlaySoundPageTitle("left", true),
    type: TEST_PLAN_PAGE_TYPES.TEST,
  },
  WITH_PLUG_RIGHT_EAR: {
    title: getPlaySoundPageTitle("right", true),
    type: TEST_PLAN_PAGE_TYPES.TEST,
  },
};

const noProviderErrorFn = () => {
  throw new Error("Please call this function within a TestPlanProvider");
};

const TestPlanContext = createContext<TestPlanContextType>({
  current: TEST_PLAN_PAGES.WITHOUT_PLUG_LEFT_EAR,
  progress: 0,
  navigateNext: noProviderErrorFn,
  setTestPlan: noProviderErrorFn,
});

type TestPlanProviderProps = {
  children: ReactNode;
};

export const TestPlanProvider = ({ children }: TestPlanProviderProps) => {
  const [testPlan, setTestPlan] = useState<TestPlanPage[]>([
    TEST_PLAN_PAGES.WITHOUT_PLUG_LEFT_EAR,
    TEST_PLAN_PAGES.WITHOUT_PLUG_RIGHT_EAR,
    TEST_PLAN_PAGES.TEST_WITH_PLUGS_INFO,
    TEST_PLAN_PAGES.WITH_PLUG_LEFT_EAR,
    TEST_PLAN_PAGES.WITH_PLUG_RIGHT_EAR,
  ]);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const current = testPlan[currentPageIndex];
  const progress = (currentPageIndex + 1) / testPlan.length;
  const { navigate } = useAttenuationAppNavigation();

  const navigateNext = () => {
    if (currentPageIndex < testPlan.length - 1) {
      setCurrentPageIndex((currentPageIndex) => currentPageIndex + 1);
    } else {
      navigate("ResultScreen");
    }
  };

  return (
    <TestPlanContext.Provider
      value={{
        current,
        progress,
        navigateNext,
        setTestPlan,
      }}
    >
      {children}
    </TestPlanContext.Provider>
  );
};

export const useTestPlan = () => useContext(TestPlanContext);
