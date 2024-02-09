import { Box, Tooltip, Typography } from "@mui/material";
import Facebook from "../../../../../components/icons/Facebook";
import {
  Cancel,
  CheckCircle,
  ErrorOutlined,
  Instagram,
} from "@mui/icons-material";
import { useSelector } from "react-redux";
import {
  ThreadsDark,
  ThreadsLight,
} from "../../../../../components/icons/Threads";
import { XDark, XLight } from "../../../../../components/icons/X";
import { TikTokDark, TikTokLight } from "../../../../../components/icons/TikTok";

export default function Platforms() {
  const isDark = useSelector((state) => state.appearance.isDark);
  const iconSize = 50;

  return (
    <div>
      <Typography variant="h6">Platforms</Typography>
      <Typography variant="subtitle1">Social Platforms</Typography>
      <Typography variant="subtitle1">Business Platforms</Typography>

      {/* Social Platforms */}
      <Box className="flex-row" gap={2}>
        {/* Facebook */}
        <Box className="flex-col" sx={{ alignItems: "center" }}>
          <Facebook width={iconSize} height={iconSize} />
          <Typography variant="caption" fontWeight="bold" sx={{ mt: 0.5 }}>
            Facebook
          </Typography>

          <Tooltip title="Not connected">
            <Cancel color="error" fontSize="small" />
          </Tooltip>
        </Box>

        {/* Instagram */}
        <Box className="flex-col" sx={{ alignItems: "center" }}>
          <Box
            className="instagram"
            sx={{
              justifyContent: "center",
              alignItems: "center",
              width: iconSize,
              height: iconSize,
              borderRadius: iconSize / 2,
            }}
          >
            <Instagram
              sx={{ width: iconSize, height: iconSize, p: 0.5, color: "white" }}
            />
          </Box>
          <Typography variant="caption" fontWeight="bold" sx={{ mt: 0.5 }}>
            Instagram
          </Typography>

          <Tooltip title="Connected">
            <ErrorOutlined color="warning" fontSize="small" />
          </Tooltip>
        </Box>

        {/* Threads */}
        <Box className="flex-col" sx={{ alignItems: "center" }}>
          {isDark ? (
            <ThreadsDark width={iconSize} height={iconSize} />
          ) : (
            <ThreadsLight width={iconSize} height={iconSize} />
          )}
          <Typography variant="caption" fontWeight="bold" sx={{ mt: 0.5 }}>
            Threads
          </Typography>

          <Tooltip title="Connected">
            <CheckCircle color="success" fontSize="small" />
          </Tooltip>
        </Box>

        {/* TikTok */}
        <Box className="flex-col" sx={{ alignItems: "center" }}>
          {isDark ? (
            <TikTokDark width={iconSize} height={iconSize} />
          ) : (
            <TikTokLight width={iconSize} height={iconSize} />
          )}
          <Typography variant="caption" fontWeight="bold" sx={{ mt: 0.5 }}>
            TikTok
          </Typography>

          <Tooltip title="Connected">
            <CheckCircle color="success" fontSize="small" />
          </Tooltip>
        </Box>

        {/* X/Twitter */}
        <Box className="flex-col" sx={{ alignItems: "center" }}>
          {isDark ? (
            <XDark width={iconSize} height={iconSize} />
          ) : (
            <XLight width={iconSize} height={iconSize} />
          )}
          <Typography variant="caption" fontWeight="bold" sx={{ mt: 0.5 }}>
            X / Twitter
          </Typography>

          <Tooltip title="Connected">
            <CheckCircle color="success" fontSize="small" />
          </Tooltip>
        </Box>
      </Box>

      <Typography>
        fb, x, ig, threads, tiktok, sc, yt, uber eats, doordash, grubhub
        Reconnect not set up
      </Typography>
    </div>
  );
}
