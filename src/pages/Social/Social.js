import React from "react";
import { WatsonTabTitle } from "../../utils/WatsonTabTitle";
import { useTranslation } from "react-i18next";

export default function Social() {
  WatsonTabTitle("social");
  const { t } = useTranslation();

  return <div>{t("social")}</div>;
}
