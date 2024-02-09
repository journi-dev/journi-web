import { Box, IconButton, Link, TextField, Typography } from "@mui/material";
import { truncateText } from "../../../../../../utils/Helpers";
import { useState } from "react";
import { Edit } from "@mui/icons-material";
import { useSelector } from "react-redux";

export default function Description() {
  const isDark = useSelector((state) => state.appearance.isDark);

  const [desc, setDesc] = useState("");
  const [showMoreDesc, setShowMoreDesc] = useState(false);
  const [isEditDescActive, setIsEditDescActive] = useState(false);

  const testDesc =
    "Tell us about your business. Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat vel rem odit! Repellat voluptatibus assumenda corrupti illo. Dignissimos, assumenda est numquam vel, magnam quos voluptatem amet adipisci accusamus nemo praesentium!";
  const descLimitLength = 50;
  const descMaxLength = 750;

  return (
    <Box className="hover-container" sx={{ mb: 1.5 }}>
      {/* Header and Button */}
      <Box className="flex-row-start" sx={{ mb: 0, alignItems: "center" }}>
        <Typography variant="subtitle1" sx={{ mr: 1 }}>
          Description
        </Typography>
        <IconButton
          size="small"
          className="icon-button"
          onClick={() => setIsEditDescActive(!isEditDescActive)}
        >
          <Edit fontSize="inherit" />
        </IconButton>
      </Box>

      {/* TextField and Text */}
      {isEditDescActive ? (
        <Box sx={{ mt: 1 }}>
          <TextField
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            fullWidth
            multiline
            placeholder="Tell us about your business."
            rows={4}
          />
          <Typography variant="caption">
            {desc.length} / {descMaxLength}
          </Typography>
        </Box>
      ) : (
        <Box>
          <Typography color="text.secondary" display="inline" sx={{ mr: 1 }}>
            {showMoreDesc ? testDesc : truncateText(testDesc, descLimitLength)}
          </Typography>
          {testDesc.length > descLimitLength && (
            <Link
              onClick={() => {
                setShowMoreDesc(!showMoreDesc);
              }}
              color={isDark ? "primary.main" : "text.primary"}
              underline="hover"
            >
              <Typography display="inline-block">
                {showMoreDesc ? "See less" : "See more"}
              </Typography>
            </Link>
          )}
        </Box>
      )}
    </Box>
  );
}
