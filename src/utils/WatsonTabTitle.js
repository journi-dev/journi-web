import { useTranslation } from "react-i18next";

export const WatsonTabTitle = (newTitle) => {
  const { t } = useTranslation();
  return (document.title = `${t(newTitle)} | WATSON by Journi`);
};
