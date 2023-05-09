import React from "react";
import { TabTitle } from "../utils/TabTitle";
import { useTranslation } from "react-i18next";

export default function Social() {
  TabTitle("social");
  const { t } = useTranslation();

  return <div>{t("social")}</div>;
}
