import React from "react";
import { useTranslation } from "react-i18next";
import { WatsonTabTitle } from "../../utils/WatsonTabTitle";

export default function Analytics() {
  WatsonTabTitle("analytics");
  const { t } = useTranslation();

  return <div>{t("analytics")}</div>;
}
