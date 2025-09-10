"use client";

import React, { useEffect, useState } from "react";

import SettingsModel from "../SettingsModel";
import GallaryUploadModal from "../GallaryUploadModal";

function ModalProvider() {
  const [isMounted, setIsMpunted] = useState(false);

  useEffect(() => {
    setIsMpunted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <>
      <SettingsModel />
      <GallaryUploadModal />
    </>
  );
}

export default ModalProvider;
