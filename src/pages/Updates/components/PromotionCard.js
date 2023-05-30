import {
  ContentCopy,
  ContentPasteGo,
  Delete,
  Edit,
  ExpandMore,
  MoreVert,
  PushPinOutlined,
  Share,
} from "@mui/icons-material";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Collapse,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
  styled,
} from "@mui/material";
import { red } from "@mui/material/colors";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

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

export default function PromotionCard(props) {
  const promoName = props.promoName;
  const promoCode = props.promoCode;
  const promoDesc = props.promoDesc;
  const username = props.username;
  const userImage = props.userImage;
  const [anchorEl, setAnchorEl] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const open = Boolean(anchorEl);

  const { t } = useTranslation();

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = (e) => {
    setAnchorEl(null);
  };

  const options = {
    updatePromotion: {
      name: "update",
      icon: <Edit color="action" />,
      action: () => {
        console.log(`Updating ${promoName}...`);
      },
    },
    copyPromoCode: {
      name: "copyPromoCode",
      icon: <ContentCopy color="action" />,
      action: () => {
        navigator.clipboard.writeText(promoCode);
      },
    },
    duplicatePromotion: {
      name: "duplicate",
      icon: <ContentPasteGo color="action" />,
      action: () => {
        console.log(`Duplicating ${promoName}...`);
      },
    },
    deletePromotion: {
      name: "delete",
      icon: <Delete color="action" />,
      action: () => {
        console.log(`Deleting ${promoName}...`);
      },
    },
  };

  return (
    <div>
      <Card sx={{ maxWidth: 345 }}>
        <CardHeader
          avatar={
            <Tooltip title={`@${username}`}>
              <Avatar
                alt={username}
                src={userImage}
                sx={{ bgcolor: red[500] }}
              />
            </Tooltip>
          }
          action={
            <IconButton onClick={handleClick}>
              <MoreVert />
            </IconButton>
          }
          title={promoName}
          subheader={`Get $##.## off with the code ${promoCode}`}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {promoDesc}
          </Typography>
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
            <Typography>Start Date: m/d/yyyy</Typography>
            <Typography>End Date: m/d/yyyy</Typography>
          </CardContent>
        </Collapse>
      </Card>

      {/* Promotion Card Menu */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {Object.keys(options).map((item) => (
          <MenuItem
            dense
            key={item}
            type="submit"
            onClick={() => {
              options[item].action();
              handleClose();
            }}
          >
            <ListItemIcon>{options[item].icon}</ListItemIcon>
            {t(options[item].name)}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
