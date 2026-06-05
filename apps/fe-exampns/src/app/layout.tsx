import type { ReactNode } from "react";

import type { Metadata } from "next";

import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { APP_CONFIG } from "@/config/app-config";
import { fontVars } from "@/lib/fonts/registry";
import { cn } from "@/lib/utils";
import { getServerLayoutPreferences } from "@/server/layout-preferences";
import { PreferencesStoreProvider } from "@/stores/preferences/preferences-provider";

import "./globals.css";

export const metadata: Metadata = {
  title: APP_CONFIG.meta.title,
  description: APP_CONFIG.meta.description,
};

export default async function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  const prefs = await getServerLayoutPreferences();

  return (
    <html
      lang="en"
      className={cn(prefs.resolvedThemeMode === "dark" && "dark")}
      style={{ colorScheme: prefs.resolvedThemeMode }}
      data-theme-mode={prefs.theme_mode}
      data-theme-preset={prefs.theme_preset}
      data-content-layout={prefs.content_layout}
      data-navbar-style={prefs.navbar_style}
      data-sidebar-variant={prefs.sidebar_variant}
      data-sidebar-collapsible={prefs.sidebar_collapsible}
      data-font={prefs.font}
      suppressHydrationWarning
    >
      <body className={`${fontVars} min-h-screen antialiased`}>
        <TooltipProvider>
          <PreferencesStoreProvider
            themeMode={prefs.theme_mode}
            themePreset={prefs.theme_preset}
            contentLayout={prefs.content_layout}
            navbarStyle={prefs.navbar_style}
            font={prefs.font}
          >
            {children}
            <Toaster />
          </PreferencesStoreProvider>
        </TooltipProvider>
      </body>
    </html>
  );
}
