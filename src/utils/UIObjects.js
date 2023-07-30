import { DarkMode, LightMode, SettingsBrightness } from "@mui/icons-material";
import { AmericanFlag, SpanishFlag } from "../components/icons/CircleFlags";

export const languages = {
  en: { name: "english", nativeName: "English", icon: <AmericanFlag /> },
  es: { name: "spanish", nativeName: "Spanish", icon: <SpanishFlag /> },
  // pl: { name: "polish", nativeName: "Polish", icon: <PolishFlag /> },
  // cn: { name: "chinese", nativeName: "Chinese", icon: <ChineseFlag /> },
};
export const appearances = {
  light: { name: "light", icon: <LightMode color="action" /> },
  dark: { name: "dark", icon: <DarkMode color="action" /> },
  system: {
    name: "system",
    icon: <SettingsBrightness color="action" />,
  },
};
