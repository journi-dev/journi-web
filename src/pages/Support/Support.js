import React from "react";
import { WatsonTabTitle } from "../../utils/WatsonTabTitle";
import { useTranslation } from "react-i18next";

export default function Support() {
  WatsonTabTitle("support");
  const { t } = useTranslation();

  return <div>{t("support")}</div>;
}
