import React from "react";
import { WattsnTabTitle } from "../../utils/WattsnTabTitle";
import { useTranslation } from "react-i18next";

export default function Support() {
  WattsnTabTitle("support");
  const { t } = useTranslation();

  return <div>{t("support")}</div>;
}
