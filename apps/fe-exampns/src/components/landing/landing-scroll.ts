export function scrollToLandingSection(href: string) {
  const id = href.startsWith("#") ? href.slice(1) : href;
  if (!id) return;

  const target = document.getElementById(id);
  if (!target) return;

  target.scrollIntoView({ behavior: "smooth", block: "start" });
  window.history.replaceState(null, "", `#${id}`);
}
