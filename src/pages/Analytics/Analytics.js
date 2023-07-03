import React from "react";
import { useTranslation } from "react-i18next";
import { WattsnTabTitle } from "../../utils/WattsnTabTitle";

export default function Analytics() {
  WattsnTabTitle("analytics");
  const { t } = useTranslation();

  return <div>{t("analytics")}</div>;
}
