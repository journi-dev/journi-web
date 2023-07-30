import { RestaurantMenu } from "@mui/icons-material";
import { Container, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

export default function NoItemsPlaceholder() {
  const isDark = useSelector((state) => state.appearance.isDark);
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
          <RestaurantMenu color="action" fontSize="large" />
        </div>
        <div className="flex-row">
          <Typography variant="h5" sx={{ my: 1 }}>
            {t("nothingHereYet")}
          </Typography>
        </div>
        <Typography textAlign="center">
          You currently don't have any menu items. Thanks to WATTSN, you can
          create a menu to your liking and exact specifications. Your menu
          should be you on a plate! Not literally speaking.
        </Typography>
        <div className="flex-row">
          <Typography textAlign="center" sx={{ mt: 1 }}>
            Try making your menu today!
          </Typography>
        </div>
      </Container>
    </div>
  );
}
