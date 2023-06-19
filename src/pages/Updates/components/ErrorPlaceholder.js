import { ErrorOutline } from "@mui/icons-material";
import { Container, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

export default function ErrorPlaceholder() {
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
          <ErrorOutline color="action" fontSize="large" />
        </div>
        <div className="flex-row">
          <Typography variant="h5" sx={{ my: 1 }}>
            {`${t("error")} (500)`}
          </Typography>
        </div>
        <Typography textAlign="center">
          It looks like there was an error loading this info. Please refresh the
          page and try again.
        </Typography>
        <div className="flex-row">
          <Typography textAlign="center" sx={{ mt: 1 }}>
            If the issue persists, please contact our support team.
          </Typography>
        </div>
      </Container>
    </div>
  );
}
