import { ErrorOutline } from "@mui/icons-material";
import { Container, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

export default function ErrorPlaceholder({ code }) {
  const isDark = useSelector((state) => state.appearance.isDark);
  const { t } = useTranslation();
  return (
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
          {`${t("error")} (${code})`}
        </Typography>
      </div>
      <Typography textAlign="center">
        We hit a snag loading this info. Please refresh the page and try again.
      </Typography>
      <div className="flex-row">
        <Typography textAlign="center" sx={{ mt: 1 }}>
          If the issue persists, please contact our support team.
        </Typography>
      </div>
    </Container>
  );
}
