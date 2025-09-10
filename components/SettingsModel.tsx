"use client";
import { RootState } from "@/store";
import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Dialog, DialogContent, DialogHeader } from "./ui/dialog";
import { toggleSettings } from "@/store/slices/misc.slice";
import { Label } from "./ui/label";
import { ModeToggle } from "./ModeToggle";

function SettingsModel() {
  const isOpen = useSelector((state: RootState) => state.misc.isSettingsOpen);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(toggleSettings(false));
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader className="border-b pb-3">
          <h2 className="text-lg font-medium ">My Settings</h2>
        </DialogHeader>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-1 ">
            <Label>Appearance</Label>
            <span className="text-[0.8rem] text-muted-foreground ">
              Customize how SlateX looks on your device
            </span>
          </div>
          <ModeToggle />
          
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default SettingsModel;
