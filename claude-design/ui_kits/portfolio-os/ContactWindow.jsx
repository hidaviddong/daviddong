const { Input, Textarea, Label, Button } = window.HidaviddongDesignSystem_9acf6c;

function ContactWindow() {
  const [sent, setSent] = React.useState(false);
  return (
    <div style={{ width: 300, display: "flex", flexDirection: "column", gap: 10 }}>
      {sent ? (
        <div style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-body-md)" }}>Message sent. ✓</div>
      ) : (
        <>
          <div>
            <Label htmlFor="email">Your email</Label>
            <Input id="email" placeholder="you@example.com" />
          </div>
          <div>
            <Label htmlFor="msg">Message</Label>
            <Textarea id="msg" rows={4} placeholder="Say hi..." />
          </div>
          <Button variant="primary" onClick={() => setSent(true)}>Send</Button>
        </>
      )}
    </div>
  );
}
window.ContactWindow = ContactWindow;
