const { Table, Badge } = window.HidaviddongDesignSystem_9acf6c;

const PROJECTS = [
  { name: { label: "retro-shell", tone: "success" }, type: "CLI", status: "active" },
  { name: { label: "aqua-ui-kit", tone: "primary" }, type: "React", status: "active" },
  { name: { label: "dial-up.fm", tone: "terminal" }, type: "Audio", status: "archived" },
];

function ProjectsWindow() {
  return (
    <div style={{ width: 380, fontFamily: "var(--font-body)" }}>
      <Table
        columns={[
          { key: "name", label: "Name" },
          { key: "type", label: "Type" },
          { key: "status", label: "Status" },
        ]}
        rows={PROJECTS.map((p) => ({
          name: <Badge tone={p.name.tone}>{p.name.label}</Badge>,
          type: p.type,
          status: p.status,
        }))}
      />
    </div>
  );
}
window.ProjectsWindow = ProjectsWindow;
