/* @ds-bundle: {"format":4,"namespace":"HidaviddongDesignSystem_9acf6c","components":[{"name":"Avatar","sourcePath":"components/data-display/Avatar.jsx"},{"name":"Card","sourcePath":"components/data-display/Card.jsx"},{"name":"Kbd","sourcePath":"components/data-display/Kbd.jsx"},{"name":"Separator","sourcePath":"components/data-display/Separator.jsx"},{"name":"Table","sourcePath":"components/data-display/Table.jsx"},{"name":"Toggle","sourcePath":"components/data-display/Toggle.jsx"},{"name":"ToggleGroup","sourcePath":"components/data-display/Toggle.jsx"},{"name":"Alert","sourcePath":"components/feedback/Alert.jsx"},{"name":"Badge","sourcePath":"components/feedback/Badge.jsx"},{"name":"Progress","sourcePath":"components/feedback/Progress.jsx"},{"name":"Skeleton","sourcePath":"components/feedback/Skeleton.jsx"},{"name":"Spinner","sourcePath":"components/feedback/Spinner.jsx"},{"name":"Toast","sourcePath":"components/feedback/Toast.jsx"},{"name":"Button","sourcePath":"components/forms/Button.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Label","sourcePath":"components/forms/Label.jsx"},{"name":"RadioGroup","sourcePath":"components/forms/RadioGroup.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Slider","sourcePath":"components/forms/Slider.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"Textarea","sourcePath":"components/forms/Textarea.jsx"},{"name":"Accordion","sourcePath":"components/navigation/Accordion.jsx"},{"name":"Breadcrumb","sourcePath":"components/navigation/Breadcrumb.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"},{"name":"Dialog","sourcePath":"components/overlays/Dialog.jsx"},{"name":"DropdownMenu","sourcePath":"components/overlays/DropdownMenu.jsx"},{"name":"Popover","sourcePath":"components/overlays/Popover.jsx"},{"name":"Tooltip","sourcePath":"components/overlays/Tooltip.jsx"},{"name":"WindowFrame","sourcePath":"components/overlays/WindowFrame.jsx"}],"sourceHashes":{"components/data-display/Avatar.jsx":"25815b55a278","components/data-display/Card.jsx":"48cd5853685b","components/data-display/Kbd.jsx":"818f473ad634","components/data-display/Separator.jsx":"74c3db0f0f62","components/data-display/Table.jsx":"d7f8fb8382ae","components/data-display/Toggle.jsx":"aae6d126b61e","components/feedback/Alert.jsx":"ece4ec7de952","components/feedback/Badge.jsx":"5837b0171ee8","components/feedback/Progress.jsx":"297dcd1b0b13","components/feedback/Skeleton.jsx":"9c87cbdf573d","components/feedback/Spinner.jsx":"0efe867bc1fe","components/feedback/Toast.jsx":"5ac2124c0160","components/forms/Button.jsx":"18060947deb9","components/forms/Checkbox.jsx":"c96fccd3491d","components/forms/Input.jsx":"a5b591817ea6","components/forms/Label.jsx":"9d8ac55bf7ab","components/forms/RadioGroup.jsx":"93c94f30843c","components/forms/Select.jsx":"4aed9a2d9573","components/forms/Slider.jsx":"13e7c230d990","components/forms/Switch.jsx":"4e7deb906b85","components/forms/Textarea.jsx":"a08158864041","components/navigation/Accordion.jsx":"4712e416f0a1","components/navigation/Breadcrumb.jsx":"2fb7583c5642","components/navigation/Tabs.jsx":"5cc29ab376e2","components/overlays/Dialog.jsx":"9fa28bd44ae8","components/overlays/DropdownMenu.jsx":"863ea05e6ae8","components/overlays/Popover.jsx":"3ea955f4d362","components/overlays/Tooltip.jsx":"1766df50c48a","components/overlays/WindowFrame.jsx":"68a8f6cfa8be","components/retroStyles.js":"8f0a13d6ef0e","ui_kits/portfolio-os/AboutWindow.jsx":"5d454c60d947","ui_kits/portfolio-os/BlogWindow.jsx":"f6fac516dd59","ui_kits/portfolio-os/ContactWindow.jsx":"2203fcfa97cd","ui_kits/portfolio-os/Desktop.jsx":"0a730d20ee5e","ui_kits/portfolio-os/Dock.jsx":"261b4c133a64","ui_kits/portfolio-os/MenuBar.jsx":"9d97c04a9d84","ui_kits/portfolio-os/ProjectsWindow.jsx":"c7519f2d47b6","ui_kits/portfolio-os/TerminalWindow.jsx":"4dc3b1817013"},"inlinedExternals":[],"unexposedExports":[{"name":"bevelField","sourcePath":"components/retroStyles.js"},{"name":"bevelRaised","sourcePath":"components/retroStyles.js"},{"name":"bevelSunken","sourcePath":"components/retroStyles.js"},{"name":"bevelWindow","sourcePath":"components/retroStyles.js"},{"name":"buttonFace","sourcePath":"components/retroStyles.js"},{"name":"fieldFace","sourcePath":"components/retroStyles.js"},{"name":"fontBody","sourcePath":"components/retroStyles.js"},{"name":"fontChrome","sourcePath":"components/retroStyles.js"},{"name":"fontDisplay","sourcePath":"components/retroStyles.js"},{"name":"windowFace","sourcePath":"components/retroStyles.js"}]} */

(() => {

const __ds_ns = (window.HidaviddongDesignSystem_9acf6c = window.HidaviddongDesignSystem_9acf6c || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/data-display/Avatar.jsx
try { (() => {
function Avatar({
  src,
  alt = "",
  size = 32,
  fallback
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      width: size,
      height: size,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      background: "var(--gray-200)",
      boxShadow: "var(--bevel-window)",
      borderRadius: "var(--radius-md)",
      overflow: "hidden",
      fontFamily: "var(--font-chrome)",
      fontSize: size * 0.5,
      color: "var(--text-primary)",
      flexShrink: 0
    }
  }, src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: alt,
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover"
    }
  }) : fallback || "?");
}
Object.assign(__ds_scope, { Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data-display/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/data-display/Card.jsx
try { (() => {
function Card({
  title,
  children,
  footer,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--surface-window)",
      boxShadow: "var(--bevel-window)",
      borderRadius: "var(--radius-lg)",
      overflow: "hidden",
      fontFamily: "var(--font-ui)",
      ...style
    }
  }, title && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "8px 14px",
      background: "var(--surface-window-alt)",
      borderBottom: "1px solid var(--gray-300)",
      fontSize: "var(--text-chrome-md)",
      fontWeight: 600,
      color: "var(--text-primary)"
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 14
    }
  }, children), footer && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "8px 14px",
      borderTop: "1px solid var(--gray-300)",
      fontSize: "var(--text-body-sm)",
      color: "var(--text-secondary)"
    }
  }, footer));
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data-display/Card.jsx", error: String((e && e.message) || e) }); }

// components/data-display/Kbd.jsx
try { (() => {
// Real Mac modifier-key glyphs — ⌘ ⌥ ⇧ ⌃ ⏎ ⌫ — render as-is when passed as children,
// e.g. <Kbd>⌘</Kbd><Kbd>K</Kbd>.
function Kbd({
  children
}) {
  return /*#__PURE__*/React.createElement("kbd", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      minWidth: 20,
      height: 20,
      padding: "0 5px",
      fontFamily: "var(--font-ui)",
      fontSize: "var(--text-chrome-sm)",
      fontWeight: 500,
      background: "var(--gray-50)",
      boxShadow: "var(--bevel-raised)",
      borderRadius: "5px",
      color: "var(--text-primary)"
    }
  }, children);
}
Object.assign(__ds_scope, { Kbd });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data-display/Kbd.jsx", error: String((e && e.message) || e) }); }

// components/data-display/Separator.jsx
try { (() => {
function Separator({
  orientation = "horizontal"
}) {
  const horizontal = orientation === "horizontal";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: horizontal ? "100%" : 1,
      height: horizontal ? 1 : "100%",
      background: "var(--gray-300)"
    }
  });
}
Object.assign(__ds_scope, { Separator });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data-display/Separator.jsx", error: String((e && e.message) || e) }); }

// components/data-display/Table.jsx
try { (() => {
function Table({
  columns,
  rows
}) {
  return /*#__PURE__*/React.createElement("table", {
    style: {
      width: "100%",
      borderCollapse: "collapse",
      fontFamily: "var(--font-body)",
      fontSize: "var(--text-body-sm)",
      background: "var(--surface-inset)",
      boxShadow: "var(--bevel-window)",
      borderRadius: "var(--radius-md)",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, columns.map(c => /*#__PURE__*/React.createElement("th", {
    key: c.key,
    style: {
      textAlign: "left",
      padding: "6px 10px",
      background: "var(--surface-window-alt)",
      borderBottom: "1px solid var(--gray-300)",
      fontFamily: "var(--font-ui)",
      fontSize: "var(--text-chrome-sm)",
      fontWeight: 600,
      color: "var(--text-secondary)"
    }
  }, c.label)))), /*#__PURE__*/React.createElement("tbody", null, rows.map((row, i) => /*#__PURE__*/React.createElement("tr", {
    key: i,
    style: {
      background: i % 2 ? "var(--gray-50)" : "transparent"
    }
  }, columns.map(c => /*#__PURE__*/React.createElement("td", {
    key: c.key,
    style: {
      padding: "6px 10px",
      borderBottom: "1px solid var(--gray-200)",
      color: "var(--text-primary)"
    }
  }, row[c.key]))))));
}
Object.assign(__ds_scope, { Table });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data-display/Table.jsx", error: String((e && e.message) || e) }); }

// components/data-display/Toggle.jsx
try { (() => {
function Toggle({
  pressed,
  onPressedChange,
  children,
  disabled
}) {
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-pressed": pressed,
    disabled: disabled,
    onClick: () => onPressedChange && onPressedChange(!pressed),
    style: {
      padding: "3px 10px",
      fontFamily: "var(--font-chrome)",
      fontSize: "var(--text-chrome-sm)",
      background: "var(--gray-200)",
      boxShadow: pressed ? "var(--bevel-sunken)" : "var(--bevel-raised)",
      border: "none",
      color: disabled ? "var(--text-disabled)" : "var(--text-primary)",
      cursor: disabled ? "default" : "pointer",
      opacity: disabled ? 0.5 : 1
    }
  }, children);
}
function ToggleGroup({
  options,
  value,
  onChange,
  multiple = false
}) {
  const values = multiple ? value || [] : [value];
  function toggle(v) {
    if (!onChange) return;
    if (multiple) {
      onChange(values.includes(v) ? values.filter(x => x !== v) : [...values, v]);
    } else {
      onChange(v);
    }
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "inline-flex"
    }
  }, options.map(opt => /*#__PURE__*/React.createElement(Toggle, {
    key: opt.value,
    pressed: values.includes(opt.value),
    onPressedChange: () => toggle(opt.value)
  }, opt.label)));
}
Object.assign(__ds_scope, { Toggle, ToggleGroup });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data-display/Toggle.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Alert.jsx
try { (() => {
const TONES = {
  info: {
    bg: "var(--gray-200)",
    fg: "var(--text-primary)",
    icon: "ℹ"
  },
  success: {
    bg: "var(--state-success-bg)",
    fg: "var(--state-success)",
    icon: "✓"
  },
  warning: {
    bg: "var(--state-warning-bg)",
    fg: "var(--state-warning)",
    icon: "!"
  },
  danger: {
    bg: "var(--state-danger-bg)",
    fg: "var(--state-danger)",
    icon: "✕"
  }
};
function Alert({
  tone = "info",
  title,
  children
}) {
  const t = TONES[tone] || TONES.info;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10,
      padding: "10px 12px",
      background: t.bg,
      borderRadius: "var(--radius-md)",
      fontFamily: "var(--font-ui)",
      color: t.fg
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 16,
      lineHeight: 1.2
    }
  }, t.icon), /*#__PURE__*/React.createElement("div", null, title && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--text-chrome-sm)",
      fontWeight: 600,
      marginBottom: 2
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--text-body-sm)"
    }
  }, children)));
}
Object.assign(__ds_scope, { Alert });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Alert.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Badge.jsx
try { (() => {
const TONES = {
  default: {
    bg: "var(--gray-200)",
    fg: "var(--text-primary)"
  },
  primary: {
    bg: "var(--accent-500)",
    fg: "var(--text-on-accent)"
  },
  success: {
    bg: "var(--state-success-bg)",
    fg: "var(--state-success)"
  },
  warning: {
    bg: "var(--state-warning-bg)",
    fg: "var(--state-warning)"
  },
  danger: {
    bg: "var(--state-danger-bg)",
    fg: "var(--state-danger)"
  },
  terminal: {
    bg: "var(--terminal-bg)",
    fg: "var(--terminal-green)"
  }
};
function Badge({
  children,
  tone = "default"
}) {
  const t = TONES[tone] || TONES.default;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      padding: "2px 8px",
      fontFamily: "var(--font-ui)",
      fontSize: "var(--text-chrome-sm)",
      fontWeight: 600,
      letterSpacing: "var(--tracking-normal)",
      background: t.bg,
      color: t.fg,
      border: tone === "terminal" ? "1px solid var(--terminal-green-dim)" : "none",
      borderRadius: "var(--radius-pill)"
    }
  }, children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Badge.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Progress.jsx
try { (() => {
function Progress({
  value = 0,
  max = 100
}) {
  const pct = Math.max(0, Math.min(100, value / max * 100));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: "100%",
      height: 8,
      borderRadius: "var(--radius-pill)",
      background: "var(--gray-200)",
      boxShadow: "var(--bevel-sunken)",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      width: `${pct}%`,
      borderRadius: "var(--radius-pill)",
      background: `linear-gradient(to bottom, var(--accent-300), var(--accent-500))`,
      transition: `width var(--duration-normal) var(--ease-standard)`
    }
  }));
}
Object.assign(__ds_scope, { Progress });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Progress.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Skeleton.jsx
try { (() => {
function Skeleton({
  width = "100%",
  height = 14
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width,
      height,
      borderRadius: "var(--radius-sm)",
      background: "var(--gray-200)",
      animation: "hdd-skeleton-pulse 1.1s ease-in-out infinite"
    }
  });
}
Object.assign(__ds_scope, { Skeleton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Skeleton.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Spinner.jsx
try { (() => {
const TICKS = 8;

// The classic macOS indeterminate spinner: 8 radial ticks fading in sequence
// around a circle — not a spinning ring, and not a DOS/ASCII spinner.
function Spinner({
  size = 20
}) {
  const [frame, setFrame] = React.useState(0);
  React.useEffect(() => {
    const id = setInterval(() => setFrame(f => (f + 1) % TICKS), 100);
    return () => clearInterval(id);
  }, []);
  return /*#__PURE__*/React.createElement("span", {
    role: "img",
    "aria-label": "loading",
    style: {
      position: "relative",
      display: "inline-block",
      width: size,
      height: size
    }
  }, Array.from({
    length: TICKS
  }).map((_, i) => {
    const angle = 360 / TICKS * i;
    const distance = (i - frame + TICKS) % TICKS;
    const opacity = 1 - distance / TICKS;
    return /*#__PURE__*/React.createElement("span", {
      key: i,
      style: {
        position: "absolute",
        top: "50%",
        left: "50%",
        width: size * 0.09,
        height: size * 0.28,
        borderRadius: size * 0.045,
        background: "var(--text-secondary)",
        opacity: Math.max(0.15, opacity),
        transform: `translate(-50%, -${size * 0.42}px) rotate(${angle}deg)`,
        transformOrigin: `50% ${size * 0.42}px`
      }
    });
  }));
}
Object.assign(__ds_scope, { Spinner });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Spinner.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Toast.jsx
try { (() => {
const {
  useEffect
} = React;
function Toast({
  title,
  description,
  onClose,
  duration = 4000
}) {
  useEffect(() => {
    if (!onClose) return;
    const id = setTimeout(onClose, duration);
    return () => clearTimeout(id);
  }, [onClose, duration]);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10,
      alignItems: "flex-start",
      width: 280,
      padding: "12px 14px",
      background: "rgba(255,255,255,0.9)",
      backdropFilter: "blur(20px)",
      boxShadow: "var(--shadow-menu)",
      borderRadius: "var(--radius-lg)",
      fontFamily: "var(--font-ui)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--text-chrome-md)",
      fontWeight: 600,
      color: "var(--text-primary)"
    }
  }, title), description && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--text-body-sm)",
      color: "var(--text-secondary)",
      marginTop: 2
    }
  }, description)), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    "aria-label": "close",
    style: {
      width: 18,
      height: 18,
      borderRadius: "50%",
      background: "var(--gray-200)",
      border: "none",
      color: "var(--text-secondary)",
      fontSize: 10,
      lineHeight: 1,
      cursor: "pointer",
      flexShrink: 0
    }
  }, "\u2715"));
}
Object.assign(__ds_scope, { Toast });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Toast.jsx", error: String((e && e.message) || e) }); }

// components/forms/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useState
} = React;
const SIZES = {
  default: {
    height: 28,
    padding: "0 14px",
    font: "var(--text-chrome-md)"
  },
  sm: {
    height: 24,
    padding: "0 11px",
    font: "var(--text-chrome-sm)"
  },
  lg: {
    height: 34,
    padding: "0 18px",
    font: "var(--text-chrome-lg)"
  },
  icon: {
    height: 28,
    width: 28,
    padding: 0,
    font: "var(--text-chrome-md)"
  }
};
const VARIANTS = {
  default: {
    background: "var(--gray-50)",
    color: "var(--text-primary)"
  },
  primary: {
    background: "var(--accent-500)",
    color: "var(--text-on-accent)"
  },
  outline: {
    background: "var(--surface-inset)",
    color: "var(--text-primary)"
  },
  ghost: {
    background: "transparent",
    color: "var(--text-primary)",
    flat: true
  },
  destructive: {
    background: "var(--signal-red-bg)",
    color: "var(--signal-red)"
  },
  link: {
    background: "transparent",
    color: "var(--text-link)",
    flat: true,
    underline: true
  }
};
function Button({
  children,
  variant = "default",
  size = "default",
  disabled = false,
  onClick,
  style,
  ...rest
}) {
  const [pressed, setPressed] = useState(false);
  const v = VARIANTS[variant] || VARIANTS.default;
  const s = SIZES[size] || SIZES.default;
  const box = v.flat ? "none" : "var(--bevel-raised)";
  return /*#__PURE__*/React.createElement("button", _extends({
    disabled: disabled,
    onClick: onClick,
    onMouseDown: () => setPressed(true),
    onMouseUp: () => setPressed(false),
    onMouseLeave: () => setPressed(false),
    style: {
      position: "relative",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 6,
      height: s.height,
      width: s.width,
      padding: s.padding,
      fontFamily: "var(--font-chrome)",
      fontSize: s.font,
      fontWeight: 500,
      lineHeight: 1,
      letterSpacing: "var(--tracking-normal)",
      background: v.background,
      color: v.color,
      boxShadow: box,
      border: "none",
      borderRadius: "var(--radius-pill)",
      textDecoration: v.underline ? "underline" : "none",
      cursor: disabled ? "default" : "pointer",
      opacity: disabled ? 0.5 : pressed && !v.flat ? 0.85 : 1,
      overflow: "hidden",
      userSelect: "none",
      transition: `opacity var(--duration-fast) var(--ease-standard), box-shadow var(--duration-fast) var(--ease-standard)`,
      ...style
    }
  }, rest), !v.flat && /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: "absolute",
      inset: 0,
      borderRadius: "inherit",
      background: "var(--gloss-overlay)",
      pointerEvents: "none"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative"
    }
  }, children));
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Button.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function Checkbox({
  checked,
  onChange,
  disabled,
  label,
  id
}) {
  return /*#__PURE__*/React.createElement("label", {
    htmlFor: id,
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 7,
      fontFamily: "var(--font-ui)",
      fontSize: "var(--text-body-md)",
      color: disabled ? "var(--text-disabled)" : "var(--text-primary)",
      cursor: disabled ? "default" : "pointer",
      userSelect: "none"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 16,
      height: 16,
      flexShrink: 0,
      borderRadius: "4.5px",
      background: checked ? "var(--accent-primary)" : disabled ? "var(--gray-100)" : "var(--surface-inset)",
      boxShadow: checked ? "none" : "var(--bevel-field)",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "background var(--duration-fast) var(--ease-standard)"
    }
  }, checked && /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#fff",
      fontSize: 11,
      fontWeight: 700,
      lineHeight: 1
    }
  }, "\u2713")), /*#__PURE__*/React.createElement("input", {
    id: id,
    type: "checkbox",
    checked: checked,
    disabled: disabled,
    onChange: onChange,
    style: {
      position: "absolute",
      opacity: 0,
      width: 0,
      height: 0
    }
  }), label);
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Input({
  style,
  disabled,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("input", _extends({
    disabled: disabled,
    style: {
      height: 26,
      padding: "0 6px",
      fontFamily: "var(--font-body)",
      fontSize: "var(--text-body-md)",
      color: disabled ? "var(--text-disabled)" : "var(--text-primary)",
      background: disabled ? "var(--gray-100)" : "var(--surface-inset)",
      boxShadow: "var(--bevel-field)",
      border: "none",
      borderRadius: "var(--radius-md)",
      outline: "none",
      width: "100%",
      boxSizing: "border-box",
      transition: `box-shadow var(--duration-fast) var(--ease-standard)`,
      ...style
    },
    onFocus: e => e.target.style.boxShadow = "var(--bevel-field), var(--focus-ring)",
    onBlur: e => e.target.style.boxShadow = "var(--bevel-field)"
  }, rest));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Label.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Label({
  children,
  htmlFor,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("label", _extends({
    htmlFor: htmlFor,
    style: {
      fontFamily: "var(--font-chrome)",
      fontSize: "var(--text-chrome-sm)",
      color: "var(--text-primary)",
      display: "inline-block",
      marginBottom: 4,
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Label });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Label.jsx", error: String((e && e.message) || e) }); }

// components/forms/RadioGroup.jsx
try { (() => {
function RadioGroup({
  options,
  value,
  onChange,
  name = "radio-group",
  disabled
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 6
    }
  }, options.map(opt => {
    const id = `${name}-${opt.value}`;
    const checked = value === opt.value;
    return /*#__PURE__*/React.createElement("label", {
      key: opt.value,
      htmlFor: id,
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        fontFamily: "var(--font-body)",
        fontSize: "var(--text-body-md)",
        color: disabled ? "var(--text-disabled)" : "var(--text-primary)",
        cursor: disabled ? "default" : "pointer",
        userSelect: "none"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 14,
        height: 14,
        borderRadius: "50%",
        background: "var(--surface-inset)",
        boxShadow: "var(--bevel-field)",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0
      }
    }, checked && /*#__PURE__*/React.createElement("span", {
      style: {
        width: 7,
        height: 7,
        borderRadius: "50%",
        background: disabled ? "var(--text-disabled)" : "var(--accent-500)"
      }
    })), /*#__PURE__*/React.createElement("input", {
      id: id,
      type: "radio",
      name: name,
      checked: checked,
      disabled: disabled,
      onChange: () => onChange && onChange(opt.value),
      style: {
        position: "absolute",
        opacity: 0,
        width: 0,
        height: 0
      }
    }), opt.label);
  }));
}
Object.assign(__ds_scope, { RadioGroup });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/RadioGroup.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
const {
  useState,
  useRef,
  useEffect
} = React;
function Select({
  options,
  value,
  onChange,
  disabled,
  placeholder = "Select…"
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const selected = options.find(o => o.value === value);
  useEffect(() => {
    function onDoc(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    style: {
      position: "relative",
      display: "inline-block",
      width: 200,
      fontFamily: "var(--font-body)"
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    disabled: disabled,
    onClick: () => setOpen(o => !o),
    style: {
      width: "100%",
      height: 28,
      padding: "0 10px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      background: disabled ? "var(--gray-100)" : "var(--surface-inset)",
      boxShadow: "var(--bevel-field)",
      border: "none",
      borderRadius: "var(--radius-md)",
      color: disabled ? "var(--text-disabled)" : "var(--text-primary)",
      fontSize: "var(--text-body-md)",
      fontFamily: "var(--font-ui)",
      cursor: disabled ? "default" : "pointer"
    }
  }, /*#__PURE__*/React.createElement("span", null, selected ? selected.label : placeholder), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-secondary)",
      fontSize: 10
    }
  }, "\u25BE")), open && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: "calc(100% + 2px)",
      left: 0,
      right: 0,
      background: "rgba(250,250,252,0.95)",
      backdropFilter: "blur(20px)",
      boxShadow: "var(--shadow-menu)",
      borderRadius: "var(--radius-md)",
      padding: 4,
      zIndex: 10
    }
  }, options.map(opt => /*#__PURE__*/React.createElement("div", {
    key: opt.value,
    onClick: () => {
      onChange && onChange(opt.value);
      setOpen(false);
    },
    style: {
      padding: "5px 8px",
      borderRadius: "4px",
      fontSize: "var(--text-body-md)",
      color: "var(--text-primary)",
      background: opt.value === value ? "var(--accent-500)" : "transparent",
      cursor: "pointer",
      ...(opt.value === value ? {
        color: "var(--text-on-accent)"
      } : {})
    },
    onMouseEnter: e => {
      if (opt.value !== value) e.currentTarget.style.background = "var(--accent-100)";
    },
    onMouseLeave: e => {
      if (opt.value !== value) e.currentTarget.style.background = "transparent";
    }
  }, opt.label))));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Slider.jsx
try { (() => {
function Slider({
  value,
  min = 0,
  max = 100,
  step = 1,
  onChange,
  disabled
}) {
  const pct = (value - min) / (max - min) * 100;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: "100%",
      height: 20,
      display: "flex",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      right: 0,
      height: 4,
      borderRadius: "var(--radius-pill)",
      background: "var(--gray-300)",
      boxShadow: "var(--bevel-sunken)",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      width: `${pct}%`,
      background: "var(--accent-500)"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: `calc(${pct}% - 8px)`,
      width: 16,
      height: 16,
      background: "#ffffff",
      boxShadow: "0 1px 4px rgba(0,0,0,0.35)",
      borderRadius: "50%"
    }
  }), /*#__PURE__*/React.createElement("input", {
    type: "range",
    min: min,
    max: max,
    step: step,
    value: value,
    disabled: disabled,
    onChange: e => onChange && onChange(Number(e.target.value)),
    style: {
      position: "relative",
      width: "100%",
      opacity: 0,
      height: 20,
      cursor: disabled ? "default" : "pointer"
    }
  }));
}
Object.assign(__ds_scope, { Slider });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Slider.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function Switch({
  checked,
  onChange,
  disabled,
  id
}) {
  return /*#__PURE__*/React.createElement("button", {
    id: id,
    type: "button",
    role: "switch",
    "aria-checked": checked,
    disabled: disabled,
    onClick: () => onChange && onChange(!checked),
    style: {
      width: 40,
      height: 20,
      padding: 2,
      background: checked ? "var(--accent-500)" : "var(--gray-300)",
      boxShadow: "var(--bevel-sunken)",
      border: "none",
      borderRadius: "var(--radius-pill)",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: checked ? "flex-end" : "flex-start",
      cursor: disabled ? "default" : "pointer",
      opacity: disabled ? 0.5 : 1,
      transition: `background var(--duration-fast) var(--ease-standard)`
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 16,
      height: 16,
      background: "#ffffff",
      boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
      borderRadius: "50%",
      transition: `transform var(--duration-fast) var(--ease-standard)`
    }
  }));
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/forms/Textarea.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Textarea({
  style,
  disabled,
  rows = 4,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("textarea", _extends({
    disabled: disabled,
    rows: rows,
    style: {
      padding: "6px",
      fontFamily: "var(--font-body)",
      fontSize: "var(--text-body-md)",
      color: disabled ? "var(--text-disabled)" : "var(--text-primary)",
      background: disabled ? "var(--gray-100)" : "var(--surface-inset)",
      boxShadow: "var(--bevel-field)",
      border: "none",
      borderRadius: "var(--radius-md)",
      outline: "none",
      width: "100%",
      boxSizing: "border-box",
      resize: "vertical",
      transition: `box-shadow var(--duration-fast) var(--ease-standard)`,
      ...style
    },
    onFocus: e => e.target.style.boxShadow = "var(--bevel-field), var(--focus-ring)",
    onBlur: e => e.target.style.boxShadow = "var(--bevel-field)"
  }, rest));
}
Object.assign(__ds_scope, { Textarea });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Textarea.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Accordion.jsx
try { (() => {
const {
  useState
} = React;
function Accordion({
  items
}) {
  const [openIdx, setOpenIdx] = useState(0);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      background: "var(--surface-window)",
      borderRadius: "var(--radius-md)",
      boxShadow: "var(--bevel-window)",
      overflow: "hidden"
    }
  }, items.map((item, i) => {
    const open = openIdx === i;
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        borderTop: i > 0 ? "1px solid var(--gray-300)" : "none"
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => setOpenIdx(open ? -1 : i),
      style: {
        width: "100%",
        textAlign: "left",
        padding: "9px 14px",
        background: "transparent",
        border: "none",
        fontFamily: "var(--font-ui)",
        fontSize: "var(--text-chrome-md)",
        fontWeight: 500,
        color: "var(--text-primary)",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: 8
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: "inline-block",
        transform: open ? "rotate(90deg)" : "rotate(0deg)",
        transition: "transform var(--duration-fast) var(--ease-standard)",
        fontSize: 10,
        color: "var(--text-secondary)"
      }
    }, "\u25B6"), item.title), open && /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "0 14px 12px 34px",
        fontFamily: "var(--font-ui)",
        fontSize: "var(--text-body-sm)",
        color: "var(--text-secondary)"
      }
    }, item.content));
  }));
}
Object.assign(__ds_scope, { Accordion });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Accordion.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Breadcrumb.jsx
try { (() => {
function Breadcrumb({
  items
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 4,
      fontFamily: "var(--font-body)",
      fontSize: "var(--text-body-sm)"
    }
  }, items.map((item, i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: i
  }, i > 0 && /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-secondary)"
    }
  }, "\u25B8"), item.href ? /*#__PURE__*/React.createElement("a", {
    href: item.href,
    style: {
      color: "var(--text-link)",
      textDecoration: "underline"
    }
  }, item.label) : /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-primary)"
    }
  }, item.label))));
}
Object.assign(__ds_scope, { Breadcrumb });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Breadcrumb.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
function Tabs({
  tabs,
  value,
  onChange
}) {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "inline-flex",
      gap: 2,
      padding: 2,
      background: "var(--gray-200)",
      borderRadius: "var(--radius-md)",
      marginBottom: 10
    }
  }, tabs.map(t => {
    const active = t.value === value;
    return /*#__PURE__*/React.createElement("button", {
      key: t.value,
      onClick: () => onChange && onChange(t.value),
      style: {
        padding: "3px 14px",
        fontFamily: "var(--font-ui)",
        fontSize: "var(--text-chrome-md)",
        fontWeight: active ? 600 : 400,
        background: active ? "#ffffff" : "transparent",
        boxShadow: active ? "0 1px 3px rgba(0,0,0,0.2)" : "none",
        border: "none",
        borderRadius: "calc(var(--radius-md) - 2px)",
        color: "var(--text-primary)",
        cursor: "pointer",
        transition: "background var(--duration-fast) var(--ease-standard)"
      }
    }, t.label);
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--surface-window)",
      boxShadow: "var(--bevel-window)",
      borderRadius: "var(--radius-md)",
      padding: 14
    }
  }, tabs.find(t => t.value === value)?.content));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

// components/overlays/DropdownMenu.jsx
try { (() => {
function DropdownMenu({
  trigger,
  items
}) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);
  React.useEffect(() => {
    function onDoc(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    style: {
      position: "relative",
      display: "inline-block"
    }
  }, /*#__PURE__*/React.createElement("span", {
    onClick: () => setOpen(o => !o)
  }, trigger), open && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: "calc(100% + 2px)",
      left: 0,
      minWidth: 170,
      background: "rgba(250,250,252,0.9)",
      backdropFilter: "blur(20px)",
      boxShadow: "var(--shadow-menu)",
      borderRadius: "var(--radius-md)",
      padding: 5,
      zIndex: 30,
      fontFamily: "var(--font-ui)"
    }
  }, items.map((item, i) => item.separator ? /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      height: 1,
      background: "var(--gray-300)",
      margin: "4px 6px"
    }
  }) : /*#__PURE__*/React.createElement("div", {
    key: i,
    onClick: () => {
      item.onSelect && item.onSelect();
      setOpen(false);
    },
    style: {
      padding: "5px 10px",
      borderRadius: "4px",
      fontSize: "var(--text-body-md)",
      color: item.danger ? "var(--signal-red)" : "var(--text-primary)",
      cursor: "pointer"
    },
    onMouseEnter: e => (e.currentTarget.style.background = "var(--accent-500)", e.currentTarget.style.color = "var(--text-on-accent)"),
    onMouseLeave: e => (e.currentTarget.style.background = "transparent", e.currentTarget.style.color = item.danger ? "var(--signal-red)" : "var(--text-primary)")
  }, item.label))));
}
Object.assign(__ds_scope, { DropdownMenu });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/overlays/DropdownMenu.jsx", error: String((e && e.message) || e) }); }

// components/overlays/Popover.jsx
try { (() => {
function Popover({
  trigger,
  children,
  open: controlledOpen,
  onOpenChange
}) {
  const [internalOpen, setInternalOpen] = React.useState(false);
  const open = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const setOpen = onOpenChange || setInternalOpen;
  const ref = React.useRef(null);
  React.useEffect(() => {
    function onDoc(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    style: {
      position: "relative",
      display: "inline-block"
    }
  }, /*#__PURE__*/React.createElement("span", {
    onClick: () => setOpen(!open)
  }, trigger), open && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: "calc(100% + 4px)",
      left: 0,
      minWidth: 200,
      background: "rgba(250,250,252,0.9)",
      backdropFilter: "blur(20px)",
      boxShadow: "var(--shadow-menu)",
      borderRadius: "var(--radius-lg)",
      padding: 12,
      fontFamily: "var(--font-ui)",
      zIndex: 30
    }
  }, children));
}
Object.assign(__ds_scope, { Popover });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/overlays/Popover.jsx", error: String((e && e.message) || e) }); }

// components/overlays/Tooltip.jsx
try { (() => {
function Tooltip({
  children,
  label
}) {
  const [show, setShow] = React.useState(false);
  return /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      display: "inline-block"
    },
    onMouseEnter: () => setShow(true),
    onMouseLeave: () => setShow(false)
  }, children, show && /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      bottom: "calc(100% + 6px)",
      left: "50%",
      transform: "translateX(-50%)",
      background: "var(--surface-tooltip)",
      color: "var(--text-on-tooltip)",
      borderRadius: "5px",
      padding: "4px 8px",
      fontFamily: "var(--font-ui)",
      fontSize: "var(--text-body-xs)",
      whiteSpace: "nowrap",
      boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
      zIndex: 20
    }
  }, label));
}
Object.assign(__ds_scope, { Tooltip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/overlays/Tooltip.jsx", error: String((e && e.message) || e) }); }

// components/overlays/WindowFrame.jsx
try { (() => {
const DOT_GLYPH = {
  close: "✕",
  minimize: "−",
  zoom: "+"
};
function TrafficLight({
  kind,
  active,
  onClick
}) {
  const [hover, setHover] = React.useState(false);
  const colors = {
    close: {
      fill: "var(--traffic-red)",
      ring: "var(--traffic-red-ring)"
    },
    minimize: {
      fill: "var(--traffic-yellow)",
      ring: "var(--traffic-yellow-ring)"
    },
    zoom: {
      fill: "var(--traffic-green)",
      ring: "var(--traffic-green-ring)"
    }
  }[kind];
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    "aria-label": kind,
    style: {
      width: 12,
      height: 12,
      borderRadius: "50%",
      border: "none",
      padding: 0,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      background: active ? colors.fill : "var(--traffic-inactive)",
      boxShadow: active ? `inset 0 0 0 0.5px ${colors.ring}` : "inset 0 0 0 0.5px rgba(0,0,0,0.15)",
      cursor: "pointer",
      lineHeight: 1
    }
  }, hover && active && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 8,
      color: "rgba(0,0,0,0.55)",
      fontFamily: "var(--font-ui)",
      fontWeight: 700
    }
  }, DOT_GLYPH[kind]));
}
function WindowFrame({
  title,
  icon,
  children,
  width = 380,
  onClose,
  active = true,
  footer
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width,
      background: "var(--surface-window)",
      boxShadow: `var(--shadow-window), var(--bevel-window)`,
      borderRadius: "var(--radius-lg)",
      overflow: "hidden",
      fontFamily: "var(--font-ui)",
      display: "flex",
      flexDirection: "column"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: "var(--titlebar-height)",
      display: "flex",
      alignItems: "center",
      gap: 8,
      padding: "0 10px",
      background: active ? `linear-gradient(to bottom, var(--surface-titlebar-from), var(--surface-titlebar-to))` : `linear-gradient(to bottom, var(--surface-titlebar-inactive-from), var(--surface-titlebar-inactive-to))`,
      borderBottom: "1px solid rgba(0,0,0,0.15)",
      color: "var(--text-on-titlebar)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 7
    }
  }, /*#__PURE__*/React.createElement(TrafficLight, {
    kind: "close",
    active: active,
    onClick: onClose
  }), /*#__PURE__*/React.createElement(TrafficLight, {
    kind: "minimize",
    active: active,
    onClick: () => {}
  }), /*#__PURE__*/React.createElement(TrafficLight, {
    kind: "zoom",
    active: active,
    onClick: () => {}
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      textAlign: "center",
      fontSize: "var(--text-chrome-lg)",
      fontWeight: 600,
      marginRight: 54,
      /* balances the traffic-light cluster so title optically centers */
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
    }
  }, icon && /*#__PURE__*/React.createElement("span", {
    style: {
      marginRight: 6
    }
  }, icon), title)), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 14,
      flex: 1
    }
  }, children), footer && /*#__PURE__*/React.createElement("div", {
    style: {
      height: "var(--statusbar-height)",
      display: "flex",
      alignItems: "center",
      padding: "0 10px",
      borderTop: "1px solid var(--gray-300)",
      background: "var(--surface-window-alt)",
      fontSize: "var(--text-body-xs)",
      color: "var(--text-secondary)"
    }
  }, footer));
}
Object.assign(__ds_scope, { WindowFrame });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/overlays/WindowFrame.jsx", error: String((e && e.message) || e) }); }

// components/overlays/Dialog.jsx
try { (() => {
function Dialog({
  open,
  title,
  onClose,
  children,
  footer,
  width = 340
}) {
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.35)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 100
    },
    onClick: onClose
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement(__ds_scope.WindowFrame, {
    title: title,
    onClose: onClose,
    width: width,
    footer: footer
  }, children)));
}
Object.assign(__ds_scope, { Dialog });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/overlays/Dialog.jsx", error: String((e && e.message) || e) }); }

// components/retroStyles.js
try { (() => {
// Shared retro-OS style helpers used by every component in this design system.
// Not a component itself (no sibling .d.ts) — just a plain util module.

const bevelRaised = "var(--bevel-raised)";
const bevelSunken = "var(--bevel-sunken)";
const bevelWindow = "var(--bevel-window)";
const bevelField = "var(--bevel-field)";
const fontChrome = "var(--font-chrome)";
const fontBody = "var(--font-body)";
const fontDisplay = "var(--font-display)";

// Standard "3D button" look: face color + raised bevel, sunken on press.
function buttonFace({
  pressed = false,
  disabled = false
} = {}) {
  return {
    background: "var(--gray-200)",
    boxShadow: pressed ? bevelSunken : bevelRaised,
    border: "none",
    borderRadius: "var(--radius-md)",
    color: disabled ? "var(--text-disabled)" : "var(--text-primary)",
    fontFamily: fontChrome,
    cursor: disabled ? "default" : "pointer",
    opacity: disabled ? 0.6 : 1
  };
}
function fieldFace({
  disabled = false
} = {}) {
  return {
    background: disabled ? "var(--gray-100)" : "var(--surface-inset)",
    boxShadow: bevelField,
    border: "none",
    borderRadius: "var(--radius-sm)",
    color: "var(--text-primary)",
    fontFamily: fontBody
  };
}
function windowFace() {
  return {
    background: "var(--surface-window)",
    boxShadow: `var(--shadow-window), ${bevelWindow}`,
    borderRadius: "var(--radius-lg)"
  };
}
Object.assign(__ds_scope, { bevelRaised, bevelSunken, bevelWindow, bevelField, fontChrome, fontBody, fontDisplay, buttonFace, fieldFace, windowFace });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/retroStyles.js", error: String((e && e.message) || e) }); }

// ui_kits/portfolio-os/AboutWindow.jsx
try { (() => {
const {
  Badge,
  Separator
} = window.HidaviddongDesignSystem_9acf6c;
function AboutWindow() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: "var(--text-body-md)",
      color: "var(--text-primary)",
      display: "flex",
      flexDirection: "column",
      gap: 10,
      width: 340
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 12,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 48,
      height: 48,
      background: "var(--gray-200)",
      boxShadow: "var(--bevel-raised)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "var(--font-chrome)",
      fontSize: 22
    }
  }, "D"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-chrome)",
      fontSize: "var(--text-chrome-md)"
    }
  }, "hidaviddong"), /*#__PURE__*/React.createElement(Badge, {
    tone: "terminal"
  }, "est. 1999"))), /*#__PURE__*/React.createElement(Separator, null), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      lineHeight: "var(--leading-normal)"
    }
  }, "Software engineer, born in '99. Building things that feel like the internet used to \u2014 beige boxes turned glossy blue, dial-up patience, and a desktop you actually decorate."), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      color: "var(--text-secondary)"
    }
  }, "Double-click the icons to explore."));
}
window.AboutWindow = AboutWindow;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio-os/AboutWindow.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio-os/BlogWindow.jsx
try { (() => {
const {
  Separator
} = window.HidaviddongDesignSystem_9acf6c;
const POSTS = [{
  date: "1999.03.12",
  title: "why i still miss the modem sound"
}, {
  date: "2004.11.02",
  title: "building my first geocities page"
}, {
  date: "2026.06.30",
  title: "bringing Aqua gloss back for the web"
}];
function BlogWindow() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: 340,
      fontFamily: "var(--font-body)",
      fontSize: "var(--text-body-md)",
      color: "var(--text-primary)"
    }
  }, POSTS.map((p, i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: i
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "8px 0"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-chrome)",
      fontSize: "var(--text-chrome-sm)",
      color: "var(--text-link)",
      textDecoration: "underline",
      cursor: "pointer"
    }
  }, p.title), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--text-body-xs)",
      color: "var(--text-secondary)"
    }
  }, p.date)), i < POSTS.length - 1 && /*#__PURE__*/React.createElement(Separator, null))));
}
window.BlogWindow = BlogWindow;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio-os/BlogWindow.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio-os/ContactWindow.jsx
try { (() => {
const {
  Input,
  Textarea,
  Label,
  Button
} = window.HidaviddongDesignSystem_9acf6c;
function ContactWindow() {
  const [sent, setSent] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: 300,
      display: "flex",
      flexDirection: "column",
      gap: 10
    }
  }, sent ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: "var(--text-body-md)"
    }
  }, "Message sent. \u2713") : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Label, {
    htmlFor: "email"
  }, "Your email"), /*#__PURE__*/React.createElement(Input, {
    id: "email",
    placeholder: "you@example.com"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Label, {
    htmlFor: "msg"
  }, "Message"), /*#__PURE__*/React.createElement(Textarea, {
    id: "msg",
    rows: 4,
    placeholder: "Say hi..."
  })), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    onClick: () => setSent(true)
  }, "Send")));
}
window.ContactWindow = ContactWindow;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio-os/ContactWindow.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio-os/Desktop.jsx
try { (() => {
const ICONS = [{
  id: "about",
  label: "About Me.txt",
  glyph: "📄"
}, {
  id: "projects",
  label: "Projects",
  glyph: "📁"
}, {
  id: "blog",
  label: "Blog.app",
  glyph: "📰"
}, {
  id: "contact",
  label: "Contact.txt",
  glyph: "✉️"
}, {
  id: "resume",
  label: "Resume.pdf",
  glyph: "📋"
}, {
  id: "terminal",
  label: "Terminal",
  glyph: "⌨️"
}, {
  id: "trash",
  label: "Trash",
  glyph: "🗑️"
}];
function Desktop({
  openWindows,
  onIconOpen,
  onIconDoubleClickReserved,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: "100%",
      height: "100%",
      background: "var(--surface-desktop)",
      overflow: "hidden",
      fontFamily: "var(--font-chrome)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: 44,
      right: 20,
      display: "grid",
      gridTemplateColumns: "repeat(1, 76px)",
      gap: 20
    }
  }, ICONS.map(icon => /*#__PURE__*/React.createElement("button", {
    key: icon.id,
    onDoubleClick: () => onIconOpen(icon.id),
    style: {
      background: "none",
      border: "none",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 5,
      cursor: "default",
      color: "#fff"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 30,
      filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.4))"
    }
  }, icon.glyph), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--text-chrome-sm)",
      textShadow: "0 1px 2px rgba(0,0,0,0.7)",
      textAlign: "center",
      lineHeight: 1.2
    }
  }, icon.label)))), children);
}
window.Desktop = Desktop;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio-os/Desktop.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio-os/Dock.jsx
try { (() => {
// Floating glassy Dock — replaces a Windows-style taskbar entirely. Click to
// open/focus an app; a dot under the icon marks it as running.
function DockIcon({
  glyph,
  label,
  running,
  active,
  onClick
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      position: "relative"
    },
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false)
  }, hover && /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      bottom: "calc(100% + 10px)",
      background: "var(--surface-tooltip)",
      color: "var(--text-on-tooltip)",
      fontFamily: "var(--font-ui)",
      fontSize: "var(--text-body-xs)",
      padding: "3px 8px",
      borderRadius: 5,
      whiteSpace: "nowrap"
    }
  }, label), /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    style: {
      width: 46,
      height: 46,
      border: "none",
      background: "transparent",
      fontSize: 30,
      cursor: "pointer",
      transform: hover ? "translateY(-8px) scale(1.12)" : "translateY(0) scale(1)",
      transition: `transform var(--duration-fast) var(--ease-standard)`,
      filter: active ? "none" : "none"
    }
  }, glyph), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 4,
      height: 4,
      borderRadius: "50%",
      background: running ? "var(--text-primary)" : "transparent",
      marginTop: 2
    }
  }));
}
const DOCK_APPS = [{
  id: "about",
  glyph: "📄",
  label: "About Me"
}, {
  id: "projects",
  glyph: "📁",
  label: "Projects"
}, {
  id: "blog",
  glyph: "📰",
  label: "Blog"
}, {
  id: "contact",
  glyph: "✉️",
  label: "Contact"
}, {
  id: "resume",
  glyph: "📋",
  label: "Resume"
}, {
  id: "terminal",
  glyph: "⌨️",
  label: "Terminal"
}];
function Dock({
  openIds,
  current,
  onOpen
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      bottom: 10,
      left: "50%",
      transform: "translateX(-50%)",
      display: "flex",
      alignItems: "flex-end",
      gap: 6,
      padding: "6px 10px",
      background: "var(--surface-dock)",
      backdropFilter: "blur(20px)",
      borderRadius: 18,
      boxShadow: "var(--shadow-dock), inset 0 1px 0 0 rgba(255,255,255,0.5)",
      zIndex: 900
    }
  }, DOCK_APPS.map(app => /*#__PURE__*/React.createElement(DockIcon, {
    key: app.id,
    glyph: app.glyph,
    label: app.label,
    running: openIds.includes(app.id),
    active: current === app.id,
    onClick: () => onOpen(app.id)
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 1,
      alignSelf: "stretch",
      background: "rgba(0,0,0,0.15)",
      margin: "0 4px"
    }
  }), /*#__PURE__*/React.createElement(DockIcon, {
    glyph: "\uD83D\uDDD1\uFE0F",
    label: "Trash",
    running: false,
    onClick: () => {}
  }));
}
window.Dock = Dock;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio-os/Dock.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio-os/MenuBar.jsx
try { (() => {
const {
  Separator
} = window.HidaviddongDesignSystem_9acf6c;

// Global menu bar — fixed to the top of the screen (not per-window). The
// left-most glyph is intentionally a generic filled square, NOT an apple —
// this system never reproduces Apple's actual logo. See readme.md.
function MenuBar() {
  const [time, setTime] = React.useState(new Date());
  React.useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000 * 30);
    return () => clearInterval(id);
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: 26,
      display: "flex",
      alignItems: "center",
      gap: 18,
      padding: "0 14px",
      background: "var(--surface-menubar)",
      backdropFilter: "blur(20px)",
      borderBottom: "1px solid rgba(0,0,0,0.08)",
      fontFamily: "var(--font-chrome)",
      fontSize: "var(--text-chrome-md)",
      color: "var(--text-primary)",
      zIndex: 1000
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14
    },
    "aria-hidden": "true"
  }, "\u25C6"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 700
    }
  }, "hidaviddong"), ["File", "Edit", "View", "Window", "Help"].map(m => /*#__PURE__*/React.createElement("span", {
    key: m,
    style: {
      color: "var(--text-secondary)"
    }
  }, m)), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-secondary)"
    }
  }, time.toLocaleDateString([], {
    weekday: "short",
    month: "short",
    day: "numeric"
  })), /*#__PURE__*/React.createElement("span", null, time.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit"
  })));
}
window.MenuBar = MenuBar;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio-os/MenuBar.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio-os/ProjectsWindow.jsx
try { (() => {
const {
  Table,
  Badge
} = window.HidaviddongDesignSystem_9acf6c;
const PROJECTS = [{
  name: {
    label: "retro-shell",
    tone: "success"
  },
  type: "CLI",
  status: "active"
}, {
  name: {
    label: "aqua-ui-kit",
    tone: "primary"
  },
  type: "React",
  status: "active"
}, {
  name: {
    label: "dial-up.fm",
    tone: "terminal"
  },
  type: "Audio",
  status: "archived"
}];
function ProjectsWindow() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: 380,
      fontFamily: "var(--font-body)"
    }
  }, /*#__PURE__*/React.createElement(Table, {
    columns: [{
      key: "name",
      label: "Name"
    }, {
      key: "type",
      label: "Type"
    }, {
      key: "status",
      label: "Status"
    }],
    rows: PROJECTS.map(p => ({
      name: /*#__PURE__*/React.createElement(Badge, {
        tone: p.name.tone
      }, p.name.label),
      type: p.type,
      status: p.status
    }))
  }));
}
window.ProjectsWindow = ProjectsWindow;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio-os/ProjectsWindow.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio-os/TerminalWindow.jsx
try { (() => {
// Terminal.app easter egg — a real feature Mac OS X shipped from day one,
// so a static shell transcript here is period-accurate (not just decorative
// pixel nostalgia). Purely cosmetic — no code actually executes.
function TerminalWindow() {
  const lines = [{
    prompt: true,
    text: "david@hidaviddong ~ % whoami"
  }, {
    text: "david — software engineer, est. 1999"
  }, {
    prompt: true,
    text: "david@hidaviddong ~ % cat about.txt"
  }, {
    text: "building things that feel like the internet used to."
  }, {
    prompt: true,
    text: "david@hidaviddong ~ % ls projects/"
  }, {
    text: "retro-shell   aqua-ui-kit   dial-up.fm"
  }, {
    prompt: true,
    text: "david@hidaviddong ~ % _"
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      boxSizing: "border-box",
      height: 220,
      background: "var(--terminal-bg)",
      borderRadius: 6,
      padding: 12,
      fontFamily: "var(--font-mono)",
      fontSize: 13,
      lineHeight: 1.6,
      overflow: "hidden"
    }
  }, lines.map((l, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      color: l.prompt ? "var(--terminal-green)" : "rgba(255,255,255,0.75)"
    }
  }, l.text)));
}
window.TerminalWindow = TerminalWindow;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio-os/TerminalWindow.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Kbd = __ds_scope.Kbd;

__ds_ns.Separator = __ds_scope.Separator;

__ds_ns.Table = __ds_scope.Table;

__ds_ns.Toggle = __ds_scope.Toggle;

__ds_ns.ToggleGroup = __ds_scope.ToggleGroup;

__ds_ns.Alert = __ds_scope.Alert;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Progress = __ds_scope.Progress;

__ds_ns.Skeleton = __ds_scope.Skeleton;

__ds_ns.Spinner = __ds_scope.Spinner;

__ds_ns.Toast = __ds_scope.Toast;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Label = __ds_scope.Label;

__ds_ns.RadioGroup = __ds_scope.RadioGroup;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Slider = __ds_scope.Slider;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.Textarea = __ds_scope.Textarea;

__ds_ns.Accordion = __ds_scope.Accordion;

__ds_ns.Breadcrumb = __ds_scope.Breadcrumb;

__ds_ns.Tabs = __ds_scope.Tabs;

__ds_ns.Dialog = __ds_scope.Dialog;

__ds_ns.DropdownMenu = __ds_scope.DropdownMenu;

__ds_ns.Popover = __ds_scope.Popover;

__ds_ns.Tooltip = __ds_scope.Tooltip;

__ds_ns.WindowFrame = __ds_scope.WindowFrame;

})();
