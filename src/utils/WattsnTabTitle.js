import { useTranslation } from "react-i18next";

export const WattsnTabTitle = (newTitle) => {
  const { t } = useTranslation();
  return (document.title = `${t(newTitle)} | WATTSN by Journi`);
};
