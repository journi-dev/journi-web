import { AddAPhoto } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

export default function AddPhotosBox({ height }) {
  const isDark = useSelector((state) => state.appearance.value.isDark);
  const { t } = useTranslation();
  return (
    <Box
      className={`flex-col ${
        isDark ? "placeholder-dark" : "placeholder-light"
      }`}
      sx={{ width: "100%", height, userSelect: "none" }}
    >
      <div className="flex-row">
        <AddAPhoto color="action" fontSize="large" />
      </div>
      <div className="flex-row">
        <Typography variant="h6" sx={{ mt: 1 }}>
          {t("addPhotos")}
        </Typography>
      </div>
      <div className="flex-row">
        <Typography variant="caption">{t("addPhotosDesc")}</Typography>
      </div>
    </Box>
  );
}
