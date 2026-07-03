Beveled 3D push-button — the base interactive control, used for every clickable action in the system.

```jsx
<Button variant="primary" onClick={() => save()}>Save</Button>
<Button variant="outline">Cancel</Button>
<Button variant="destructive">Delete</Button>
```

Variants: `default` (white/gray gloss pill), `primary` (Aqua gloss blue, for the one primary action), `outline`, `ghost` (flat, no gloss — for toolbars), `destructive` (muted red), `link` (underlined blue text, no chrome).
Sizes: `default`, `sm`, `lg`, `icon` (square, for icon-only toolbar buttons).
Press state dims slightly (opacity), not a positional shift — real Aqua buttons darken, they don't move.
