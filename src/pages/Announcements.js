import React from "react";
import { TabTitle } from "../utils/TabTitle";
import { useTranslation } from "react-i18next";

export default function Announcements() {
  TabTitle("announcements");
  const { t } = useTranslation();

  return <div>{t("announcements")}</div>;
}
