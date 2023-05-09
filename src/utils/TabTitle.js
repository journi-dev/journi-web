import { useTranslation } from "react-i18next";

export const TabTitle = (newTitle) => {
  const { t } = useTranslation();
  return (document.title = `${t(newTitle)} | Journi`);
};
