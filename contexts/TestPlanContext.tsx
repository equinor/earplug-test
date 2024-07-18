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

export type TestPlanPage = {
  title: string;
  type: TestPlanPageType;
  ear?: Ear;
  withPlug?: boolean;
};

const TEST_PLAN = {
  WITHOUT_PLUGS: "withoutPlugs",
  WITH_PLUGS: "withPlugs",
  FULL: "full",
} as const;

type TestPlan = ObjectValues<typeof TEST_PLAN>;

type TestPlanContextType = {
  current: TestPlanPage;
  progress: number;
  increaseProgress: () => void;
  navigateNext: () => void;
  resetTestPlan: (testPlan: TestPlan) => void;
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

  const TEST_PLAN_WITHOUT_PLUGS = [
    TEST_PLAN_PAGES.WITHOUT_PLUG_LEFT_EAR,
    TEST_PLAN_PAGES.WITHOUT_PLUG_RIGHT_EAR,
  ];

  const TEST_PLAN_WITH_PLUGS = [
    TEST_PLAN_PAGES.TEST_WITH_PLUGS_INFO,
    TEST_PLAN_PAGES.WITH_PLUG_LEFT_EAR,
    TEST_PLAN_PAGES.WITH_PLUG_RIGHT_EAR,
  ];

  const TEST_PLAN_FULL = [...TEST_PLAN_WITHOUT_PLUGS, ...TEST_PLAN_WITH_PLUGS];

  return { TEST_PLAN_WITHOUT_PLUGS, TEST_PLAN_WITH_PLUGS, TEST_PLAN_FULL };
};

const getNumberOfTestPlanPages = (testPlan: TestPlanPage[]) => {
  let numberOfPages = 0;
  testPlan.forEach((testPlanPage) => {
    if (testPlanPage.type === TEST_PLAN_PAGE_TYPES.TEST) {
      numberOfPages += 2;
    } else {
      numberOfPages += 1;
    }
  });
  return numberOfPages;
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
  increaseProgress: noProviderErrorFn,
  navigateNext: noProviderErrorFn,
  resetTestPlan: noProviderErrorFn,
  setTestPlan: noProviderErrorFn,
});

type TestPlanProviderProps = PropsWithChildren;

export const TestPlanProvider = ({ children }: TestPlanProviderProps) => {
  const { TEST_PLAN_WITHOUT_PLUGS, TEST_PLAN_WITH_PLUGS, TEST_PLAN_FULL } =
    useTestPlanPages();
  const [testPlan, setTestPlan] = useState<TestPlanPage[]>(TEST_PLAN_FULL);
  const [testPlanIndex, setTestPlanIndex] = useState(0);
  const current = testPlan[testPlanIndex];
  const [pageNumber, setPageNumber] = useState(1);
  const { navigate } = useAttenuationAppNavigation();

  const increaseProgress = () => {
    setPageNumber((pageNumber) => pageNumber + 1);
  };

  const progress = pageNumber / getNumberOfTestPlanPages(testPlan);

  const resetTestPlan = (testPlan: TestPlan) => {
    let newTestPlan: TestPlanPage[] = [];
    setTestPlanIndex(0);
    setPageNumber(1);

    switch (testPlan) {
      case TEST_PLAN.WITHOUT_PLUGS:
        newTestPlan = TEST_PLAN_WITHOUT_PLUGS;
        break;
      case TEST_PLAN.WITH_PLUGS:
        newTestPlan = TEST_PLAN_WITH_PLUGS;
        break;
      case TEST_PLAN.FULL:
        newTestPlan = TEST_PLAN_FULL;
        break;
    }
    setTestPlan(newTestPlan);
  };

  const navigateNext = () => {
    if (testPlanIndex < testPlan.length - 1) {
      setTestPlanIndex((currentPageIndex) => currentPageIndex + 1);
      increaseProgress();
    } else {
      navigate("ResultScreen");
    }
  };

  return (
    <TestPlanContext.Provider
      value={{
        current,
        progress,
        increaseProgress,
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
