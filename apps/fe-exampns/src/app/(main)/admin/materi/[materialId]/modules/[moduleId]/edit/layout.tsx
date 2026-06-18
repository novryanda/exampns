// This layout strips out the main shell (sidebar, etc.) so the
// module-edit page renders as a clean standalone page when opened
// in a new browser tab.
export default function ModuleEditLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
