Dropdown select. Closed state matches the sunken field look; open flyout is a frosted rounded menu with a solid Aqua-blue highlight on the active row (no soft hover fade — flat color swap).

```jsx
<Select
  value={sort}
  onChange={setSort}
  options={[{ value: "name", label: "Name" }, { value: "date", label: "Date" }]}
/>
```
