import { Campaign } from "@mui/icons-material";
import { Container, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

export default function NoActiveOrUpcomingPromotionsYet() {
  const isDark = useSelector((state) => state.appearance.value.isDark);
  const { t } = useTranslation();
  return (
    <div>
      <Container
        className={`flex-col ${
          isDark ? "placeholder-dark" : "placeholder-light"
        }`}
        sx={{
          width: "40vw",
        }}
      >
        <div className="flex-row">
          <Campaign color="action" fontSize="large" />
        </div>
        <div className="flex-row">
          <Typography variant="h5" sx={{ my: 1 }}>
            {t("nothingHereYet")}
          </Typography>
        </div>
        <Typography textAlign="center">
          You currently don't have any active promotions or announcements.
          Promotions are a great way to attract and increase business, and
          announcements help keep your patrons informed!
        </Typography>
        <div className="flex-row">
          <Typography textAlign="center" sx={{ mt: 1 }}>
            Try creating either one today!
          </Typography>
        </div>
      </Container>
    </div>
  );
}
