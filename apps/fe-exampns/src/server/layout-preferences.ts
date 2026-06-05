import { cookies } from "next/headers";

import { type FontKey, fontRegistry } from "@/lib/fonts/registry";
import {
  CONTENT_LAYOUT_VALUES,
  NAVBAR_STYLE_VALUES,
  SIDEBAR_COLLAPSIBLE_VALUES,
  SIDEBAR_VARIANT_VALUES,
} from "@/lib/preferences/layout";
import { PREFERENCE_DEFAULTS } from "@/lib/preferences/preferences-config";
import {
  THEME_MODE_VALUES,
  THEME_PRESET_VALUES,
  type ResolvedThemeMode,
  type ThemeMode,
} from "@/lib/preferences/theme";

const FONT_VALUES = Object.keys(fontRegistry) as FontKey[];

function readCookiePreference<T extends string>(
  value: string | undefined,
  allowed: readonly T[],
  fallback: T,
): T {
  const trimmed = value?.trim();
  return allowed.includes(trimmed as T) ? (trimmed as T) : fallback;
}

/** SSR cannot read OS color scheme; "system" resolves to light until client hydrates. */
export function resolveThemeModeForSSR(mode: ThemeMode): ResolvedThemeMode {
  return mode === "dark" ? "dark" : "light";
}

export async function getServerLayoutPreferences() {
  const cookieStore = await cookies();

  const theme_mode = readCookiePreference(
    cookieStore.get("theme_mode")?.value,
    THEME_MODE_VALUES,
    PREFERENCE_DEFAULTS.theme_mode,
  );
  const theme_preset = readCookiePreference(
    cookieStore.get("theme_preset")?.value,
    THEME_PRESET_VALUES,
    PREFERENCE_DEFAULTS.theme_preset,
  );
  const font = readCookiePreference(cookieStore.get("font")?.value, FONT_VALUES, PREFERENCE_DEFAULTS.font);
  const content_layout = readCookiePreference(
    cookieStore.get("content_layout")?.value,
    CONTENT_LAYOUT_VALUES,
    PREFERENCE_DEFAULTS.content_layout,
  );
  const navbar_style = readCookiePreference(
    cookieStore.get("navbar_style")?.value,
    NAVBAR_STYLE_VALUES,
    PREFERENCE_DEFAULTS.navbar_style,
  );
  const sidebar_variant = readCookiePreference(
    cookieStore.get("sidebar_variant")?.value,
    SIDEBAR_VARIANT_VALUES,
    PREFERENCE_DEFAULTS.sidebar_variant,
  );
  const sidebar_collapsible = readCookiePreference(
    cookieStore.get("sidebar_collapsible")?.value,
    SIDEBAR_COLLAPSIBLE_VALUES,
    PREFERENCE_DEFAULTS.sidebar_collapsible,
  );

  return {
    theme_mode,
    theme_preset,
    font,
    content_layout,
    navbar_style,
    sidebar_variant,
    sidebar_collapsible,
    resolvedThemeMode: resolveThemeModeForSSR(theme_mode),
  };
}
