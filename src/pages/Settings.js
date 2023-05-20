import React, { useEffect, useState } from "react";
import { TabTitle } from "../utils/TabTitle";
import { Box, Typography } from "@mui/material";
import GiftCardSettings from "../components/GiftCardSettings";
import { useTranslation } from "react-i18next";
import { storage } from "../utils/Firebase";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";

export default function Settings() {
  TabTitle("settings");
  const { t } = useTranslation();
  const imageListRef = ref(storage, "projectFiles");

  const uploadFile = async () => {
    if (!fileUpload) return;
    const imageRef = ref(storage, `projectFiles/${fileUpload.name}`);
    try {
      await uploadBytes(imageRef, fileUpload).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          setImageList((prev) => [...prev, url]);
        });
      });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    listAll(imageListRef).then((res) => {
      res.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageList((prev) => [...prev, url]);
        });
      });
    });
  }, []);

  const [fileUpload, setFileUpload] = useState(null);
  const [imageList, setImageList] = useState([]);

  return (
    <Box>
      <Typography variant="h5">{t("settings")}</Typography>
      <GiftCardSettings />

      <div>
        <input type="file" onChange={(e) => setFileUpload(e.target.files[0])} />
        <button onClick={uploadFile}>Upload</button>
        {imageList.map((url) => {
          return <img src={url} />;
        })}
      </div>
    </Box>
  );
}
