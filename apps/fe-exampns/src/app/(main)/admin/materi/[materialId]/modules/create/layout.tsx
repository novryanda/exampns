// This layout strips out the main shell (sidebar, etc.) so the
// module-create page renders as a clean standalone page when opened
// in a new browser tab.
export default function ModuleCreateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
