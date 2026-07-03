The core piece of chrome: a full window with a soft platinum-gradient titlebar, real Aqua traffic-light window controls (red/yellow/green, glyphs appear on hover), body, and optional status-bar footer. Dialog is built on top of this. Also the base "app window" for the desktop UI kit.

```jsx
<WindowFrame title="About This Mac" icon="💻" onClose={close} footer="3 items, 1.2 GB available">
  <p>Window body content…</p>
</WindowFrame>
```
Set `active={false}` for a background/unfocused window — the traffic lights go flat gray and the titlebar gradient flattens, exactly like real inactive Mac windows.
