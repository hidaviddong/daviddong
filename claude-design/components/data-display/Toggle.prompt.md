Pressable button that stays sunken while active (bevel flips, not a color swap). `ToggleGroup` wraps several as single- or multi-select.

```jsx
<Toggle pressed={bold} onPressedChange={setBold}>B</Toggle>
<ToggleGroup value={align} onChange={setAlign} options={[{value:"left",label:"◀"},{value:"center",label:"■"},{value:"right",label:"▶"}]} />
```
