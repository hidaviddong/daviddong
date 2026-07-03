Classic context/dropdown menu — a small frosted-glass rounded panel, solid Aqua-blue highlight on the active/hovered row, thin separators. Covers shadcn's `dropdown-menu` and `context-menu`.

```jsx
<DropdownMenu
  trigger={<Button>File</Button>}
  items={[{ label: "New", onSelect: create }, { separator: true }, { label: "Delete", danger: true, onSelect: del }]}
/>
```
