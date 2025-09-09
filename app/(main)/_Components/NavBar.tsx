"use client";

import React from "react";

interface NavBarProps {
  isCollapsed: boolean;
  onResetWidth: () => void;
}
function NavBar({ isCollapsed, onResetWidth }: NavBarProps) {
  return <div>This is NavBar</div>;
}
export default NavBar;
