import { Typography } from "@equinor/mad-components";
import { useDictionary } from "../../language";

export const InsertEarplugsDescription = () => {
  const dictionary = useDictionary();
  return (
    <Typography style={{ textAlign: "center" }}>
      {dictionary["testScreen.description.insertEarplugsOne"]}{" "}
      <Typography bold>
        {dictionary["testScreen.description.insertEarplugsTwo"]}{" "}
      </Typography>
      {dictionary["testScreen.description.insertEarplugsThree"]}
    </Typography>
  );
};
