// This layout strips out the main shell (sidebar, etc.) so the
// module-questions page renders as a clean standalone page when opened
// in a new browser tab.
export default function ModuleQuestionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
