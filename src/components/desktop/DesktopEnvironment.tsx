import React from "react";
import { useOS } from "../../context/OSContext";
import { TopBar } from "./TopBar";
import { Desktop } from "./Desktop";
import { Dock } from "./Dock";
import { Window } from "./Window";
import { CommandPalette } from "./CommandPalette";
import { NotificationsCenter } from "./NotificationsCenter";
import { AnimatePresence } from "framer-motion";
import { QuickSettings } from "./QuickSettings";

export const DesktopEnvironment: React.FC = () => {
  const { windows, theme } = useOS();

  return (
    <div className={`relative w-screen h-[100dvh] overflow-hidden select-none font-sans ${theme}`} style={{ background: "var(--surface-0)", color: "var(--text-primary)", fontFamily: "var(--font-sans)" }}>
      <TopBar />
      <Desktop />
      <AnimatePresence>
        {windows.map(win => (
          <Window key={win.id} windowState={win} />
        ))}
      </AnimatePresence>
      <Dock />
      <CommandPalette />
      <NotificationsCenter />
      <QuickSettings />
    </div>
  );
};

