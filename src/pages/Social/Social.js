import React from "react";
import { WattsnTabTitle } from "../../utils/WattsnTabTitle";
import { useTranslation } from "react-i18next";

export default function Social() {
  WattsnTabTitle("social");
  const { t } = useTranslation();

  return <div>{t("social")}</div>;
}
