import { WatsonTabTitle } from "../../../utils/WatsonTabTitle";
import { useTranslation } from "react-i18next";

export default function Analytics() {
  WatsonTabTitle("analytics");
  const { t } = useTranslation();
  return <div>{t("analytics")}</div>;
}
