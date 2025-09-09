"use client";

import React, { useEffect, useState } from "react";

import SettingsModel from "../SettingsModel";

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
    </>
  );
}

export default ModalProvider;
