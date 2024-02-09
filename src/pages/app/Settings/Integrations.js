import { WatsonTabTitle } from "../../../utils/WatsonTabTitle";
import { Typography } from "@mui/material";

export default function Integrations() {
  WatsonTabTitle("Integration Settings");
  return (
    <div>
      <Typography variant="h5">Integrations</Typography>
      Facebook
      Instagram
      X
      Threads
      YouTube
      LinkedIn
      Yelp
      Uber Eats
      Doordash
      Grubhub
      Postmates
      Mailchimp
      Constant Contact
    </div>
  );
}
