import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { Ear, ObjectValues } from "../types";
import { useAttenuationAppNavigation } from "../navigation/useAttenuationAppNavigation";
import { useDictionary } from "../language";

export const TEST_PLAN_PAGE_TYPES = {
  TEST: "test",
  TEST_WITH_PLUGS_INFO: "testWithPlugsInfo",
  NOT_FOUND: "notFound",
} as const;

type TestPlanPageType = ObjectValues<typeof TEST_PLAN_PAGE_TYPES>;

type TestPlanPage = {
  title: string;
  type: TestPlanPageType;
  ear?: Ear;
  withPlug?: boolean;
};

type TestPlanContextType = {
  current: TestPlanPage;
  progress: number;
  navigateNext: () => void;
  resetTestPlan: () => void;
  setTestPlan: Dispatch<SetStateAction<TestPlanPage[]>>;
};

const useTestPlanPages = () => {
  const dictionary = useDictionary();
  const TEST_PLAN_PAGES: Record<string, TestPlanPage> = {
    WITHOUT_PLUG_LEFT_EAR: {
      title: dictionary["testScreen.title.withoutPlug.leftEar"],
      type: TEST_PLAN_PAGE_TYPES.TEST,
      ear: "left",
      withPlug: false,
    },
    WITHOUT_PLUG_RIGHT_EAR: {
      title: dictionary["testScreen.title.withoutPlug.rightEar"],
      type: TEST_PLAN_PAGE_TYPES.TEST,
      ear: "right",
      withPlug: false,
    },
    TEST_WITH_PLUGS_INFO: {
      title: dictionary["testScreen.title.testWithPlugsInfo"],
      type: TEST_PLAN_PAGE_TYPES.TEST_WITH_PLUGS_INFO,
    },
    WITH_PLUG_LEFT_EAR: {
      title: dictionary["testScreen.title.withPlug.leftEar"],
      type: TEST_PLAN_PAGE_TYPES.TEST,
      ear: "left",
      withPlug: true,
    },
    WITH_PLUG_RIGHT_EAR: {
      title: dictionary["testScreen.title.withPlug.rightEar"],
      type: TEST_PLAN_PAGE_TYPES.TEST,
      ear: "right",
      withPlug: true,
    },
  };

  const TEST_PLAN_FULL = [
    TEST_PLAN_PAGES.WITHOUT_PLUG_LEFT_EAR,
    TEST_PLAN_PAGES.WITHOUT_PLUG_RIGHT_EAR,
    TEST_PLAN_PAGES.TEST_WITH_PLUGS_INFO,
    TEST_PLAN_PAGES.WITH_PLUG_LEFT_EAR,
    TEST_PLAN_PAGES.WITH_PLUG_RIGHT_EAR,
  ];

  return { TEST_PLAN_FULL };
};

const noProviderErrorFn = () => {
  throw new Error("Please call this function within a TestPlanProvider");
};

const TestPlanContext = createContext<TestPlanContextType>({
  current: {
    title: "You need to use this inside of a TestPlanProvider",
    type: TEST_PLAN_PAGE_TYPES.NOT_FOUND,
  },
  progress: 0,
  navigateNext: noProviderErrorFn,
  resetTestPlan: noProviderErrorFn,
  setTestPlan: noProviderErrorFn,
});

type TestPlanProviderProps = PropsWithChildren;

export const TestPlanProvider = ({ children }: TestPlanProviderProps) => {
  const { TEST_PLAN_FULL } = useTestPlanPages();
  const [testPlan, setTestPlan] = useState<TestPlanPage[]>(TEST_PLAN_FULL);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const current = testPlan[currentPageIndex];
  const progress = (currentPageIndex + 1) / testPlan.length;
  const { navigate } = useAttenuationAppNavigation();

  const resetTestPlan = () => {
    setCurrentPageIndex(0);
    setTestPlan(TEST_PLAN_FULL);
  };

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
        resetTestPlan,
        setTestPlan,
      }}
    >
      {children}
    </TestPlanContext.Provider>
  );
};

export const useTestPlan = () => useContext(TestPlanContext);
