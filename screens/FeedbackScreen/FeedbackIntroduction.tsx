import { Typography } from "@equinor/mad-components";
import { Title } from "../../components/Title";
import { useDictionary } from "../../language";

export const FeedbackIntroduction = () => {
  const dictionary = useDictionary();
  return (
    <>
      <Title>{dictionary["feedbackScreen.title"]}</Title>
      <Typography group="paragraph" variant="body_short" bold>
        {dictionary["feedbackScreen.helpUsImprove"]}
      </Typography>
    </>
  );
};
