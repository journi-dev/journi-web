import { MoreVert } from "@mui/icons-material";
import { Box, Divider, IconButton, Paper, Skeleton } from "@mui/material";

export default function MenuCategoryLoadingCard({ itemCount }) {
  return (
    <Paper sx={{ p: 1.5 }}>
      <Box className="flex-row-space" sx={{ alignItems: "center" }}>
        <Skeleton width={200} height={30} sx={{ ml: 2, mb: 1 }} />
        <IconButton>
          <MoreVert />
        </IconButton>
      </Box>
      <Box>
        {Array(itemCount)
          .fill("")
          .map((item, i) => (
            <Box>
              {/* Menu Item */}
              <Box
                className="flex-row-space"
                sx={{ alignItems: "center", my: 1.25, mx: 1 }}
              >
                <Box className="flex-row-start" sx={{ alignItems: "baseline" }}>
                  <Box sx={{ width: 30, height: 30 }}>
                    <IconButton>
                      <MoreVert fontSize="small" />
                    </IconButton>
                  </Box>

                  {/* Menu Item Name */}
                  <Box sx={{ ml: 1 }}>
                    <Skeleton width={100} sx={{ ml: 2 }} />
                    <Skeleton width={150} height={15} sx={{ ml: 2, mb: 1 }} />
                  </Box>
                </Box>

                {/* Menu Item Price */}
                <Box className="flex-row-end" sx={{ ml: 3 }}>
                  <Box>
                    <Skeleton width={50} />
                    <Skeleton width={50} height={15} />
                  </Box>
                </Box>
              </Box>

              {/* Divider */}
              {i !== itemCount - 1 && <Divider sx={{ mx: 0 }} />}
            </Box>
          ))}
      </Box>
    </Paper>
  );
}
