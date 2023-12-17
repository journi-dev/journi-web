import { DarkMode, LightMode, SettingsBrightness } from "@mui/icons-material";
import { AmericanFlag, SpanishFlag } from "../components/icons/CircleFlags";
import { enUS, es } from "date-fns/locale";

export const languages = {
  "en-US": {
    code: "en-US",
    icon: <AmericanFlag />,
    locale: enUS,
    name: "english",
  },
  es: {
    code: "es",
    icon: <SpanishFlag />,
    locale: es,
    name: "spanish",
  },
  // "pl": { code: "pl", name: "polish", nativeName: "Polish", icon: <PolishFlag /> },
  // "cn": { code: "cn", name: "chinese", nativeName: "Chinese", icon: <ChineseFlag /> },
};
export const appearances = {
  light: { name: "light", icon: <LightMode color="buttonTextColor" /> },
  dark: { name: "dark", icon: <DarkMode color="buttonTextColor" /> },
  system: {
    name: "system",
    icon: <SettingsBrightness color="buttonTextColor" />,
  },
};
