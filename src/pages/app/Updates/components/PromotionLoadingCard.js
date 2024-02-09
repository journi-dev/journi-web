import {
  ExpandMore,
  MoreVert,
  PushPinOutlined,
  Share,
} from "@mui/icons-material";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Collapse,
  IconButton,
  Skeleton,
  styled,
} from "@mui/material";
import { useState } from "react";

const ExpandMoreSection = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton size="small" {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function PromotionLoadingCard() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div>
      <Card sx={{ maxWidth: 345 }}>
        <CardHeader
          avatar={<Skeleton variant="circular" width={40} height={40} />}
          action={
            <IconButton>
              <MoreVert />
            </IconButton>
          }
          title={<Skeleton variant="text" width={"100px"} />}
          subheader={<Skeleton variant="text" width={"200px"} />}
        />
        <CardContent>
          <Skeleton variant="text" width={"300px"} />
          <Skeleton variant="text" width={"200px"} />
        </CardContent>
        <CardActions disableSpacing>
          <IconButton size="small" sx={{ mr: 0.5 }}>
            <PushPinOutlined />
          </IconButton>
          <IconButton size="small">
            <Share />
          </IconButton>
          <ExpandMoreSection
            expand={expanded}
            onClick={() => setExpanded(!expanded)}
          >
            <ExpandMore />
          </ExpandMoreSection>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Skeleton variant="text" width={"300px"} />
            <Skeleton variant="text" width={"200px"} />
          </CardContent>
        </Collapse>
      </Card>
    </div>
  );
}
