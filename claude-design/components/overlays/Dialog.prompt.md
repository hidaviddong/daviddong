Modal — a centered WindowFrame over a dimmed scrim. Covers shadcn's `dialog`, `alert-dialog`, and `sheet` (sheet is just a Dialog anchored to an edge in this system — use plain CSS positioning if needed, no separate component).

```jsx
<Dialog open={open} title="Delete file?" onClose={() => setOpen(false)} footer={<Button variant="destructive">Delete</Button>}>
  <p>This cannot be undone.</p>
</Dialog>
```
