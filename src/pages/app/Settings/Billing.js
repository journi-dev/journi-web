import { WatsonTabTitle } from "../../../utils/WatsonTabTitle";
import { Typography } from "@mui/material";
import { CustomButton } from "../../../components/ui/CustomComponents";

export default function Billing() {
  WatsonTabTitle("Billing Settings");
  return (
    <div>
      <Typography variant="h5">Billing</Typography>
      <CustomButton
        variant="contained"
        onClick={() => {
          fetch("/create-checkout-session", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              items: [
                { id: 1, quantity: 3 },
                { id: 2, quantity: 1 },
              ],
            }),
          })
            .then((res) => {
              if (res.ok) return res.json();
              return res.json().then((json) => Promise.reject(json));
            })
            .then(({ url }) => {
              // window.location = url;
              console.log(url);
            })
            .catch((err) => console.error(err));
        }}
      >
        Checkout
      </CustomButton>
    </div>
  );
}
