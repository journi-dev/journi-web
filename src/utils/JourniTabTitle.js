import { useTranslation } from "react-i18next";

export const JourniTabTitle = (newTitle) => {
  const { t } = useTranslation();
  return (document.title = `${t(newTitle)} | Journi`);
};
