import React from "react";
import { TabTitle } from "../utils/TabTitle";
import { useTranslation } from "react-i18next";

export default function Analytics() {
  TabTitle("analytics");
  const { t } = useTranslation();

  return <div>{t("analytics")}</div>;
}
