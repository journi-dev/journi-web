import React from "react";
import { TabTitle } from "../../utils/TabTitle";
import { useTranslation } from "react-i18next";

export default function Support() {
  TabTitle("support");
  const { t } = useTranslation();

  return <div>{t("support")}</div>;
}
